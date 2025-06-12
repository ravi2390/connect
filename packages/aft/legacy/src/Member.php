<?php

//declare(strict_types=1);

namespace Aft\Legacy;

use Aft\Legacy\Models\Address as LegacyAddress;
use Aft\Legacy\Models\IndividualAffiliate as LegacyIndividualAffiliate;
use Aft\Legacy\Models\IndividualDetail;
use Aft\Legacy\Models\IndividualMemberIDs;
use App\Models\AffiliateOfficer;
use App\Models\Individual;
use App\Models\IndividualAddress;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use App\Models\IndividualEmail;
use App\Models\IndividualEmployer;
use App\Models\IndividualEmployerSchedule;
use App\Models\IndividualPhone;
use App\Models\IndividualQuickComment;
use App\Models\MemberIdMapping;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

/**
 * Context around a single affiliate member being checked/migrated.
 */
class Member
{
    /**
     * The status of this member as we process them.
     */
    const MEMBER_CREATED = 1;

    const MEMBER_UPDATED = 2;

    const MEMBER_UNCHANGED = 3;

    protected $status = self::MEMBER_UNCHANGED;

    /**
     * Full legacy IndividualDetail data for the member - lazy-loaded.
     */
    protected IndividualDetail $oldIndividual;

    /**
     * Connect 2.0 ID of the member.
     */
    protected int $newIndividualId;

    public function __construct(
        /**
         * Number of the affiliate the member is attached to.
         */
        protected string $affiliateNumber,
        /**
         * Connect 2.0 ID of the affiliate.
         */
        protected int $newAffiliateId,
        /**
         * Whether the affiliate being processed has just been created.
         */
        protected bool $affiliateIsNew,
        /**
         * The minimum fields for a member to determine which components require
         * migration.
         */
        protected \stdClass $memberInfo,
        /**
         * Class for mapping lookup tables.
         */
        protected \Aft\Legacy\LegacyFlatData $flatData,
        /**
         * List of Subject rows for this affiliate.
         */
        protected array $newSubjects
    )
    {
    }

    /**
     * Migrate all Individual data for a given member.
     */
    public function checkIndividualData(?int $BHId = null, array $leadership = [], bool $onlyScheduledMembers = false): int
    {
        $this->checkIndividualDetail($BHId);
        $this->checkIndividualAffiliate();
        // If we're just running members to get their initial schedules in, skip
        // the rest of the stuff.
        if (! $onlyScheduledMembers) {
            $this->checkIndividualMemberIDs();
            $this->checkLeadershipPosition($leadership);
            $this->checkIndividualAddress();
            $this->checkIndividualEmail();
            $this->checkIndividualPhone();
            $this->checkIndividualComments();
            $this->checkIndividualCope();

            Redis::set(
                "legacy:migrate:{$this->affiliateNumber}:highwater",
                $this->memberInfo->LastUpdateDate
            );
        }

        return $this->status;
    }

    /**
     * Migrate the individual-specific details for a member.
     */
    protected function checkIndividualDetail(?int $BHId = null)
    {
        $newIndividualBasic = $this->getNewIndividualBasic($this->memberInfo->IndividualId);
        if (!$newIndividualBasic instanceof \stdClass) {
            // Not in 2.0 - create from scratch.
            $newIndividual = new Individual();
            $this->setCreated();
        } else {
            $this->newIndividualId = (int) $newIndividualBasic->IndividualId;
            if ($this->moreRecent($this->memberInfo->DetailUpdateDate, $newIndividualBasic->UpdatedAt)) {
                // Legacy data is more recent than 2.0 - update 2.0 from legacy.
                $this->setUpdated();
                $newIndividual = $this->getNewIndividual();
            }
        }
        if ($this->status != self::MEMBER_UNCHANGED) {
            $newIndividual->forceFill($this->getLegacyIndividualDetail()
                ->transform($this->flatData, $BHId));
            $newIndividual->save();
            $this->newIndividualId = (int) $newIndividual->IndividualId;
        }
    }

    /**
     * Migrate the affiliate and employer relationships for a given member.
     */
    protected function checkIndividualAffiliate(): void
    {
        if ($this->affiliateIsNew) {
            $newIndividualAffiliate = null;
            $newIndividualEmployer = null;
        } else {
            $newIndividualAffiliate = $this->getNewIndividualAffiliate(
                $this->newIndividualId,
                $this->newAffiliateId
            );
            $newIndividualEmployer = $this->getNewIndividualEmployer(
                $this->newIndividualId,
                $this->newAffiliateId,
                $this->memberInfo->EmployerId
            );
        }
        if (!$newIndividualAffiliate instanceof \stdClass ||
            $this->moreRecent($this->memberInfo->IndAffUpdateDate, $newIndividualAffiliate->UpdatedAt)) {
            if (!$newIndividualAffiliate instanceof \stdClass) {
                $newIndividualAffiliate = new IndividualAffiliate();
            } else {
                $newIndividualAffiliate = IndividualAffiliate::find($newIndividualAffiliate->IndividualAffiliateId);
            }
            $legacyIndividualAffiliate = new LegacyIndividualAffiliate($this->getLegacyMember($this->memberInfo->IndividualAffiliateId));
            $newIndividualAffiliate->forceFill($legacyIndividualAffiliate->transform($this->newIndividualId, $this->newAffiliateId, $this->flatData));
            $newIndividualAffiliate->save();
            $this->setUpdated();
        }
        if (!$newIndividualEmployer instanceof \stdClass ||
            $this->moreRecent($this->memberInfo->IndAffUpdateDate, $newIndividualEmployer->UpdatedAt)) {
            if (!$newIndividualEmployer instanceof \stdClass) {
                $newIndividualEmployer = new IndividualEmployer();
            } else {
                $newIndividualEmployer = IndividualEmployer::find($newIndividualEmployer->IndividualEmployerId);
            }
            if (empty($legacyIndividualAffiliate)) {
                $legacyIndividualAffiliate = new LegacyIndividualAffiliate($this->getLegacyMember($this->memberInfo->IndividualAffiliateId));
            }
            // Get the 2.0 IDs for the relationships.
            $employerId = null;
            if (! empty($legacyIndividualAffiliate->EmployerId)) {
                $employerId = DB::connection('aftdb')->table('Employer')
                    ->join('Chapter', 'Chapter.ChapterId', '=', 'Employer.ChapterId')
                    ->where('Chapter.AffiliateId', '=', $this->newAffiliateId)
                    ->where('EmployerGuid', '=', $legacyIndividualAffiliate->EmployerId)
                    ->value('EmployerId');
            }
            if (empty($employerId)) {
                // Assign to the unknown employer under the unknown chapter.
                // @todo Keep this and pass in from affiliate migration.
                $employerId = DB::connection('aftdb')->table('Employer')
                    ->join('Chapter', 'Chapter.ChapterId', '=', 'Employer.ChapterId')
                    ->where('Employer.IsUnknown', '=', 1)
                    ->where('Chapter.AffiliateId', '=', $this->newAffiliateId)
                    ->where(function ($query): void {
                        $query->where('Chapter.IsStructural', '=', 1)
                            ->orWhere('Chapter.IsUnknown', '=', 1);
                    })
                    ->value('EmployerId');
            }
            $localJobClassId = null;
            if (! empty($legacyIndividualAffiliate->LocalJobClassId)) {
                // Find under the unknown unit under this employer.
                $localJobClassId = DB::connection('aftdb')->table('LocalJobClass')
                    ->join('Unit', 'Unit.UnitId', '=', 'LocalJobClass.UnitId')
                    ->join('LocalAgreement', 'LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId')
                    ->where('Unit.IsUnknown', '=', 1)
                    ->where('LocalAgreement.IsUnknown', '=', 1)
                    ->where('LocalAgreement.EmployerId', '=', $employerId)
                    ->where('LocalJobClass.LocalJobClassGuid', '=', $legacyIndividualAffiliate->LocalJobClassId)
                    ->value('LocalJobClassId');
            }
            if (empty($localJobClassId)) {
                // Couldn't find a real one, so use the unknown one.
                $localJobClassId = DB::connection('aftdb')->table('LocalJobClass')
                    ->join('Unit', 'Unit.UnitId', '=', 'LocalJobClass.UnitId')
                    ->join('LocalAgreement', 'LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId')
                    ->where('Unit.IsUnknown', '=', 1)
                    ->where('LocalAgreement.IsUnknown', '=', 1)
                    ->where('LocalAgreement.EmployerId', '=', $employerId)
                    ->where('LocalJobClass.IsUnknown', '=', 1)
                    ->value('LocalJobClassId');
            }
            $subjectId = null;
            if (! empty($legacyIndividualAffiliate->SubjectId)) {
                $subjectId = DB::connection('aftdb')->table('Subject')
                    ->where('SubjectGuid', '=', $legacyIndividualAffiliate->SubjectId)
                    ->value('SubjectId');
            }
            $workLocationId = null;
            if (! empty($legacyIndividualAffiliate->WorksiteId)) {
                $workLocationId = DB::connection('aftdb')->table('WorkLocation')
                    ->where('WorkLocationGuid', '=', $legacyIndividualAffiliate->WorksiteId)
                    ->value('WorkLocationId');
            }
            $newIndividualEmployer->forceFill(
                $legacyIndividualAffiliate->transformIndividualEmployer(
                    $this->newIndividualId,
                    $employerId,
                    $localJobClassId,
                    $subjectId,
                    $workLocationId
                )
            );
            $newIndividualEmployer->save();
            $this->setUpdated();
        }
        // Migrate schedule data.
        $legacyEmployerId = DB::connection('aftdb')->table('Employer')
            ->where('EmployerId', '=', $newIndividualEmployer->EmployerId)
            ->value('EmployerGuid');
        $legacyIndividualId = DB::connection('aftdb')->table('Individual')
            ->where('IndividualId', '=', $newIndividualEmployer->IndividualId)
            ->value('IndividualGuid');
        $legacySchedules = DB::connection('legacy')->table('IndividualSchedule')
            ->join('SessionLocal', 'IndividualSchedule.SessionId', '=', 'SessionLocal.SessionLocalId')
            ->where('IndividualSchedule.EmployerId', '=', $legacyEmployerId)
            ->where('IndividualSchedule.IndividualId', '=', $legacyIndividualId)
            ->get(['IndividualSchedule.*', 'SessionLocal.SessionName']);
        if ($legacySchedules->count() == 0) {
            return;
        }
        $hasNewIndividualSchedule = DB::connection('aftdb')->table('IndividualEmployerSchedule')
            ->where('IndividualEmployerId', '=', $newIndividualEmployer->IndividualEmployerId)
            ->exists();
        if ($hasNewIndividualSchedule) {
            return;
        }
        foreach ($legacySchedules as $legacySchedule) {
            $newSchedule = new IndividualEmployerSchedule();
            $newSchedule->IndividualEmployerId = $newIndividualEmployer->IndividualEmployerId;
            $newSchedule->SessionId = DB::connection('aftdb')->table('Session')
                ->where('SessionName', '=', $legacySchedule->SessionName)
                ->where('AffiliateId', '=', $this->newAffiliateId)
                ->value('SessionId');
            $newSchedule->ScheduleTypeId = 1;
            $newSchedule->ScheduleStartDate = $legacySchedule->StartDate;
            $newSchedule->ScheduleEndDate = $legacySchedule->EndDate;
            // Handle bad data in the time columns.
            if (strtolower($legacySchedule->StartTime) != 'tba' && $legacySchedule->StartTime != '0') {
                $newSchedule->DailyStartTime = trim($legacySchedule->StartTime, ' ,');
            }
            if (strtolower($legacySchedule->EndTime) != 'tba' && $legacySchedule->StartTime != '0') {
                $newSchedule->DailyEndTime = trim($legacySchedule->EndTime, ' ,');
            }
            $newSchedule->CourseTitle = $legacySchedule->Course;
            $newSchedule->RoomNumber = $legacySchedule->Room;
            $newSchedule->Notes = $legacySchedule->Notes;
            $newSchedule->Monday = $legacySchedule->Monday ?? 0;
            $newSchedule->Tuesday = $legacySchedule->Tuesday ?? 0;
            $newSchedule->Wednesday = $legacySchedule->Wednesday ?? 0;
            $newSchedule->Thursday = $legacySchedule->Thursday ?? 0;
            $newSchedule->Friday = $legacySchedule->Friday ?? 0;
            $newSchedule->Saturday = $legacySchedule->Saturday ?? 0;
            $newSchedule->Sunday = $legacySchedule->Sunday ?? 0;
            $newSchedule->CreatedBy = 1;
            $newSchedule->UpdatedBy = 1;
            $newSchedule->CreatedAt = $legacySchedule->cdate;
            $newSchedule->UpdatedAt = $legacySchedule->mdate;
            $newSchedule->save();
        }
    }

    /**
     * Migrate the member IDs for a given member.
     *
     * @todo Sometimes there are multiple IDs?
     */
    protected function checkIndividualMemberIDs(): void
    {
        if (! $this->memberInfo->MemIdsUpdateDate) {
            return;
        }
        if ($this->affiliateIsNew) {
            $newMemberIdMapping = null;
        } else {
            $newMemberIdMapping = $this->getNewIndividualMemberIdsBasic(
                $this->newIndividualId,
                $this->newAffiliateId
            );
        }
        if (!$newMemberIdMapping instanceof \stdClass ||
            $this->moreRecent($this->memberInfo->MemIdsUpdateDate, $newMemberIdMapping->UpdatedAt)) {
            if (!$newMemberIdMapping instanceof \stdClass) {
                $newMemberIdMapping = new MemberIdMapping();
            } else {
                $newMemberIdMapping = $this->getNewIndividualMemberIds($newMemberIdMapping->MemberIdMappingId);
            }
            $legacyMemberIDdata = $this->getLegacyIndividualMemberIds();
            if (empty($legacyMemberIDdata)) {
                $legacyMemberIDdata = new \stdClass;
                $legacyMemberIDdata->cdate = now();
                $legacyMemberIDdata->Mdate = now();
            }
            $legacyMemberIDdata = new IndividualMemberIDs($legacyMemberIDdata);
            $newMemberIdMapping->forceFill($legacyMemberIDdata->transform($this->newIndividualId, $this->newAffiliateId));
            $newMemberIdMapping->save();
            $this->setUpdated();
        }
    }

    /**
     * Migrate any leadership positions for a given member.
     */
    protected function checkLeadershipPosition(array $leadership)
    {
        if (! $this->memberInfo->LeaderUpdateDate) {
            return;
        }
        /** @var Leadership $oldLeadership */
        foreach ($leadership as $oldLeadership) {
            // See if it already exists.
            $roleId = $oldLeadership->getAffiliateOfficerRoleId(
                $this->newAffiliateId,
                $oldLeadership->LeadershipPositionId
            );
            $newAffiliateOfficer = $this->getNewLeadershipPosition(
                $this->newIndividualId,
                $this->newAffiliateId,
                $roleId
            );
            if (!$newAffiliateOfficer instanceof \stdClass || $this->moreRecent($oldLeadership->mdate, $newAffiliateOfficer->UpdatedAt)) {
                if (!$newAffiliateOfficer instanceof \stdClass) {
                    $newAffiliateOfficer = new AffiliateOfficer();
                } else {
                    $newAffiliateOfficer = $this->getNewAffiliateOfficer($newAffiliateOfficer->AffiliateOfficerId);
                }
                $newAffiliateOfficer->forceFill($oldLeadership->transform(
                    $this->newIndividualId,
                    $this->newAffiliateId
                ));
                $newAffiliateOfficer->save();
                $this->setUpdated();
            }
        }
    }

    /**
     * Migrate the addresses for an individual.
     */
    protected function checkIndividualAddress(): void
    {
        $addressRelations = [
            'AddressId' => 'Work',
            'HomeAddressId' => 'Home',
            'AltAddressId' => 'Alternate',
        ];
        $prefAddrIndicatorMap = [
            '' => 'Work',           // @todo ?
            'Alternate' => 'Alternate',
            'Chapter' => 'Work',    // @todo ?
            'Employer' => 'Work',
            'Home' => 'Home',
            'Local' => 'Work',      // @todo ?
            'Work' => 'Work',
            'Worksite' => 'Work',
        ];
        foreach ($addressRelations as $addressRelation => $addressType) {
            $addressTypeId = $this->flatData->getMapping('IndividualAddressType', $addressType);
            $legacyAddressId = $this->memberInfo->$addressRelation;
            if (! empty($legacyAddressId)) {
                $newAddress = $this->getNewIndividualAddressBasic(
                    $this->newIndividualId,
                    $addressTypeId
                );
                $updatedDateColumn = str_replace('Id', 'UpdateDate', $addressRelation);
                if (!$newAddress instanceof \stdClass || $this->moreRecent($this->memberInfo->$updatedDateColumn, $newAddress->UpdatedAt)) {
                    // @todo Get all the legacy addresses in one query.
                    $legacyAddress = $this->getLegacyIndividualAddress($legacyAddressId);
                    if ($legacyAddress) {
                        if (!$newAddress instanceof \stdClass) {
                            $newAddress = new IndividualAddress();
                        } else {
                            $newAddress = $this->getNewIndividualAddress($newAddress->IndividualAddressId);
                        }

                        // Force the transformation to recognize this as an individual.
                        $legacyAddress->AddressOwnertype = 'Individual';
                        $legacyAddress = new LegacyAddress(($legacyAddress));
                        $newAddress->forceFill($legacyAddress->transform($this->flatData));
                        $newAddress->IndividualId = $this->newIndividualId;
                        $newAddress->IndividualAddressTypeId = $addressTypeId;
                        if (! empty($legacyAddress->PrefaddrIndicator)) {
                            $newAddress->IsPreferred = ($addressType == $prefAddrIndicatorMap[$legacyAddress->PrefaddrIndicator]);
                        } else {
                            $newAddress->IsPreferred = 0;
                        }
                        $newAddress->save();
                        $this->setUpdated();
                    }
                }
            }
        }
    }

    /**
     * Migrate the email addresses for an individual.
     */
    protected function checkIndividualEmail(): void
    {
        $emailColumns = [
            'PrimaryEmail' => 'Primary',
            'SecondaryEmail' => 'Secondary',
        ];
        foreach ($emailColumns as $emailColumn => $emailType) {
            $emailTypeId = $this->flatData->getMapping('IndividualEmailType', $emailType);
            $oldEmailAddress = $this->memberInfo->$emailColumn;
            if (! empty($oldEmailAddress)) {
                $newEmail = $this->getNewIndividualEmailBasic(
                    $this->newIndividualId,
                    (int) $emailTypeId
                );
                if (!$newEmail instanceof \stdClass || $this->moreRecent($this->memberInfo->DetailUpdateDate, $newEmail->UpdatedAt)) {
                    if (!$newEmail instanceof \stdClass) {
                        $newEmail = new IndividualEmail();
                    } else {
                        $newEmail = $this->getNewIndividualEmail($newEmail->IndividualEmailId);
                    }
                    $newEmail->IndividualId = $this->newIndividualId;
                    $newEmail->Email = $oldEmailAddress;
                    $newEmail->IndividualEmailTypeId = $emailTypeId;
                    $newEmail->IsPreferred = 0;
                    $newEmail->CanContactRestrictionId = 1;
                    $newEmail->CreatedAt = $this->memberInfo->DetailCreateDate;
                    $newEmail->UpdatedAt = $this->memberInfo->DetailUpdateDate;
                    $newEmail->CreatedBy = 1;
                    $newEmail->UpdatedBy = 1;
                    $newEmail->save();
                    $this->setUpdated();
                }
            }
        }
    }

    /**
     * Migrate the phone numbers for an individual.
     */
    protected function checkIndividualPhone(): void
    {
        $phoneColumns = [
            'HomePhone' => 'Home',
            'MobilePhone' => 'Mobile',
        ];
        foreach ($phoneColumns as $phoneColumn => $phoneType) {
            $phoneTypeId = $this->flatData->getMapping('IndividualPhoneType', $phoneType);
            $oldPhoneNumber = $this->memberInfo->$phoneColumn;
            if (! empty($oldPhoneNumber)) {
                $newPhone = $this->getNewIndividualPhoneBasic(
                    $this->newIndividualId,
                    (int) $phoneTypeId
                );
                if (!$newPhone instanceof \stdClass || $this->moreRecent($this->memberInfo->DetailUpdateDate, $newPhone->UpdatedAt)) {
                    if (!$newPhone instanceof \stdClass) {
                        $newPhone = new IndividualPhone();
                    } else {
                        $newPhone = $this->getNewIndividualPhone($newPhone->IndividualPhoneId);
                    }
                    $newPhone->IndividualId = $this->newIndividualId;
                    $newPhone->PhoneNumber = $oldPhoneNumber;
                    $newPhone->IndividualPhoneTypeId = $phoneTypeId;
                    $newPhone->IsPreferred = 0;
                    $newPhone->CanTextRestrictionId = 1;
                    $newPhone->CreatedAt = $this->memberInfo->DetailCreateDate;
                    $newPhone->UpdatedAt = $this->memberInfo->DetailUpdateDate;
                    $newPhone->CreatedBy = 1;
                    $newPhone->UpdatedBy = 1;
                    $newPhone->save();
                    $this->setUpdated();
                }
            }
        }
    }

    /**
     * Migrate the comments for a given member.
     */
    protected function checkIndividualComments(): void
    {
        if (! $this->memberInfo->CommentsUpdateDate) {
            return;
        }

        $legacyComments = DB::connection('legacy')->table('IndividualComments')
            ->where('IndividualId', '=', $this->memberInfo->IndividualId)
            ->where('LocalUnionNbr', '=', $this->affiliateNumber)
            ->get();
        foreach ($legacyComments as $legacyComment) {
            $newComment = new IndividualQuickComment();
            $newComment->IndividualId = $this->newIndividualId;
            $newComment->IndividualQuickComment = $legacyComment->Comments;
            $newComment->CommentDate = $legacyComment->CommentsDate;
            $newComment->CreatedBy = 1;
            $newComment->UpdatedBy = 1;
            $newComment->CreatedAt = $legacyComment->cdate;
            $newComment->UpdatedAt = $legacyComment->mdate;
            $newComment->save();
            $this->setUpdated();
        }
    }

    /**
     * Migrate the COPE info for a given member.
     */
    protected function checkIndividualCope(): void
    {
        if (! $this->memberInfo->COPEUpdateDate) {
            return;
        }

        $legacyCope = DB::connection('legacy')->table('COPE')
            ->join('PaymentMethod', 'COPE.PaymentMethodId', '=', 'PaymentMethod.PaymentMethodId')
            ->where('COPE.IndividualId', '=', $this->memberInfo->IndividualId)
            ->where('COPE.LocalUnionNbr', '=', $this->affiliateNumber)
            ->where('COPE.DeleteFlag', '=', 0)
            // Take the most recent record.
            ->orderBy('COPE.mdate', 'desc')
            ->first(['COPE.*', 'PaymentMethod.PaymentMethodName']);
        if ($legacyCope) {
            $newCope = new IndividualCope();
            $newCope->IndividualId = $this->newIndividualId;
            $newCope->AffiliateId = $this->newAffiliateId;
            $newCope->CopeAmount = $legacyCope->Contribution;
            $newCope->CopePaymentMethodId =
                $this->flatData->getMapping('PaymentMethod', $legacyCope->PaymentMethodName);
            $newCope->CreatedBy = 1;
            $newCope->UpdatedBy = 1;
            $newCope->CreatedAt = $legacyCope->cdate;
            $newCope->UpdatedAt = $legacyCope->mdate;
            $newCope->save();
            $this->setUpdated();
        }
    }

    /**
     * Return the legacy individual detail data, querying for it if necessary.
     *
     * @return \Aft\Legacy\IndividualDetail
     */
    protected function getLegacyIndividualDetail(): \Aft\Legacy\Models\IndividualDetail
    {
        if (empty($this->oldIndividual)) {
            $this->oldIndividual = new IndividualDetail($this->getLegacyIndividualData($this->memberInfo->IndividualId));
        }

        return $this->oldIndividual;
    }

    /**
     * Get the existing 2.0 data for the individual.
     *
     * @return Individual
     */
    protected function getNewIndividual()
    {
        return Individual::find($this->newIndividualId);
    }

    /**
     * Get the 2.0 ID and UpdatedAt for an individual.
     *
     * @param  string  $legacyIndividualId
     *                                      The GUID (and legacy ID) of the individual.
     */
    protected function getNewIndividualBasic(string $legacyIndividualId): ?\stdClass
    {
        return DB::connection('aftdb')->table('Individual')
            ->where('IndividualGuid', '=', $legacyIndividualId)
            ->get(['IndividualId', 'UpdatedAt'])
            ->first();
    }

    /**
     * Get all the data for a given membership.
     *
     * @param  string  $individualAffiliateId
     *                                         GUID of the desired membership record.
     * @return \stdClass|null
     */
    protected function getLegacyMember(string $individualAffiliateId): \stdClass
    {
        return DB::connection('legacy')->table('IndividualAffiliate')
            ->where('IndividualAffiliateId', '=', $individualAffiliateId)
            ->first();
    }

    /**
     * Retrieve the detail data associated with a given individual.
     *
     * @param  $memberGuid
     *                     GUID of the Individual record for the member.
     */
    protected function getLegacyIndividualData($memberGuid): ?\stdClass
    {
        return DB::connection('legacy')->table('IndividualDetail')
            ->where('IndividualId', '=', $memberGuid)->first();
    }

    /**
     * Get the 2.0 IndividualAffiliate ID and UpdatedAt values.
     */
    protected function getNewIndividualAffiliate(int $individualId, int $affiliateId): ?\stdClass
    {
        return DB::connection('aftdb')->table('IndividualAffiliate')
            ->where('IndividualId', '=', $individualId)
            ->where('AffiliateId', '=', $affiliateId)
            ->get(['IndividualAffiliateId', 'UpdatedAt'])
            ->first();
    }

    /**
     * Get the 2.0 IndividualEmployer ID and UpdatedAt values.
     */
    protected function getNewIndividualEmployer(int $individualId, int $affiliateId, ?string $legacyEmployerId = null): ?\stdClass
    {
        return DB::connection('aftdb')->table('IndividualAffiliate')
            ->join('Chapter', 'IndividualAffiliate.AffiliateId', '=', 'Chapter.AffiliateId')
            ->join('Employer', 'Employer.ChapterId', '=', 'Chapter.ChapterId')
            ->join('IndividualEmployer', 'IndividualEmployer.EmployerId', '=', 'Employer.EmployerId')
            ->where('IndividualAffiliate.IndividualId', '=', $individualId)
            ->where('IndividualEmployer.IndividualId', '=', $individualId)
            ->where('IndividualAffiliate.AffiliateId', '=', $affiliateId)
            ->where('Employer.EmployerGuid', '=', $legacyEmployerId)
            ->get([
                'IndividualEmployer.IndividualEmployerId',
                'IndividualEmployer.EmployerId',
                'IndividualEmployer.IndividualId',
                'IndividualEmployer.UpdatedAt',
            ])
            ->first();
    }

    /**
     * Get the 2.0 MemberIdMapping ID and UpdatedAt values.
     */
    protected function getNewIndividualMemberIdsBasic($individualId, $affiliateId): ?\stdClass
    {
        return DB::connection('aftdb')->table('MemberIdMapping')
            ->where('AffiliateId', '=', $affiliateId)
            ->where('IndividualId', '=', $individualId)
            ->get(['MemberIdMappingId', 'UpdatedAt'])
            ->first();
    }

    protected function getNewIndividualMemberIds($memberIdMappingId)
    {
        return MemberIdMapping::find($memberIdMappingId);
    }

    protected function getLegacyIndividualMemberIds()
    {
        return DB::connection('legacy')->table('IndividualMemberIDs')
            ->where('LocalUnionNbr', '=', $this->affiliateNumber)
            ->where('IndividualId', '=', $this->memberInfo->IndividualId)
            ->whereNotNull('MemberID')
            ->first();
    }

    /**
     * @param  int  $legacyIndividualId
     * @param  int  $legacyAffiliateId
     */
    protected function getNewLeadershipPosition(int $newIndividualId, int $newAffiliateId, int $roleId): ?\stdClass
    {
        return DB::connection('aftdb')->table('AffiliateOfficer')
            ->where('AffiliateId', '=', $newAffiliateId)
            ->where('IndividualId', '=', $newIndividualId)
            ->where('AffiliateOfficerRoleId', '=', $roleId)
            ->get(['AffiliateOfficerId', 'UpdatedAt'])
            ->first();
    }

    protected function getNewAffiliateOfficer(int $affiliateOfficerId)
    {
        return AffiliateOfficer::find($affiliateOfficerId);
    }

    /**
     * Get the ID and UpdatedAt for a given individual address, if present.
     */
    protected function getNewIndividualAddressBasic($individualId, $addressTypeId): ?\stdClass
    {
        return DB::connection('aftdb')->table('IndividualAddress')
            ->where('IndividualId', '=', $individualId)
            ->where('IndividualAddressTypeId', '=', $addressTypeId)
            ->first(['IndividualAddressId', 'UpdatedAt']);
    }

    /**
     * Get the full legacy data for a given address.
     */
    protected function getLegacyIndividualAddress(string $addressId): ?\stdClass
    {
        return DB::connection('legacy')->table('Address')
            ->where('AddressId', '=', $addressId)
            ->first();
    }

    /**
     * Get the 2.0 data for a given address.
     *
     *
     * @return mixed
     */
    protected function getNewIndividualAddress($newIndividualAddressId)
    {
        return IndividualAddress::where('IndividualAddressId', '=', $newIndividualAddressId)
            ->get(['IndividualAddressId'])
            ->first();
    }

    /**
     * Get the 2.0 ID and UpdatedAt for an individual's email address.
     */
    protected function getNewIndividualEmailBasic(int $individualId, int $emailTypeId): ?\stdClass
    {
        return DB::connection('aftdb')->table('IndividualEmail')
            ->where('IndividualId', '=', $individualId)
            ->where('IndividualEmailTypeId', '=', $emailTypeId)
            ->get(['IndividualEmailId', 'UpdatedAt'])
            ->first();
    }

    protected function getNewIndividualEmail(int $newIndividualEmailId)
    {
        return IndividualEmail::find($newIndividualEmailId);
    }

    /**
     * Get the ID and UpdatedAt for a 2.0 individual phone record (if any).
     */
    protected function getNewIndividualPhoneBasic(int $individualId, int $phoneTypeId): ?\stdClass
    {
        return DB::connection('aftdb')->table('IndividualPhone')
            ->where('IndividualId', '=', $individualId)
            ->where('IndividualPhoneTypeId', '=', $phoneTypeId)
            ->get(['IndividualPhoneId', 'UpdatedAt'])
            ->first();
    }

    protected function getNewIndividualPhone(int $newIndividualPhoneId)
    {
        return IndividualPhone::find($newIndividualPhoneId);
    }

    /**
     * TRUE if the first date is later than the second date.
     */
    protected function moreRecent(string $date1, string $date2): bool
    {
        return strtotime($date1) > strtotime($date2);
    }

    /**
     * Set the CREATED status for the a new 2.0 member.
     */
    protected function setCreated()
    {
        $this->status = self::MEMBER_CREATED;
    }

    /**
     * Set the UPDATED status when updating an existing 2.0 member.
     */
    protected function setUpdated()
    {
        if ($this->status != self::MEMBER_CREATED) {
            $this->status = self::MEMBER_UPDATED;
        }
    }
}

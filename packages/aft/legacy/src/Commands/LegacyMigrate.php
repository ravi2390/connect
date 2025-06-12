<?php

namespace Aft\Legacy\Commands;

use Aft\Legacy\Member;
use Aft\Legacy\Models\Address as LegacyAddress;
use Aft\Legacy\Models\Affiliate as LegacyAffiliate;
use Aft\Legacy\Models\Chapter as LegacyChapter;
use Aft\Legacy\Models\Employer as LegacyEmployer;
use Aft\Legacy\Facades\AftArtisan;
use Aft\Legacy\Models\Leadership;
use Aft\Legacy\Models\LocalJobClass as LegacyLocalJobClass;
use Aft\Legacy\Models\Subject as LegacySubject;
use App\Models\Affiliate;
use App\Models\AffiliateAddress;
use App\Models\AffiliateDivision;
use App\Models\AffiliateEmail;
use App\Models\AffiliateNotes;
use App\Models\AffiliatePerCapita;
use App\Models\AffiliatePhone;
use App\Models\AffiliateStaff;
use App\Models\Chapter;
use App\Models\County;
use App\Models\Employer;
use App\Models\EmployerAddress;
use App\Models\EmployerEmail;
use App\Models\EmployerInstitutionType;
use App\Models\EmployerPhone;
use App\Models\EmployerType;
use App\Models\LocalAgreement;
use App\Models\LocalEducationLevel;
use App\Models\LocalJobClass;
use App\Models\Session;
use App\Models\Subject;
use App\Models\Unit;
use App\Models\WorkLocation;
use App\Models\WorkLocationAddress;
use App\Models\WorkLocationComment;
use App\Models\WorkLocationType;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Schema;

class LegacyMigrate extends LegacyMigrateBase
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'legacy:migrate {AffiliateNumber?} {--parent-id=} {--skip-members} {--only-scheduled-members} {--new-affiliates-only} {--officers-only} {--max-affiliates-checked=} {--max-affiliates-created=} {--max-members-checked=} {--max-members-created=} {--progress-bar} {--use-queue} {--clear-queue} {--refresh-cached-mappings} {--refresh-updated-dates} {--clear-highwater}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate affiliates and members from the legacy database';

    /**
     * Number of affiliates checked.
     */
    protected int $affiliateCheckedCount = 0;

    /**
     * Number of affiliates created.
     */
    protected int $affiliateCreatedCount = 0;

    /**
     * Number of affiliates modified.
     */
    protected int $affiliateModifiedCount = 0;

    /**
     * Total number of individuals checked in this migration.
     */
    protected int $individualCheckedCount = 0;

    /**
     * Total number of individuals created in this migration.
     */
    protected int $individualCreatedCount = 0;

    /**
     * Total number of individuals modified in this migration.
     */
    protected int $individualModifiedCount = 0;

    /**
     * Whether the affiliate being processed has just been created.
     */
    protected bool $affiliateIsNew = false;

    /**
     * Cache of WorkLocationType data, keyed by employer type and type name.
     */
    protected array $workLocationTypes = [];

    /**
     * Legacy local institution types for the current affiliate.
     */
    protected array $institutionTypesLocal = [];

    const LEGACY_MDATE_TABLE = '_legacy_mdates';

    /**
     * Find the relevant affiliate and migrate it and all its children.
     *
     *
     * @throws \Exception
     */
    protected function legacyAffiliateSearch(?string $affiliateNumber = null, ?int $parentId = null): void
    {
        $maxAffiliateChecked = $this->option('max-affiliates-checked');
        $maxAffiliateCreated = $this->option('max-affiliates-created');
        $useQueue = $this->option('use-queue');
        if ($maxAffiliateChecked && ($this->affiliateCheckedCount >= $maxAffiliateChecked) ||
            $maxAffiliateCreated && ($this->affiliateCreatedCount >= $maxAffiliateCreated)) {
            return;
        }

        // Load the relevant legacy affiliate.
        $legacyAffiliateQuery = DB::connection('legacy')->table('Affiliate');
        if ($affiliateNumber) {
            $legacyAffiliate = $legacyAffiliateQuery
                ->where('AffiliateNbr', '=', $affiliateNumber)
                ->selectRaw('case when exists(select * from vw_federated_local where affiliateid=affiliate.affiliateid) then 1 else 0 end as IsFederated, Affiliate.*')
                ->first();
        } else {
            // If a specific affiliate was not requested, get the national
            // parent (which we know is not a federated local).
            $legacyAffiliate = $legacyAffiliateQuery
                ->where('AffiliateType', '=', 'N')
                ->selectRaw('0 as IsFederated, Affiliate.*')
                ->first();
            $affiliateNumber = $legacyAffiliate->AffiliateNbr;
        }

        if (! $useQueue) {
            $this->info($this->runtime().' - #'.($this->affiliateCheckedCount + 1).' - '.$affiliateNumber.' - '.$legacyAffiliate->AffiliateName);
        }

        // Migrate the affiliate and its referenced relations.
        $newAffiliateId = $this->checkAffiliate($legacyAffiliate, $parentId);
        $this->checkAffiliateDivisions($legacyAffiliate, $newAffiliateId);
        $newChapters = $this->checkChapters($legacyAffiliate, $newAffiliateId);
        $newEmployers = $this->checkEmployers($newChapters, $legacyAffiliate, $newAffiliateId);
        $newAgreements = [];
        foreach ($newEmployers as $newEmployer) {
            $newAgreements += $this->checkLocalAgreements(
                $newEmployer,
                $legacyAffiliate->AffiliateName
            );
            $this->checkWorkLocations($newEmployer);
        }
        $newUnits = $this->checkUnits($newAgreements, $newEmployers, $legacyAffiliate);
        $this->checkJobClasses($newUnits, $legacyAffiliate);

        $this->checkAffiliateAddress($newAffiliateId, $legacyAffiliate->AddressId);
        $this->checkAffiliateEmail($newAffiliateId, $legacyAffiliate);
        $this->checkAffiliatePhone($newAffiliateId, $legacyAffiliate, 'PhoneNumber');
        $this->checkAffiliatePhone($newAffiliateId, $legacyAffiliate, 'FaxNumber');
        $this->checkLocalEducationLevels($newAffiliateId, $legacyAffiliate);
        $this->checkAffiliateNotes($newAffiliateId, $legacyAffiliate);
        $this->checkAffiliatePerCapita($legacyAffiliate, $newAffiliateId);
        $this->checkSessions($legacyAffiliate, $newAffiliateId);
        $newSubjects = $this->checkSubjects($legacyAffiliate, $newAffiliateId);

        if (! $this->option('skip-members')) {
            $this->checkMembers(
                $affiliateNumber,
                $newAffiliateId,
                $newSubjects
            );
            $this->checkAffiliateStaff($legacyAffiliate, $newAffiliateId);
        }

        $this->printAffiliateStatus($affiliateNumber);

        $this->affiliateCheckedCount++;
        // Recursively do the same for its children.
        $legacyChildren = DB::connection('legacy')->table('Affiliate')
            ->leftJoin('vw_affiliate_connect', 'Affiliate.AffiliateId', '=', 'vw_affiliate_connect.AffiliateId')
            ->whereNull('vw_affiliate_connect.AffiliateId')
            ->where('Affiliate.ParentId', '=', $legacyAffiliate->AffiliateId)
            ->whereIn('Affiliate.AffiliateType', ['L', 'M', 'S', 'G'])
            ->where('Affiliate.DeleteFlag', '!=', 1)
            ->whereIn('Affiliate.StatusFlag', ['A', 'R'])
            ->where('Affiliate.AffiliateId', '!=', $legacyAffiliate->AffiliateId)
            ->get(['Affiliate.AffiliateNbr']);
        foreach ($legacyChildren as $child) {
            // Skip queueing for 00002's ancestors.
            if (in_array($child->AffiliateNbr, ['08030', 'REGNE']) ||
                ! $this->option('use-queue')) {
                $this->legacyAffiliateSearch($child->AffiliateNbr, $newAffiliateId);
            } else {
                $this->queueAffiliate($child->AffiliateNbr, $newAffiliateId);
            }
        }
    }

    /**
     * Queue the affiliate with the given number, passing the 2.0 parent ID.
     */
    protected function queueAffiliate(string $affiliateNbr, int $parentId): void
    {
        $this->info("Queueing $affiliateNbr");
        $command = "legacy:migrate $affiliateNbr --use-queue --parent-id=$parentId";
        if ($this->option('progress-bar')) {
            $command .= ' --progress-bar';
        }
        if ($this->option('new-affiliates-only')) {
            $command .= ' --new-affiliates-only';
        }
        if ($this->option('officers-only')) {
            $command .= ' --officers-only';
        }
        // Give the big one its own queue so it doesn't have to wait for anyone.
        if ($affiliateNbr == '00002') {
            $queue = 'legacy-migration-high';
        } else {
            $queue = 'legacy-migration';
        }
        AftArtisan::queue($command)->onQueue($queue);
    }

    protected function getNewAffilate(string $affiliateNumber): ?\stdClass
    {
        return DB::connection('aftdb')->table('Affiliate')
            ->where('AffiliateNumber', '=', $affiliateNumber)
            ->get(['AffiliateId', 'UpdatedAt'])
            ->first();
    }

    /**
     * Migrate the data for an affiliate.
     */
    protected function checkAffiliate(\stdClass $legacyAffiliate, ?int $parentId = null): int
    {
        $this->affiliateIsNew = false;
        // Grab any local institution types.
        $this->institutionTypesLocal = DB::connection('legacy')->table('InstitutionTypeLocal')
            ->join(
                'InstitutionType',
                'InstitutionTypeLocal.InstitutionTypeId',
                '=',
                'InstitutionType.InstitutionTypeId'
            )
            ->where('LocalUnionNbr', '=', $legacyAffiliate->AffiliateNbr)
            ->get(['InstitutionTypeLocal.*', 'InstitutionType.InstitutionTypeName']);

        $newAffiliate = $this->getNewAffilate($legacyAffiliate->AffiliateNbr);
        if ($newAffiliate instanceof \stdClass && $this->option('new-affiliates-only')) {
            return $newAffiliate->AffiliateId;
        }
        // Migrate the affiliate if it's brand-new, or newer than the existing
        // 2.0 record.
        if (!$newAffiliate instanceof \stdClass || $this->moreRecent($legacyAffiliate->mdate, $newAffiliate->UpdatedAt)) {
            if (!$newAffiliate instanceof \stdClass) {
                $this->info('    Creating Affiliate '.$legacyAffiliate->AffiliateNbr);
                $newAffiliate = new Affiliate();
                $this->affiliateCreatedCount++;
                $this->affiliateIsNew = true;
            } else {
                $this->info('    Updating Affiliate '.$legacyAffiliate->AffiliateNbr);
                $newAffiliate = Affiliate::find($newAffiliate->AffiliateId);
                $this->affiliateModifiedCount++;
            }
            $legacyAffiliate = new LegacyAffiliate($legacyAffiliate);
            $newAffiliate->forceFill($legacyAffiliate->transform($this->flatData, $parentId));
            $newAffiliate->save();
        }

        return $newAffiliate->AffiliateId;
    }

    /**
     * Generate a unique chapter number from the affiliate number.
     */
    protected function chapterNumber(array &$chapterNumbers, string $affiliateNumber): string
    {
        $index = 0;
        do {
            $chapterNumber = $affiliateNumber.'-'.
                str_pad($index, 4, '0', STR_PAD_LEFT);
            $index++;
        } while (array_key_exists($chapterNumber, $chapterNumbers));
        $chapterNumbers[$chapterNumber] = $chapterNumber;

        return $chapterNumber;
    }

    /**
     * Migrate the chapters for an affiliate.
     *
     * @return array
     *               All 2.0 chapters for the affiliate.
     */
    protected function checkChapters($legacyAffiliate, $newAffiliateId): array
    {
        $newChaptersQueried = DB::connection('aftdb')->table('Chapter')
            ->where('AffiliateId', '=', $newAffiliateId)
            ->get();
        $structuralChapter = $unknownChapter = null;
        $newChapters = [];
        $chapterNumbers = [];
        foreach ($newChaptersQueried as $newChapter) {
            $chapterNumbers[$newChapter->ChapterNumber] = $newChapter->ChapterNumber;
            $newChapters[$newChapter->ChapterGuid] = $newChapter;
            if ($newChapter->IsStructural) {
                $structuralChapter = $newChapter;
            } elseif ($newChapter->IsUnknown) {
                $unknownChapter = $newChapter;
            }
        }
        if (empty($structuralChapter)) {
            // Create structural chapter.
            $structuralChapter = new Chapter([
                'ChapterNumber' => $this->chapterNumber($chapterNumbers, $legacyAffiliate->AffiliateNbr),
                'ChapterName' => $legacyAffiliate->AffiliateName.
                    ' - Structured Chapter',
                'AffiliateId' => $newAffiliateId,
                'IsStructural' => 1,
                'IsUnknown' => 0,
                'IsChapterActive' => 0,
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
            ]);
            $structuralChapter->save();
            $structuralChapter->refresh();
            $newChapters[$structuralChapter->ChapterGuid] = $structuralChapter;
        }
        if ($legacyAffiliate->IsFederated) {
            if (empty($unknownChapter)) {
                // create unknown chapter
                $unknownChapter = new Chapter([
                    'ChapterNumber' => $this->chapterNumber($chapterNumbers, $legacyAffiliate->AffiliateNbr),
                    'ChapterName' => $legacyAffiliate->AffiliateName.
                        ' - Unknown Chapter',
                    'AffiliateId' => $newAffiliateId,
                    'IsStructural' => 0,
                    'IsUnknown' => 1,
                    'IsChapterActive' => 0,
                    'CreatedBy' => 1,
                    'UpdatedBy' => 1,
                ]);
                $unknownChapter->save();
                $unknownChapter->refresh();
                $newChapters[$unknownChapter->ChapterGuid] = $unknownChapter;
            }
            // Compare legacy and new chapters and sync them up.
            $legacyChapters = DB::connection('legacy')->table('Chapter')
                ->where('LocalUnionId', '=', $legacyAffiliate->AffiliateId)
                // @todo Special cases, see C20-1263.
//                ->where('Chapter.LocalUnionNbr', '!=', '04660')
                ->where('Chapter.LocalUnionNbr', '!=', '06732')
                ->get([
                    'Chapter.ChapterId',
                    'Chapter.ChapterName',
                    'Chapter.ChapterNbr',
                    'Chapter.CharteredTF',
                    'Chapter.DateChartered',
                    'Chapter.cdate',
                    'Chapter.mdate',
                ]);
            foreach ($legacyChapters as $legacyChapter) {
                // If it's not a retiree "chapter", it's a 2.0 Chapter.
                if (! LegacyChapter::isRetireeChapter($legacyChapter->ChapterName)) {
                    if ($this->affiliateIsNew || empty($newChapters[$legacyChapter->ChapterId])) {
                        $newChapter = null;
                    } else {
                        $newChapter = $newChapters[$legacyChapter->ChapterId];
                    }
                    // Migrate the chapter if it's brand-new, or newer than the
                    // existing 2.0 record.
                    if (empty($newChapter) || $this->moreRecent(
                        $legacyChapter->mdate,
                        $newChapter->UpdatedAt
                    )) {
                        if (empty($newChapter)) {
                            $newChapter = new Chapter();
                            if (empty($legacyChapter->ChapterNbr) || array_key_exists($legacyChapter->ChapterNbr, $chapterNumbers)) {
                                $legacyChapter->ChapterNbr = $this->chapterNumber($chapterNumbers, $legacyAffiliate->AffiliateNbr);
                            } else {
                                $chapterNumbers[$legacyChapter->ChapterNbr] = $legacyChapter->ChapterNbr;
                            }
                        }
                        $ein = $legacyAffiliate->EIN;
                        $legacyChapter = new LegacyChapter($legacyChapter);
                        $newChapter->forceFill($legacyChapter->transformChapter($newAffiliateId, $ein));
                        $newChapter->save();
                        $newChapters[$newChapter->ChapterGuid] = $newChapter;
                    }
                }
            }
        }

        return $newChapters;
    }

    /**
     * Migrate the employers for a given chapter.
     *
     *
     * @return array
     *               All 2.0 employers for the chapter.
     */
    protected function checkEmployers(array $newChapters, $legacyAffiliate, int $newAffiliateId): array
    {
        $affiliateNumber = $legacyAffiliate->AffiliateNbr;
        foreach ($newChapters as $newChapter) {
            if ($newChapter->IsUnknown) {
                $unknownChapterId = $newChapter->ChapterId;
            } elseif ($newChapter->IsStructural) {
                $structuralChapterId = $newChapter->ChapterId;
            }
        }
        $newEmployersQueried = DB::connection('aftdb')->table('Employer')
            ->join('Chapter', 'Employer.ChapterId', '=', 'Chapter.ChapterId')
            ->where('Chapter.AffiliateId', '=', $newAffiliateId)
            ->get('Employer.*');
        $newEmployers = [];
        $newUnknownEmployers = [];
        foreach ($newEmployersQueried as $newEmployer) {
            $newEmployers[$newEmployer->EmployerGuid] = $newEmployer;
            if ($newEmployer->IsStructural) {
                $structuralEmployer = $newEmployer;
            }
            // The main unknown employer will be a child of the unknown
            // chapter for federated affiliates, and a child of the structural
            // chapter for non-federated affiliates.
            elseif ($newEmployer->IsUnknown) {
                if ($legacyAffiliate->IsFederated) {
                    if ($newEmployer->ChapterId == $unknownChapterId) {
                        $unknownEmployer = $newEmployer;
                    }
                } elseif ($newEmployer->ChapterId == $structuralChapterId) {
                    $unknownEmployer = $newEmployer;
                }
                $newUnknownEmployers[$newEmployer->ChapterId] = $newEmployer;
            }
        }
        if (empty($structuralEmployer)) {
            // Create structural employer.
            $structuralEmployer = new Employer([
                'EmployerName' => $newChapter->ChapterName.
                    ' - Structured Employer',
                'EmployerTypeId' => $this->flatData->getMapping('EmployerType', 'Unknown'),
                'ChapterId' => $structuralChapterId,
                'IsStructural' => 1,
                'IsUnknown' => 0,
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
            ]);
            $structuralEmployer->save();
            $structuralEmployer->refresh();
            $newEmployers[$structuralEmployer->EmployerGuid] = $structuralEmployer;
        }
        if (empty($unknownEmployer)) {
            // Create unknown employer.
            $unknownEmployer = new Employer([
                'EmployerName' => $newChapter->ChapterName.' - Unknown Employer',
                'EmployerTypeId' => $this->flatData->getMapping('EmployerType', 'Unknown'),
                'ChapterId' => $legacyAffiliate->IsFederated ? $unknownChapterId : $structuralChapterId,
                'IsStructural' => 0,
                'IsUnknown' => 1,
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
            ]);
            $unknownEmployer->save();
            $unknownEmployer->refresh();
            $newEmployers[$unknownEmployer->EmployerGuid] = $unknownEmployer;
        }

        // Also create unknown employers for each real chapter.
        foreach ($newChapters as $newChapter) {
            if (! $newChapter->IsStructural && ! $newChapter->IsUnknown &&
                empty($newUnknownEmployers[$newChapter->ChapterId])) {
                $newEmployer = new Employer([
                    'EmployerName' => $newChapter->ChapterName.' - Unknown Employer',
                    'EmployerTypeId' => $this->flatData->getMapping('EmployerType', 'Unknown'),
                    'ChapterId' => $newChapter->ChapterId,
                    'IsStructural' => 0,
                    'IsUnknown' => 1,
                    'CreatedBy' => 1,
                    'UpdatedBy' => 1,
                ]);
                $newEmployer->save();
                $newEmployer->refresh();
                $newEmployers[$newEmployer->EmployerGuid] = $newEmployer;
            }
        }

        // Compare legacy and new employers and sync them up.
        // To get to employers, looks for members in this chapter and get their
        // employers.
        $legacyEmployers = DB::connection('legacy')->table('Employer')
            ->where('Employer.LocalUnionNbr', '=', $affiliateNumber)
            ->leftJoin('IndividualAffiliate', function ($join): void {
                $join->on('Employer.EmployerId', '=', 'IndividualAffiliate.EmployerId')
                    ->on('IndividualAffiliate.LocalUnionNbr', '=', 'Employer.LocalUnionNbr');
            })
            ->distinct()
            ->get(['Employer.*', 'IndividualAffiliate.ChapterId']);
        foreach ($legacyEmployers as $legacyEmployer) {
            $newEmployer = $newEmployers[$legacyEmployer->EmployerId] ?? new Employer();

            // Migrate the employer if it's brand-new, or newer than the
            // existing 2.0 record.
            if (empty($newEmployer->UpdatedAt) ||
                $this->moreRecent($legacyEmployer->mdate, $newEmployer->UpdatedAt)) {
                // Find our parent - the actual chapter if we found one in legacy,
                // the Unknown chapter for federated locals, the Structural
                // chapter for non-federated locals.
                $parentChapterId = $newChapters[$legacyEmployer->ChapterId]->ChapterId ??
                    ($legacyAffiliate->IsFederated ? $unknownChapterId : $structuralChapterId);
                $legacyEmployer = new LegacyEmployer($legacyEmployer);
                if (! is_a($newEmployer, Employer::class)) {
                    $newEmployer = Employer::find($newEmployer->EmployerId);
                }
                $newEmployer->forceFill($legacyEmployer->transform(
                    $this->flatData,
                    $parentChapterId
                ));
                $newEmployer->save();
                $newEmployer->refresh();
                $newEmployers[$newEmployer->EmployerGuid] = $newEmployer;
            }
            // Migrate legacy employer contact info etc.
            $this->checkEmployerAddress($legacyEmployer, $newEmployer);
            $this->checkEmployerEmail($legacyEmployer, $newEmployer);
            $this->checkEmployerPhone($legacyEmployer, $newEmployer, 'PhoneNumber');
            $this->checkEmployerPhone($legacyEmployer, $newEmployer, 'FaxNumber');
            $this->checkEmployerInstitutionTypes($legacyEmployer, $newEmployer);
        }

        return $newEmployers;
    }

    /**
     * Migrate the address of an employer.
     */
    protected function checkEmployerAddress($legacyEmployer, $newEmployer): void
    {
        if (empty($legacyEmployer->AddressId)) {
            return;
        }
        $legacyAddress = DB::connection('legacy')->table('Address')
            ->leftJoin('AddressProperty', 'Address.AddressId', '=', 'AddressProperty.AddressId')
            ->where('Address.AddressId', '=', $legacyEmployer->AddressId)
            ->get(['Address.*', 'AddressProperty.Latitude', 'AddressProperty.Longitude'])
            ->first();
        if (empty($legacyAddress)) {
            return;
        }
        // No GUID, so we can't match the legacy address to a pre-existing
        // address. If any address at all exists, assume it's good.
        $newAddress = EmployerAddress::where('EmployerId', '=', $newEmployer->EmployerId)
            ->first();
        if (! empty($newAddress)) {
            return;
        }
        $newAddress = new EmployerAddress();
        $newAddress->EmployerId = $newEmployer->EmployerId;
        $newAddress->EmployerAddressTypeId = 1;
        $newAddress->IsPreferred = 1;
        $newAddress->CanVisitRestrictionId = 1;
        $newAddress->CanSendMailRestrictionId = 2;
        $newAddress->PreventNcoaUpdate = $legacyAddress->PreventNCOAUpdateTF ?? 0;
        $newAddress->AddressLine1 = $legacyAddress->Line1;
        $newAddress->AddressLine2 = $legacyAddress->Line2;
        $newAddress->City = $legacyAddress->City;
        $newAddress->StateTerritoryId = $this->flatData->getMapping('StateTerritory', $legacyAddress->StateCode);
        $newAddress->CountyId = County::where('StateTerritoryId', '=', $newAddress->StateTerritoryId)
            ->where('CountyName', '=', $legacyAddress->CountyName.' County')
            ->value('CountyId');
        $newAddress->CountryId = $this->flatData->getMapping('Country', $legacyAddress->CountryCode);
        $newAddress->PostalCode = $legacyAddress->PostalCode;
        $newAddress->CarrierRoute = $legacyAddress->PostalCarrierRte;
        $newAddress->Latitude = $legacyAddress->Latitude;
        $newAddress->Longitude = $legacyAddress->Longitude;
        $newAddress->CreatedBy = 1;
        $newAddress->UpdatedBy = 1;
        $newAddress->CreatedAt = $legacyAddress->cdate;
        $newAddress->UpdatedAt = $legacyAddress->mdate;
        $newAddress->save();
    }

    /**
     * Migrate the email address of an employer.
     */
    protected function checkEmployerEmail($legacyEmployer, $newEmployer): void
    {
        if (empty($legacyEmployer->Email)) {
            return;
        }
        // No GUID, so we can't match the legacy email to a pre-existing
        // email. If any email at all exists, assume it's good.
        $newEmail = EmployerEmail::where('EmployerId', '=', $newEmployer->EmployerId)
            ->first();
        if (! empty($newEmail)) {
            return;
        }
        $newEmail = new EmployerEmail();
        $newEmail->EmployerId = $newEmployer->EmployerId;
        $newEmail->Email = $legacyEmployer->Email;
        $newEmail->EmployerEmailTypeId = 1;
        $newEmail->IsPreferred = 1;
        $newEmail->CanContactRestrictionId = 1;
        $newEmail->ContactStatusId = 4;
        $newEmail->CreatedBy = 1;
        $newEmail->UpdatedBy = 1;
        $newEmail->CreatedAt = $legacyEmployer->cdate;
        $newEmail->UpdatedAt = $legacyEmployer->mdate;
        $newEmail->save();
    }

    /**
     * Migrate a phone number of an employer.
     */
    protected function checkEmployerPhone($legacyEmployer, $newEmployer, $phoneColumn): void
    {
        if (empty($legacyEmployer->$phoneColumn)) {
            return;
        }
        $employerPhoneTypeId = $phoneColumn == 'PhoneNumber' ? 1 : 3;
        // No GUID, so we can't match the legacy phone number to a pre-existing
        // number. If any record at all exists, assume it's good.
        $newPhone = EmployerPhone::where('EmployerId', '=', $newEmployer->EmployerId)
            ->where('EmployerPhoneTypeId', '=', $employerPhoneTypeId)
            ->first();
        if (! empty($newPhone)) {
            return;
        }
        $newPhone = new EmployerPhone();
        $newPhone->EmployerId = $newEmployer->EmployerId;
        $newPhone->PhoneNumber = $legacyEmployer->$phoneColumn;
        $newPhone->EmployerPhoneTypeId = $employerPhoneTypeId;
        if ($employerPhoneTypeId == 1) {
            $newPhone->Extension = $legacyEmployer->PhoneExt;
        }
        if (($employerPhoneTypeId == 1 && $legacyEmployer->InvalidPhoneTF == 1) ||
            ($employerPhoneTypeId == 3 && $legacyEmployer->InvalidFaxTF == 1)) {
            $newPhone->ContactStatusId = 1;
        }
        $newPhone->ContactSourceId = 18;
        $newPhone->IsPreferred = ($employerPhoneTypeId == 1);
        $newPhone->CanCallRestrictionId = 2;
        $newPhone->CanTextRestrictionId = 2;
        $newPhone->CreatedBy = 1;
        $newPhone->UpdatedBy = 1;
        $newPhone->CreatedAt = $legacyEmployer->cdate;
        $newPhone->UpdatedAt = $legacyEmployer->mdate;
        $newPhone->save();
    }

    /**
     * Migrate institution types for an employer.
     */
    protected function checkEmployerInstitutionTypes($legacyEmployer, $newEmployer): void
    {
        if (empty($this->institutionTypesLocal)) {
            return;
        }
        // No uuids, no way to map old to new on an individual basis, so assume
        // if any institution types exists we've already migrated them.
        $newEmployerInstitutionType = DB::connection('aftdb')->table('EmployerInstitutionType')
            ->where('EmployerId', '=', $newEmployer->EmployerId)
            ->exists();
        if ($newEmployerInstitutionType) {
            return;
        }
        foreach ($this->institutionTypesLocal as $institutionTypeLocal) {
            $newEmployerInstitutionType = new EmployerInstitutionType();
            $newEmployerInstitutionType->EmployerId = $newEmployer->EmployerId;
            $newEmployerInstitutionType->EmployerInstitutionTypeName =
                $institutionTypeLocal->InstitutionTypeLocalName;
            $newEmployerInstitutionType->HasPrivateSector =
                ($legacyEmployer->EmployerTypeId == 2);
            $newEmployerInstitutionType->EmployerTypeId = $newEmployer->EmployerTypeId;
            $newEmployerInstitutionType->NationalInstitutionTypeId =
                $this->flatData->getMapping(
                    'NationalInstitutionType',
                    $institutionTypeLocal->InstitutionTypeName
                );
            $newEmployerInstitutionType->CreatedBy = 1;
            $newEmployerInstitutionType->UpdatedBy = 1;
            $newEmployerInstitutionType->CreatedAt = $institutionTypeLocal->cdate;
            $newEmployerInstitutionType->UpdatedAt = $institutionTypeLocal->mdate;
            $newEmployerInstitutionType->save();
        }
    }

    /**
     * Migrate the local agreements for a given employer.
     *
     *
     * @return array
     *               All 2.0 local agreements for the chapter.
     */
    protected function checkLocalAgreements($newEmployer, string $affiliateName): array
    {
        $newAgreementsQueried = DB::connection('aftdb')->table('LocalAgreement')
            ->where('EmployerId', '=', $newEmployer->EmployerId)
            ->get();
        $newAgreements = [];
        foreach ($newAgreementsQueried as $newAgreement) {
            $newAgreements[$newAgreement->LocalAgreementId] = $newAgreement;
            if ($newAgreement->IsStructural) {
                $structuralAgreement = $newAgreement;
            } elseif ($newAgreement->IsUnknown) {
                $unknownAgreement = $newAgreement;
            }
        }
        if (empty($structuralAgreement) && $newEmployer->IsStructural) {
            // Create structural agreement.
            $structuralAgreement = new LocalAgreement([
                'LocalAgreementName' => $affiliateName.' - Structured LocalAgreement',
                'LocalAgreementTypeId' => $this->flatData->getMapping('LocalAgreementType', 'Unknown'),
                'EmployerId' => $newEmployer->EmployerId,
                'GradeStatus' => 0,
                'LocalAgreementRatificationDate' => '1900-01-01 00:00:00',
                'LocalAgreementEffectiveStartDate' => '1900-01-01 00:00:00',
                'LocalAgreementEffectiveEndDate' => '2099-12-31 00:00:00',
                'LocalAgreementExpirationDate' => '2099-12-31 00:00:00',
                'IsStructural' => 1,
                'IsUnknown' => 0,
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
            ]);
            $structuralAgreement->save();
            $structuralAgreement->refresh();
            $newAgreements[$structuralAgreement->LocalAgreementId] = $structuralAgreement;
        }
        if (empty($unknownAgreement)) {
            // Create unknown agreement.
            $unknownAgreement = new LocalAgreement([
                'LocalAgreementName' => $affiliateName.' - Unknown LocalAgreement',
                'LocalAgreementTypeId' => $this->flatData->getMapping('LocalAgreementType', 'Unknown'),
                'EmployerId' => $newEmployer->EmployerId,
                'GradeStatus' => 0,
                'LocalAgreementRatificationDate' => '1900-01-01 00:00:00',
                'LocalAgreementEffectiveStartDate' => '1900-01-01 00:00:00',
                'LocalAgreementEffectiveEndDate' => '2099-12-31 00:00:00',
                'LocalAgreementExpirationDate' => '2099-12-31 00:00:00',
                'IsStructural' => 0,
                'IsUnknown' => 1,
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
            ]);
            $unknownAgreement->save();
            $unknownAgreement->refresh();
            $newAgreements[$unknownAgreement->LocalAgreementId] = $unknownAgreement;
        }

        return $newAgreements;
    }

    /**
     * Migrate the units for the affiliate.
     *
     *
     * @return array
     *               All 2.0 units for the agreement.
     */
    protected function checkUnits(array $newAgreements, array $newEmployers, \stdClass $legacyAffiliate): array
    {
        $retireeTypeId = $this->flatData->getMapping('UnitType', 'Retiree');
        // Fetch legacy chapters which will become 2.0 units. Note that for
        // federated locals, we'll only use the retiree chapter.
        $legacyUnitsQueried = DB::connection('legacy')->table('Chapter')
            ->where('LocalUnionId', '=', $legacyAffiliate->AffiliateId)
            // @todo Special cases, see C20-1263.
//            ->where('LocalUnionNbr', '!=', '04660')
            ->where('LocalUnionNbr', '!=', '06732')
            ->get([
                'ChapterId',
                'ChapterName',
                'ChapterNbr',
                'CharteredTF',
                'DateChartered',
                'cdate',
                'mdate',
            ]);
        $legacyUnits = [];
        $legacyRetireeUnits = [];
        $newRetireeUnit = null;
        foreach ($legacyUnitsQueried as $legacyUnit) {
            if (LegacyChapter::isRetireeChapter($legacyUnit->ChapterName)) {
                $legacyRetireeUnits[] = $legacyUnit;
            } elseif (! $legacyAffiliate->IsFederated) {
                $legacyUnits[$legacyUnit->ChapterId] = $legacyUnit;
            }
        }

        $newUnits = [];
        $newRetireeUnits = [];
        foreach ($newAgreements as $newAgreement) {
            $structuralUnit = null;
            $unknownUnit = null;
            $newUnitsQueried = DB::connection('aftdb')->table('Unit')
                ->where(
                    'LocalAgreementId',
                    '=',
                    $newAgreement->LocalAgreementId
                )
                ->get();
            foreach ($newUnitsQueried as $newUnit) {
                $newUnits[$newUnit->UnitId] = $newUnit;
                if ($newUnit->IsStructural) {
                    $structuralUnit = $newUnit;
                } elseif ($newUnit->IsUnknown) {
                    $unknownUnit = $newUnit;
                } elseif ($newUnit->UnitTypeId == $retireeTypeId) {
                    $newRetireeUnits[] = $newUnit;
                }
            }
            // Every structural local agreement needs a structural unit.
            if (empty($structuralUnit) && $newAgreement->IsStructural) {
                $structuralUnit = new Unit([
                    'UnitName' => $newAgreement->LocalAgreementName.' - Structured Unit',
                    'UnitTypeId' => $this->flatData->getMapping(
                        'UnitType',
                        'Unknown'
                    ),
                    'LocalAgreementId' => $newAgreement->LocalAgreementId,
                    'IsStructural' => 1,
                    'IsUnknown' => 0,
                    'CreatedBy' => 1,
                    'UpdatedBy' => 1,
                ]);
                $structuralUnit->save();
                $structuralUnit->refresh();
                $newUnits[$structuralUnit->UnitId] = $structuralUnit;
            }
            // An unknown agreement will contain a retiree unit (if its
            // parent Employer is structural) or an unknown unit.
            elseif ($newAgreement->IsUnknown) {
                $employerIsStructural = false;
                foreach ($newEmployers as $newEmployer) {
                    if ($newEmployer->EmployerId == $newAgreement->EmployerId) {
                        $employerIsStructural = $newEmployer->IsStructural;
                        break;
                    }
                }
                // Make sure there's an unknown unit.
                if (empty($unknownUnit)) {
                    $unknownUnit = new Unit([
                        'UnitName' => $newAgreement->LocalAgreementName.' - Unknown Unit',
                        'UnitTypeId' => $this->flatData->getMapping(
                            'UnitType',
                            'Unknown'
                        ),
                        'LocalAgreementId' => $newAgreement->LocalAgreementId,
                        'IsStructural' => 0,
                        'IsUnknown' => 1,
                        'CreatedBy' => 1,
                        'UpdatedBy' => 1,
                    ]);
                    $unknownUnit->save();
                    $unknownUnit->refresh();
                    $newUnits[$unknownUnit->UnitId] = $unknownUnit;
                }
                if ($employerIsStructural) {
                    // Create a retiree unit if none exists anywhere.
                    if (empty($newRetireeUnits) && empty($legacyRetireeUnits)) {
                        $newRetireeUnit = new Unit([
                            'UnitName' => $legacyAffiliate->AffiliateName.' - Retirees',
                            'UnitTypeId' => $retireeTypeId,
                            'LocalAgreementId' => $newAgreement->LocalAgreementId,
                            'IsStructural' => 0,
                            'IsUnknown' => 0,
                            'CreatedBy' => 1,
                            'UpdatedBy' => 1,
                        ]);
                        $newRetireeUnit->save();
                        $newRetireeUnit->refresh();
                        $newUnits[$newRetireeUnit->UnitId] = $newRetireeUnit;
                    } else {
                        // Migrate any legacy retiree chapters to 2.0 units.
                        foreach ($legacyRetireeUnits as $legacyRetireeUnit) {
                            // See if we already have a unit for the legacy chapter
                            // under this agreement.
                            $newRetireeUnit = null;
                            foreach ($newUnits as $newUnit) {
                                if ($newUnit->UnitGuid == $legacyRetireeUnit->ChapterId &&
                                    $newUnit->LocalAgreementId == $newAgreement->LocalAgreementId) {
                                    $newRetireeUnit = $newUnit;
                                    break;
                                }
                            }
                            if (empty($newRetireeUnit) ||
                                $this->moreRecent($legacyRetireeUnit->mdate, $newRetireeUnit->UpdatedAt)) {
                                if (empty($newRetireeUnit)) {
                                    $newRetireeUnit = new Unit();
                                } elseif (! is_a($newRetireeUnit, Unit::class)) {
                                    $newRetireeUnit = Unit::find($newRetireeUnit->UnitId);
                                }
                                $legacyRetireeUnit = new LegacyChapter($legacyRetireeUnit);
                                $newRetireeUnit->forceFill($legacyRetireeUnit->transformUnit(
                                    $this->flatData,
                                    $newAgreement->LocalAgreementId
                                ));
                                $newRetireeUnit->save();
                                $newRetireeUnit->refresh();
                                $newUnits[$newRetireeUnit->UnitId] = $newRetireeUnit;
                            }
                        }
                    }
                } else {
                    // For non-federated locals, make sure all legacy Chapters
                    // (except retirees) become real 2.0 units under
                    // Non-structural employer->Unknown agreement.
                    if (! $legacyAffiliate->IsFederated) {
                        foreach ($legacyUnits as $legacyUnit) {
                            // See if we already have a unit for the legacy chapter
                            // under this agreement.
                            $newUnit = null;
                            foreach ($newUnits as $newTestUnit) {
                                if ($newTestUnit->UnitGuid == $legacyUnit->ChapterId &&
                                    $newTestUnit->LocalAgreementId == $newAgreement->LocalAgreementId) {
                                    $newUnit = $newTestUnit;
                                    break;
                                }
                            }

                            if (empty($newUnit) ||
                                $this->moreRecent($legacyUnit->mdate, $newUnit->UpdatedAt)) {
                                if (empty($newUnits[$legacyUnit->ChapterId])) {
                                    $newUnit = new Unit();
                                } else {
                                    $newUnit = $newUnits[$legacyUnit->ChapterId];
                                    if (! is_a($newUnit, Unit::class)) {
                                        $newUnit = Unit::find($newUnit->UnitId);
                                    }
                                }
                                $legacyUnit = new LegacyChapter($legacyUnit);
                                $newUnit->forceFill($legacyUnit->transformUnit(
                                    $this->flatData,
                                    $newAgreement->LocalAgreementId
                                ));
                                $newUnit->save();
                                $newUnit->refresh();
                                $newUnits[$newUnit->UnitId] = $newUnit;
                            }
                        }
                    }
                }
            }
        }

        return $newUnits;
    }

    /**
     * Migrate the local job classes for the affiliate.
     */
    protected function checkJobClasses(array $newUnits, \stdClass $legacyAffiliate): array
    {
        $retireeTypeId = $this->flatData->getMapping('UnitType', 'Retiree');
        // Fetch legacy job classes.
        $query = DB::connection('legacy')->table('LocalJobClass')
            ->where('LocalJobClass.LocalUnionId', '=', $legacyAffiliate->AffiliateId)
            ->orWhere('LocalJobClass.LocalUnionNbr', '=', $legacyAffiliate->AffiliateNbr)
            // @todo Special cases, see C20-1263.
//            ->where('LocalUnionNbr', '!=', '04660')
            ->where('LocalJobClass.LocalUnionNbr', '!=', '06732')
            ->where('LocalJobClass.DeleteFlag', '=', 0);
        if ($legacyAffiliate->AffiliateNbr == '04660') {
            $query->join('IndividualAffiliate', function ($join): void {
                $join->on('LocalJobClass.LocalJobClassId', '=', 'IndividualAffiliate.LocalJobClassId')
                    ->on('LocalJobClass.LocalUnionNbr', '=', 'IndividualAffiliate.LocalUnionNbr');
            });
            $query->distinct();
        }
        $legacyClassesQueried = $query->get(['LocalJobClass.*']);
        $count = $legacyClassesQueried->count();
        $legacyClasses = [];
        foreach ($legacyClassesQueried as $legacyClass) {
            $legacyClasses[$legacyClass->LocalJobClassId] = $legacyClass;
        }

        foreach ($newUnits as $newUnit) {
            $newClassesQueried = DB::connection('aftdb')->table('LocalJobClass')
                ->where('UnitId', '=', $newUnit->UnitId)
                ->get();
            $newClasses = [];
            $structuralClass = null;
            $unknownClass = null;
            foreach ($newClassesQueried as $newClass) {
                $newClasses[$newClass->LocalJobClassGuid] = $newClass;
                if ($newClass->IsStructural) {
                    $structuralClass = $newClass;
                } elseif ($newClass->IsUnknown) {
                    $unknownClass = $newClass;
                }
            }
            // Every structural unit and retiree unit needs a structural class.
            if (empty($structuralClass) &&
                ($newUnit->IsStructural || ($newUnit->UnitTypeId == $retireeTypeId))) {
                $structuralClass = new LocalJobClass([
                    'LocalJobClassName' => $newUnit->UnitName.' - Structured Job Class',
                    'UnitId' => $newUnit->UnitId,
                    'IsStructural' => 1,
                    'IsUnknown' => 0,
                    'CreatedBy' => 1,
                    'UpdatedBy' => 1,
                ]);
                $structuralClass->save();
                $structuralClass->refresh();
                $newClasses[$structuralClass->LocalJobClassGuid] = $structuralClass;
            }
            // Every unknown and real unit need an unknown class
            elseif (empty($unknownClass) && ! $newUnit->IsStructural) {
                $unknownClass = new LocalJobClass([
                    'LocalJobClassName' => $newUnit->UnitName.' - Unknown Job Class',
                    'UnitId' => $newUnit->UnitId,
                    'IsStructural' => 0,
                    'IsUnknown' => 1,
                    'CreatedBy' => 1,
                    'UpdatedBy' => 1,
                ]);
                $unknownClass->save();
                $unknownClass->refresh();
                $newClasses[$unknownClass->LocalJobClassGuid] = $unknownClass;
            }
            // Migrate all legacy job classes to every non-structural unit
            // except the retiree unit.
            if (! $newUnit->IsStructural && ($newUnit->UnitTypeId != $retireeTypeId)) {
                foreach ($legacyClasses as $legacyClass) {
                    if (empty($newClasses[$legacyClass->LocalJobClassId]) ||
                        $this->moreRecent($legacyClass->mdate, $newClasses[$legacyClass->LocalJobClassId]->UpdatedAt)) {
                        if (empty($newClasses[$legacyClass->LocalJobClassId])) {
                            $newClass = new LocalJobClass();
                        } else {
                            $newClass = $newClasses[$legacyClass->LocalJobClassId];
                            if (! is_a($newClass, LocalJobClass::class)) {
                                $newClass = LocalJobClass::find($newClass->LocalJobClassId);
                            }
                        }
                        $legacyClass = new LegacyLocalJobClass($legacyClass);
                        $newClass->forceFill($legacyClass->transform($newUnit->UnitId));
                        $newClass->save();
                        $newClass->refresh();
                        $newClasses[$newClass->LocalJobClassGuid] = $newClass;
                    }
                }
            }
        }

        return $newClasses;
    }

    /**
     * Migrate the work locations for a given employer.
     */
    protected function checkWorkLocations($newEmployer)
    {
        $newWorkLocationsQueried = DB::connection('aftdb')->table('WorkLocation')
            ->where('EmployerId', '=', $newEmployer->EmployerId)
            ->get();
        $newWorkLocations = [];
        foreach ($newWorkLocationsQueried as $newWorkLocation) {
            $newWorkLocations[$newWorkLocation->WorkLocationGuid] = $newWorkLocation;
        }

        $legacyWorkSites = DB::connection('legacy')->table('Worksite')
            ->leftJoin('InstitutionSubType', 'Worksite.InstitutionSubTypeId', 'InstitutionSubType.InstitutionSubTypeId')
            ->where('EmployerId', '=', $newEmployer->EmployerGuid)
            ->get([
                'WorksiteId',
                'WorksiteName',
                'WorksiteNumber',
                'WorksiteArea',
                'AddressId',
                'PublicTF',
                'Worksite.cdate',
                'Worksite.mdate',
                'InstitutionSubTypeName',
            ]);
        foreach ($legacyWorkSites as $legacyWorkSite) {
            $newWorkLocation = $newWorkLocations[$legacyWorkSite->WorksiteId] ?? null;
            if (empty($newWorkLocation) ||
                $this->moreRecent($legacyWorkSite->mdate, $newWorkLocation->UpdatedAt)) {
                if (empty($newWorkLocation)) {
                    if (empty($this->workLocationTypes)) {
                        $workLocationTypes = DB::connection('aftdb')->table('WorkLocationType')
                            ->get(['WorkLocationTypeId', 'WorkLocationTypeName', 'EmployerTypeId'])
                            ->toArray();
                        foreach ($workLocationTypes as $workLocationType) {
                            $this->workLocationTypes[$workLocationType->EmployerTypeId][$workLocationType->WorkLocationTypeName] =
                                $workLocationType->WorkLocationTypeId;
                        }
                        // We need to add one for the any employer type missing one.
                        $employerTypes = EmployerType::get();
                        foreach ($employerTypes as $employerType) {
                            if (empty($this->workLocationTypes[$employerType->EmployerTypeId])) {
                                $unknownWorkLocationType = new WorkLocationType();
                                $unknownWorkLocationType->WorkLocationTypeName = 'Unknown';
                                $unknownWorkLocationType->EmployerTypeId = $employerType->EmployerTypeId;
                                $unknownWorkLocationType->HierachicalOrder = 10;
                                $unknownWorkLocationType->CreatedBy = 1;
                                $unknownWorkLocationType->UpdatedBy = 1;
                                $unknownWorkLocationType->save();
                                $unknownWorkLocationType->refresh();
                                $this->workLocationTypes[$newEmployer->EmployerTypeId][$unknownWorkLocationType->WorkLocationTypeName] =
                                    $unknownWorkLocationType->WorkLocationTypeId;
                            }
                        }
                    }
                    $newWorkLocation = new WorkLocation();
                    $employerTypes = $this->workLocationTypes[$newEmployer->EmployerTypeId];
                    $newWorkLocation->WorkLocationTypeId =
                        $employerTypes['Campus'] ?? $employerTypes['Worksite'] ?? $employerTypes['Unknown'];
                    $newWorkLocation->WorkLocationGuid = $legacyWorkSite->WorksiteId;
                    $newWorkLocation->WorkLocationName = $legacyWorkSite->WorksiteName;
                    $newWorkLocation->WorkLocationCode = $legacyWorkSite->WorksiteNumber;
                    $newWorkLocation->WorkLocationArea = $legacyWorkSite->WorksiteArea;
                    $newWorkLocation->IsPubliclyAccessible = $legacyWorkSite->PublicTF ?? 0;
                    $newWorkLocation->NationalInstitutionTypeId =
                        $this->flatData->getMapping('NationalInstitutionType', $legacyWorkSite->InstitutionSubTypeName ?? 'Other');
                    $newWorkLocation->EmployerId = $newEmployer->EmployerId;
                    $newWorkLocation->CreatedBy = 1;
                    $newWorkLocation->UpdatedBy = 1;
                    $newWorkLocation->CreatedAt = $legacyWorkSite->cdate;
                    $newWorkLocation->UpdatedAt = $legacyWorkSite->mdate;
                    $newWorkLocation->save();
                    $newWorkLocation->refresh();
                }
            }
            // Get the address for this work location.
            $newAddress = DB::connection('aftdb')->table('WorkLocationAddress')
                ->where('WorkLocationId', '=', $newWorkLocation->WorkLocationId)
                ->first();
            $legacyAddress = DB::connection('legacy')->table('Address')
                ->leftJoin('AddressProperty', 'Address.AddressId', '=', 'AddressProperty.AddressId')
                ->where('Address.AddressId', '=', $legacyWorkSite->AddressId)
                ->first(['Address.*', 'AddressProperty.Latitude', 'AddressProperty.Longitude']);
            if ($legacyAddress) {
                if (empty($newAddress) ||
                    $this->moreRecent($legacyAddress->mdate, $newAddress->UpdatedAt)) {
                    if (empty($newAddress)) {
                        $newAddress = new WorkLocationAddress();
                    } elseif (! is_a($newAddress, WorkLocationAddress::class)) {
                        $newAddress = WorkLocationAddress::find($newAddress->WorkLocationAddressId);
                    }
                    $newAddress->WorkLocationId = $newWorkLocation->WorkLocationId;
                    $newAddress->AddressLine1 = $legacyAddress->Line1;
                    $newAddress->AddressLine2 = $legacyAddress->Line2;
                    $newAddress->City = $legacyAddress->City;
                    $newAddress->StateTerritoryId = $this->flatData->getMapping('StateTerritory', $legacyAddress->StateCode);
                    $newAddress->CountyId = County::where('StateTerritoryId', '=', $newAddress->StateTerritoryId)
                        ->where('CountyName', '=', $legacyAddress->CountyName.' County')
                        ->value('CountyId');
                    $newAddress->CountryId = $this->flatData->getMapping('Country', $legacyAddress->CountryCode);
                    $newAddress->PostalCode = $legacyAddress->PostalCode;
                    $newAddress->CarrierRoute = $legacyAddress->PostalCarrierRte;
                    $newAddress->Latitude = $legacyAddress->Latitude;
                    $newAddress->Longitude = $legacyAddress->Longitude;
                    $newAddress->WorkLocationAddressTypeId = 1; // Main
                    $newAddress->PreventNcoaUpdate = $legacyAddress->PreventNCOAUpdateTF ?? 0;
                    $newAddress->IsPreferred = 1;
                    $newAddress->CreatedBy = 1;
                    $newAddress->UpdatedBy = 1;
                    $newAddress->CreatedAt = $legacyAddress->cdate;
                    $newAddress->UpdatedAt = $legacyAddress->mdate;
                    $newAddress->save();
                }
                // Get comments for this work location.
                $legacyComments = DB::connection('legacy')->table('WorksiteComments')
                    ->where('WorksiteID', '=', $legacyWorkSite->WorksiteId)
                    ->get();
                $newComments = DB::connection('aftdb')->table('WorkLocationComment')
                    ->where('WorkLocationId', '=', $newWorkLocation->WorkLocationId)
                    ->exists();
                // No uuid in 2.0, no way to match previously migrated, so we
                // only migrate once.
                if (count($legacyComments) > 0 && ! $newComments) {
                    foreach ($legacyComments as $legacyComment) {
                        $workLocationComment = new WorkLocationComment();
                        $workLocationComment->WorkLocationId = $newWorkLocation->WorkLocationId;
                        $workLocationComment->WorkLocationComment =
                            $legacyComment->WorksiteComments;
                        $workLocationComment->CreatedBy = 1;
                        $workLocationComment->UpdatedBy = 1;
                        $workLocationComment->CreatedAt = $legacyComment->cdate;
                        $workLocationComment->UpdatedAt = $legacyComment->mdate;
                        $workLocationComment->save();
                    }
                }
            }
        }
    }

    /**
     * Fetch the ID and UpdatedAt time for the 2.0 affiliate address.
     */
    protected function getNewAffiliateAddress(int $affiliateId): ?\stdClass
    {
        return DB::connection('aftdb')->table('AffiliateAddress')
            ->where('AffiliateId', '=', $affiliateId)
            ->get(['AffiliateAddressId', 'UpdatedAt'])
            ->first();
    }

    /**
     * Migrate the address for an affiliate.
     */
    protected function checkAffiliateAddress(int $newAffiliateId, string $legacyAddressId): void
    {
        // @todo Just get mdate here, and fill in if we have to migrate?
        $oldAddress = DB::connection('legacy')->table('Address')
            ->where('AddressId', '=', $legacyAddressId)
            ->first();
        if (empty($oldAddress)) {
            return;
        }
        $oldAddressProperty = DB::connection('legacy')->table('AddressProperty')
            ->where('AddressId', '=', $legacyAddressId)
            ->first();
        if ($this->affiliateIsNew) {
            $newAffiliateAddress = null;
        } else {
            $newAffiliateAddress = $this->getNewAffiliateAddress($newAffiliateId);
        }
        // Migrate the address if it's brand-new, or newer than the existing 2.0
        // record.
        if (!$newAffiliateAddress instanceof \stdClass || $this->moreRecent($oldAddress->mdate, $newAffiliateAddress->UpdatedAt)) {
            if (!$newAffiliateAddress instanceof \stdClass) {
                $newAffiliateAddress = new AffiliateAddress();
                $newAffiliateAddress->IsPreferred = false;
            } else {
                $newAffiliateAddress = AffiliateAddress::find($newAffiliateAddress->AffiliateAddressId);
            }
            $oldAddress = new LegacyAddress($oldAddress);
            $newAffiliateAddress->forceFill($oldAddress->transform(
                $this->flatData,
                $oldAddressProperty->Latitude ?? null,
                $oldAddressProperty->Longitude ?? null
            ));
            $newAffiliateAddress->AffiliateId = $newAffiliateId;
            $newAffiliateAddress->save();
        }
    }

    /**
     * Fetch the 2.0 affiliate email record.
     */
    protected function getNewAffiliateEmail(int $affiliateId): ?AffiliateEmail
    {
        return AffiliateEmail::where('AffiliateId', '=', $affiliateId)
            ->first();
    }

    /**
     * Migrate the email address for an affiliate.
     */
    protected function checkAffiliateEmail(int $newAffiliateId, \stdClass $legacyAffiliate): void
    {
        if (empty($legacyAffiliate->Email)) {
            return;
        }
        if ($this->affiliateIsNew) {
            $newAffiliateEmail = null;
        } else {
            $newAffiliateEmail = $this->getNewAffiliateEmail($newAffiliateId);
        }
        // Migrate the email if it's brand-new, or newer than the existing 2.0
        // record.
        if (!$newAffiliateEmail instanceof \App\Models\AffiliateEmail || $this->moreRecent($legacyAffiliate->mdate, $newAffiliateEmail->UpdatedAt)) {
            if (!$newAffiliateEmail instanceof \App\Models\AffiliateEmail) {
                $newAffiliateEmail = new AffiliateEmail();
            }
            $newAffiliateEmail->AffiliateId = $newAffiliateId;
            $newAffiliateEmail->Email = $legacyAffiliate->Email;
            $newAffiliateEmail->AffiliateEmailTypeId = 1;
            $newAffiliateEmail->ContactSourceId = 3;
            $newAffiliateEmail->IsPreferred = 1;
            $newAffiliateEmail->CanContactRestrictionId = 1;
            $newAffiliateEmail->CreatedBy = 1;
            $newAffiliateEmail->UpdatedBy = 1;
            $newAffiliateEmail->CreatedAt = $legacyAffiliate->cdate;
            $newAffiliateEmail->UpdatedAt = $legacyAffiliate->mdate;
            $newAffiliateEmail->save();
        }
    }

    /**
     * Fetch the 2.0 affiliate phone record.
     */
    protected function getNewAffiliatePhone(int $affiliateId, int $type): ?AffiliatePhone
    {
        return AffiliatePhone::where('AffiliateId', '=', $affiliateId)
            ->where('AffiliatePhoneTypeId', '=', $type)
            ->first();
    }

    /**
     * Migrate a phone number for an affiliate.
     */
    protected function checkAffiliatePhone(int $newAffiliateId, \stdClass $legacyAffiliate, string $phoneColumn): void
    {
        if (empty($legacyAffiliate->$phoneColumn)) {
            return;
        }
        // 1 for phone, 3 for fax.
        $affiliatePhoneTypeId = $phoneColumn == 'PhoneNumber' ? 1 : 3;
        if ($this->affiliateIsNew) {
            $newAffiliatePhone = null;
        } else {
            $newAffiliatePhone = $this->getNewAffiliatePhone($newAffiliateId, $affiliatePhoneTypeId);
        }
        // Migrate the email if it's brand-new, or newer than the existing 2.0
        // record.
        if (!$newAffiliatePhone instanceof \App\Models\AffiliatePhone || $this->moreRecent($legacyAffiliate->mdate, $newAffiliatePhone->UpdatedAt)) {
            if (!$newAffiliatePhone instanceof \App\Models\AffiliatePhone) {
                $newAffiliatePhone = new AffiliatePhone();
            }
            $newAffiliatePhone->AffiliateId = $newAffiliateId;
            $newAffiliatePhone->PhoneNumber = $legacyAffiliate->$phoneColumn;
            if ($phoneColumn == 'PhoneNumber') {
                $newAffiliatePhone->Extension = $legacyAffiliate->PhoneExt;
                $newAffiliatePhone->IsPreferred = 1;
            } else {
                $newAffiliatePhone->IsPreferred = 0;
            }
            $newAffiliatePhone->AffiliatePhoneTypeId = $affiliatePhoneTypeId;
            $newAffiliatePhone->ContactSourceId = 3;
            $newAffiliatePhone->CanTextRestrictionId = 2;
            $newAffiliatePhone->CanCallRestrictionId = 2;
            $newAffiliatePhone->CreatedBy = 1;
            $newAffiliatePhone->UpdatedBy = 1;
            $newAffiliatePhone->CreatedAt = $legacyAffiliate->cdate;
            $newAffiliatePhone->UpdatedAt = $legacyAffiliate->mdate;
            $newAffiliatePhone->save();
        }
    }

    /**
     * Fetch the legacy local education types.
     *
     *
     * @return \stdClass[]|null
     */
    protected function getLegacyLocalEducationLevels(string $affiliateNumber): Collection
    {
        return DB::connection('legacy')->table('EducationLevelLocal')
            ->join(
                'EducationLevel',
                'EducationLevelLocal.EducationLevelId',
                '=',
                'EducationLevel.EducationLevelId'
            )
            ->where('LocalUnionNbr', '=', $affiliateNumber)
            ->get(['EducationLevelLocal.*', 'EducationLevel.EducationLevelName']);
    }

    /**
     * Fetch the 2.0 local education types.
     *
     *
     * @return LocalEducationLevel[]|null
     */
    protected function getNewLocalEducationLevels(int $affiliateId): Collection
    {
        return LocalEducationLevel::where('AffiliateId', '=', $affiliateId)
            ->get();
    }

    /**
     * Migrate local education levels for an affiliate.
     */
    protected function checkLocalEducationLevels(int $newAffiliateId, \stdClass $legacyAffiliate): void
    {
        $legacyLocalEducationLevels = $this->getLegacyLocalEducationLevels($legacyAffiliate->AffiliateNbr);
        if (! empty($legacyLocalEducationLevels)) {
            $newLocalEducationLevels = [];
            if (! $this->affiliateIsNew) {
                $newLocalEducationLevelsQueried = $this->getNewLocalEducationLevels($newAffiliateId);
                foreach ($newLocalEducationLevelsQueried as $newLocalEducationLevel) {
                    $newLocalEducationLevels[$newLocalEducationLevel->LocalEducationLevelName]
                        = $newLocalEducationLevel;
                }
            }
            foreach ($legacyLocalEducationLevels as $legacyLocalEducationLevel) {
                $newLocalEducationLevel =
                    $newLocalEducationLevels[$legacyLocalEducationLevel->EducationLevelLocalName]
                    ?? null;
                // Migrate the level if it's brand-new, or newer than the existing 2.0
                // record.
                if (empty($newLocalEducationLevel) || $this->moreRecent($legacyLocalEducationLevel->mdate, $newLocalEducationLevel->UpdatedAt)) {
                    if (empty($newLocalEducationLevel)) {
                        $newLocalEducationLevel = new LocalEducationLevel();
                    }
                    $newLocalEducationLevel->AffiliateId = $newAffiliateId;
                    $newLocalEducationLevel->LocalEducationLevelName =
                        $legacyLocalEducationLevel->EducationLevelLocalName;
                    $newLocalEducationLevel->NationalEducationLevelId = $this->flatData
                        ->getMapping('NationalEducationLevel', $legacyLocalEducationLevel->EducationLevelName);
                    $newLocalEducationLevel->CreatedBy = 1;
                    $newLocalEducationLevel->UpdatedBy = 1;
                    $newLocalEducationLevel->CreatedAt = $legacyLocalEducationLevel->cdate;
                    $newLocalEducationLevel->UpdatedAt = $legacyLocalEducationLevel->mdate;
                    $newLocalEducationLevel->save();
                }
            }
        }
    }

    /**
     * Fetch the 2.0 affiliate notes record.
     */
    protected function getNewAffiliateNotes(int $affiliateId): ?AffiliateNotes
    {
        return AffiliateNotes::where('AffiliateId', '=', $affiliateId)
            ->first();
    }

    /**
     * Migrate the notes for an affiliate.
     */
    protected function checkAffiliateNotes(int $newAffiliateId, \stdClass $legacyAffiliate): void
    {
        if (empty($legacyAffiliate->Comments)) {
            return;
        }
        if ($this->affiliateIsNew) {
            $newAffiliateNotes = null;
        } else {
            $newAffiliateNotes = $this->getNewAffiliateNotes($newAffiliateId);
        }
        // We don't have an effective way to identify updates, so only migrate
        // the notes if they don't exist in 2.0.
        if (!$newAffiliateNotes instanceof \App\Models\AffiliateNotes) {
            $newAffiliateNotes = new AffiliateNotes();
            $newAffiliateNotes->AffiliateId = $newAffiliateId;
            $newAffiliateNotes->AffiliateNotes = $legacyAffiliate->Comments;
            $newAffiliateNotes->CreatedBy = 1;
            $newAffiliateNotes->UpdatedBy = 1;
            $newAffiliateNotes->CreatedAt = $legacyAffiliate->cdate;
            $newAffiliateNotes->UpdatedAt = $legacyAffiliate->mdate;
            $newAffiliateNotes->save();
        }
    }

    /**
     * Retrieve the ID of the 2.0 per-capita record if it exists.
     */
    protected function getNewAffiliatePerCapita($affiliateId): ?AffiliatePerCapita
    {
        return AffiliatePerCapita::where('AffiliateId', '=', $affiliateId)
            ->get(['AffiliatePerCapitaId', 'UpdatedAt'])
            ->first();
    }

    /**
     * Migrate the per-capita data for an affiliate.
     */
    protected function checkAffiliatePerCapita(\stdClass $legacyAffiliate, int $newAffiliateId)
    {
        if ($this->affiliateIsNew) {
            $newAffiliatePerCapita = null;
        } else {
            $newAffiliatePerCapita = $this->getNewAffiliatePerCapita($newAffiliateId);
        }
        // Migrate the address if it's brand-new, or newer than the existing 2.0
        // record.
        if (!$newAffiliatePerCapita instanceof \App\Models\AffiliatePerCapita || $this->moreRecent($legacyAffiliate->mdate, $newAffiliatePerCapita->UpdatedAt)) {
            if (!$newAffiliatePerCapita instanceof \App\Models\AffiliatePerCapita) {
                $newAffiliatePerCapita = new AffiliatePerCapita();
            } else {
                $newAffiliatePerCapita = AffiliatePerCapita::find($newAffiliatePerCapita->AffiliatePerCapitaId);
            }
            $legacyAffiliate = new LegacyAffiliate($legacyAffiliate);
            $newAffiliatePerCapita->forceFill($legacyAffiliate->transformPerCapita($this->flatData, $newAffiliateId));
            $newAffiliatePerCapita->save();
        }
    }

    /**
     * Retrieve the 2.0 subject records for an affiliate.
     */
    protected function getNewSubjects(int $affiliateId): Collection
    {
        return Subject::where('AffiliateId', '=', $affiliateId)->get();
    }

    /**
     * Retrieve the legacy subject records for an affiliate.
     */
    protected function getLegacySubjects(string $affiliateNbr): Collection
    {
        return DB::connection('legacy')->table('Subject')
            ->where('LocalUnionNbr', '=', $affiliateNbr)
            ->where('DeleteFlag', '=', 0)
            ->get();
    }

    /**
     * Migrate the subject data for an affiliate.
     */
    protected function checkSubjects(\stdClass $legacyAffiliate, int $newAffiliateId): array
    {
        if ($this->affiliateIsNew) {
            $newSubjects = [];
        } else {
            $newSubjectsQueried = $this->getNewSubjects($newAffiliateId);
            $newSubjects = [];
            foreach ($newSubjectsQueried as $newSubject) {
                $newSubjects[$newSubject->SubjectGuid] = $newSubject;
            }
        }
        $legacySubjects = $this->getLegacySubjects($legacyAffiliate->AffiliateNbr);
        foreach ($legacySubjects as $legacySubject) {
            if (empty($newSubjects[$legacySubject->SubjectId]) ||
                $this->moreRecent($legacySubject->mdate, $newSubjects[$legacySubject->SubjectId]->UpdatedAt)) {
                if (empty($newSubjects[$legacySubject->SubjectId])) {
                    $newSubject = new Subject();
                } else {
                    $newSubject = $newSubjects[$legacySubject->SubjectId];
                }
                $legacySubject = new LegacySubject($legacySubject);
                $newSubject->forceFill($legacySubject->transform($newAffiliateId));
                $newSubject->save();
                $newSubject->refresh();
                $newSubjects[$newSubject->SubjectGuid] = $newSubject;
            }
        }

        return $newSubjects;
    }

    /**
     * Migrate the session data for an affiliate.
     */
    protected function checkSessions(\stdClass $legacyAffiliate, int $newAffiliateId)
    {
        $legacySessions = DB::connection('legacy')->table('SessionLocal')
            ->where('LocalUnionNbr', '=', $legacyAffiliate->AffiliateNbr)
            ->where('DeleteFlag', '=', 0)
            ->get();
        if ($legacySessions->count() == 0) {
            return [];
        }
        $newSessions = Session::where('AffiliateId', '=', $newAffiliateId)->exists();
        if ($newSessions) {
            return [];
        }
        foreach ($legacySessions as $legacySession) {
            $newSession = new Session();
            $newSession->AffiliateId = $newAffiliateId;
            $newSession->SessionName = $legacySession->SessionName;
            $newSession->SessionStartDate = $legacySession->SessionStartDate;
            $newSession->SessionEndDate = $legacySession->SessionEndDate;
            $newSession->CreatedBy = 1;
            $newSession->UpdatedBy = 1;
            $newSession->CreatedAt = $legacySession->cdate;
            $newSession->UpdatedAt = $legacySession->mdate;
            $newSession->save();
        }
    }

    /**
     * Retrieve the 2.0 division relationships for an affiliate.
     */
    protected function getNewAffiliateDivisions(int $affiliateId): Collection
    {
        return DB::connection('aftdb')->table('AffiliateDivision')
            ->join('Division', 'AffiliateDivision.DivisionId', '=', 'Division.DivisionId')
            ->where('AffiliateId', '=', $affiliateId)
            ->get(['AffiliateDivision.*', 'Division.DivisionName']);
    }

    /**
     * Retrieve the legacy division relationships for an affiliate.
     */
    protected function getLegacyAffiliateDivisions(string $affiliateNbr): Collection
    {
        return DB::connection('legacy')->table('AffiliateDivision')
            ->join('Division', 'AffiliateDivision.DivisionId', '=', 'Division.DivisionId')
            ->where('AffiliateNbr', '=', $affiliateNbr)
            ->where('AffiliateDivision.DeleteFlag', '=', 0)
            ->get(['AffiliateDivision.*', 'Division.DivisionName']);
    }

    /**
     * Migrate the division relationships for an affiliate.
     */
    protected function checkAffiliateDivisions(\stdClass $legacyAffiliate, int $newAffiliateId)
    {
        if ($this->affiliateIsNew) {
            $newAffiliateDivisions = [];
        } else {
            $newAffiliateDivisionsQueried = $this->getNewAffiliateDivisions($newAffiliateId);
            $newAffiliateDivisions = [];
            foreach ($newAffiliateDivisionsQueried as $newAffiliateDivision) {
                $newAffiliateDivisions[$newAffiliateDivision->DivisionName] = $newAffiliateDivision;
            }
        }
        $legacyAffiliateDivisions = $this->getLegacyAffiliateDivisions($legacyAffiliate->AffiliateNbr);
        foreach ($legacyAffiliateDivisions as $legacyAffiliateDivision) {
            if (empty($newAffiliateDivisions[$legacyAffiliateDivision->DivisionName]) ||
                $this->moreRecent($legacyAffiliateDivision->MDate, $newAffiliateDivisions[$legacyAffiliateDivision->DivisionName]->UpdatedAt)) {
                if (empty($newAffiliateDivisions[$legacyAffiliateDivision->DivisionName])) {
                    $newAffiliateDivision = new AffiliateDivision();
                } else {
                    $newAffiliateDivision = $newAffiliateDivisions[$legacyAffiliateDivision->DivisionName];
                    if (! is_a($newAffiliateDivision, AffiliateDivision::class)) {
                        $newAffiliateDivision = AffiliateDivision::find($newAffiliateDivision->AffiliateDivisionId);
                    }
                }
                $newAffiliateDivision->AffiliateId = $newAffiliateId;
                $newAffiliateDivision->DivisionId = $this->flatData->getMapping('Division', $legacyAffiliateDivision->DivisionName);
                $newAffiliateDivision->CreatedBy = 1;
                $newAffiliateDivision->UpdatedBy = 1;
                $newAffiliateDivision->CreatedAt = $legacyAffiliateDivision->Cdate;
                $newAffiliateDivision->UpdatedAt = $legacyAffiliateDivision->MDate;
                $newAffiliateDivision->save();
            }
        }
    }

    /**
     * List the IndividualAffiliateIds for active members of a given affiliate.
     *
     * @param  string  $affilateNbr
     *                               Number of the desired affiliate.
     * @param  string  $highwater
     *                             Timestamp (YYYY-MM-DD hh:mm:ss) of the last processed member.
     * @return \stdClass[]|null
     */
    protected function getLegacyMembers(string $affiliateNbr, ?string $highwater = null): ?iterable
    {
        $table = self::LEGACY_MDATE_TABLE;
        // Note that the view populating LEGACY_MDATE_TABLE includes the
        // criteria for determining active members (e.g., MemberTF=1).
        $query = DB::connection('legacy')->table($table)
            ->where("$table.LocalUnionNbr", '=', $affiliateNbr);
        if ($this->option('officers-only')) {
            $query->join('Leadership', function ($join) use ($table): void {
                $join->on("$table.IndividualId", '=', 'Leadership.IndividualId')
                    ->on("$table.LocalUnionNbr", '=', 'Leadership.LocalUnionNbr');
            });
        }
        // Special one-time deal - to initially populate IndividualEmployerSchedule
        // without having to check all data for all legacy individuals, this
        // option tells us to ignore the highwater and to filter in only those
        // individuals with schedule data.
        if ($this->option('only-scheduled-members')) {
            $query->join(
                'IndividualSchedule',
                'IndividualSchedule.IndividualId',
                '=',
                "$table.IndividualId"
            );
            $query->distinct();
        }
        // If we've migrated this affiliate previously, only get those members
        // updated since the last member. We use >= because multiple members
        // may have the same LastUpdateDate - we risk unnecessary checks in
        // favor of making sure we don't miss any.
        elseif (! empty($highwater)) {
            $query = $query->where("$table.LastUpdateDate", '>=', $highwater);
        }
        $query->orderBy("$table.LastUpdateDate");

        return $query->get("$table.*");
    }

    /**
     * Fetch all individual's BillHighway IDs upfront for a given affiliate.
     *
     * @param  string  $highwater
     *                             Timestamp (YYYY-MM-DD hh:mm:ss) of the last processed member.
     */
    protected function prefetchBillHighwayIds(string $affiliateNumber, ?string $highwater = null): array
    {
        $BHIds = [];
        $bhQuery = DB::connection('stage')
            ->table('Individual_BHForm')
            ->where('LOCALUNIONNBR', '=', $affiliateNumber)
            ->whereNotNull('BillHighwayID')
            ->where('BillHighwayID', '!=', 0)
            ->select('INDIVIDUALID', 'BillHighwayID');
        if (! empty($highwater)) {
            $bhQuery = $bhQuery->where('UPDATED_AT', '>=', $highwater);
        }
        foreach ($bhQuery->distinct()->get() as $bhData) {
            $BHIds[$bhData->INDIVIDUALID] = $bhData->BillHighwayID;
        }

        return $BHIds;
    }

    /**
     * Fetch all individual's leadership data upfront for a given affiliate.
     *
     * @param  string  $highwater
     *                             Timestamp (YYYY-MM-DD hh:mm:ss) of the last processed member.
     */
    protected function prefetchLeadership(string $affiliateNumber, ?string $highwater = null): array
    {
        $leadership = [];
        $leadershipQuery = DB::connection('legacy')->table('Leadership')
            ->where('LocalUnionNbr', '=', $affiliateNumber)
            ->join(
                'LeadershipPosition',
                'Leadership.LeadershipPositionId',
                '=',
                'LeadershipPosition.LeadershipPositionId'
            );
        if (! empty($highwater)) {
            $leadershipQuery = $leadershipQuery->where('Leadership.mdate', '>=', $highwater);
        }
        foreach ($leadershipQuery->get('Leadership.*') as $leadershipData) {
            $leadership[$leadershipData->IndividualId][] = new Leadership($leadershipData);
        }

        return $leadership;
    }

    /**
     * Migrate the members of a given affiliate.
     *
     * @param  string  $legacyAffiliateId
     *
     * @throws \Exception
     */
    protected function checkMembers(string $affiliateNumber, int $newAffiliateId, array $newSubjects)
    {
        if (! $this->affiliateIsNew && $this->option('new-affiliates-only')) {
            return;
        }

        $maxMemberChecked = $this->option('max-members-checked');
        $maxMemberCreated = $this->option('max-members-created');

        $highwater = Redis::get("legacy:migrate:$affiliateNumber:highwater");

        $members = $this->getLegacyMembers($affiliateNumber, $highwater);
        $memberCount = count($members);
        if ($memberCount <= 0) {
            return;
        }

        $progressBar = $this->option('progress-bar');
        if ($progressBar) {
            $bar = $this->output->createProgressBar($memberCount);
            $bar->setFormat('    %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%/%estimated:-6s% ('
                .$affiliateNumber.')');
        }

        $BHIds = $this->prefetchBillHighwayIds($affiliateNumber, $highwater);
        $leadership = $this->prefetchLeadership($affiliateNumber, $highwater);

        foreach ($members as $memberInfo) {
            if ($maxMemberChecked && ($this->individualCheckedCount >= $maxMemberChecked) ||
                $maxMemberCreated && ($this->individualCreatedCount >= $maxMemberCreated)) {
                if ($progressBar) {
                    $bar->finish();
                }
                $this->printStatus();
                exit(0);
            }
            $this->individualCheckedCount++;

            // Migrate the member and all related data.
            $member = new Member($affiliateNumber, $newAffiliateId, $this->affiliateIsNew, $memberInfo, $this->flatData, $newSubjects);
            $status = $member->checkIndividualData($BHIds[$memberInfo->IndividualId] ?? null, $leadership[$memberInfo->IndividualId] ?? [], $this->option('only-scheduled-members'));
            switch ($status) {
                case Member::MEMBER_CREATED:
                    $this->individualCreatedCount++;
                    break;
                case Member::MEMBER_UPDATED:
                    $this->individualModifiedCount++;
                    break;
                default:
                    break;
            }

            if ($progressBar) {
                $bar->advance();
            }
        }

        if ($progressBar) {
            $bar->finish();
        }
        $this->info('');
    }

    /**
     * Retrieve the 2.0 staff records for an affiliate.
     */
    protected function getNewStaff(int $affiliateId): Collection
    {
        return AffiliateStaff::where('AffiliateId', '=', $affiliateId)->get();
    }

    /**
     * Retrieve the legacy staff records for an affiliate.
     */
    protected function getLegacyStaff(string $affiliateNbr): Collection
    {
        return DB::connection('legacy')->table('IndividualAffiliate')
            ->where('LocalUnionNbr', '=', $affiliateNbr)
            ->where('MemberStatusname', '=', 'Active')
            ->where('NonMemberTypeName', 'like', '%staff%')
            ->get();
    }

    /**
     * Migrate the staff for an affiliate.
     */
    protected function checkAffiliateStaff(\stdClass $legacyAffiliate, int $newAffiliateId)
    {
        if ($this->affiliateIsNew) {
            $newStaffMembers = [];
        } else {
            $newStaffMembersQueried = $this->getNewStaff($newAffiliateId);
            $newStaffMembers = [];
            foreach ($newStaffMembersQueried as $newStaffMember) {
                $newStaffMembers[$newStaffMember->IndividualId] = $newStaffMember;
            }
        }
        $legacyStaffMembers = $this->getLegacyStaff($legacyAffiliate->AffiliateNbr);
        foreach ($legacyStaffMembers as $legacyStaffMember) {
            $newIndividualId = DB::connection('aftdb')
                ->table('Individual')
                ->where('IndividualGuid', '=', $legacyStaffMember->IndividualId)
                ->value('IndividualId');
            if (empty($newIndividualId)) {
                continue;
            }
            if (empty($newStaffMembers[$newIndividualId]) ||
                $this->moreRecent($legacyStaffMember->mdate, $newStaffMembers[$newIndividualId]->UpdatedAt)) {
                if (empty($newStaffMembers[$newIndividualId])) {
                    $newStaffMember = new AffiliateStaff();
                } else {
                    $newStaffMember = $newStaffMembers[$newIndividualId];
                }
                $newStaffMember->AffiliateId = $newAffiliateId;
                $newStaffMember->IndividualId = $newIndividualId;
                $newStaffMember->StaffDepartmentId =
                    $this->flatData->getMapping('StaffDepartment', 'Other');
                $newStaffMember->StaffTitle = $legacyStaffMember->JobTitle ?? '';
                $newStaffMember->IsCurrent = 1;
                $newStaffMember->CreatedBy = 1;
                $newStaffMember->UpdatedBy = 1;
                $newStaffMember->CreatedAt = $legacyStaffMember->cdate;
                $newStaffMember->UpdatedAt = $legacyStaffMember->mdate;
                $newStaffMember->save();
            }
        }
    }

    /**
     * Migrate all National children, or a specific affiliate, from legacy to
     * 2.0.
     *
     * @return mixed
     *
     * @throws \Exception
     */
    #[\Override]
    public function handle(): int
    {
        parent::handle();

        // Clear highwater marks to check all members from the beginning.
        if ($this->option('clear-highwater')) {
            // keys() returns the keys with 'connect_database_' prepended, and
            // if we pass them as-is to del() it will prepend it again then not
            // recognize the keys. So, we must remove that prepended string
            // before passing the keys to del().
            $keys = array_map(fn($value) => str_replace('connect_database_legacy:', 'legacy:', $value), Redis::keys('legacy:migrate:*:highwater'));
            if ($keys) {
                Redis::connection()->del($keys);
            }
        }

        // Affiliate 00002 needs lots of memory.
        $affiliateNumber = $this->argument('AffiliateNumber');
        if ($affiliateNumber == '00002') {
            ini_set('memory_limit', '512M');
        }

        $this->ensureUpdatedDates();

        // Migrate the affiliate(s) and all their relations.
        $this->legacyAffiliateSearch($affiliateNumber, $this->option('parent-id'));
        $this->printStatus();

        return 0;
    }

    /**
     * Make sure we're working off the latest updated dates.
     */
    protected function ensureUpdatedDates(): void
    {
        $table = self::LEGACY_MDATE_TABLE;
        $legacySchema = Schema::connection('legacy');
        if ($this->option('refresh-updated-dates') || ! $legacySchema->hasTable($table)) {
            $legacySchema->dropIfExists($table);
            DB::connection('legacy')->unprepared(
                file_get_contents(base_path().'/packages/aft/legacy/database/refresh-updated-dates.sql')
            );
        }
    }

    /**
     * Print the aggregate results of a non-queued migration.
     *
     * @throws \Exception
     */
    protected function printStatus()
    {
        if (! $this->option('use-queue')) {
            $this->info("\n\nMigration took ".$this->runtime().' to process');
            $this->info('    Affiliates checked: '.$this->affiliateCheckedCount);
            $this->info('    Affiliates created: '.$this->affiliateCreatedCount);
            $this->info('    Affiliates modified: '.$this->affiliateModifiedCount);
            $this->info('    Individuals checked: '.$this->individualCheckedCount);
            $this->info('    Individuals created: '.$this->individualCreatedCount);
            $this->info('    Individuals modified: '.$this->individualModifiedCount);
            $this->info('Memory peak: '.memory_get_peak_usage());
        }
    }

    /**
     * Print the results of one affiliate's migration.
     *
     *
     * @throws \Exception
     */
    protected function printAffiliateStatus(string $affiliateNumber)
    {
        $this->info("    Done with $affiliateNumber, members created/modified/checked: {$this->individualCreatedCount}/{$this->individualModifiedCount}/{$this->individualCheckedCount}");
    }
}

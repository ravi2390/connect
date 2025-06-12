<?php

namespace App\Http\Controllers\Custom;

use Aft\Permissions\Scopes\AuthorizationScope;
use App\Actions\Individual\EndAffiliations;
use App\Actions\Individual\SyncIndividualCope;
use App\Filters\Individual\CommitteeFilter;
use App\Filters\Individual\CopeFilter;
use App\Filters\Individual\EndDateFilter;
use App\Filters\Individual\MemberFilter;
use App\Filters\Individual\OnlyOfficers;
use App\Filters\Individual\PhoneNumber;
use App\Filters\Individual\UnionRolesFilter;
use App\Filters\Individual\WorkFilter;
use App\Filters\Individual\WorkLocationFilter;
use App\Filters\Individual\WorkStructureFilter;
use App\Helpers\FetchesAffiliate;
use App\Http\Controllers\IndividualController as BaseController;
use App\Models\Individual;
use App\Models\IndividualAddress;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use App\Models\IndividualEducationLevel;
use App\Models\IndividualEmail;
use App\Models\IndividualEmployer;
use App\Models\IndividualPhone;
use App\Sorts\Individual\AffiliatesSort;
use App\Sorts\Individual\AssessmentDateSort;
use App\Sorts\Individual\AssessmentRatingSort;
use App\Sorts\Individual\ChapterSort;
use App\Sorts\Individual\CommitteeNameSort;
use App\Sorts\Individual\CommitteeRoleSort;
use App\Sorts\Individual\GroupRoleSort;
use App\Sorts\Individual\HomeEmailSort;
use App\Sorts\Individual\HomePhoneSort;
use App\Sorts\Individual\IndividualEmployerEndDateSort;
use App\Sorts\Individual\IndividualEmployerNameSort;
use App\Sorts\Individual\IndividualEmployerSort;
use App\Sorts\Individual\IndividualEmployerStartDateSort;
use App\Sorts\Individual\IndividualMemberSort;
use App\Sorts\Individual\JobDescriptionSort;
use App\Sorts\Individual\JobTitleSort;
use App\Sorts\Individual\LocalDuesCategorySort;
use App\Sorts\Individual\LocalJobClassSort;
use App\Sorts\Individual\MobilePhoneSort;
use App\Sorts\Individual\NationalJobClassSort;
use App\Sorts\Individual\OfficerRoleSort;
use App\Sorts\Individual\PaymentMethodSort;
use App\Sorts\Individual\PoliticalPartySort;
use App\Sorts\Individual\PreferredAddressSort;
use App\Sorts\Individual\StaffRoleSort;
use App\Sorts\Individual\UnionRelationshipSort;
use App\Sorts\Individual\UnitSort;
use App\Sorts\Individual\WorkEmailSort;
use App\Sorts\Individual\WorkLocationSort;
use App\Sorts\Individual\WorkStructureSort;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;

class IndividualController extends BaseController
{
    use FetchesAffiliate;

    #[\Override]
    public function create(): JsonResource
    {
        /** @var Individual $model */
        $model = $this->createNewModel();

        Individual::withoutEvents(function () use ($model): void {

            $defaultData['CreatedBy'] = Auth::user()->getKey();
            $defaultData['UpdatedBy'] = Auth::user()->getKey();
            $defaultData['CreatedAt'] = Carbon::now();
            $defaultData['UpdatedAt'] = Carbon::now();

            $model->fill(
                array_merge($this->request->validate($model::rules()), $defaultData)
            )->save();

            /**@TODO: after we made sure that the user always has a chosen affiliate, we can ditch the sending from the frontend!!!*/
            $affiliateId = $this->fetchAffiliateId() ?? $this->request->input('AffiliateId');
            $data = $this->request->all();
            $data['IndividualId'] = $model->getKey();
            $data['AffiliateId'] = $affiliateId;
            $startDate = $data['StartDate'];
            $startDate = explode('T', $startDate);
            $data['StartDate'] = $startDate[0].'T00:00:00.0000';
            if ($affiliateId && isset($data['UnionRelationshipTypeId'])) {
                $validator = Validator::make($data, IndividualAffiliate::rules());

                tap((new IndividualAffiliate())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualAffiliate $individualAffiliate): void {
                    $individualAffiliate->save();
                    $individualAffiliate->auditCreated('created');
                });
            }

            if ($affiliateId && isset($data['IndividualEmployer']['EmployerId'])) {
                $data['IndividualEmployer']['IndividualId'] = $model->getKey();
                $data['IndividualEmployer']['AffiliateId'] = $affiliateId;
                $validator = Validator::make($data['IndividualEmployer'], IndividualEmployer::rules());

                tap((new IndividualEmployer())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualEmployer $employer): void {
                    $employer->save();
                    $employer->auditCreated('created');
                });
            }

            if (isset($data['IndividualAddress']['IndividualAddressTypeId'])) {
                $data['IndividualAddress']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualAddress'], IndividualAddress::rules());

                tap((new IndividualAddress())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualAddress $address): void {
                    $address->save();
                    $address->auditCreated('created');
                });
            }

            if (isset($data['IndividualBillingAddress']['IndividualAddressTypeId'])) {
                $data['IndividualBillingAddress']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualBillingAddress'], IndividualAddress::rules());

                tap((new IndividualAddress())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualAddress $address): void {
                    $address->save();
                    $address->auditCreated('created');
                });
            }

            if (isset($data['IndividualEmail']['IndividualEmailTypeId'])) {
                $data['IndividualEmail']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualEmail'], IndividualEmail::rules());

                tap((new IndividualEmail())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualEmail $email): void {
                    $email->save();
                    $email->auditCreated('created');
                });
            }

            if (isset($data['IndividualWorkEmail']['IndividualEmailTypeId'])) {
                $data['IndividualWorkEmail']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualWorkEmail'], IndividualEmail::rules());

                tap((new IndividualEmail())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualEmail $email): void {
                    $email->save();
                    $email->auditCreated('created');
                });
            }

            if (isset($data['IndividualPhone']['IndividualPhoneTypeId'])) {
                $data['IndividualPhone']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualPhone'], IndividualPhone::rules());

                tap((new IndividualPhone())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualPhone $phone): void {
                    $phone->save();
                    $phone->auditCreated('created');
                });
            }

            if (isset($data['IndividualMobilePhone']['IndividualPhoneTypeId'])) {
                $data['IndividualMobilePhone']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualMobilePhone'], IndividualPhone::rules());

                tap((new IndividualPhone())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualPhone $phone): void {
                    $phone->save();
                    $phone->auditCreated('created');
                });
            }
            if (isset($data['IndividualWorkPhone']['IndividualPhoneTypeId'])) {
                $data['IndividualWorkPhone']['IndividualId'] = $model->getKey();
                $validator = Validator::make($data['IndividualWorkPhone'], IndividualPhone::rules());

                tap((new IndividualPhone())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualPhone $phone): void {
                    $phone->save();
                    $phone->auditCreated('created');
                });
            }

            if ($affiliateId && isset($data['LocalEducationLevelId'])) {
                $validator = Validator::make($data, IndividualEducationLevel::rules());
                $defaultData['AffiliateId'] = $affiliateId;

                tap((new IndividualEducationLevel())->fill(
                    array_merge($validator->validate(), $defaultData)
                ), static function (IndividualEducationLevel $individualEducationLevel): void {
                    $individualEducationLevel->save();
                    $individualEducationLevel->auditCreated('created');
                });
            }

            if ($affiliateId && isset($data['IndividualCope']['CopeAmount'])) {
                $data['IndividualCope']['CopeAmount'] = (string) $data['IndividualCope']['CopeAmount'];

                tap((new SyncIndividualCope())->run([
                    'individualId' => $model->getKey(),
                    'affiliateId' => $affiliateId,
                    'data' => array_merge(Validator::make($data['IndividualCope'], IndividualCope::rules())->validate(), $defaultData),
                ]), static function (IndividualCope $individualCope): void {
                    $individualCope->auditCreated('created');
                });
            }
        });

        return $this->createResource($model);
    }

    #[\Override]
    public function update($id): JsonResource
    {
        /**
         * @var Individual $model
         */
        $model = $this->createNewModel()->find($id);
        $model->fill($this->request->validate($model::rules()))->save();

        /**@TODO: after we made sure that the user always has a chosen affiliate, we can ditch the sending from the frontend!!!*/
        $affiliateId = $this->fetchAffiliateId() ?? $this->request->input('AffiliateId');
        $data = $this->request->all();
        $data['IndividualId'] = $model->getKey();
        $data['AffiliateId'] = $affiliateId;

        if ($affiliateId && isset($data['UnionRelationshipTypeId'])) {
            $validator = Validator::make($data, IndividualAffiliate::rules());

            (new EndAffiliations())->run(['individual' => $model, 'endDate' => Carbon::now()]);

            (new IndividualAffiliate())->fill($validator->validate())->save();
        }

        if ($affiliateId && isset($data['EmployerId'])) {
            $validator = Validator::make($data, IndividualEmployer::rules());

            (new IndividualEmployer())->fill($validator->validate())->save();
        }

        $this->saveIndividualEducationalLevel();

        return $this->createResource($model);
    }

    #[\Override]
    protected function getFilterMapping(string $filter): ?AllowedFilter
    {
        if ($filter === 'unionRoles') {
            return AllowedFilter::custom($filter, new UnionRolesFilter(), 'unionRoles');
        }
        if ($filter === 'CustomEndDate') {
            return AllowedFilter::custom($filter, new EndDateFilter(), 'CustomEndDate');
        }
        if ($filter === 'activeIndividualEmployers.WorkLocation') {
            return AllowedFilter::custom($filter, new WorkLocationFilter(), 'WorkLocation');
        }
        if ($filter === 'activeIndividualEmployers.WorkStructure') {
            return AllowedFilter::custom($filter, new WorkStructureFilter(), 'WorkStructure');
        }
        if ($filter === 'individualAffiliates.individualCommitteeMember') {
            return AllowedFilter::custom($filter, new CommitteeFilter(), 'Committee');
        }
        if ($filter === 'activeIndividualAffiliates.individualCommitteeMember') {
            return AllowedFilter::custom($filter, new CommitteeFilter(), 'Committee');
        }
        if ($filter === 'individualMembers.MemberId') {
            return AllowedFilter::custom($filter, new MemberFilter(), 'Member');
        }
        if ($filter === 'CopeFilter') {
            return AllowedFilter::custom($filter, new CopeFilter(), 'CopeFilter');
        }
        if ($filter === 'WorkFilter') {
            return AllowedFilter::custom($filter, new WorkFilter(), 'WorkFilter');
        }
        if ($filter === 'onlyOfficers') {
            return AllowedFilter::custom($filter, new OnlyOfficers(), 'onlyOfficers');
        }
        if ($filter === 'individualPhones.PhoneNumber') {
            return AllowedFilter::custom($filter, new PhoneNumber(), 'PhoneNumber');
        }

        return parent::getFilterMapping($filter);
    }

    #[\Override]
    protected function getSortMapping(string $sort): AllowedSort|string
    {
        if (ltrim($sort, '-') === 'PoliticalParty.PoliticalPartyName') {
            return AllowedSort::custom('PoliticalParty.PoliticalPartyName', new PoliticalPartySort());
        }

        if (ltrim($sort, '-') === 'HomeEmail.Email') {
            return AllowedSort::custom('HomeEmail.Email', new HomeEmailSort());
        }

        if (ltrim($sort, '-') === 'WorkEmail.Email') {
            return AllowedSort::custom('WorkEmail.Email', new WorkEmailSort());
        }

        if (ltrim($sort, '-') === 'HomePhone.PhoneNumber') {
            return AllowedSort::custom('HomePhone.PhoneNumber', new HomePhoneSort());
        }

        if (ltrim($sort, '-') === 'MobilePhone.PhoneNumber') {
            return AllowedSort::custom('MobilePhone.PhoneNumber', new MobilePhoneSort());
        }

        if (ltrim($sort, '-') === 'PreferredAddress.AddressLine') {
            return AllowedSort::custom('PreferredAddress.AddressLine', new PreferredAddressSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.EmployeeId') {
            return AllowedSort::custom('activeIndividualEmployers.EmployeeId', new IndividualEmployerSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.WorkLocation') {
            return AllowedSort::custom('activeIndividualEmployers.WorkLocation', new WorkLocationSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.WorkStructure') {
            return AllowedSort::custom('activeIndividualEmployers.WorkStructure', new WorkStructureSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.JobTitle') {
            return AllowedSort::custom('activeIndividualEmployers.JobTitle', new JobTitleSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.JobDescription') {
            return AllowedSort::custom('activeIndividualEmployers.JobDescription', new JobDescriptionSort());
        }

        if (ltrim($sort, '-') === 'individualMembers') {
            return AllowedSort::custom('individualMembers', new IndividualMemberSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.LocalDuesCategory') {
            return AllowedSort::custom('activeIndividualAffiliates.LocalDuesCategory', new LocalDuesCategorySort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.PaymentMethod') {
            return AllowedSort::custom('activeIndividualAffiliates.PaymentMethod', new PaymentMethodSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.AffiliateOfficerRoleName') {
            return AllowedSort::custom('activeIndividualAffiliates.AffiliateOfficerRoleName', new OfficerRoleSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.individualCommitteeMember') {
            return AllowedSort::custom('activeIndividualAffiliates.individualCommitteeMember', new CommitteeNameSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.CommitteeMemberTypeName') {
            return AllowedSort::custom('activeIndividualAffiliates.CommitteeMemberTypeName', new CommitteeRoleSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.StaffTitle') {
            return AllowedSort::custom('activeIndividualAffiliates.StaffTitle', new StaffRoleSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.individualGroupMember') {
            return AllowedSort::custom('activeIndividualAffiliates.individualGroupMember', new GroupRoleSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates.UnionRelationshipType') {
            return AllowedSort::custom('activeIndividualAffiliates.UnionRelationshipType', new UnionRelationshipSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.EmployerName') {
            return AllowedSort::custom('activeIndividualEmployers.EmployerName', new IndividualEmployerNameSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.ChapterName') {
            return AllowedSort::custom('activeIndividualEmployers.ChapterName', new ChapterSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.StartDate') {
            return AllowedSort::custom('activeIndividualEmployers.StartDate', new IndividualEmployerStartDateSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.EndDate') {
            return AllowedSort::custom('activeIndividualEmployers.EndDate', new IndividualEmployerEndDateSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.LocalJobClassName') {
            return AllowedSort::custom('activeIndividualEmployers.LocalJobClassName', new LocalJobClassSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.Unit') {
            return AllowedSort::custom('activeIndividualEmployers.Unit', new UnitSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualEmployers.NationalJobClass') {
            return AllowedSort::custom('activeIndividualEmployers.NationalJobClass', new NationalJobClassSort());
        }

        if (ltrim($sort, '-') === 'activeIndividualAffiliates') {
            return AllowedSort::custom('activeIndividualAffiliates', new AffiliatesSort());
        }

        if (ltrim($sort, '-') === 'individualAssessments.Rating') {
            return AllowedSort::custom('individualAssessments.Rating', new AssessmentRatingSort());
        }

        if (ltrim($sort, '-') === 'individualQuickComments.CommentDate') {
            return AllowedSort::custom('individualQuickComments.CommentDate', new AssessmentDateSort());
        }

        return parent::getSortMapping($sort);
    }

    private function saveIndividualEducationalLevel(): void
    {
        if ($this->request->get('IndividualEducationalLevel')) {
            $data = $this->request->get('IndividualEducationalLevel');

            // Need to check for one of the local or national educations, as otherwise the entry will just have the individual and affiliate.
            //@TODO: once we have error handling on frontend, we can remove these checks.
            if (empty($data['LocalEducationLevelId']) && empty($data['NationalEducationLevelId'])) {
                return;
            }

            $validator = Validator::make($data, IndividualEducationLevel::rules());
            $affiliateId = $this->fetchAffiliateId() ?? $this->request->input('AffiliateId');

            if (isset($data['IndividualEducationalLevelId'])) {
                $model = IndividualEducationLevel::query()->find($data['IndividualEducationalLevelId']);
                $model->fill(
                    array_merge($validator->validate(), ['AffiliateId' => $affiliateId])
                )->save();
            } else {
                (new IndividualEducationLevel())->fill(
                    array_merge($validator->validate(), ['AffiliateId' => $affiliateId])
                )->save();
            }
        }
    }

    private function streamDownloadChunk($context): void
    {
        $useHomeAddress = filter_var($context->useHomeAddress, FILTER_VALIDATE_BOOLEAN);
        $collection = $this->createResourceCollection($context->records);
        foreach ($collection as $item) {
            $row = $context->export->map($item);
            if (! $context->hasChapters && $context->chapterKey !== false) {
                unset($row[$context->chapterKey]);
            }

            // Check for 'Home' address type
            if ($useHomeAddress) {
                //  \Log::debug('super test');
                $homeAddress = '';
                foreach ($item->individualAddressesOrdered as $address) {
                    if ($address->IndividualAddressTypeId == 1) {
                        $homeAddress = $address->AddressLine1; // Assuming AddressLine1 contains the full address
                        break; // Stop once home address is found
                    }
                }
                // List home address
                $address = $row[$context->addressKey];
                $commaPos = strpos((string) $address, ',');
                if ($commaPos !== false) {
                    $row[$context->addressKey] = $homeAddress ? $homeAddress.substr((string) $address, $commaPos) : '';
                }
            }

            fputcsv($context->output, $row);
        }
        fflush($context->output);
        ob_flush();
        flush();
    }

    private function streamDownloadAll($context): void
    {
        ini_set('output_buffering', 'off');
        $context->output = fopen('php://output', 'wb');
        $headers = $context->export->headings();
        if (! $context->hasChapters) {
            $context->chapterKey = array_search('Chapter', $headers);
            if ($context->chapterKey !== false) {
                unset($headers[$context->chapterKey]);
            }
        }
        $context->addressKey = array_search('Address', $headers);

        // Modify the 'Address' header to 'Home Address' if useHomeAddress is true
        if ($context->useHomeAddress && $context->addressKey !== false) {
            $headers[$context->addressKey] = 'Home Address';
            // Change the header to 'Home Address'
        }

        fputcsv($context->output, $headers);
        $context->query->chunk($context->chunk, function ($records) use ($context): void {
            $context->records = $records;
            $this->streamDownloadChunk($context);
        });
        fflush($context->output);
        fclose($context->output);
    }

    protected function streamDownload($export): StreamedResponse
    {
        $selectedAffiliate = Auth::user()->selectedAffiliate;
        $query = $this->prepareExportData(true);
        $this->request->merge(['sort' => 'LastName,FirstName']);
        $this->request->all();
        $count = $query->count();
        $useHomeAddress = $this->request->input('useHomeAddress', false);
        $chunk = 15;
        $context = (object) [
            'affiliate' => $selectedAffiliate,
            'chapterKey' => 0,
            'addressKey' => 0,
            'useHomeAddress' => $useHomeAddress,
            'hasChapters' => $selectedAffiliate->hasChapters,
            'query' => $query,
            'count' => $count,
            'chunk' => $chunk,
            'export' => $export,
            'output' => false,
            'records' => [],
        ];
        $response = new StreamedResponse();
        $disposition = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, 'download.csv');
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', $disposition);
        $response->headers->set('Content-Record-Count', $count);
        $response->headers->set('Content-Record-Chunk', $context->chunk);
        $response->setCallback(fn() => $this->streamDownloadAll($context));

        return $response;
    }

    /**
     *
     */
    #[\Override]
    public function one($id): JsonResource
    {
        $includes = explode(',', (string) $this->request->input('include', ''));
        $removeAuthorizationScope = ['individualAffiliates.Affiliate' => function ($query): void {
            $query->withoutGlobalScopes([AuthorizationScope::class]);
        }];

        if (in_array('individualAffiliates.Affiliate', $includes) && $key = in_array('individualAffiliates.Affiliate', $includes)) {
            $newArray = [];
            foreach ($includes as $row) {
                $newArray[$row] = function ($query): void {
                };
            }
            $newArray['individualAffiliates.Affiliate'] = $removeAuthorizationScope['individualAffiliates.Affiliate'];
            $includes = $newArray;
        }

        return $this->createResource(Individual::with($includes)->find($id));
    }
}

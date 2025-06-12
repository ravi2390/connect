<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\BillHighway\BillingTypes;
use Aft\MemberForms\Models\DuesMapping;
use Aft\MemberForms\Models\Form;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Chapter;
use App\Models\Employer;
use App\Models\JobTitle;
use App\Models\LocalDuesCategory;
use App\Models\LocalJobClass;
use App\Models\NationalPerCapita;
use App\Models\Unit;
use App\Models\WorkLocation;
use App\Models\WorkLocationType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->validate([
            'type' => [function (string $attribute, string $value, $fail): void {
                if (! $value) {
                    $fail($attribute.' is required');
                }
                switch ($value) {
                    case 'affiliate':
                    case 'childAffiliate':
                    case 'chapter':
                    case 'employer':
                    case 'unit':
                    case 'duescategory':
                    case 'billingtypes':
                    case 'recurringBillingTypes':
                    case 'nationalPerCapita':
                    case 'form':
                    case 'worklocation':
                    case 'localJobClass':
                    case 'jobTitle':
                        break;
                    default:
                        $fail('unknown '.$attribute.': '.$value);
                        break;
                }
            }],
            'text' => 'nullable|string',
            'ids' => 'nullable|array',
            'affiliateId' => 'nullable|integer',
            'groupId' => 'nullable|string',
            'chapterId' => 'nullable|integer',
            'employerId' => 'nullable|array',
            'employerType' => 'nullable|integer',
            'unitId' => 'nullable|integer',
            'localJobClassId' => 'nullable|integer',
            'jobTitleId' => 'nullable|integer',
            'from' => 'nullable|string',
            'selectedEmployerIds' => 'nullable',
            'sortBy' => 'nullable|string',
            'templateId' => 'nullable|integer',
        ]);

        $ids = $search['ids'] ?? [];

        $from = null;
        if (array_key_exists('from', $search)) {
            $from = $search['from'];
        }
        return match ($search['type']) {
            'affiliate' => $this->searchAffiliate($search['text']),
            'childAffiliate' => $this->searchChildAffiliate($search['affiliateId'], $search['text']),
            'chapter' => $this->searchChapter($search['affiliateId'], $search['text']),
            'employer' => $this->searchEmployer($search['chapterId'], $search['text'], $search['selectedEmployerIds'] ?? null),
            'unit' => $this->searchUnit($search['employerId'], $search['text']),
            'duescategory' => $this->listDuesCategories($search['affiliateId'], $ids, $from, isset($search['templateId']) ? $search['templateId']:null),
            'billingtypes' => $this->listBillhighwayDuesCategories($search['affiliateId'], $ids),
            'nationalPerCapita' => $this->getNationalPerCapita(),
            'recurringBillingTypes' => $this->getBillHighwayDuesCategories($search['groupId'], $ids, $search['from']),
            'form' => $this->listForms($search['affiliateId'] ?? null, $search['sortBy'] ?? null),
            'worklocation' => $this->searchWorkLocation($search['employerId'], $search['employerType']),
            'localJobClass' => $this->searchLocalJobClass($search['unitId'], $search['text']),
            'jobTitle' => $this->searchJobTitle($search['localJobClassId'], $search['text']),
            default => [],
        };
    }

    public function searchAffiliate($search)
    {
        $search = '%'.preg_replace('/\s+/', '%', (string) $search).'%';
        $affiliates = Affiliate::select(
            'AffiliateId',
            'AffiliateAcronym',
            'AffiliateName',
            'AffiliateNumber',
            'BillHighwayGroupId'
        );

        $affiliates->where(function ($query) use ($search): void {
            $query->where('AffiliateNumber', 'like', $search)
                ->orWhere('AffiliateName', 'like', $search)
                ->orWhere('AffiliateAcronym', 'like', $search);
        });

        return $affiliates->get();
    }

    public function searchChildAffiliate($affiliateId, $search)
    {
        $search = '%'.preg_replace('/\s+/', '%', (string) $search).'%';
        $affiliates = Affiliate::select(
            'AffiliateId',
            'AffiliateAcronym',
            'AffiliateName',
            'AffiliateNumber',
            'BillHighwayGroupId'
        );

        $affiliates->where(function ($query) use ($search): void {
            $query->where('AffiliateNumber', 'like', $search)
                ->orWhere('AffiliateName', 'like', $search)
                ->orWhere('AffiliateAcronym', 'like', $search);
        })->where('ParentAffiliateId', '=', $affiliateId)->where('AffiliateId', '!=', $affiliateId);

        return $affiliates->get();
    }

    public function searchChapter($affiliateId, $search)
    {
        return Chapter::where('AffiliateId', '=', $affiliateId)
            ->orderBy('ChapterName', 'asc')
            ->get();
    }

    public function searchEmployer($chapterId, $search, $selectedEmployerIds = null)
    {
        $employersQuery = Employer::where('Employer.ChapterId', '=', $chapterId);
        if ($selectedEmployerIds) {
            $employersQuery->whereIn('Employer.EmployerId', $selectedEmployerIds);
        }

        return $employersQuery->where('Employer.IsStructural', false)
            ->orderBy('EmployerName', 'asc')
            ->get();
    }

    public function searchUnit($employerId, $search)
    {
        return Unit::join('LocalAgreement', 'unit.LocalAgreementId', '=', 'LocalAgreement.LocalAgreementId')
            ->join('Employer', 'LocalAgreement.EmployerId', '=', 'Employer.EmployerId')
            ->where('Employer.EmployerId', $employerId)
            ->where('Unit.IsStructural', '=', '0')
            ->orderBy('Unit.UnitName', 'asc')
            ->get('Unit.*');
    }

    public function searchLocalJobClass($unitId, $search)
    {
        return LocalJobClass::query()->where('UnitId', $unitId)
            ->orderBy('LocalJobClassName', 'asc')
            ->get();
    }

    public function searchJobTitle($localJobClassId, $search)
    {
        return JobTitle::where('LocalJobClassId', $localJobClassId)
            ->orderBy('JobTitleName', 'asc')
            ->get('JobTitle.*');
    }

    public function searchWorkLocation($employerId, $employerType)
    {
        $workLocations = WorkLocation::query()->where('WorkLocation.EmployerId', $employerId)->orderBy('WorkLocation.WorkLocationName', 'ASC')->get();
        $workLocationTypes = WorkLocationType::query()->where('EmployerTypeId', 3)->orderBy('HierachicalOrder', 'ASC')->get();

        $workLocationMap = [];

        /** @var WorkLocationType $workLocationType */
        foreach ($workLocationTypes as $workLocationType) {
            $workLocationMap[$workLocationType->WorkLocationTypeName] = \App\Http\Resources\WorkLocation::collection($workLocations->filter(static fn(WorkLocation $workLocation): bool => $workLocation->WorkLocationType->getKey() === $workLocationType->getKey()));
        }

        return JsonResource::collection(
            $workLocationMap
        );
    }

    protected function getBillHighwayDuesCategories(string $groupId, $ids, $from = null)
    {
        $response = [];

        $apiData = BillingTypes::GetRecurringBillingTypes($groupId);
        $i = 0;
        if ($apiData && $apiData->Results) {
            $activeBillingTypes = array_filter(BillingTypes::GetRecurringBillingTypes($groupId)->Results, fn($billingType) => $billingType->IsActive);
            foreach ($activeBillingTypes as $key => $billHighwayData) {
                if ($ids && count($ids) > 0) {
                    if (in_array($billHighwayData->BillingTypeID, $ids)) {
                        if ($from && $from === 'form') {
                            $response[$i]['LocalDuesCategoryId'] = $billHighwayData->BillingTypeID;
                            $response[$i]['LocalDuesCategoryName'] = $billHighwayData->BillingTypeName;
                            $response[$i]['LocalDuesAmount'] = $billHighwayData->Amount;
                            $response[$i]['LocalDuesPercentage'] = null;
                            $response[$i]['InvoiceDescription'] = $billHighwayData->InvoiceDescription;
                        } else {
                            $response[$i]['id'] = $billHighwayData->BillingTypeID;
                            $response[$i]['name'] = $billHighwayData->BillingTypeName;
                        }

                        $i++;
                    }
                } else {
                    if ($from && $from === 'form') {
                        $response[$key]['LocalDuesCategoryId'] = $billHighwayData->BillingTypeID;
                        $response[$key]['LocalDuesCategoryName'] = $billHighwayData->BillingTypeName;
                        $response[$key]['LocalDuesAmount'] = $billHighwayData->Amount;
                        $response[$key]['LocalDuesPercentage'] = null;
                        $response[$key]['InvoiceDescription'] = $billHighwayData->InvoiceDescription;
                        $response[$key]['EffectiveDate'] = $billHighwayData->EffectiveDate;
                        $response[$key]['EndDate'] = $billHighwayData->EndDate ?? null;
                        $response[$key]['NextDueDate'] = $billHighwayData->NextDueDate;
                        $response[$key]['IsActive'] = $billHighwayData->IsActive;
                        $response[$key]['FrequencyDescription'] = $billHighwayData->FrequencyDescription;
                    } else {
                        $response[$key]['id'] = $billHighwayData->BillingTypeID;
                        $response[$key]['name'] = $billHighwayData->BillingTypeName;
                    }
                }
            }
        }

        return response()->json($response);
    }

    public function listBillhighwayDuesCategories($affiliateId, $ids)
    {
        $affiliateData = Affiliate::where('AffiliateId', $affiliateId)->where('BillHighwayGroupId', '!=', '')->first(['BillHighwayGroupId']);
        if ($affiliateData && $affiliateData->BillHighwayGroupId) {
            return $this->getBillHighwayDuesCategories($affiliateData->BillHighwayGroupId, $ids);
        }
    }

    public function listDuesCategories($affiliateId, array $ids, $from = null, $templateId = null)
    {
        $affiliateData = Affiliate::where('AffiliateId', $affiliateId)->where('BillHighwayGroupId', '!=', '')->first(['BillHighwayGroupId']);
        if ($from && $from === 'form' && $affiliateData && $affiliateData->BillHighwayGroupId) {
            $mappedDuesCategories = DuesMapping::where('affiliate_id', $affiliateId)
                ->where('bill_highway_type_id', '<>', '1');
            if ($ids) {
                $mappedDuesCategories = $mappedDuesCategories->whereIn('bill_highway_type_id', $ids);
            }
            $mappedDuesCategories = $mappedDuesCategories->whereNull('DeletedAt')
                ->get(['bill_highway_type_id']);
            $ids = [];
            $index = 0;
            foreach ($mappedDuesCategories as $duesCategory) {
                $ids[$index] = $duesCategory->bill_highway_type_id;
                $index++;
            }
            if (count($ids) > 0) {
                return $this->getBillHighwayDuesCategories($affiliateData->BillHighwayGroupId, $ids, $from);
            } else {
                return []; // Return empty array if not mapped
            }
        } elseif ($ids) {
            $duesCategories = LocalDuesCategory::where('AffiliateId', '=', $affiliateId)
                ->select(
                    'LocalDuesCategoryId',
                    'LocalDuesCategoryName',
                    'LocalDuesAmount',
                    'LocalDuesPercentage',
                    'PaymentFrequencyName'
                )
                ->leftjoin('PaymentFrequency', 'LocalDuesCategory.PaymentFrequencyId', '=', 'PaymentFrequency.PaymentFrequencyId')
                ->whereIn('LocalDuesCategoryId', $ids)
                ->orderBy('LocalDuesCategory.UpdatedAt', 'desc')
                ->get();
        } else {
            $duesCategoriesQuery = LocalDuesCategory::where('AffiliateId', '=', $affiliateId)
                ->select(
                    'LocalDuesCategoryId',
                    'LocalDuesCategoryName',
                    'LocalDuesAmount',
                    'LocalDuesPercentage',
                    'PaymentFrequencyName'
                );
                if($templateId === 1 || $templateId === 2) {
                    $duesCategoriesQuery->where(function ($query) {
                        $query->whereNotNull('LocalDuesCategory.LocalDuesAmount')
                        ->orWhereNotNull('LocalDuesCategory.LocalDuesPercentage');
                    });
                }
                $duesCategories = $duesCategoriesQuery->leftjoin('PaymentFrequency', 'LocalDuesCategory.PaymentFrequencyId', '=', 'PaymentFrequency.PaymentFrequencyId')
                ->orderBy('LocalDuesCategory.UpdatedAt', 'desc')
                ->get();
        }

        return $duesCategories;
    }

    public function listForms($affiliateId, $sortBy = null)
    {
        //return $affiliateId;
        if ($affiliateId) {
            $forms = Form::where('affiliate_id', '=', $affiliateId)
                ->whereNull('DeletedAt');
            if ($sortBy) {
                $forms = $forms->orderBy($sortBy, 'asc');
            }

            $forms = $forms->get();
        } else {
            $user = Auth::user();
            $authList = $user->authorizations;
            $affiliates = [];
            foreach ($authList as $auth) {
                if ($auth->entity_type == \App\Models\Affiliate::class) {
                    if ($auth->entity_id == 0) {
                        $affiliates = ['*'];
                        break;
                    }
                    $affiliates[] = $auth->entity_id;
                }
            }
            if ($affiliates[0] == '*') {
                $forms = Form::whereNull('DeletedAt')->all();
            } else {
                $forms = Form::whereIn('affiliate_id', $affiliates)->whereNull('DeletedAt')
                    ->get();
            }
        }
        foreach ($forms as $key => $form) {
            if ($form->archived == 1) {
                $forms[$key]['system_name'] = $form['system_name'].' (Archived)';
                $forms[$key]['display_name'] = $form['display_name'].' (Archived)';
            }
        }

        return $forms;
    }

    public function showAffiliate($id)
    {
        return Affiliate::where('AffiliateId', '=', $id)
            ->select(
                'AffiliateId',
                'AffiliateAcronym',
                'AffiliateName',
                'AffiliateNumber',
                'BillHighwayGroupId',
                'laravel_affiliate_logo.local_logo',
                'laravel_affiliate_logo.fed_logo'
            )->leftJoin('laravel_affiliate_logo', 'laravel_affiliate_logo.affiliate_id', '=', 'Affiliate.AffiliateId')
            ->first();
    }

    public function showChapter($id)
    {
        return Chapter::where('ChapterId', '=', $id)
            ->select(
                'ChapterId',
                'ChapterName'
            )->first();
    }

    public function showEmployer($id)
    {
        if (is_array($id)) {
            return Employer::whereIn('EmployerId', '=', $id)
                ->select(
                    'EmployerId',
                    'EmployerName'
                )->first();
        } else {
            return Employer::where('EmployerId', '=', $id)
                ->select(
                    'EmployerId',
                    'EmployerName'
                )->first();
        }
    }

    public function showUnit($id)
    {
        return Unit::where('UnitId', '=', $id)
            ->select(
                'UnitId',
                'UnitName'
            )->first();
    }

    public function access($type, $id)
    {
        return match ($type) {
            'affiliate' => $this->showAffiliate($id),
            'chapter' => $this->showChapter($id),
            'employer' => $this->showEmployer($id),
            'unit' => $this->showUnit($id),
            default => [],
        };
    }

    public function getNationalPerCapita()
    {
        $response = NationalPerCapita::whereNull('DeletedAt')
            ->orderBy('DisplayOrder')
            ->get(['NationalPerCapitaId', 'NationalPerCapitaName', 'IsAgencyFee', 'DisplayOrder']);

        return response()->json($response);
    }
}

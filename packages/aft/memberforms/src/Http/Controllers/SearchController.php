<?php

namespace Aft\MemberForms\Http\Controllers;

use Aft\MemberForms\Models\Form;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Chapter;
use App\Models\Employer;
use App\Models\JobTitle;
use App\Models\LocalDuesCategory;
use App\Models\LocalJobClass;
use App\Models\Unit;
use App\Models\WorkLocation;
use App\Models\WorkLocationType;
use App\Models\WorkStructure;
use App\Models\WorkStructureType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
                    case 'form':
                    case 'worklocation':
                    case 'workstructure':
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
            'chapterId' => 'nullable|integer',
            'employerId' => 'nullable|integer',
            'employerType' => 'nullable|integer',
            'unitId' => 'nullable|integer',
            'localJobClassId' => 'nullable|integer',
            'jobTitleId' => 'nullable|integer',
            'selectedEmployerIds' => 'nullable',
        ]);

        $ids = null;
        if (array_key_exists('ids', $search)) {
            $ids = $search['ids'];
        }
        return match ($search['type']) {
            'affiliate' => $this->searchAffiliate($search['text']),
            'childAffiliate' => $this->searchChildAffiliate($search['affiliateId'], $search['text'], $ids),
            'chapter' => $this->searchChapter($search['affiliateId'], $search['text']),
            'employer' => $this->searchEmployer($search['chapterId'], $search['text'], $search['selectedEmployerIds'] ?? null),
            'unit' => $this->searchUnit($search['employerId'], $search['text']),
            'duescategory' => $this->listDuesCategories($search['affiliateId'], $ids),
            'form' => $this->listForms($search['affiliateId'] ?? null),
            'worklocation' => $this->searchWorkLocation($search['employerId']),
            'workstructure' => $this->searchWorkStructure($search['employerId']),
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

    public function searchChildAffiliate($affiliateId, $search, $ids)
    {
        $search = '%'.preg_replace('/\s+/', '%', (string) $search).'%';
        $affiliates = Affiliate::withoutGlobalScopes()->select(
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
        if ($ids && count($ids) > 0) {
            $affiliates->whereIn('AffiliateId', $ids);
        }

        return $affiliates->get();
    }

    public function searchChapter($affiliateId, $search)
    {
        return DB::connection('aftdb')->table('Chapter')->where('AffiliateId', '=', $affiliateId)
            ->orderBy('Chapter.ChapterName', 'asc')
            ->get();
    }

    /**
     * @return mixed[]
     */
    public function searchEmployer($chapterId, $search, $selectedEmployerIds = null): array
    {
        $employersQuery = DB::connection('aftdb')->table('Employer')->where('Employer.ChapterId', '=', $chapterId)
            ->where('Employer.IsStructural', '=', '0');
        if ($selectedEmployerIds) {
            if (!is_array($selectedEmployerIds)) {
                $selectedEmployerIds = [$selectedEmployerIds];
            }
            $employersQuery->whereIn('Employer.EmployerId', $selectedEmployerIds);
        }

        $employers = $employersQuery->whereNull('Employer.DeletedAt')
            ->orderBy('EmployerName', 'asc')
            ->get();

        $tempEmployers = [];
        foreach ($employers as $employer) {
            $employer = json_decode(json_encode($employer), true);
            $employer['EmployerId'] = (int) $employer['EmployerId'];
            $tempEmployers[] = $employer;
        }

        return $tempEmployers;
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
        return LocalJobClass::where('UnitId', $unitId)
            ->orderBy('LocalJobClassName', 'asc')
            ->get('LocalJobClass.*');
    }

    public function searchJobTitle($localJobClassId, $search)
    {
        return JobTitle::where('LocalJobClassId', $localJobClassId)
            ->orderBy('JobTitleName', 'asc')
            ->get('JobTitle.*');
    }

    public function searchWorkLocation($employerId)
    {
        $employerData = DB::connection('aftdb')->table('Employer')->where('EmployerId', '=', $employerId)
            ->first();

        $workLocationMap = [];
        if ($employerData) {
            $employerType = $employerData->EmployerTypeId;
            $workLocations = WorkLocation::query()->where('WorkLocation.EmployerId', $employerId)->orderBy('WorkLocation.WorkLocationName', 'ASC')->get();
            $workLocationTypes = WorkLocationType::query()->where('EmployerTypeId', $employerType)->orderBy('HierachicalOrder', 'ASC')->get();
        }

        /** @var WorkLocationType $workLocationType */
        foreach ($workLocationTypes as $workLocationType) {
            $workLocationMap[$workLocationType->WorkLocationTypeName] = \App\Http\Resources\WorkLocation::collection($workLocations->filter(static fn(WorkLocation $workLocation): bool => $workLocation->WorkLocationType->getKey() === $workLocationType->getKey()));
        }

        return JsonResource::collection(
            $workLocationMap
        );
    }

    public function searchWorkStructure($employerId)
    {
        $employerData = DB::connection('aftdb')->table('Employer')->where('EmployerId', '=', $employerId)
            ->first();

        $workStructureMap = [];
        if ($employerData) {
            $employerType = $employerData->EmployerTypeId;
            $workStructures = WorkStructure::query()->where('WorkStructure.EmployerId', $employerId)->orderBy('WorkStructure.WorkStructureName', 'ASC')->get();
            $workStructureTypes = WorkStructureType::query()->where('EmployerTypeId', $employerType)->orderBy('HierachicalOrder', 'ASC')->get();
        }
        foreach ($workStructureTypes as $workStructureType) {
            $workStructureMap[$workStructureType->WorkStructureTypeName] = \App\Http\Resources\WorkStructure::collection($workStructures->filter(static fn(WorkStructure $workStructure): bool => $workStructure->workStructureType->getKey() === $workStructureType->getKey()));
        }

        return JsonResource::collection(
            $workStructureMap
        );
    }

    public function listDuesCategories($affiliateId, $ids)
    {
        if ($ids) {
            $duesCategories = LocalDuesCategory::where('AffiliateId', '=', $affiliateId)
                ->select(
                    'LocalDuesCategoryId',
                    'LocalDuesCategoryName',
                    'LocalDuesAmount',
                    'LocalDuesPercentage',
                    'PaymentFrequencyName'
                )
                ->join('PaymentFrequency', 'LocalDuesCategory.PaymentFrequencyId', '=', 'PaymentFrequency.PaymentFrequencyId')
                ->whereIn('LocalDuesCategoryId', $ids)
                ->orderBy('LocalDuesAmount', 'desc')
                ->get();
        } else {
            $duesCategories = LocalDuesCategory::where('AffiliateId', '=', $affiliateId)
                ->select(
                    'LocalDuesCategoryId',
                    'LocalDuesCategoryName',
                    'LocalDuesAmount',
                    'LocalDuesPercentage',
                    'PaymentFrequencyName'
                )
                ->leftjoin('PaymentFrequency', 'LocalDuesCategory.PaymentFrequencyId', '=', 'PaymentFrequency.PaymentFrequencyId')
                ->orderBy('LocalDuesAmount', 'desc')
                ->get();
        }

        return $duesCategories;
    }

    public function listForms($affiliateId)
    {
        //return $affiliateId;
        if ($affiliateId) {
            $forms = Form::where('affiliate_id', '=', $affiliateId)->whereNull('DeletedAt')
                ->get();
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
                'BillHighwayGroupId'
            )->first();
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
        //return explode(',', $id);
        $ids = explode(',', (string) $id);
        $employer = Employer::where('EmployerId', '=', $ids[0])
            ->select(
                'EmployerId',
                'EmployerName'
            )->first();

        return response($employer);
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
}

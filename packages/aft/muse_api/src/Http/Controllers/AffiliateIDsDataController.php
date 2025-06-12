<?php

namespace Aft\MuseApi\Http\Controllers;

use Aft\Permissions\Scopes\AuthorizationScope;
use App\Models\Affiliate;
use App\Models\Chapter;
use App\Models\Employer;
use App\Models\JobTitle;
use App\Models\LocalAgreement;
use App\Models\LocalDuesCategory;
use App\Models\LocalJobClass;
use App\Models\Unit;
use App\Models\WorkLocation;
use App\Models\WorkStructure;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class AffiliateIDsDataController extends Controller
{
    /*
     * Build a response data array.
     */
    public static function buildAffiliateIDsData(string $affiliateNumber): array
    {
        // Fetch Affiliate data by AffiliateNumber
        $affiliate = Affiliate
            ::withoutGlobalScopes([AuthorizationScope::class])
            ->where('AffiliateNumber', $affiliateNumber)
            ->first();

        if (is_null($affiliate)) {
            return [];
        }

        // Fetch ParentAffiliate
        $parentAffiliate = Affiliate
            ::withoutGlobalScopes([AuthorizationScope::class])
            ->where('AffiliateId', $affiliate->ParentAffiliateId)
            ->first();

        // Fetch LocalDuesCategories by AffiliateId
        $localDuesCategories = LocalDuesCategory
            ::where('AffiliateId', $affiliate->AffiliateId)
            ->select('LocalDuesCategoryId', 'LocalDuesCategoryName')
            ->get();

        // Fetch related Chapters by AffiliateId
        $chapters = Chapter
            ::where('AffiliateId', $affiliate->AffiliateId)
            ->get();

        $chapterIds = $chapters->pluck('ChapterId')->unique();

        // Fetch related Employers by ChapterId
        $employers = Employer
            ::withoutGlobalScopes([AuthorizationScope::class])
            ->whereIn('ChapterId', $chapterIds)
            ->select('EmployerId', 'EmployerName')
            ->get();

        $employerIds = $employers->pluck('EmployerId')->unique();

        // Fetch WorkLocations by EmployerIds
        $workLocations = WorkLocation
            ::whereIn('EmployerId', $employerIds)
            ->select('WorkLocationName', 'WorkLocationId', 'EmployerId')
            ->get();

        // Fetch WorkStructures by EmployerIds
        $workStructures = WorkStructure
            ::whereIn('EmployerId', $employerIds)
            ->select('WorkStructureName', 'WorkStructureId', 'EmployerId')
            ->get();

        // Fetch LocalAgreements by EmployerIds
        $localAgreements = LocalAgreement
            ::whereIn('EmployerId', $employerIds)
            ->get();

        $localAgreementIds = $localAgreements->pluck('LocalAgreementId')->unique();

        // Fetch Units by LocalAgreementIds
        $units = Unit
            ::whereIn('LocalAgreementId', $localAgreementIds)
            ->select('UnitId', 'UnitName')
            ->get();

        $unitIds = $units->pluck('UnitId')->unique();

        // Fetch LocalJobClasses by UnitIds
        $localJobClasses = LocalJobClass
            ::whereIn('UnitId', $unitIds)
            ->select('LocalJobClassName', 'LocalJobClassId', 'UnitId')
            ->get();

        $localJobClassIds = $localJobClasses->pluck('LocalJobClassId')->unique();

        // Fetch JobTitles by LocalJobClassIds
        $jobTitles = JobTitle
            ::join('LocalJobClass', 'JobTitle.LocalJobClassId', '=', 'LocalJobClass.LocalJobClassId')
            ->whereIn('JobTitle.LocalJobClassId', $localJobClassIds)
            ->select('JobTitle.JobTitleName', 'JobTitle.JobTitleId', 'LocalJobClass.UnitId')
            ->get();

        // Build the response structure
        $response = [
            'Affiliates' => [
                [
                    'AffiliateId' => $affiliate->AffiliateId,
                    'AffiliateNumber' => $affiliate->AffiliateNumber,
                    'AffiliateName' => $affiliate->AffiliateName,
                    'ParentAffiliateId' => $parentAffiliate->AffiliateId ?? null,
                    'ParentAffiliateNumber' => $parentAffiliate->AffiliateNumber ?? null,
                    'ParentAffiliateName' => $parentAffiliate->AffiliateName ?? null
                ]
            ],
            'Employers' => $employers->each->setAppends([]),
            'Units' => $units->each->setAppends([]),
            'JobTitles' => $jobTitles->each->setAppends([])->makeVisible('UnitId'),
            'LocalJobClasses' => $localJobClasses->each->setAppends([])->makeVisible('UnitId'),
            'WorkLocations' => $workLocations->each->setAppends([])->makeVisible('EmployerId'),
            'WorkStructures' => $workStructures->each->setAppends([])->makeVisible('EmployerId'),
            'LocalDuesCategories' => $localDuesCategories->each->setAppends([]),
        ];

        return $response;
    }

    /**
     * Handle POST request to fetch affiliate data.
     */
    public function postAffiliateIDsData(Request $request): JsonResponse
    {
        // Get the AffiliateNumber from the post.
        $data = Validator::make($request->all(), [
            'AffiliateNumber' => 'required|string|max:5',
        ])->validate();
        // @todo This does not maintain case consistency with LookupListsController::postLookupLists - 'affiliateNumber'
        return $this->fetchAffiliateIDsData($data['AffiliateNumber']);
    }

    /**
     * Handle POST request to fetch affiliate data. Uses AffiliateNumber from url.
     *
     * @deprecated Remove once postAffiliateIDsData is widespread.
     */
    public function postAffiliateIDsDataId(string $affiliateNumber): JsonResponse
    {
        return $this->fetchAffiliateIDsData($affiliateNumber);
    }

    /**
     * Fetch affiliate data by AffiliateNumber.
     *
     * @todo Optionally expand to optionally limit by UnitId and EmployerId.
     */
    public function fetchAffiliateIDsData(string $affiliateNumber): JsonResponse
    {
        // Generate a unique cache key based on the affiliate number
        $cacheKey = 'affiliate_data_' . $affiliateNumber;

        $responseStatus = 200;

        // Attempt to retrieve cached data
        $data = Cache::remember($cacheKey, 0, fn(): array => self::buildAffiliateIDsData($affiliateNumber));

        if (empty($data)) {
            $response = ['message' => 'Affiliate not found'];
            $responseStatus = 404;
        } else {
            $response = $data;
        }

        return response()->json($response, $responseStatus);
    }
}

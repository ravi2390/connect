<?php

namespace Aft\MuseApi\Http\Controllers;

use Aft\Permissions\Scopes\AuthorizationScope;
use App\Models\Affiliate;
use App\Models\Country;
use App\Models\Gender;
use App\Models\IndividualDeactivationReason;
use App\Models\LocalDuesCategory;
use App\Models\Prefix;
use App\Models\StateTerritory;
use App\Models\Suffix;
use App\Models\UnionRelationshipType;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LookupListsController extends Controller
{
    /**
     * Handle POST request to fetch lookup lists.
     */
    public function postLookupLists(Request $request): JsonResponse
    {
        $returnScope = $request->input('returnScope', []);
        $affiliateNumber = $request->input('affiliateNumber');

        return $this->fetchLookupLists($returnScope, $affiliateNumber);
    }

    /**
     * Fetch lookup lists.
     *
     * @param array $returnScope
     * @param string $affiliateNumber
     * @return JsonResponse
     */
    public function fetchLookupLists(array $returnScope, ?string $affiliateNumber): JsonResponse
    {
        // List of known return scopes and their corresponding tables
        $knownScopes = [
            'prefix' => Prefix::class,
            'suffix' => Suffix::class,
            'gender' => Gender::class,
            'stateTerritory' => StateTerritory::class,
            'unionRelationshipType' => UnionRelationshipType::class,
            'localDuesCategory' => LocalDuesCategory::class,
            'country' => Country::class,
            'individualDeactivationReason' => IndividualDeactivationReason::class,
        ];

        // Initialize the response array
        $response = [];
        $responseStatus = 200;

        // Check if localDuesCategory is in returnScope but affiliateNumber is not provided
        if (in_array('localDuesCategory', $returnScope) && empty($affiliateNumber)) {
            return response()->json(['error' => 'affiliateNumber is required when requesting localDuesCategory'], 400);
        }

        foreach ($returnScope as $scope) {
            if (array_key_exists($scope, $knownScopes)) {
                // Generate a unique cache key for each scope
                $cacheKey = $scope . '_data_' . ($scope === 'localDuesCategory' ? $affiliateNumber : 'general');

                // Attempt to retrieve cached data
                $data = Cache::remember($cacheKey, 0, function () use ($scope, $affiliateNumber, $knownScopes) {
                    if ($scope === 'localDuesCategory' && $affiliateNumber) {
                        // Fetch AffiliateId using AffiliateNumber
                        // FIXME: We ignore AuthorizationScope because it breaks when Auth::user() is not
                        // available or has an empty authorization list. If we do not ignore it, subsequent
                        // whereIn() calls will make Eloquent append a `0 = 1` to our query string.
                        $affiliate = Affiliate
                            ::withoutGlobalScopes([AuthorizationScope::class])
                            ->where('AffiliateNumber', $affiliateNumber)
                            ->first();

                        if ($affiliate) {
                            // Fetch LocalDuesCategory by AffiliateId
                            return LocalDuesCategory
                                ::where('AffiliateId', $affiliate->AffiliateId)
                                ->select('LocalDuesCategoryId as id', 'LocalDuesCategoryName as name')
                                ->get();
                        } else {
                            return null; // Indicate that the affiliate was not found
                        }
                    } elseif ($scope === 'stateTerritory') {
                        return StateTerritory
                            ::select('StateTerritoryId as id', 'StateTerritoryName as name', 'StateTerritoryCode as code')
                            ->get();
                    } elseif ($scope === 'country') {
                        return Country
                            ::select('CountryId as id', 'CountryName as name', 'CountryCode as code')
                            ->get();
                    } elseif ($scope === 'unionRelationshipType') {
                        return UnionRelationshipType
                            ::select(
                                'UnionRelationshipTypeId as id',
                                'UnionRelationshipTypeName as name',
                                'DisplayOrder',
                            )->get();
                    } elseif ($scope === 'individualDeactivationReason') {
                        return IndividualDeactivationReason
                            ::select(
                                'IndividualDeactivationReasonId as id',
                                'IndividualDeactivationReasonName as name',
                                'DisplayOrder',
                                'ApplicableToMember',
                                'ApplicableToPotentialMember',
                                'ApplicableToAgencyFee',
                                'ApplicableToRetiree',
                                'ApplicableToOther',
                            )->get();
                    } else {
                        // Fetch data from the respective table
                        $modelName = class_basename($knownScopes[$scope]);
                        return $knownScopes[$scope]
                            ::select(sprintf('%sId as id', $modelName), sprintf('%sName as name', $modelName))
                            ->get();
                    }
                });

                $response[$scope] = $data ? $data->each->setAppends([]) : null;

                if ($scope === 'localDuesCategory' && is_null($data)) {
                    $response = [
                        'error' => 'Affiliate not found for localDuesCategory',
                        'scope' => 'localDuesCategory',
                    ];
                    $responseStatus = 404;
                }
            }
        }

        return response()->json($response, $responseStatus);
    }
}

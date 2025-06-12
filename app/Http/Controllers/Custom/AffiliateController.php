<?php

namespace App\Http\Controllers\Custom;

use App\Models\Affiliate;
use Aft\Permissions\Scopes\AuthorizationScope;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Controllers\AffiliateController as BaseController;
use Illuminate\Support\Facades\Log;
use App\Models\Individual;

class AffiliateController extends BaseController
{
    /**
     *
     */
    #[\Override]
    public function one($id): JsonResource
    {
        $includes = explode(',', (string) $this->request->input('include', ''));
        $removeAuthorizationScope = ['affiliateCommittee.affiliateCommitteeMember.Individual' => function ($query): void {
            $query->withoutGlobalScopes([AuthorizationScope::class]);
        }];

        if (in_array('affiliateCommittee.affiliateCommitteeMember.Individual', $includes)) {
            // Create a new array with empty closures for each include
            $newIncludes = array_fill_keys($includes, function ($query): void {
            });

            $newIncludes['affiliateCommittee.affiliateCommitteeMember.Individual'] = $removeAuthorizationScope['affiliateCommittee.affiliateCommitteeMember.Individual'];

            $includes = $newIncludes;
        }

        $affiliate = Affiliate::with($includes)->find($id);

        if (!$affiliate) {
            return response()->json(['error' => 'Affiliate not found'], 404);
        }

        try {
            // Fetch active individuals count for each affiliate dues category
            foreach ($affiliate->affiliateDuesCategory as $category) {
                $category->ActiveIndividuals = $this->getActiveIndividualsCount($category->LocalDuesCategoryId);
            }
        } catch (\Exception $e) {
            Log::error('Error fetching active individuals: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching active individuals'], 500);
        }

        return $this->createResource($affiliate);
    }

    /**
     * Get the count of active individuals for a given dues category.
     */
    private function getActiveIndividualsCount(int $categoryId): int
    {
        return Individual::query()
            ->join('IndividualAffiliate', 'Individual.IndividualId', '=', 'IndividualAffiliate.IndividualId')
            ->join('Affiliate', 'Affiliate.AffiliateId', '=', 'IndividualAffiliate.AffiliateId')
            ->join('LocalDuesCategory', 'IndividualAffiliate.LocalDuesCategoryId', '=', 'LocalDuesCategory.LocalDuesCategoryId')
            ->leftJoin('NationalPerCapita', 'LocalDuesCategory.NationalPerCapitaId', '=', 'NationalPerCapita.NationalPerCapitaId')
            ->leftJoin('Affiliate as ParentAffiliate', 'Affiliate.ParentAffiliateId', '=', 'ParentAffiliate.AffiliateId')
            ->where('IndividualAffiliate.UnionRelationshipTypeId', 2)
            ->whereNull('Individual.DeletedAt')
            ->where(function ($query): void {
                $query->where('IndividualAffiliate.EndDate', '>', now())
                    ->orWhereNull('IndividualAffiliate.EndDate');
            })
            ->where('LocalDuesCategory.LocalDuesCategoryId', $categoryId)
            ->whereNull('IndividualAffiliate.DeletedAt')
            ->whereNull('Affiliate.DeletedAt')
            ->whereNull('LocalDuesCategory.DeletedAt')
            ->distinct('Individual.IndividualId')
            ->count('Individual.IndividualId');
    }
}

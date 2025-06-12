<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\LocalDuesCategoryController as BaseController;
use App\Http\Resources\LocalDuesCategory;
use App\Models\UnionRelationshipType;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class LocalDuesCategoryController
 */
class LocalDuesCategoryController extends BaseController
{
    public function getByUnionRelationshipType(UnionRelationshipType $unionRelationshipType, $IndividualId = null): JsonResource
    {
        $resultQuery =
            \App\Models\LocalDuesCategory::query()
                ->select('LocalDuesCategory.*')->distinct()
                ->join('NationalPerCapita', 'LocalDuesCategory.NationalPerCapitaId', '=', 'NationalPerCapita.NationalPerCapitaId')
                ->join('laravel_dues_mapping', 'LocalDuesCategory.LocalDuesCategoryId', '=', 'laravel_dues_mapping.dues_category_id')
                ->join('laravel_memberforms_eDues_enrollment', 'LocalDuesCategory.AffiliateId', '=', 'laravel_memberforms_eDues_enrollment.AffiliateId')
                ->where('laravel_dues_mapping.DeletedAt', null)
                ->where('laravel_dues_mapping.bill_highway_type_id', '!=', 1)
                ->where('NationalPerCapita.IsAgencyFee', $unionRelationshipType->UnionRelationshipTypeName === 'Agency Fee Payer');
        if ($IndividualId) {
            $resultQuery->where('laravel_memberforms_eDues_enrollment.IndividualId', $IndividualId);
        }
        $results = LocalDuesCategory::collection($resultQuery->get());

        if (count($results) == 0) {
            $results = LocalDuesCategory::collection(
                \App\Models\LocalDuesCategory::query()
                    ->select('LocalDuesCategory.*')->distinct()
                    ->join('NationalPerCapita', 'LocalDuesCategory.NationalPerCapitaId', '=', 'NationalPerCapita.NationalPerCapitaId')
                    ->where('NationalPerCapita.IsAgencyFee', $unionRelationshipType->UnionRelationshipTypeName === 'Agency Fee Payer')
                    ->get()
            );
        }

        return $results;
    }

    public function getByUnionRelationshipTypeWithPaymentFrequency(UnionRelationshipType $unionRelationshipType): JsonResource
    {
        return new JsonResource(
            \App\Models\LocalDuesCategory::query()
                ->with(['PaymentFrequency'])
                ->select('LocalDuesCategory.*')
                ->join('NationalPerCapita', 'LocalDuesCategory.NationalPerCapitaId', '=', 'NationalPerCapita.NationalPerCapitaId')
                ->where('NationalPerCapita.IsAgencyFee', $unionRelationshipType->UnionRelationshipTypeName === 'Agency Fee Payer')
                ->get()
        );
    }
}

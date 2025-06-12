<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UnionCountController extends Controller
{
    public function __invoke($id)
    {
        return JsonResource::collection(Affiliate::query()
            ->join('IndividualAffiliate', 'Affiliate.AffiliateId', '=', 'IndividualAffiliate.AffiliateId')
            ->join('UnionRelationshipType', 'IndividualAffiliate.UnionRelationshipTypeId', '=', 'UnionRelationshipType.UnionRelationshipTypeId')
            ->where(['Affiliate.AffiliateId' => $id])
            ->whereNull('IndividualAffiliate.DeletedAt')
            ->where(function ($query): void {
                $query->where('IndividualAffiliate.StartDate', '<=', Carbon::today());
            })
            ->where(function ($query): void {
                $query->where('IndividualAffiliate.EndDate', '>=', Carbon::today())
                    ->orWhereNull('IndividualAffiliate.EndDate');
            })
            ->groupBy('IndividualAffiliate.UnionRelationshipTypeId', 'UnionRelationshipType.UnionRelationshipTypeName', 'UnionRelationshipType.DisplayOrder')
            ->orderBy('UnionRelationshipType.DisplayOrder')
            ->selectRaw('count(IndividualAffiliate.UnionRelationshipTypeId) as UnionRelationship, UnionRelationshipType.UnionRelationshipTypeName')
            ->get());
    }
}

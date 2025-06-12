<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\UnionRelationshipType;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class UnionRelationshipTypeController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();
        $selectedAffiliateId = $user->selectedAffiliate->AffiliateId;
        $individualAffilites = UnionRelationshipType::query()
            ->selectRaw('distinct UnionRelationshipType.UnionRelationshipTypeId, UnionRelationshipType.UnionRelationshipTypeName')
            ->join('IndividualAffiliate', 'IndividualAffiliate.UnionRelationshipTypeId', '=', 'UnionRelationshipType.UnionRelationshipTypeId')
            ->whereIn('IndividualAffiliate.AffiliateId', Arr::wrap($selectedAffiliateId))
            ->where(static function ($builder): void {
                $builder->whereNull('IndividualAffiliate.EndDate')
                    ->orWhere('IndividualAffiliate.EndDate', '>', Carbon::now()->startOfDay());
            })
            ->orderBy('UnionRelationshipType.UnionRelationshipTypeName', 'ASC')->get();

        return JsonResource::collection($individualAffilites);
    }
}

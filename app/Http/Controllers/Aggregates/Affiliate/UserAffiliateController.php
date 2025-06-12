<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserAffiliateController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        return new JsonResponse(
            Affiliate::with(['AffiliateType', 'AffiliatePerCapita'])
                ->get()->map(fn(Affiliate $affiliate): array => [
                    'AffiliateId' => $affiliate->AffiliateId,
                    'AffiliateName' => $affiliate->AffiliateName,
                    'AffiliateNumber' => $affiliate->AffiliateNumber,
                    'HasCope' => $affiliate->HasCope,
                    'IsVoluntary' => $affiliate->IsVoluntary,
                    'AffiliateType' => $affiliate->AffiliateType ? [
                        'AffiliateTypeId' => $affiliate->AffiliateType->AffiliateTypeId,
                        'AffiliateTypeName' => $affiliate->AffiliateType->AffiliateTypeName,
                    ] : null,
                    'AffiliateCope' => null,
                ])
        );
    }
}

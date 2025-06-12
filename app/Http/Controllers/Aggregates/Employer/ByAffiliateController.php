<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Employer as EmployerResource;
use App\Models\Employer;

class ByAffiliateController extends Controller
{
    public function __invoke(int $affiliateId)
    {
        return EmployerResource::collection(Employer::query()
            ->distinct()
            ->join('Chapter', 'Chapter.ChapterId', '=', 'Employer.ChapterId')
            ->join('Affiliate', 'Affiliate.AffiliateId', '=', 'Chapter.AffiliateId')
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->where('Employer.IsStructural', false)
            ->orderBy('EmployerName')
            ->get(['EmployerId', 'EmployerName']));
    }
}

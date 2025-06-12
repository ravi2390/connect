<?php

namespace App\Http\Controllers\Search;

use App\Http\Controllers\Controller;
use App\Models\Employer;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployerController extends Controller
{
    public function __invoke(int $affiliateId, string $term)
    {
        return JsonResource::collection(Employer::query()
            ->distinct()
            ->join('Chapter', 'Chapter.ChapterId', '=', 'Employer.ChapterId')
            ->join('Affiliate', 'Affiliate.AffiliateId', '=', 'Chapter.AffiliateId')
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->where('Employer.EmployerName', 'LIKE', "%$term%")
            ->get(['EmployerId', 'EmployerName']));
    }
}

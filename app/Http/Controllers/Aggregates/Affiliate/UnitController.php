<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Resources\Json\JsonResource;

class UnitController extends Controller
{
    public function __invoke($id)
    {
        return JsonResource::collection(Unit::query()
            ->join('LocalAgreement', 'LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId')
            ->join('Employer', 'Employer.EmployerId', '=', 'LocalAgreement.EmployerId')
            ->join('Chapter', 'Chapter.ChapterId', '=', 'Employer.ChapterId')
            ->join('Affiliate', 'Affiliate.AffiliateId', '=', 'Chapter.AffiliateId')
            ->where('Affiliate.AffiliateId', $id)
            ->where('Unit.IsStructural', 0)
            ->get(['UnitName', 'LocalAgreementName', 'EmployerName', 'ChapterName']));
    }
}

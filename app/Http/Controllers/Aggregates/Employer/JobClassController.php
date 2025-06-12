<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class JobClassController extends Controller
{
    public function __invoke($id)
    {
        return JsonResource::collection(
            Affiliate::query()
                ->join('Chapter as c', function ($join): void {
                    $join->on('Affiliate.AffiliateId', '=', 'c.AffiliateId')->whereNull('c.DeletedAt');
                })
                ->join('Employer as e', 'c.ChapterId', '=', 'e.ChapterId')
                ->join('LocalAgreement as la', 'e.EmployerId', '=', 'la.EmployerId')
                ->join('Unit as u', function ($join): void {
                    $join->on('la.LocalAgreementId', '=', 'u.LocalAgreementId')->whereNull('e.DeletedAt')->where('u.IsStructural', '=', 0);
                })
                ->join('LocalJobClass as ljc', function ($join): void {
                    $join->on('u.UnitId', '=', 'ljc.UnitId')->whereNull('ljc.DeletedAt')->where('ljc.IsStructural', '=', 0);
                })
                ->leftJoin('NationalJobClass as njc', function ($join): void {
                    $join->on('ljc.NationalJobClassId', '=', 'njc.NationalJobClassId')->whereNull('njc.DeletedAt');
                })
                ->leftJoin('JobTitle as jt', function ($join): void {
                    $join->on('jt.LocalJobClassId', '=', 'ljc.LocalJobClassId')->whereNull('jt.DeletedAt')->where('jt.IsStructural', '=', 0);
                })
                ->where('e.EmployerId', $id)
                ->groupBy(
                    'e.EmployerId',
                    'e.EmployerGuid',
                    'e.EmployerName',
                    'u.UnitId',
                    'u.UnitGuid',
                    'u.UnitName',
                    'ljc.LocalJobClassId',
                    'ljc.LocalJobClassGuid',
                    'ljc.LocalJobClassCode',
                    'ljc.LocalJobClassName',
                    'njc.NationalJobClassId',
                    'njc.NationalJobClassGuid',
                    'njc.NationalJobClassCode',
                    'njc.NationalJobClassName'
                )
                ->get([
                    'e.EmployerId',
                    'e.EmployerGuid',
                    'e.EmployerName',
                    'u.UnitId',
                    'u.UnitGuid',
                    'u.UnitName',
                    'ljc.LocalJobClassId',
                    'ljc.LocalJobClassGuid',
                    'ljc.LocalJobClassCode',
                    'ljc.LocalJobClassName',
                    'njc.NationalJobClassId',
                    'njc.NationalJobClassGuid',
                    'njc.NationalJobClassCode',
                    'njc.NationalJobClassName',
                    DB::raw('Count(JobTitleId) NumberOfJobTitles'),
                ])
        );
    }
}

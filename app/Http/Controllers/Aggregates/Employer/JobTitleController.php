<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\Controller;
use App\Models\JobTitle;
use Illuminate\Http\Resources\Json\JsonResource;

class JobTitleController extends Controller
{
    public function __invoke($id)
    {
        return JsonResource::collection(
            JobTitle::query()
                ->join('LocalJobClass', 'JobTitle.LocalJobClassId', '=', 'LocalJobClass.LocalJobClassId')
                ->leftJoin('NationalJobClass', 'LocalJobClass.NationalJobClassId', '=', 'NationalJobClass.NationalJobClassId')
                ->join('Unit', 'LocalJobClass.UnitId', '=', 'Unit.UnitId')
                ->join('LocalAgreement', 'Unit.LocalAgreementId', '=', 'LocalAgreement.LocalAgreementId')
                ->where('LocalAgreement.EmployerId', $id)
                ->get(['JobTitleName', 'LocalJobClassName', 'NationalJobClassName', 'NationalJobClassCode', 'UnitName'])
        );
    }
}

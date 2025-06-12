<?php

namespace App\Actions\Individual;

use App\Models\Affiliate;
use App\Models\Employer;
use App\Models\Individual;
use App\Models\IndividualEmployer;
use App\Models\LocalJobClass;
use App\Models\Unit;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateRetiredEmployment
{

    use AsAction;

    protected function handle(Individual $individual, Carbon $endDate, Affiliate $affiliate): void
    {
        $employer = Employer::query()
            ->join('Chapter', 'Chapter.ChapterId', '=', 'Employer.ChapterId')
            ->where('Chapter.AffiliateId', $affiliate->AffiliateId)
            ->where('Employer.IsStructural', true)
            ->first();

        if (!$employer) {
            $employer = $individual->individualEmployers->last()?->Employer;
        }

        if (!$employer) {
            return;
        }

        $unit = $affiliate->RetireeDestinationEntity();

        if ($unit instanceof Affiliate) {
            $unit = $unit->RetireeDestinationEntity();
        }

        if (!$unit instanceof Unit) {
            $unit = Unit::query()
                ->join('LocalAgreement', 'LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId')
                ->join('UnitType', 'Unit.UnitTypeId', '=', 'UnitType.UnitTypeId')
                ->where('LocalAgreement.EmployerId', $employer->EmployerId)
                ->where('UnitType.UnitTypeName', 'Retiree')
                ->where('Unit.IsStructural', true)
                ->first();
        }

        $localJobClass = null;
        if ($unit) {
            $localJobClass = LocalJobClass::query()
                ->where('LocalJobClass.IsStructural', true)
                ->where('LocalJobClass.UnitId', $unit->UnitId)
                ->first();
        }

        (new IndividualEmployer())->fill([
            'IndividualId' => $individual->IndividualId,
            'EmployerId' => $employer->EmployerId,
            'CurrentlyWorking' => true,
            'IsPartTime' => false,
            'IsTenured' => false,
            'StartDate' => $endDate,
            'LocalJobClassId' => $localJobClass?->LocalJobClassId,
        ])->save();
    }
}

<?php

namespace App\Filters\Individual;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Spatie\QueryBuilder\Filters\Filter;

class WorkLocationFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {

        $query->join('IndividualEmployer', function ($query): void {
            $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
        });
        $query->select('Individual.FirstName', 'Individual.LastName', 'Individual.DayOfBirth', 'Individual.AffiliateAssignedId', 'Individual.BillhighwayId', 'Individual.CongressionalDistrict', 'Individual.Dependents', 'Individual.GenderId', 'Individual.IndividualGuid', 'Individual.IsPoliticallyActive', 'Individual.IsRegisteredVoter', 'Individual.MaritalStatusId', 'Individual.MiddleName', 'Individual.MonthOfBirth', 'Individual.PreferredName', 'Individual.PreviousName', 'Individual.ResidentialSchoolDistrict', 'Individual.StateHouseDistrict', 'Individual.StateSenateDistrict', 'Individual.Township', 'Individual.VoterPrecinct', 'Individual.Ward', 'Individual.YearOfBirth', 'IndividualEmployer.*');

        $query->leftJoin('WorkLocation as wl', 'IndividualEmployer.WorkLocationId', '=', 'wl.WorkLocationId');
        $query->leftJoin('WorkLocation as wl1', 'wl1.WorkLocationId', '=', 'wl.ParentWorkLocationId');
        $query->leftJoin('WorkLocation as wl2', 'wl2.WorkLocationId', '=', 'wl1.ParentWorkLocationId');
        //  $query->leftJoin('WorkLocation as wl3','ws3.WorkLocationId','=','wl2.ParentWorkLocationId');
        $query->where(function ($query2) use ($value): void {
            $query2->orWhereIn('wl.WorkLocationId', Arr::wrap($value));
            $query2->orWhereIn('wl1.WorkLocationId', Arr::wrap($value));
            $query2->orWhereIn('wl2.WorkLocationId', Arr::wrap($value));
            // $query2->orWhere('wl3.WorkLocationId', Arr::wrap($value));
        });
    }
}

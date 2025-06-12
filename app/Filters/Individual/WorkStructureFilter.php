<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Spatie\QueryBuilder\Filters\Filter;

class WorkStructureFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {

        $query->join('IndividualEmployer as ie', function ($query): void {
            $query->on('ie.IndividualId', '=', 'Individual.IndividualId')->whereNull('ie.EndDate');
        });
        $query->select('Individual.FirstName', 'Individual.LastName', 'Individual.DayOfBirth', 'Individual.AffiliateAssignedId', 'Individual.BillhighwayId', 'Individual.CongressionalDistrict', 'Individual.Dependents', 'Individual.GenderId', 'Individual.IndividualGuid', 'Individual.IsPoliticallyActive', 'Individual.IsRegisteredVoter', 'Individual.MaritalStatusId', 'Individual.MiddleName', 'Individual.MonthOfBirth', 'Individual.PreferredName', 'Individual.PreviousName', 'Individual.ResidentialSchoolDistrict', 'Individual.StateHouseDistrict', 'Individual.StateSenateDistrict', 'Individual.Township', 'Individual.VoterPrecinct', 'Individual.Ward', 'Individual.YearOfBirth', 'ie.*');
        $query->leftJoin('WorkStructure as ws', 'ie.WorkStructureId', '=', 'ws.WorkStructureId');
        $query->leftJoin('WorkStructure as ws1', 'ws1.WorkStructureId', '=', 'ws.ParentWorkStructureId');
        $query->leftJoin('WorkStructure as ws2', 'ws2.WorkStructureId', '=', 'ws1.ParentWorkStructureId');
        $query->leftJoin('WorkStructure as ws3', 'ws3.WorkStructureId', '=', 'ws2.ParentWorkStructureId');
        $query->where(function ($query2) use ($value): void {
            $query2->orWhereIn('ws.WorkStructureId', Arr::wrap($value));
            $query2->orWhereIn('ws1.WorkStructureId', Arr::wrap($value));
            $query2->orWhereIn('ws2.WorkStructureId', Arr::wrap($value));
            $query2->orWhereIn('ws3.WorkStructureId', Arr::wrap($value));
        });

        //Query::addJoin($query->getQuery(), 'WorkStructure', 'IndividualEmployer', 'WorkStructureId', 'WorkStructureId');
        //$query->whereIn('WorkStructure.WorkStructureId', Arr::wrap($value));
    }
}

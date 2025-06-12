<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Spatie\QueryBuilder\Filters\Filter;

class CommitteeFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateCommitteeMember', 'Individual', 'IndividualId', 'IndividualId');

        $query->select('Individual.FirstName', 'Individual.LastName', 'Individual.DayOfBirth', 'Individual.AffiliateAssignedId', 'Individual.BillhighwayId', 'Individual.CongressionalDistrict', 'Individual.Dependents', 'Individual.GenderId', 'Individual.IndividualGuid', 'Individual.IsPoliticallyActive', 'Individual.IsRegisteredVoter', 'Individual.MaritalStatusId', 'Individual.MiddleName', 'Individual.MonthOfBirth', 'Individual.PreferredName', 'Individual.PreviousName', 'Individual.ResidentialSchoolDistrict', 'Individual.StateHouseDistrict', 'Individual.StateSenateDistrict', 'Individual.Township', 'Individual.VoterPrecinct', 'Individual.Ward', 'Individual.YearOfBirth');

        Query::addJoin($query->getQuery(), 'AffiliateCommittee', 'AffiliateCommitteeMember', 'AffiliateCommitteeId', 'AffiliateCommitteeId');

        $query->whereIn('AffiliateCommittee.AffiliateCommitteeId', Arr::wrap($value));
        $query->where(function ($innerQuery): void {
            $innerQuery->whereNull('AffiliateCommitteeMember.EndDate');
            $innerQuery->orWhereDate('AffiliateCommitteeMember.EndDate', '>', now());
        });
    }
}

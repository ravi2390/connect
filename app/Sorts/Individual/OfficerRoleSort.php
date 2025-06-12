<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class OfficerRoleSort
 */
class OfficerRoleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateOfficer', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('AffiliateOfficerRole', function ($query): void {
            $query->on('AffiliateOfficerRole.AffiliateOfficerRoleId', '=', 'AffiliateOfficer.AffiliateOfficerRoleId');
        });

        Query::addSelectClause($query->getQuery(), 'AffiliateOfficerRole.AffiliateOfficerRoleName');

        $query->orderBy('AffiliateOfficerRole.AffiliateOfficerRoleName', $descending ? 'DESC' : 'ASC');
    }
}

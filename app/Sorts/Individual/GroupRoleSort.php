<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class GroupRoleSort
 */
class GroupRoleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateGroupMember', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('AffiliateGroup', function ($query): void {
            $query->on('AffiliateGroup.AffiliateGroupId', '=', 'AffiliateGroupMember.AffiliateGroupId');
        });

        Query::addSelectClause($query->getQuery(), 'AffiliateGroup.AffiliateGroupName');

        $query->orderBy('AffiliateGroup.AffiliateGroupName', $descending ? 'DESC' : 'ASC');
    }
}

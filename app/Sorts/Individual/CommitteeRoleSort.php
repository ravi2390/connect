<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class CommitteeRoleSort
 */
class CommitteeRoleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateCommitteeMember', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('CommitteeMemberType', function ($query): void {
            $query->on('CommitteeMemberType.CommitteeMemberTypeId', '=', 'AffiliateCommitteeMember.CommitteeMemberTypeId');
        });

        Query::addSelectClause($query->getQuery(), 'CommitteeMemberType.CommitteeMemberTypeName');

        $query->orderBy('CommitteeMemberType.CommitteeMemberTypeName', $descending ? 'DESC' : 'ASC');
    }
}

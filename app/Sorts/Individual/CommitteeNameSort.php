<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class CommitteeNameSort
 */
class CommitteeNameSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateCommitteeMember', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('AffiliateCommittee', function ($query): void {
            $query->on('AffiliateCommittee.AffiliateCommitteeId', '=', 'AffiliateCommitteeMember.AffiliateCommitteeId');
        });

        Query::addSelectClause($query->getQuery(), 'AffiliateCommittee.AffiliateCommitteeName');

        $query->orderBy('AffiliateCommittee.AffiliateCommitteeName', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredEmailSort
 */
class IndividualMemberSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('MemberIdMapping', function ($query): void {
            $query->on('MemberIdMapping.IndividualId', '=', 'Individual.IndividualId');
        });
        Query::addSelectClause($query->getQuery(), 'MemberIdMapping.MemberId');

        $query->orderBy('MemberIdMapping.MemberId', $descending ? 'DESC' : 'ASC');
    }
}

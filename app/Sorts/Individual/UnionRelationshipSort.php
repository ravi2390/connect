<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class UnionRelationshipSort
 */
class UnionRelationshipSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('UnionRelationshipType', function ($query): void {
            $query->on('UnionRelationshipType.UnionRelationshipTypeId', '=', 'IndividualAffiliate.UnionRelationshipTypeId');
        });

        Query::addSelectClause($query->getQuery(), 'UnionRelationshipType.UnionRelationshipTypeName');

        $query->distinct()->orderBy('UnionRelationshipType.UnionRelationshipTypeName', $descending ? 'DESC' : 'ASC');
    }
}

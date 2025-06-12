<?php

namespace App\Filters\UnionRelationshipType;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Spatie\QueryBuilder\Filters\Filter;

class AffiliateFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'UnionRelationshipType', 'UnionRelationshipTypeId', 'UnionRelationshipTypeId');
        $query->whereIn('IndividualAffiliate.AffiliateId', Arr::wrap($value));
        $query->orderBy('UnionRelationshipType.UnionRelationshipTypeName', 'ASC');
    }
}

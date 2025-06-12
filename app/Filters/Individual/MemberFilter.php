<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Spatie\QueryBuilder\Filters\Filter;

class MemberFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        Query::addJoin($query->getQuery(), 'MemberIdMapping', 'Individual', 'IndividualId', 'IndividualId');

        $query->whereIn('MemberIdMapping.MemberId', Arr::wrap($value));
    }
}

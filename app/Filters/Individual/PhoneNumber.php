<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\LikeOperator;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class PhoneNumber implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualPhone', 'Individual', 'IndividualId', 'IndividualId');
        LikeOperator::whereLikeStripNonNumbers($query, $property, $value);
    }
}

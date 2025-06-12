<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class CopeFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        if ($value == 'yes') {
            Query::addJoin($query->getQuery(), 'IndividualCope', 'Individual', 'IndividualId', 'IndividualId');
            $query->where('IndividualCope.CopeAmount', '>', '0.00');
        } elseif ($value == 'no') {
            $query->leftJoin('IndividualCope', 'IndividualCope.IndividualId', '=', 'Individual.IndividualId');
            $query->where(function ($q): void {
                $q->whereNull('IndividualCope.IndividualId');
                $q->orWhere('IndividualCope.CopeAmount', '<=', '0.00');
            });
        }
    }
}

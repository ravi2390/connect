<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class EndDateFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');
        $query->where(static function ($builder): void {
            $builder->where('IndividualAffiliate.StartDate', '<=', Carbon::today())
                ->where(function ($query): void {
                    $query->where('IndividualAffiliate.EndDate', '>=', Carbon::today())
                        ->orWhereNull('IndividualAffiliate.EndDate');
                });
        });
    }
}

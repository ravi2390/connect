<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class WorkFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        if ($value == 'yes') {
            Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');
            $query->where(static function ($builder): void {
                $builder->where('IndividualAffiliate.IsCurrent', '=', 'true');
            });
        } elseif ($value == 'no') {
            Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');
            $query->where(static function ($builder): void {
                $builder->where('IndividualAffiliate.IsCurrent', '=', 'false');
            });
        }
    }
}

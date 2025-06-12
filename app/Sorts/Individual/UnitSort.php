<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class UnitSort
 */
class UnitSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'IndividualEmployer')) {
            $query->leftJoin('IndividualEmployer', function ($query): void {
                $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'LocalJobClass')) {
            $query->leftJoin('LocalJobClass', function ($query): void {
                $query->on('LocalJobClass.LocalJobClassId', '=', 'IndividualEmployer.LocalJobClassId');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'Unit')) {
            $query->leftJoin('Unit', function ($query): void {
                $query->on('Unit.UnitId', '=', 'LocalJobClass.UnitId');
            });
        }

        Query::addSelectClause($query->getQuery(), 'Unit.UnitName');

        $query->orderBy('Unit.UnitName', $descending ? 'DESC' : 'ASC');
    }
}

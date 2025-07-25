<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredEmailSort
 */
class LocalJobClassSort implements Sort
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

        Query::addSelectClause($query->getQuery(), 'LocalJobClass.LocalJobClassName');

        $query->orderBy('LocalJobClass.LocalJobClassName', $descending ? 'DESC' : 'ASC');
    }
}

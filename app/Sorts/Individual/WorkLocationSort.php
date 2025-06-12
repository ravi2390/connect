<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class WorkLocationSort
 */
class WorkLocationSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'IndividualEmployer')) {
            $query->leftJoin('IndividualEmployer', function ($query): void {
                $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'WorkLocation')) {
            $query->leftJoin('WorkLocation', function ($query): void {
                $query->on('WorkLocation.WorkLocationId', '=', 'IndividualEmployer.WorkLocationId');
            });
        }

        Query::addSelectClause($query->getQuery(), 'WorkLocation.WorkLocationName');

        $query->orderBy('WorkLocation.WorkLocationName', $descending ? 'DESC' : 'ASC');
    }
}

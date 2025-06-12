<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class JobTitleSort
 */
class JobTitleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'IndividualEmployer')) {
            $query->leftJoin('IndividualEmployer', function ($query): void {
                $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'JobTitle')) {
            $query->leftJoin('JobTitle', function ($query): void {
                $query->on('JobTitle.JobTitleId', '=', 'IndividualEmployer.JobTitleId');
            });
        }

        Query::addSelectClause($query->getQuery(), 'JobTitle.JobTitleName');

        $query->orderBy('JobTitle.JobTitleName', $descending ? 'DESC' : 'ASC');
    }
}

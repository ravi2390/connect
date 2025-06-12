<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class WorkStructureSort
 */
class WorkStructureSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'IndividualEmployer')) {
            $query->leftJoin('IndividualEmployer', function ($query): void {
                $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'WorkStructure')) {
            $query->leftJoin('WorkStructure', function ($query): void {
                $query->on('WorkStructure.WorkStructureId', '=', 'IndividualEmployer.WorkStructureId');
            });
        }

        Query::addSelectClause($query->getQuery(), 'WorkStructure.WorkStructureName');

        $query->orderBy('WorkStructure.WorkStructureName', $descending ? 'DESC' : 'ASC');
    }
}

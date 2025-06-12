<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class WorkEmailSort
 */
class WorkEmailSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualEmail', function ($query): void {
            $query->on('IndividualEmail.IndividualId', '=', 'Individual.IndividualId')->where('IndividualEmail.IndividualEmailTypeId', 2);
        });
        Query::addSelectClause($query->getQuery(), 'IndividualEmail.Email');

        $query->orderBy('IndividualEmail.Email', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Employer;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class EmployerTypeSort
 */
class EmployerTypeSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('EmployerType', function ($query): void {
            $query->on('EmployerType.EmployerTypeId', '=', 'Employer.EmployerTypeId');
        });
        Query::addSelectClause($query->getQuery(), 'EmployerType.EmployerTypeName');

        $query->orderBy('EmployerType.EmployerTypeName', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Employer;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class ParentEmployerSort
 */
class ParentEmployerSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('Emp as Employer', function ($query): void {
            $query->on('Emp.EmployerId', '=', 'Employer.ParentEmployerId');
        });
        Query::addSelectClause($query->getQuery(), 'Emp.EmployerName');

        $query->orderBy('Emp.EmployerName', $descending ? 'DESC' : 'ASC');
    }
}

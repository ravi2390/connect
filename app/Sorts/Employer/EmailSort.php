<?php

namespace App\Sorts\Employer;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class EmailSort
 */
class EmailSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('EmployerEmail', function ($query): void {
            $query->on('EmployerEmail.EmployerId', '=', 'Employer.EmployerId');
        });
        Query::addSelectClause($query->getQuery(), 'EmployerEmail.Email');

        $query->orderBy('EmployerEmail.Email', $descending ? 'DESC' : 'ASC');
    }
}

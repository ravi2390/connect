<?php

namespace App\Sorts\Employer;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class AddressSort
 */
class AddressSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('EmployerAddress', function ($query): void {
            $query->on('EmployerAddress.EmployerId', '=', 'Employer.EmployerId');
        });
        Query::addSelectClause($query->getQuery(), 'EmployerAddress.AddressLine1');

        $query->orderBy('EmployerAddress.AddressLine1', $descending ? 'DESC' : 'ASC');
    }
}

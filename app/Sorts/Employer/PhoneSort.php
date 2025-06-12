<?php

namespace App\Sorts\Employer;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PhoneSort
 */
class PhoneSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('EmployerPhone', function ($query): void {
            $query->on('EmployerPhone.EmployerId', '=', 'Employer.EmployerId');
        });
        Query::addSelectClause($query->getQuery(), 'EmployerPhone.PhoneNumber');

        $query->orderBy('EmployerPhone.PhoneNumber', $descending ? 'DESC' : 'ASC');
    }
}

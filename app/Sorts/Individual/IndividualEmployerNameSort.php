<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredEmailSort
 */
class IndividualEmployerNameSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualEmployer', function ($query): void {
            $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->whereNull('IndividualEmployer.EndDate');
        });

        $query->leftJoin('Employer', function ($query): void {
            $query->on('Employer.EmployerId', '=', 'IndividualEmployer.EmployerId');
        });

        Query::addSelectClause($query->getQuery(), 'Employer.EmployerName');

        $query->orderBy('Employer.EmployerName', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Unit;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class EmployerNameSort
 */
class EmployerNameSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('LocalAgreement', function ($query): void {
            $query->on('LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId');
        });

        $query->leftJoin('Employer', function ($query): void {
            $query->on('Employer.EmployerId', '=', 'LocalAgreement.EmployerId');
        });

        Query::addSelectClause($query->getQuery(), 'Employer.EmployerName');

        $query->orderBy('Employer.EmployerName', $descending ? 'DESC' : 'ASC');
    }
}

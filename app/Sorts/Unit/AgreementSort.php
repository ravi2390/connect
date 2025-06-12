<?php

namespace App\Sorts\Unit;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class AgreementSort
 */
class AgreementSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {

        $query->leftJoin('LocalAgreement', function ($query): void {
            $query->on('LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId');
        });

        Query::addSelectClause($query->getQuery(), 'LocalAgreement.LocalAgreementName');

        $query->orderBy('LocalAgreement.LocalAgreementName', $descending ? 'DESC' : 'ASC');
    }
}

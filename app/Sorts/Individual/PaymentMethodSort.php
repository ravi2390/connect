<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PaymentMethodSort
 */
class PaymentMethodSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('PaymentMethod', function ($query): void {
            $query->on('PaymentMethod.PaymentMethodId', '=', 'IndividualAffiliate.PaymentMethodId');
        });

        Query::addSelectClause($query->getQuery(), 'PaymentMethod.PaymentMethodName');

        $query->orderBy('PaymentMethod.PaymentMethodName', $descending ? 'DESC' : 'ASC');
    }
}

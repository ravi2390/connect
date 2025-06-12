<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PreferredAddressSort
 */
class PreferredAddressSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualAddress', function ($query): void {
            $query->on('IndividualAddress.IndividualId', '=', 'Individual.IndividualId')->where('IndividualAddress.IsPreferred', true);
        });
        Query::addSelectClause($query->getQuery(), 'IndividualAddress.AddressLine1');

        $query->orderBy('IndividualAddress.AddressLine1', $descending ? 'DESC' : 'ASC');
    }
}

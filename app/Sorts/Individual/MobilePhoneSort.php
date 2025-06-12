<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class MobilePhoneSort
 */
class MobilePhoneSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualPhone', function ($query): void {
            $query->on('IndividualPhone.IndividualId', '=', 'Individual.IndividualId')->where('IndividualPhone.IndividualPhoneTypeId', 3);
        });
        Query::addSelectClause($query->getQuery(), 'IndividualPhone.PhoneNumber');

        $query->orderBy('IndividualPhone.PhoneNumber', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class PoliticalPartySort
 */
class PoliticalPartySort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'PoliticalParty', 'Individual', 'PoliticalPartyId', 'PoliticalPartyId', ['PoliticalParty.PoliticalPartyName']);

        $query->orderBy('PoliticalParty.PoliticalPartyName', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class AssessmentRatingSort
 */
class AssessmentRatingSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualAssessment', function ($query): void {
            $query->on('IndividualAssessment.IndividualId', '=', 'Individual.IndividualId');
        });
        Query::addSelectClause($query->getQuery(), 'IndividualAssessment.Rating');

        $query->orderBy('IndividualAssessment.Rating', $descending ? 'DESC' : 'ASC');
    }
}

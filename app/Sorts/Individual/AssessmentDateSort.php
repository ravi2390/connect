<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class AssessmentDateSort
 */
class AssessmentDateSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('IndividualQuickComment', function ($query): void {
            $query->on('IndividualQuickComment.IndividualId', '=', 'Individual.IndividualId');
        });
        Query::addSelectClause($query->getQuery(), 'IndividualQuickComment.CommentDate');

        $query->orderBy('IndividualQuickComment.CommentDate', $descending ? 'DESC' : 'ASC');
    }
}

<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class ChapterSort
 */
class ChapterSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'IndividualEmployer')) {
            $query->leftJoin('IndividualEmployer', function ($query): void {
                $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'Employer')) {
            $query->leftJoin('Employer', function ($query): void {
                $query->on('Employer.EmployerId', '=', 'IndividualEmployer.EmployerId');
            });
        }

        if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'Chapter')) {
            $query->leftJoin('Chapter', function ($query): void {
                $query->on('Chapter.ChapterId', '=', 'Employer.ChapterId');
            });
        }

        Query::addSelectClause($query->getQuery(), 'Chapter.ChapterName');

        $query->orderBy('Chapter.ChapterName', $descending ? 'DESC' : 'ASC');
    }
}

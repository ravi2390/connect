<?php

namespace App\Sorts\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class StaffRoleSort
 */
class StaffRoleSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateStaff', 'Individual', 'IndividualId', 'IndividualId');

        $query->leftJoin('StaffDepartment', function ($query): void {
            $query->on('StaffDepartment.StaffDepartmentId', '=', 'AffiliateStaff.StaffDepartmentId');
        });

        Query::addSelectClause($query->getQuery(), 'StaffDepartment.StaffDepartmentName');

        $query->orderBy('StaffDepartment.StaffDepartmentName', $descending ? 'DESC' : 'ASC');
    }
}

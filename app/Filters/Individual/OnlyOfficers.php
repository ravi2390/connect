<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class OnlyOfficers implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        Query::addJoin($query->getQuery(), 'AffiliateOfficer', 'Individual', 'IndividualId', 'IndividualId');

        $query->where(static function (Builder $builder): void {
            $builder->whereNull('TermEndDate')->orWhere('TermEndDate', '>', Carbon::now()->startOfDay());
        });
    }
}

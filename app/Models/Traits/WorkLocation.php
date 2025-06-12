<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;

trait WorkLocation
{
    public function getParentIdAttribute()
    {
        return $this->ParentWorkLocationId;
    }

    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {
        Query::addJoin($builder->getQuery(), 'Employer', 'WorkLocation', 'EmployerId', 'EmployerId');
        Query::addJoin($builder->getQuery(), 'Chapter', 'Employer', 'ChapterId', 'ChapterId');

        return $builder->whereIn('Chapter.AffiliateId', $ids);
    }
}

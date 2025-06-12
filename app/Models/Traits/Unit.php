<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;

trait Unit
{
    public function scopeNonStructural($query)
    {
        return $query->where('Unit.IsStructural', false);
    }

    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {
        Query::addSelectClause($builder->getQuery(), 'Unit.*');
        Query::addJoin($builder->getQuery(), 'LocalAgreement', 'Unit', 'LocalAgreementID', 'LocalAgreementID', [], false);
        Query::addJoin($builder->getQuery(), 'Employer', 'LocalAgreement', 'EmployerId', 'EmployerId', [], false);
        Query::addJoin($builder->getQuery(), 'Chapter', 'Employer', 'ChapterId', 'ChapterId', [], false);

        return $builder->whereIn('Chapter.AffiliateId', $ids);
    }
}

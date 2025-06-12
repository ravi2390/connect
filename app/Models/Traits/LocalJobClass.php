<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use App\Helpers\Query;
use App\Models\IndividualEmployer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait LocalJobClass
{
    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {
        Query::addJoin($builder->getQuery(), 'Unit', 'LocalJobClass', 'UnitId', 'UnitId');
        Query::addJoin($builder->getQuery(), 'LocalAgreement', 'Unit', 'LocalAgreementID', 'LocalAgreementID');
        Query::addJoin($builder->getQuery(), 'Employer', 'LocalAgreement', 'EmployerId', 'EmployerId');
        Query::addJoin($builder->getQuery(), 'Chapter', 'Employer', 'ChapterId', 'ChapterId');

        return $builder->whereIn('Chapter.AffiliateId', $ids);
    }

    public function IndividualEmployer(): HasMany
    {
        return $this->hasMany(IndividualEmployer::class, 'LocalJobClassId', 'LocalJobClassId');
    }
}

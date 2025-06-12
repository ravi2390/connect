<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;

trait AffiliateGroupType
{
    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {

        // Query::addJoin($builder->getQuery(), 'AffiliateGroupMember', 'AffiliateGroupType', 'AffiliateGroupTypeId', 'AffiliateGroupTypeId');
        Query::addJoin($builder->getQuery(), 'AffiliateGroup', 'AffiliateGroupType', 'AffiliateGroupTypeId', 'AffiliateGroupTypeId');

        return $builder->whereIn('AffiliateGroup.AffiliateId', $ids);
    }
}

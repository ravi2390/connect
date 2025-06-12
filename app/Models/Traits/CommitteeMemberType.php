<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;

trait CommitteeMemberType
{
    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {

        Query::addJoin($builder->getQuery(), 'AffiliateCommitteeMember', 'CommitteeMemberType', 'CommitteeMemberTypeId', 'CommitteeMemberTypeId');
        Query::addJoin($builder->getQuery(), 'AffiliateCommittee', 'AffiliateCommitteeMember', 'AffiliateCommitteeId', 'AffiliateCommitteeId');

        return $builder->whereIn('AffiliateCommittee.AffiliateId', $ids);
    }
}

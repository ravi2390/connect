<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Http\Controllers\BaseAggregateController;
use App\Models\AffiliatePerCapita;
use App\Models\UnionRelationshipType;

class UnionRelationshipController extends BaseAggregateController
{
    protected $class = \App\Http\Resources\UnionRelationshipType::class;

    protected $returnCollection = true;

    protected function getData($affiliateId)
    {
        $names = ['Member'];
        if (AffiliatePerCapita::query()->where('AffiliateId', $affiliateId)->where('IsAgencyFee', true)->get()->count() > 0) {
            $names[] = 'Agency Fee Payer';
        } else {
            $names[] = 'Potential Member';
        }
        $names[] = 'Other';

        return UnionRelationshipType::query()->whereIn('UnionRelationshipTypeName', $names)->orderBy('DisplayOrder')->get(['UnionRelationshipTypeId', 'UnionRelationshipTypeName']);
    }
}

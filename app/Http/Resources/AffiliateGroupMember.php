<?php

namespace App\Http\Resources;

use App\Http\Resources\AffiliateGroup as AffiliateGroupResource;

class AffiliateGroupMember extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'AffiliateGroup',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateGroupMemberId',
        ];
    }

    protected function includeAffiliateGroup(): \App\Http\Resources\AffiliateGroup
    {
        return new AffiliateGroupResource($this->AffiliateGroup);
    }
}

<?php

namespace App\Http\Resources;

class AffiliateCope extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'CopeType',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateCopeId',
            'IsCopeOnly',
            'CopeName',
            'CopeAmount',
            'CopePercentage',
        ];
    }

    public function includeCopeType(): \App\Http\Resources\CopeType
    {
        return new CopeType($this->CopeType);
    }
}

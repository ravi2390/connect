<?php

namespace App\Http\Resources;

use App\Http\Resources\AffiliateOfficerRole as AffiliateOfficerRoleResource;

class AffiliateOfficer extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'AffiliateOfficerRole',
            'Individual',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateOfficerId',
            'IndividualId',
            'TermStartDate',
            'TermEndDate',
            'IsElected',
            'IsCurrent',
            'IsPreferredTitle',
        ];
    }

    protected function includeAffiliateOfficerRole(): \App\Http\Resources\AffiliateOfficerRole
    {
        return new AffiliateOfficerRoleResource($this->AffiliateOfficerRole);
    }

    protected function includeIndividual(): \App\Http\Resources\Individual
    {
        return new Individual($this->Individual);
    }
}

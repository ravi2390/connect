<?php

namespace App\Http\Resources;

class IndividualEmail extends AbstractResource
{
    protected function getSimpleFields(): array
    {
        return [
            'IndividualEmailId',
            'IndiviudalId',
            'Email',
            'IndividualEmailTypeId',
            'IsPreferred',
            'CanContact',
            'CanContactRestrictionId',
            'ContactStatusId',
            'ContactSourceId',
        ];
    }

    protected function getRelationshipFields(): array
    {
        return [
            'ContactStatus',
            'ContactSource',
            'IndividualEmailType',
            'CanContactRestriction',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeIndividualEmailType(): \App\Http\Resources\IndividualEmailType
    {
        return new IndividualEmailType($this->IndividualEmailType);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }

    protected function includeCanContactRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanContactRestriction);
    }
}

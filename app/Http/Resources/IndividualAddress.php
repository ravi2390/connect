<?php

namespace App\Http\Resources;

class IndividualAddress extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'ContactStatus',
            'ContactSource',
            'StateTerritory',
            'IndividualAddressType',
            'CanSendMailRestriction',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualAddressId',
            'IndiviudalId',
            'AddressLine1',
            'AddressLine2',
            'City',
            'PostalCode',
            'IsPreferred',
            'StateTerritoryId',
            'CountryId',
            'IndividualAddressTypeId',
            'ContactStatusId',
            'ContactSourceId',
            'CanVisitRestrictionId',
            'CanSendMailRestrictionId',
        ];
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }

    protected function includeStateTerritory(): \App\Http\Resources\StateTerritory
    {
        return new StateTerritory($this->StateTerritory);
    }

    protected function includeIndividualAddressType(): \App\Http\Resources\IndividualAddressType
    {
        return new IndividualAddressType($this->IndividualAddressType);
    }

    protected function includeCanSendMailRestriction(): \App\Http\Resources\ContactRestriction
    {
        return new ContactRestriction($this->CanSendMailRestriction);
    }
}

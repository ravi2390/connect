<?php

namespace App\Http\Resources;

class AffiliateAddress extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'ContactSource',
            'StateTerritory',
            'ContactStatus',
            'AffiliateAddressType',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateAddressId',
            'AffiliateId',
            'AddressLine1',
            'AddressLine2',
            'City',
            'County',
            'StateTerritoryId',
            'CountryId',
            'PostalCode',
            'CarrierRoute',
            'Latitude',
            'Longitude',
            'AffiliateAddressTypeId',
            'ContactStatusId',
            'ContactSourceId',
            'IsPreferred',
        ];
    }

    protected function includeStateTerritory(): \App\Http\Resources\StateTerritory
    {
        return new StateTerritory($this->StateTerritory);
    }

    protected function includeContactSource(): \App\Http\Resources\ContactSource
    {
        return new ContactSource($this->ContactSource);
    }

    protected function includeAffiliateAddressType(): \App\Http\Resources\AffiliateAddressType
    {
        return new AffiliateAddressType($this->AffiliateAddressType);
    }

    protected function includeContactStatus(): \App\Http\Resources\ContactStatus
    {
        return new ContactStatus($this->ContactStatus);
    }
}

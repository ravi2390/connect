<?php


namespace App\Http\Resources;


class Country extends AbstractResource
{

    protected function getRelationshipFields(): array
    {
        return [];
    }

    protected function getSimpleFields(): array
    {
        return [
            'CountryId',
            'CountryGuid',
            'CountryName',
            'CountryCode',
            'DisplayOrder',
            'ISO3',
            'CountryCallingCode',
        ];
    }
}

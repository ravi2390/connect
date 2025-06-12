<?php

namespace App\Http\Resources;

class ContactRestriction extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'ContactRestrictionId',
            'ContactRestrictionName',
            'Email',
            'AddressVisit',
            'AddressMail',
            'PhoneCall',
            'PhoneText',
        ];
    }
}

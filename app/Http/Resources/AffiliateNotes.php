<?php

namespace App\Http\Resources;

class AffiliateNotes extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateId',
            'AffiliateNotes',
            'AffiliateNotesDate',
            'AffiliateNotesAuthor',
        ];
    }
}

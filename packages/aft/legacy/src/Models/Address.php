<?php

namespace Aft\Legacy\Models;

use Aft\Legacy\LegacyFlatData;
use App\Models\County;

class Address extends LegacyModel
{
    public function transform(LegacyFlatData $flatData, ?float $latitude = null, ?float $longitude = null): array
    {
        $attributes = [];
        $attributes['AddressLine1'] = $this->Line1;
        $attributes['AddressLine2'] = $this->Line2;
        $attributes['City'] = $this->City;
        $attributes['StateTerritoryId'] = $flatData->getMapping('StateTerritory', $this->StateCode);
        // @todo Note there may be suffixes other than County (e.g., Parish in
        // Louisiana).
        $attributes['CountyId'] = County::where('StateTerritoryId', '=', $attributes['StateTerritoryId'])
            ->where('CountyName', '=', $this->CountyName.' County')
            ->value('CountyId');
        $attributes['CountryId'] = $flatData->getMapping('Country', $this->CountryCode);
        $attributes['PostalCode'] = $this->PostalCode;
        $attributes['CarrierRoute'] = $this->PostalCarrierRte;
        $attributes['Latitude'] = $latitude;
        $attributes['Longitude'] = $longitude;

        // Affiliate or Individual address?
        if (isset($this->AddressOwnertype) && $this->AddressOwnertype != 'Individual'
            && $this->AddressOwnertype != 'Employer') {
            $attributes['AffiliateAddressTypeId'] = $flatData->getMapping(
                'AffiliateAddressType',
                $this->AddressOwnertype
            );
        } else {
            // Individuals/employers - handled in the caller.
        }
        $attributes['ContactStatusId'] = $flatData->getMapping('ContactStatus', 'Old');
        //$attributes['ContactSourceId'] = $this->
        //$attributes['VerifiedDate'] = $this->
        //$attributes['CanVisit'] = $this->
        //$attributes['CanSendMail'] = $this->
        $attributes['CanVisitRestrictionId'] = 1;
        $attributes['CanSendMailRestrictionId'] = 1;
        $attributes['PreventNcoaUpdate'] = $this->PreventNCOAUpdateTF;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}

<?php

namespace Aft\Legacy\Models;

use Aft\Legacy\LegacyFlatData;

class IndividualDetail extends LegacyModel
{
    /**
     * @return mixed[]
     */
    public function transform(LegacyFlatData $flatData, ?int $BHId = null): array
    {
        $attributes = [];
        $attributes['IndividualGuid'] = $this->IndividualId;
        $attributes['FirstName'] = $this->FirstName;
        $attributes['MiddleName'] = $this->MiddleName;
        $attributes['LastName'] = $this->LastName;
        $attributes['PreferredName'] = $this->Nickname;
        $attributes['PreviousName'] = $this->OrigLastName;
        //$attributes['PreferredPronoun'] = $this->;
        $attributes['PrefixId'] = $flatData->getMapping('Prefix', $this->Prefixname);
        $attributes['SuffixId'] = $flatData->getMapping('Suffix', $this->Suffix);
        //$attributes['PictureUrl'] = $this->;
        $attributes['GenderId'] = $flatData->getMapping('Gender', $this->Gender);
        // $attributes['EthnicityId'] = $this->;
        $attributes['MaritalStatusId'] = $flatData->getMapping('MaritalStatus', $this->MaritalStatusname);
        $attributes['Dependents'] = $this->NumDependants;
        // Break out from DOB (YYYY-MM-DD 00:00:00.000).
        $dateComponents = explode('-', $this->DOB);
        if (count($dateComponents) >= 3) {
            $attributes['YearOfBirth'] = $dateComponents[0];
            $attributes['MonthOfBirth'] = $dateComponents[1];
            $attributes['DayOfBirth'] = substr($dateComponents[2], 0, 2);
        }
        $attributes['AffiliateAssignedId'] = $this->SSN;
        $attributes['BillhighwayId'] = $BHId;
        $attributes['IsPoliticallyActive'] = $this->PoliticallyActiveTF ?: false;
        $attributes['IsRegisteredVoter'] = $this->RegisteredVoterTF ?: false;
        $attributes['PoliticalPartyId'] = $flatData->getMapping('PoliticalParty', $this->PoliticalPartyname);
        $attributes['VoterPrecinct'] = $this->VoterPrecinct;
        $attributes['Township'] = $this->Township;
        $attributes['Ward'] = $this->Ward;
        $attributes['CongressionalDistrict'] = $this->CongressDistrict;
        $attributes['StateSenateDistrict'] = $this->StateSenateDist;
        $attributes['StateHouseDistrict'] = $this->StateHouseDist;
        $attributes['ResidentialSchoolDistrict'] = $this->ResSchoolDist;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}

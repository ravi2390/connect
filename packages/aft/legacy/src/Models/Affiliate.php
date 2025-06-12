<?php

namespace Aft\Legacy\Models;

use Aft\Legacy\LegacyFlatData;
use Illuminate\Support\Facades\DB;

class Affiliate extends LegacyModel
{
    protected $table = 'Affiliate';

    protected $primaryKey = 'AffiliateId';

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $dates = [
        'cdate',
        'mdate',
    ];

    protected $with = [
        'name',
    ];

    public function name()
    {
        return $this->hasOne('Aft\Legacy\AffiliateName', 'AffiliateId', 'AffiliateId');
    }

    public function transform(LegacyFlatData $flatData, ?int $newAffiliateParentId = null): array
    {
        $attributes = [];
        $affiliateName = $this->AffiliateName;
        $affiliateAbbrevName = null;
        $affiliateAcronym = null;
        if (! empty($this->name)) {
            $affiliateAbbrevName = $this->name->AffiliateAbbrevName;
            $affiliateAcronym = $this->name->AffiliateAcronym;
        }
        $attributes['AffiliateGUID'] = $this->AffiliateId;
        $attributes['AffiliateName'] = $affiliateName;
        $attributes['AffiliateNumber'] = $this->AffiliateNbr;
        $attributes['AffiliateAbbreviatedName'] = $affiliateAbbrevName;
        $attributes['AffiliateAcronym'] = $affiliateAcronym;
        $attributes['AffiliateEIN'] = $this->EIN;
        $attributes['AffiliatePerCapitaPIN'] = $this->PerCapitaPIN;
        $attributes['BillHighwayGroupId'] = DB::connection('stage')
            ->table('BillTypeDuescategoryMapping')
            ->where('LocalUnionNbr', $this->AffiliateNbr)
            ->value('GroupID');
        $attributes['IsChartered'] = $this->CharteredTF ?: false;
        $attributes['CharterDate'] = $this->CharterDate;
        if (! empty($newAffiliateParentId)) {
            $attributes['ParentAffiliateId'] = $newAffiliateParentId;
        }
        $attributes['RetireeEntityTypeId'] = $flatData->getMapping('EntityType', 'Unit');
        $attributes['AffiliateDesignationId'] = $flatData->getMapping('AffiliateDesignation', $this->AffiliateType);
        $attributes['AffiliateTypeId'] = $flatData->getMapping('AffiliateType', $this->AffiliateType);
        $attributes['AffiliateGeoReachId'] = $flatData->getMapping('AffiliateGeoReach', $this->AffiliateType);
        $attributes['IsAffiliateActive'] = ($this->StatusFlag == 'A' || $this->StatusFlag == 'R');
        // LocalDeleteReason is a mix of uuids and free text. IDs do not
        // match anything in the DeactivateReason or DeactivateReaasonLocal
        // tables. But, it doesn't really matter, since we're not actually
        // migrating any inactive affiliates.
        // $attributes['AffiliateInactiveReasonId'] = $this->LocalDeleteReason;
        $attributes['AffiliateInactiveDate'] = $this->LocalDeleteDate;
        $attributes['LocationStateAbr'] = $this->LocationStateAbr;
        // Break out the MM from YYYY-MM-DD...
        $splitDate = explode('-', $this->ElectionDate);
        if (array_key_exists(1, $splitDate)) {
            $attributes['ElectionMonth'] = (int) $splitDate[1];
        }
        //$attributes['OfficerTermStartMonth'] = $this->
        //$attributes['IsElectionYearOdd'] = $this->
        //$attributes['ElectionTermYears'] = $this->
        $attributes['NoNCOAUpdate'] = false;
        $attributes['NoNationalUpdate'] = false;
        $attributes['NoStateUpdate'] = false;
        $attributes['NoLanWanUpdate'] = false;
        $attributes['NoExternalUpdate'] = false;
        $attributes['AffiliateWebsite'] = $this->Website;
        //$attributes['IsActionNetwork'] = $this->
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }

    /**
     * @return mixed[]
     */
    public function transformPerCapita(LegacyFlatData $flatData, int $newAffiliateId): array
    {
        $attributes = [];
        $attributes['AffiliateId'] = $newAffiliateId;
        // Source is MM/DD.
        $splitDate = explode('/', $this->FiscalYearEnd);
        if (count($splitDate) == 2) {
            $attributes['FiscalYearEndMonth'] = $splitDate[0];
            $attributes['FiscalYearEndDay'] = $splitDate[1];
        }
        $attributes['PayPerCapitaToAFT'] = 1;
        $attributes['InvoicedByAFT'] = 1;

        $attributes['IncludeStatePerCapita'] = match ($this->LocationStateAbr) {
            'CA', 'CT', 'IA', 'MA', 'NC', 'NJ', 'OH', 'TN', 'WI' => 1,
            default => 0,
        };

        $attributes['IncludeAFLCIOPerCapita'] = 1;
        $attributes['AFLCIOAmount'] = 0.0;
        // 1 == 12 months
        $attributes['AffiliateBillingFrequencyId'] = 1;
        $attributes['HasOccupationalLiabilityInsurance'] = ! empty($this->OccupLiabInsurTF);
        $attributes['AccidentInsuranceUnits'] = 1;
        $attributes['HasCope'] = 0;
        $attributes['IsCopeVoluntary'] = 0;
        $attributes['HasPIPE'] = 0;
        $attributes['IsDirectBargaining'] = 0;
        $attributes['ConventionDelegationEligibility'] = (! empty($this->DelegatesAllowed));
        $attributes['HasStateWebAccess'] = 0;
        // Intentionally unmapped.
        //$attributes['CurrentFiduciaryBondCoverageId'] = 1;
        //$attributes['RequestedFiduciaryBondCoverageId'] = 1;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}

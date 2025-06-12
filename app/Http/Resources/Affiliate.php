<?php

namespace App\Http\Resources;

use App\Http\Resources\Affiliate as AffiliateResource;
use App\Http\Resources\AffiliateGeoReach as AffiliateGeoReachResource;
use App\Http\Resources\AffiliateMergedOrganization as AffiliateMergedOrganizationResource;
use App\Http\Resources\AffiliateNotes as AffiliateNotesResource;
use App\Http\Resources\AffiliatePerCapita as AffiliatePerCapitaResource;
use App\Http\Resources\EntityType as EntityTypeResource;
use App\Http\Resources\Region as RegionResource;
use App\Http\Resources\Unit as UnitResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class Affiliate extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'affiliateAddresses',
            'affiliateEmails',
            'affiliatePhones',
            'affiliateIndividuals',
            'affiliateSocialmedia',
            'affiliateDuesCategory',
            'affiliateStaff',
            'affiliateCommittee',
            'chapter',
            'AffiliateGeoReach',
            'ParentAffiliate',
            'AffiliatePerCapita',
            'AffiliateMergedOrganization',
            'affiliateOfficers',
            'currentAffiliateOfficers',
            'RetireeEntityType',
            'RetireeDestinationUnit',
            'RetireeDestinationAffiliate',
            'affiliateAddressesOrdered',
            'affiliatePhonesOrdered',
            'affiliateEmailsOrdered',
            'AffiliateDesignation',
            'AffiliateType',
            'Region',
            'AffiliateSector',
        ];
    }

    protected function getSimpleFields(): array
    {
        // TODO: is this the correct place to do this?
        // if (optional(Auth::user())->type === 'admin') {
        //     $fields = array_merge($fields, [
        //         'AffiliatePerCapitaPIN',
        //     ]);
        // }
        return [
            'AffiliateId',
            'AffiliateName',
            'AffiliateNumber',
            'AffiliateGuid',
            'AffiliateAbbreviatedName',
            'AffiliateAcronym',
            'AffiliateEIN',
            'AffiliatePerCapita',
            'AffiliateMergedOrganization',
            'BillHighwayGroupId',
            'IsChartered',
            'ParentAffiliateId',
            'AffiliateGeoReachId',
            'IsAffiliateActive',
            'AffiliateInactiveReasonId',
            'AffiliateInactiveDate',
            'LocationStateAbr',
            'RetireeStaysLocal',
            'RetireeMovesToLargeLocal',
            'ElectionMonth',
            'OfficerTermStartMonth',
            'IsElectionYearOdd',
            'ElectionTermYears',
            'NoNcoaUpdate',
            'NoNationalUpdate',
            'NoStateUpdate',
            'NoLanWanUpdate',
            'NoExternalUpdate',
            'AffiliateWebsite',
            'IsActionNetwork',
            'CharterDate',
            'RetireeEntityTypeId',
            'RetireeDestinationId',
            'UsesAftMemberId',
            'DeletedAt',
            'AffiliatePerCapitaPIN',
        ];
    }

    protected function includeAffiliateAddresses(): AnonymousResourceCollection
    {
        return AffiliateAddress::collection($this->affiliateAddresses);
    }

    protected function includeAffiliateEmails(): AnonymousResourceCollection
    {
        return AffiliateEmail::collection($this->affiliateEmails);
    }

    protected function includeAffiliatePhones(): AnonymousResourceCollection
    {
        return AffiliatePhone::collection($this->affiliatePhones);
    }

    protected function includeAffiliateSocialMedia(): AnonymousResourceCollection
    {
        return AffiliateSocialMedia::collection($this->affiliateSocialmedia);
    }

    protected function includeAffiliateIndividuals(): AnonymousResourceCollection
    {
        return AnonymousResourceCollection::collection([]);
    }

    protected function includeAffiliateDuesCategory(): AnonymousResourceCollection
    {
        return LocalDuesCategory::collection($this->affiliateDuesCategory);
    }

    protected function includeAffiliateStaff(): AnonymousResourceCollection
    {
        return AffiliateStaff::collection($this->affiliateStaff);
    }

    protected function includeAffiliateCommittee(): AnonymousResourceCollection
    {
        return AffiliateCommittee::collection($this->affiliateCommittee);
    }

    protected function includeChapter(): AnonymousResourceCollection
    {
        return Chapter::collection($this->chapter);
    }

    protected function includeAffiliateGeoReach(): \App\Http\Resources\AffiliateGeoReach
    {
        return new AffiliateGeoReachResource($this->AffiliateGeoReach);
    }

    public function includeParentAffiliate(): \App\Http\Resources\Affiliate
    {
        return new AffiliateResource($this->ParentAffiliate);
    }

    public function includeAffiliatePerCapita(): \App\Http\Resources\AffiliatePerCapita
    {
        return new AffiliatePerCapitaResource($this->AffiliatePerCapita);
    }

    public function includeAffiliateMergedOrganization(): \App\Http\Resources\AffiliateMergedOrganization
    {
        return new AffiliateMergedOrganizationResource($this->AffiliateMergedOrganization);
    }

    public function includeAffiliateNotes(): \App\Http\Resources\AffiliateNotes
    {
        return new AffiliateNotesResource($this->AffiliateNotes);
    }

    public function includeAffiliateOfficers(): AnonymousResourceCollection
    {
        return AffiliateOfficer::collection($this->affiliateOfficers);
    }

    protected function includeCurrentAffiliateOfficers(): AnonymousResourceCollection
    {
        return AffiliateOfficer::collection($this->currentAffiliateOfficers);
    }

    public function includeRetireeEntityType(): \App\Http\Resources\EntityType
    {
        return new EntityTypeResource($this->RetireeEntityType);
    }

    public function includeRetireeDestinationUnit(): \App\Http\Resources\Unit
    {
        return new UnitResource($this->RetireeDestinationUnit);
    }

    public function includeRetireeDestinationAffiliate(): \App\Http\Resources\Affiliate
    {
        return new AffiliateResource($this->RetireeDestinationAffiliate);
    }

    public function includeAffiliateDesignation(): \App\Http\Resources\AffiliateDesignation
    {
        return new AffiliateDesignation($this->AffiliateDesignation);
    }

    public function includeAffiliateType(): \App\Http\Resources\AffiliateType
    {
        return new AffiliateType($this->AffiliateType);
    }

    public function includeRegion(): \App\Http\Resources\Region
    {
        return new RegionResource($this->Region);
    }

    protected function includeAffiliateAddressesOrdered(): AnonymousResourceCollection
    {
        return AffiliateAddress::collection($this->affiliateAddressesOrdered);
    }

    protected function includeAffiliatePhonesOrdered(): AnonymousResourceCollection
    {
        return AffiliatePhone::collection($this->affiliatePhonesOrdered);
    }

    protected function includeAffiliateEmailsOrdered(): AnonymousResourceCollection
    {
        return AffiliateEmail::collection($this->affiliateEmailsOrdered);
    }

    protected function includeAffiliateSector(): AnonymousResourceCollection
    {
        return AffiliateSector::collection($this->AffiliateSector);
    }
}

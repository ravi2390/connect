<?php

namespace App\Models\Traits;

use Aft\Permissions\Models\Traits\IsAuthorizable;
use App\Models\Affiliate as AffiliateModel;
use App\Models\AffiliateAddress;
use App\Models\AffiliateCommittee;
use App\Models\AffiliateEmail;
use App\Models\AffiliateMergedOrganization;
use App\Models\AffiliateNotes;
use App\Models\AffiliateOfficer;
use App\Models\AffiliateOfficerRole;
use App\Models\AffiliatePerCapita;
use App\Models\AffiliatePhone;
use App\Models\AffiliateSector;
use App\Models\AffiliateSocialMedia;
use App\Models\AffiliateStaff;
use App\Models\Chapter;
use App\Models\EntityType;
use App\Models\IndividualAffiliate;
use App\Models\LocalDuesCategory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait Affiliate
{
    use IsAuthorizable;

    public function parent(): BelongsTo
    {
        return $this
            ->belongsTo(AffiliateModel::class, 'ParentAffiliateId', 'AffiliateId')
            ->where('AffiliateId', '!=', $this->AffiliateId);
    }

    public function children(): HasMany
    {
        return $this
            ->hasMany(AffiliateModel::class, 'ParentAffiliateId', 'AffiliateId')
            ->where('AffiliateId', '!=', $this->AffiliateId);
    }

    public function affiliateAddresses(): HasMany
    {
        return $this->hasMany(AffiliateAddress::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliateAddressesOrdered(): HasMany
    {
        return $this->hasMany(AffiliateAddress::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function affiliatePhonesOrdered(): HasMany
    {
        return $this->hasMany(AffiliatePhone::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function affiliateEmailsOrdered(): HasMany
    {
        return $this->hasMany(AffiliateEmail::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function affiliateEmails(): HasMany
    {
        return $this->hasMany(AffiliateEmail::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliatePhones(): HasMany
    {
        return $this->hasMany(AffiliatePhone::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliateOfficerRoles(): HasMany
    {
        return $this->hasMany(AffiliateOfficerRole::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliateIndividuals(): HasMany
    {
        return $this->hasMany(IndividualAffiliate::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliateDuesCategory(): HasMany
    {
        return $this->hasMany(LocalDuesCategory::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliateStaff(): HasMany
    {
        return $this->hasMany(AffiliateStaff::class, 'AffiliateId', 'AffiliateId');
    }

    public function currentAffiliateStaff(): HasMany
    {
        return $this->hasMany(AffiliateStaff::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('TermEndDate', 'desc')->current();
    }

    public function affiliateCommittee(): HasMany
    {
        return $this->hasMany(AffiliateCommittee::class, 'AffiliateId', 'AffiliateId');
    }

    public function chapter(): HasMany
    {
        return $this->hasMany(Chapter::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliateSector(): HasMany
    {
        return $this->hasMany(AffiliateSector::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliatePerCapita(): HasOne
    {
        return $this->hasOne(AffiliatePerCapita::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliateMergedOrganization(): HasOne
    {
        return $this->hasOne(AffiliateMergedOrganization::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliateNotes(): HasOne
    {
        return $this->hasOne(AffiliateNotes::class, 'AffiliateId', 'AffiliateId');
    }

    public function affiliateOfficers(): HasMany
    {
        return $this->hasMany(AffiliateOfficer::class, 'AffiliateId', 'AffiliateId');
    }

    public function currentAffiliateOfficers(): HasMany
    {
        return $this->hasMany(AffiliateOfficer::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('TermEndDate', 'desc')->current();
    }

    public function affiliateSocialmedia(): HasMany
    {
        return $this->hasMany(AffiliateSocialMedia::class, 'AffiliateId', 'AffiliateId');
    }

    public function RetireeEntityType(): HasOne
    {
        return $this->hasOne(EntityType::class, 'EntityTypeId', 'RetireeEntityTypeId');
    }

    public function getHasCopeAttribute($value): bool
    {
        return $this->AffiliatePerCapita && (bool) $this->AffiliatePerCapita->HasCope;
    }

    public function getIsVoluntaryAttribute($value): bool
    {
        return $this->AffiliatePerCapita && (bool) $this->AffiliatePerCapita->IsCopeVoluntary;
    }
    //

    public function getHasChaptersAttribute($value): bool
    {
        return $this->AffiliateType && $this->AffiliateType->AffiliateTypeName === 'Federated Local';
    }

    public function RetireeDestinationEntity()
    {
        if (! $this->RetireeEntityTypeId || ! $this->RetireeDestinationId) {
            return null;
        }

        return $this->hasOne("App\\Models\\{$this->RetireeEntityType->EntityTypeName}", "{$this->RetireeEntityType->EntityTypeName}Id", 'RetireeDestinationId')->withoutGlobalScopes()->get()->first();
    }
}

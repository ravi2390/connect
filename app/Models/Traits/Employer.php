<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use Aft\Permissions\Models\Traits\IsAuthorizable;
use App\Helpers\Query;
use App\Models\Affiliate;
use App\Models\Chapter;
use App\Models\EmployerAddress;
use App\Models\EmployerEmail;
use App\Models\EmployerPhone;
use App\Models\LocalAgreement;
use App\Models\Unit;
use App\Models\WorkLocation;
use App\Models\WorkStructure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait Employer
{
    use IsAuthorizable;

    public function EmployerPhones(): HasMany
    {
        return $this->hasMany(EmployerPhone::class, 'EmployerId', 'EmployerId');
    }

    public function EmployerMainPhones(): HasMany
    {
        return $this->hasMany(EmployerPhone::class, 'EmployerId', 'EmployerId')->where('EmployerPhoneTypeId', '1')->orderBy('UpdatedAt', 'desc');
    }

    public function EmployerEmails(): HasMany
    {
        return $this->hasMany(EmployerEmail::class, 'EmployerId', 'EmployerId');
    }

    public function EmployerMainEmails(): HasMany
    {
        return $this->hasMany(EmployerEmail::class, 'EmployerId', 'EmployerId')->where('EmployerEmailTypeId', '1')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('VerifiedDate', 'desc')
            ->orderBy('UpdatedAt', 'desc');
    }

    public function EmployerAddresses(): HasMany
    {
        return $this->hasMany(EmployerAddress::class, 'EmployerId', 'EmployerId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function EmployerPreferredAddresses(): HasMany
    {
        return $this->hasMany(EmployerAddress::class, 'EmployerId', 'EmployerId')->where('IsPreferred', 'true');
    }

    public function EmployerMainAddresses(): HasMany
    {
        return $this->hasMany(EmployerAddress::class, 'EmployerId', 'EmployerId')
            ->where('EmployerAddressTypeId', 1)
            ->WhereIn('ContactStatusId', [2, 4])
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('EmployerAddress.UpdatedAt', 'desc');
    }

    public function WorkStructure(): HasMany
    {
        return $this->hasMany(WorkStructure::class, 'EmployerId', 'EmployerId');
    }

    public function WorkLocation(): HasMany
    {
        return $this->hasMany(WorkLocation::class, 'EmployerId', 'EmployerId');
    }

    public function Chapter(): HasOne
    {
        return $this->hasOne(Chapter::class, 'ChapterId', 'ChapterId');
    }

    public function Unit(): HasMany
    {
        return $this->hasMany(Unit::class, 'EmployerId', 'EmployerId');
    }

    public function LocalAgreements(): HasMany
    {
        return $this->hasMany(LocalAgreement::class, 'EmployerId', 'EmployerId');
    }

    public function getAuthorizableModel(): \App\Models\Affiliate
    {
        return new Affiliate();
    }

    public function buildAuthorizationQuery(Builder $builder, array $ids): void
    {
        $this->filterByAffiliate($builder, $ids);
    }

    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {
        Query::addJoin($builder->getQuery(), 'Chapter', 'Employer', 'ChapterId', 'ChapterId');

        return $builder->whereIn('Chapter.AffiliateId', $ids);
    }
}

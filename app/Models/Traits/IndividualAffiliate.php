<?php

namespace App\Models\Traits;

use App\Models\AffiliateCommitteeMember;
use App\Models\AffiliateGroupMember;
use App\Models\AffiliateOfficer;
use App\Models\AffiliateStaff;
use App\Models\Individual as IndividualModel;
use App\Models\IndividualEducationLevel;
use App\Models\MemberIdMapping;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait IndividualAffiliate
{
    public function Individual(): HasOne
    {
        return $this->hasOne(IndividualModel::class, 'IndividualId', 'IndividualId');
    }

    public function individualOfficers(): HasMany
    {
        return $this->hasMany(AffiliateOfficer::class, 'IndividualId', 'IndividualId');
    }

    public function currentIndividualOfficers(): HasMany
    {
        return $this->hasMany(AffiliateOfficer::class, 'IndividualId', 'IndividualId')->current();
    }

    public function pastIndividualOfficers(): HasMany
    {
        return $this->hasMany(AffiliateOfficer::class, 'IndividualId', 'IndividualId')->past();
    }

    public function individualStaff(): HasMany
    {
        return $this->hasMany(AffiliateStaff::class, 'IndividualId', 'IndividualId');
    }

    public function currentIndividualStaff(): HasMany
    {
        return $this->hasMany(AffiliateStaff::class, 'IndividualId', 'IndividualId')->current();
    }

    public function pastIndividualStaff(): HasMany
    {
        return $this->hasMany(AffiliateStaff::class, 'IndividualId', 'IndividualId')->past();
    }

    public function individualCommitteeMember(): HasMany
    {
        return $this->hasMany(AffiliateCommitteeMember::class, 'IndividualId', 'IndividualId')->current();
    }

    public function currentIndividualCommitteeMember(): HasMany
    {
        return $this->hasMany(AffiliateCommitteeMember::class, 'IndividualId', 'IndividualId')->current();
    }

    public function pastIndividualCommitteeMember(): HasMany
    {
        return $this->hasMany(AffiliateCommitteeMember::class, 'IndividualId', 'IndividualId')->past();
    }

    public function individualEducationLevel(): HasOne
    {
        return $this->hasOne(IndividualEducationLevel::class, 'IndividualId', 'IndividualId');
    }

    public function individualGroupMember(): HasMany
    {
        return $this->hasMany(AffiliateGroupMember::class, 'IndividualId', 'IndividualId');
    }

    public function currentIndividualGroupMember(): HasMany
    {
        return $this->hasMany(AffiliateGroupMember::class, 'IndividualId', 'IndividualId')->current();
    }

    public function pastIndividualGroupMember(): HasMany
    {
        return $this->hasMany(AffiliateGroupMember::class, 'IndividualId', 'IndividualId')->past();
    }

    public function memberIdMapping(): HasMany
    {
        return $this->hasMany(MemberIdMapping::class, 'IndividualId', 'IndividualId')
            ->orderBy('UpdatedAt', 'desc');
    }

    public function scopeCurrent($query)
    {
        return $query
            ->where('IndividualAffiliate.StartDate', '<=', Carbon::today())
            ->where(function ($query): void {
                $query->where('IndividualAffiliate.EndDate', '>=', Carbon::today())
                    ->orWhereNull('IndividualAffiliate.EndDate');
            });
    }

    public function scopeEnded($query)
    {
        return $query->whereNotNull('EndDate')->where('EndDate', '<=', Carbon::now()->endOfDay());
    }
}

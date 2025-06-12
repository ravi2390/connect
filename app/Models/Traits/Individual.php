<?php

namespace App\Models\Traits;

use Database\Seeders\helpers;
use Aft\Permissions\Models\Traits\IsAuthorizable;
use App\Helpers\Query;
use App\Models\Affiliate;
use App\Models\IndividualAddress;
use App\Models\IndividualAffiliate;
use App\Models\IndividualAssessment;
use App\Models\IndividualCope;
use App\Models\IndividualEducationLevel;
use App\Models\IndividualEmail;
use App\Models\IndividualEmployer;
use App\Models\IndividualPhone;
use App\Models\IndividualQuickComment;
use App\Models\IndividualSocialMedia;
use App\Models\MemberIdMapping;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

trait Individual
{
    use IsAuthorizable;

    protected static function boot()
    {
        parent::boot();

        //@TODO: maybe revisit this with a more generic solution. For now, due to inconsistent naming this is not possible.
        static::creating(function ($model): void {
            // Guid may already be populated (when migrating, in particular).
            if (empty($model->IndividualGuid)) {
                $model->IndividualGuid = Uuid::uuid4()->toString();
            }
            $model->IsPoliticallyActive = false;
            $model->IsRegisteredVoter = false;
        });
    }

    public function individualAddressesOrdered(): HasMany
    {
        return $this->hasMany(IndividualAddress::class, 'IndividualId', 'IndividualId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function individualAffiliates(): HasMany
    {
        return $this->hasMany(IndividualAffiliate::class, 'IndividualId', 'IndividualId');
    }

    public function activeIndividualAffiliates(): HasMany
    {
        return $this->individualAffiliates()->current();
    }

    public function inActiveIndividualAffiliates(): HasMany
    {
        return $this->individualAffiliates()->ended();
    }

    public function lastDeactivatedIndividualAffiliate(): HasMany
    {
        return $this->inActiveIndividualAffiliates()->when($this->activeIndividualAffiliates->count() === 0, function ($query): void {
            $query->orderBy('EndDate', 'DESC')->limit(3);
        });
    }

    public function latestActiveIndividualAffiliate(): ?IndividualAffiliate
    {
        return $this->activeIndividualAffiliates()->latest()->first();
    }

    public function individualEducationLevels(): HasMany
    {
        return $this->hasMany(IndividualEducationLevel::class, 'IndividualId', 'IndividualId');
    }

    public function individualQuickComments(): HasMany
    {
        return $this->hasMany(IndividualQuickComment::class, 'IndividualId', 'IndividualId');
    }

    public function individualEmployers(): HasMany
    {
        return $this->hasMany(IndividualEmployer::class, 'IndividualId', 'IndividualId');
    }

    public function activeIndividualEmployers(): HasMany
    {
        return $this->individualEmployers()
            ->leftJoin('Employer', 'Employer.EmployerId', '=', 'IndividualEmployer.EmployerId')
            ->current();
    }

    public function individualMembers(): HasMany
    {
        return $this->hasMany(MemberIdMapping::class, 'IndividualId', 'IndividualId');
    }

    public function individualEmailsOrdered(): HasMany
    {
        return $this->hasMany(IndividualEmail::class, 'IndividualId', 'IndividualId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function individualPhonesOrdered(): HasMany
    {
        return $this->hasMany(IndividualPhone::class, 'IndividualId', 'IndividualId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function individualSocialmedia(): HasMany
    {
        return $this->hasMany(IndividualSocialMedia::class, 'IndividualId', 'IndividualId');
    }

    public function individualAssessments(): HasMany
    {
        return $this->hasMany(IndividualAssessment::class, 'IndividualId', 'IndividualId');
    }

    public function individualCope(): HasMany
    {
        return $this->hasMany(IndividualCope::class, 'IndividualId', 'IndividualId');
    }

    public function filterByAffiliate(Builder $builder, array $ids): Builder
    {
        Query::addJoin($builder->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId', [], false);

        return $builder->whereIn('IndividualAffiliate.AffiliateId', $ids);
    }

    public function getAuthorizableModel(): \App\Models\Affiliate
    {
        return new Affiliate();
    }

    public function buildAuthorizationQuery(Builder $builder, array $ids): void
    {
        $this->filterByAffiliate($builder, $ids);
    }

    public function getFullNameAttribute(): string
    {
        return $this->FirstName.' '.$this->LastName;
    }
}

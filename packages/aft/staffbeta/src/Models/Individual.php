<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Individual extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'Individual';

    protected $primaryKey = 'IndividualId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'IndividualAffiliates',
        'IndividualEmployers',
        'IndividualAddresses',
        'IndividualPhones',
        'IndividualEmails',
        'AffiliateOfficership',
    ];

    protected $appends = [
        'FullName',
    ];

    protected $visible = [
        'IndividualId',
        'FullName',
        'FirstName',
        'MiddleName',
        'LastName',
        'PreferredName',
        'IndividualAffiliates',
        'IndividualAffiliatesAll',
        'IndividualEmployers',
        'IndividualAddresses',
        'IndividualPhones',
        'IndividualEmails',
        'AffiliateOfficership',
    ];

    protected function asDateTime($value)
    {
        $value = preg_replace('/\.[0-9]+$/', '', (string) $value);

        return parent::asDateTime(Carbon::parse($value));
    }

    #[\Override]
    protected static function boot()
    {
        parent::boot();
        static::$snakeAttributes = false;
    }

    public function getFullNameAttribute(): array|string|null
    {
        $name = trim($this->FirstName.' '.$this->MiddleName.' '.$this->LastName);

        return preg_replace('/\s+/', ' ', $name);
    }

    public function IndividualAffiliates(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\IndividualAffiliate::class, 'IndividualId', 'IndividualId');
    }

    public function IndividualAffiliatesAll(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\IndividualAffiliate::class, 'IndividualId', 'IndividualId')->withoutGlobalScopes();
    }

    public function IndividualEmployers(): HasMany
    {
        return $this->hasMany(\App\Models\IndividualEmployer::class, 'IndividualId', 'IndividualId');
    }

    public function IndividualAddresses(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\IndividualAddress::class, 'IndividualId');
    }

    public function IndividualPhones(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\IndividualPhone::class, 'IndividualId');
    }

    public function IndividualEmails(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\IndividualEmail::class, 'IndividualId');
    }

    public function AffiliateOfficership(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\AffiliateOfficer::class, 'IndividualId', 'IndividualId');
    }
}

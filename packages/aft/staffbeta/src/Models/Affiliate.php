<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Affiliate extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'Affiliate';

    protected $primaryKey = 'AffiliateId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
    ];

    protected $appends = [
    ];

    protected $visible = [
        'AffiliateId',
        'AffiliateGuid',
        'AffiliateAbbreviatedName',
        'AffiliateAcronym',
        'AffiliateName',
        'AffiliateNumber',
        'AffiliatePhones',
        'AffiliateEmails',
        'AffiliateAddresses',
        'AffiliateWebsite',
        'AffiliatePerCapita',
        'CharterDate',
        'AffiliatePhonesOrdered',
        'AffiliateEmailsOrdered',
        'AffiliateAddressesOrdered',
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

    public function AffiliateEmails(): HasMany
    {
        return $this->hasMany(\App\Models\AffiliateEmail::class, 'AffiliateId');
    }

    public function AffiliatePhones(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\AffiliatePhone::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliateAddresses(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\AffiliateAddress::class, 'AffiliateId');
    }

    public function AffiliatePerCapita(): HasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\AffiliatePerCapita::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliateAddressesOrdered(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\AffiliateAddress::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function AffiliatePhonesOrdered(): HasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\AffiliatePhone::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }

    public function AffiliateEmailsOrdered(): HasMany
    {
        return $this->hasMany(\App\Models\AffiliateEmail::class, 'AffiliateId', 'AffiliateId')
            ->orderBy('IsPreferred', 'desc')
            ->orderBy('ContactStatusId', 'desc')
            ->orderBy('UpdatedAt', 'desc')
            ->whereIn('ContactStatusId', [2, 4]);
    }
}

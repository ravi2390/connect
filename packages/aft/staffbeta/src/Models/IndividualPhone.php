<?php

namespace Aft\StaffBeta\Models;

use App\Models\ContactRestriction;
use App\Models\ContactStatus;
use App\Models\IndividualPhoneType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class IndividualPhone extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'IndividualPhone';

    protected $primaryKey = 'IndividualPhoneId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'IndividualPhoneType',
        'ContactStatus',
        'CanTextRestriction',
        'CanCallRestriction',
        'Country'
    ];

    protected $appends = [
    ];

    protected $visible = [
        'IsPreferred',
        'VerifiedDate',
        'PhoneNumber',
        'Extension',
        'IndividualPhoneType',
        'ContactStatus',
        'CanTextRestriction',
        'CanCallRestriction',
        'Country',
    ];

    protected $casts = [
        'IsPreferred' => 'boolean',
    ];

    protected function asDateTime($value)
    {
        $value = preg_replace('/\.\d+$/', '', (string) $value);

        return parent::asDateTime(Carbon::parse($value));
    }

    #[\Override]
    protected static function boot()
    {
        parent::boot();
        static::$snakeAttributes = false;
    }

    public function IndividualPhoneType(): HasOne
    {
        return $this->hasOne(IndividualPhoneType::class, 'IndividualPhoneTypeId', 'IndividualPhoneTypeId');
    }

    public function ContactStatus(): HasOne
    {
        return $this->hasOne(ContactStatus::class, 'ContactStatusId', 'ContactStatusId');
    }

    public function CanTextRestriction(): HasOne
    {
        return $this->hasOne(ContactRestriction::class, 'ContactRestrictionId', 'CanTextRestrictionId');
    }

    public function CanCallRestriction(): HasOne
    {
        return $this->hasOne(ContactRestriction::class, 'ContactRestrictionId', 'CanCallRestrictionId');
    }

    public function Country(): HasOne
    {
        return $this->hasOne(\App\Models\Country::class, 'CountryId', 'CountryId');
    }
}

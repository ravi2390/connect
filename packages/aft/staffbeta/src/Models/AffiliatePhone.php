<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class AffiliatePhone extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliatePhone';

    protected $primaryKey = 'AffiliatePhoneId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'AffiliatePhoneType',
    ];

    protected $appends = [
    ];

    protected $visible = [
        'IsPreferred',
        'VerifiedDate',
        'PhoneNumber',
        'Extension',
        'AffiliatePhoneType',
        'ContactStatus',
        'CanTextRestriction',
        'CanCallRestriction',
    ];

    protected $casts = [
        'IsPreferred' => 'boolean',
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

    public function AffiliatePhoneType(): HasOne
    {
        return $this->hasOne(\App\Models\AffiliatePhoneType::class, 'AffiliatePhoneTypeId', 'AffiliatePhoneTypeId');
    }
}

<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class AffiliateAddress extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliateAddress';

    protected $primaryKey = 'AffiliateAddressId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'StateTerritory',
    ];

    protected $appends = [
        'AffiliateAddressType',
    ];

    protected $visible = [
        'AffiliateAddressType',
        'AddressLine1',
        'AddressLine2',
        'City',
        'StateTerritory',
        'PostalCode',
        'ContactStatus',
        'IsPreferred',
        'VerifiedDate',
        'CanVisitRestriction',
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

    public function getAffiliateAddressTypeAttribute()
    {
        $type = DB::connection('aftdb')->table('AffiliateAddressType')
            ->select('AffiliateAddressTypeName')
            ->where('AffiliateAddressTypeId', '=', $this->AffiliateAddressTypeId)
            ->first();

        return $type->AffiliateAddressTypeName ?? '';
    }

    public function StateTerritory(): HasOne
    {
        return $this->hasOne(\App\Models\StateTerritory::class, 'StateTerritoryId', 'StateTerritoryId');
    }
}

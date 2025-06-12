<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class IndividualAddress extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'IndividualAddress';

    protected $primaryKey = 'IndividualAddressId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'StateTerritory',
        'ContactStatus',
        'CanVisitRestriction',
        'CanSendMailRestriction',
    ];

    protected $appends = [
        'IndividualAddressType',
    ];

    protected $visible = [
        'IndividualAddressType',
        'AddressLine1',
        'AddressLine2',
        'City',
        'StateTerritory',
        'PostalCode',
        'ContactStatus',
        'IsPreferred',
        'VerifiedDate',
        'ContactStatus',
        'CanVisitRestriction',
        'CanSendMailRestriction',
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

    public function getIndividualAddressTypeAttribute()
    {
        $type = DB::connection('aftdb')->table('IndividualAddressType')
            ->select('IndividualAddressTypeName')
            ->where('IndividualAddressTypeId', '=', $this->IndividualAddressTypeId)
            ->first();

        return $type->IndividualAddressTypeName ?? '';
    }

    public function StateTerritory(): HasOne
    {
        return $this->hasOne(\App\Models\StateTerritory::class, 'StateTerritoryId', 'StateTerritoryId');
    }

    public function ContactStatus(): HasOne
    {
        return $this->hasOne(\App\Models\ContactStatus::class, 'ContactStatusId', 'ContactStatusId');
    }

    public function CanVisitRestriction(): HasOne
    {
        return $this->hasOne(\App\Models\ContactRestriction::class, 'ContactRestrictionId', 'CanVisitRestrictionId');
    }

    public function CanSendMailRestriction(): HasOne
    {
        return $this->hasOne(\App\Models\ContactRestriction::class, 'ContactRestrictionId', 'CanSendMailRestrictionId');
    }
}

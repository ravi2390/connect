<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class IndividualEmail extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'IndividualEmail';

    protected $primaryKey = 'IndividualEmailId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'IndividualEmailType',
        'ContactStatus',
        'CanContactRestriction',
    ];

    protected $appends = [
    ];

    protected $visible = [
        'IsPreferred',
        'VerifiedDate',
        'Email',
        'IndividualEmailType',
        'ContactStatus',
        'CanContactRestriction',
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

    public function IndividualEmailType(): HasOne
    {
        return $this->hasOne(\App\Models\IndividualEmailType::class, 'IndividualEmailTypeId', 'IndividualEmailTypeId');
    }

    public function ContactStatus(): HasOne
    {
        return $this->hasOne(\App\Models\ContactStatus::class, 'ContactStatusId', 'ContactStatusId');
    }

    public function CanContactRestriction(): HasOne
    {
        return $this->hasOne(\App\Models\ContactRestriction::class, 'ContactRestrictionId', 'CanContactRestrictionId');
    }
}

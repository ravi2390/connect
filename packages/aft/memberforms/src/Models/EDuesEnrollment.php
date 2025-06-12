<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EDuesEnrollment extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_eDues_enrollment';

    protected $primaryKey = 'EDuesEnrollmentId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];

    public function Affiliate(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Affiliate::class, 'AffiliateId', 'AffiliateId')
            ->withoutGlobalScopes();
    }

    public function Individual(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Individual::class, 'IndividualId', 'IndividualId')
            ->withoutGlobalScopes();
    }

    public function EDuesErrors(): HasMany
    {
        return $this->hasMany(EDuesError::class, 'EDuesEnrollmentId', 'EDuesEnrollmentId')
            ->orderByDesc('UpdatedAt')
            ->orderByDesc('CreatedAt');
    }
}

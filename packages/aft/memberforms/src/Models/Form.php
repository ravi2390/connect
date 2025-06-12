<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User;

class Form extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_forms';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];

    protected $casts = [
        'affiliate_id' => 'integer',
        'sources' => 'array',
        'destinations' => 'array',
        'fields' => 'array',
        'thankyou_fields' => 'array',
        'show_aft_logo' => 'boolean',
        'show_local_logo' => 'boolean',
        'show_fed_logo' => 'boolean',
        'work_location_fields' => 'array',
        'employment_information_fields' => 'array',
        'confirmation_email_fields' => 'array',
    ];

    protected $appends = [
        'url',
    ];

    public function Affiliate(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Affiliate::class, 'affiliate_id', 'AffiliateId')
            ->withoutGlobalScopes();
    }

    public function Template(): HasOne
    {
        return $this->hasOne(Template::class, 'id', 'form_template_id');
    }

    public function CreatedBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'CreatedBy');
    }

    public function UpdatedBy(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'UpdatedBy');
    }

    public function FormSubmissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class, 'form_id', 'id');
    }

    public function GetUrlAttribute(): string
    {
        return '/form/'.$this->getKey();
    }
}

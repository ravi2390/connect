<?php

namespace Aft\Permissions\Models;

use Aft\Audit\Auditable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuthUserAbility extends Model
{
    use Auditable, SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $guarded = [];

    protected $with = [
        'AuthAbility',
    ];

    protected $casts = [];

    protected $hidden = [
        'id',
        'user_id',
        'ability_id',
        'CreatedBy',
        'UpdatedBy',
        self::CREATED_AT,
        self::UPDATED_AT,
        self::DELETED_AT,
    ];

    public function AuthAbility(): HasOne
    {
        return $this->hasOne(\Aft\Permissions\Models\AuthAbility::class, 'id', 'ability_id');
    }
}

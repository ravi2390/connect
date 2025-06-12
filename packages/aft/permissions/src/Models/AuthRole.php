<?php

namespace Aft\Permissions\Models;

use Aft\Audit\Auditable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuthRole extends Model
{
    use Auditable, SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $casts = [
        'ability_base' => 'array',
    ];

    protected $hidden = [
        'CreatedBy',
        'UpdatedBy',
        self::CREATED_AT,
        self::UPDATED_AT,
        self::DELETED_AT,
    ];
}

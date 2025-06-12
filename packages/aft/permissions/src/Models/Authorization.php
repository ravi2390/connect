<?php

namespace Aft\Permissions\Models;

use Aft\Audit\Auditable;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Authorization extends Model
{
    use Auditable, SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $with = [
        'role',
    ];

    protected $hidden = [
        'CreatedBy',
        'UpdatedBy',
        self::CREATED_AT,
        self::UPDATED_AT,
        self::DELETED_AT,
    ];

    protected $casts = [
        'entity_id' => 'integer',
    ];

    protected $fillable = [
        'user_id', 'role_id',
        'entity_type', 'entity_id', 'entity_inherit',
        'order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function role()
    {
        return $this->hasOne(AuthRole::class, 'id', 'role_id');
    }

    public function entity()
    {
        return $this->MorphTo();
    }
}

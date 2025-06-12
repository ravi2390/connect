<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OfficerRoleTitle extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'OfficerRoleTitle';

    protected $primaryKey = 'OfficerRoleTitleId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
    ];

    protected $appends = [
    ];

    protected $casts = [
        'DisplayOrder' => 'integer',
    ];

    protected $visible = [
        'OfficerRoleTitleName',
        'DisplayOrder',
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
}

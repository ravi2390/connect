<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class AffiliateStaff extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliateStaff';

    protected $primaryKey = 'AffiliateStaffId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'StaffDepartment',
    ];

    protected $appends = [
    ];

    protected $visible = [
        'StaffDepartment',
        'StaffTitle',
        'Individual',
    ];

    protected $casts = [
        'IsCurrent' => 'boolean',
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

        static::addGlobalScope('current', function (Builder $builder): void {
            $builder->whereNull('TermEndDate')
                ->orWhere('TermEndDate', '>', Carbon::now()->startOfDay());
        });
    }

    public function StaffDepartment(): HasOne
    {
        return $this->hasOne(\App\Models\StaffDepartment::class, 'StaffDepartmentId', 'StaffDepartmentId');
    }

    public function Individual(): HasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\Individual::class, 'IndividualId', 'IndividualId');
    }
}

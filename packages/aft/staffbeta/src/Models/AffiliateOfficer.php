<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class AffiliateOfficer extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliateOfficer';

    protected $primaryKey = 'AffiliateOfficerId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'Affiliate',
        'AffiliateOfficerRole',
    ];

    protected $appends = [
    ];

    protected $visible = [
        'Affiliate',
        'AffiliateOfficerRole',
        'TermStartDate',
        'TermEndDate',
        'IsElected',
        'IsCurrent',
        'IsPreferredTitle',
        'Individual',
    ];

    protected $casts = [
        'IsElected' => 'boolean',
        'IsCurrent' => 'boolean',
        'IsPreferredTitle' => 'boolean',
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

    public function Affiliate(): HasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\Affiliate::class, 'AffiliateId', 'AffiliateId');
    }

    public function AffiliateOfficerRole(): HasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\AffiliateOfficerRole::class, 'AffiliateOfficerRoleId', 'AffiliateOfficerRoleId');
    }

    public function Individual(): HasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\Individual::class, 'IndividualId', 'IndividualId');
    }
}

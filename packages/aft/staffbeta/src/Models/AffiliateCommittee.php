<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class AffiliateCommittee extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliateCommittee';

    protected $primaryKey = 'AffiliateCommitteeId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'CommitteeType',
    ];

    protected $appends = [
    ];

    protected $visible = [
        'AffiliateCommitteeId',
        'AffiliateCommitteeName',
        'Description',
        'CommitteeType',
    ];

    protected $casts = [
        'AffiliateCommitteeId' => 'integer',
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

    public function CommitteeType(): hasMany
    {
        return $this->hasMany(\Aft\StaffBeta\Models\CommitteeType::class, 'CommitteeTypeId', 'CommitteeTypeId');
    }
}

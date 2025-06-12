<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class IndividualAffiliate extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'IndividualAffiliate';

    protected $primaryKey = 'IndividualAffiliateId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'Affiliate',
    ];

    protected $appends = [
        'UnionRelationshipType',
        'LocalDuesCategory',
        'MemberId',
    ];

    protected $visible = [
        'Affiliate',
        'UnionRelationshipType',
        'LocalDuesCategory',
        'MemberId',
        'EndDate',
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
            $builder->whereNull('EndDate')
                ->orWhere('EndDate', '>', Carbon::now()->startOfDay());
        });
    }

    public function Affiliate(): HasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\Affiliate::class, 'AffiliateId', 'AffiliateId');
    }

    public function getMemberIdAttribute()
    {
        $memberId = DB::connection('aftdb')->table('MemberIdMapping')
            ->select('MemberId')
            ->where('AffiliateId', '=', $this->AffiliateId)
            ->where('IndividualId', '=', $this->IndividualId)
            ->first();

        return $memberId->MemberId ?? '';
    }

    public function getUnionRelationshipTypeAttribute()
    {
        $relType = DB::connection('aftdb')->table('UnionRelationshipType')
            ->select('UnionRelationshipTypeName')
            ->where('UnionRelationshipTypeId', '=', $this->UnionRelationshipTypeId)
            ->first();

        return $relType->UnionRelationshipTypeName;
    }

    public function getLocalDuesCategoryAttribute()
    {
        $dues = DB::connection('aftdb')->table('LocalDuesCategory')
            ->select('LocalDuesCategoryName')
            ->where('LocalDuesCategoryId', '=', $this->LocalDuesCategoryId)
            ->first();

        return $dues->LocalDuesCategoryName ?? '';
    }

    public function MemberIdMapping(): HasMany
    {
        return $this->hasMany(\App\Models\MemberIdMapping::class, 'IndividualId', 'IndividualId');
    }
}

<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class AffiliateOfficerRole extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliateOfficerRole';

    protected $primaryKey = 'AffiliateOfficerRoleId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
        'OfficerRoleTitle',
    ];

    protected $appends = [
    ];

    protected $visible = [
        'AffiliateOfficerRoleName',
        'OfficerRoleTitle',
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

    public function OfficerRoleTitle(): hasOne
    {
        return $this->hasOne(\Aft\StaffBeta\Models\OfficerRoleTitle::class, 'OfficerRoleTitleId', 'OfficerRoleTitleId');
    }

    /*public function getOfficerRoleTitleAttribute() {
        $title = DB::connection('aftdb')->table('OfficerRoleTitle as Title')
            ->join('OfficerRoleType as Type', 'Title.OfficerRoleTypeId', '=', 'Type.OfficerRoleTypeId')
            ->where('OfficerRoleTitleId', '=', $this->OfficerRoleTitleId)
            ->whereNull('Title.DeletedAt')
            ->whereNull('Type.DeletedAt')
            ->first();
        if ($title) {
            return [
                'OfficerRoleTitleName' => $title->OfficerRoleTitleName,
                'OfficerRoleTypeName' => $title->OfficerRoleTypeName,
                'DisplayOrder' => $title->DisplayOrder,
            ];
        }
        return [];
    }*/
}

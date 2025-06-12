<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberFormAssign extends Model
{
    use SoftDeletes;

    protected $connection = 'sqlsrv';

    protected $table = 'member_form_assign';

    protected $primaryKey = 'id';

    public $incrementing = true;

    public $timestamps = true;

    public $guarded = [];

    public function Affiliates(): HasOne
    {
        return $this->hasOne(Affiliate::class, 'AffiliateId', 'affiliate_id');
    }
}

<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;

class AffiliateLogo extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'affiliate_logo';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $fillable = ['id', 'fed_logo', 'local_logo', 'affiliate_id', 'CreatedAt', 'UpdatedAt'];
}

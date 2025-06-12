<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;

class DuesMapping extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'dues_mapping';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $fillable = ['dues_category_id', 'bill_highway_type_id', 'affiliate_id', 'CreatedAt', 'UpdatedAt', 'DeletedAt'];
}

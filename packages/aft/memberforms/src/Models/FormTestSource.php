<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;

class FormTestSource extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_test_sources';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];

    protected $hidden = [
        'CreatedAt',
        'CreatedBy',
        'UpdatedAt',
        'UpdatedBy',
        'DeletedAt',
    ];

    protected $casts = [
        //'default' => 'array',
    ];
}

<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_templates';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];

    protected $casts = [
        'parameters' => 'array',
        'sources' => 'array',
        'destinations' => 'array',
        'fields' => 'array',
        'optional_fields' => 'array',
        'thankyou_fields' => 'array',
        'confirmation_email_fields' => 'array',
    ];
}

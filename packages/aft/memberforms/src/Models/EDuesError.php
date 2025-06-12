<?php


namespace Aft\MemberForms\Models;

use \Illuminate\Database\Eloquent\Model;

class EDuesError extends Model
{
    const CREATED_AT = 'CreatedAt';
    const UPDATED_AT = 'UpdatedAt';
    protected $connection = 'sqlsrv';
    protected $table = 'memberforms_eDues_error';
    protected $primaryKey = 'ErrorId';
    public $incrementing = true;
    protected $keyType = 'integer';
    public $timestamps = false;
    protected $dateFormat = 'Y-m-d H:i:s.u0';
    protected $guarded = [];
}

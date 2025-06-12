<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;

class SubmissionStatus extends Model
{
    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_submission_status';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];
}

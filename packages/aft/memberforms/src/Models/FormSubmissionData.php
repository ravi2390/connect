<?php

namespace Aft\MemberForms\Models;

use Illuminate\Database\Eloquent\Model;

class FormSubmissionData extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_submission_data';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];

    public function FormSubmission()
    {
        return $this->belongsTo(\Aft\MemberForms\Models\FormSubmission::class, 'submission_id', 'id');
    }
}

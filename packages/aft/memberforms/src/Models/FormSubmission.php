<?php

namespace Aft\MemberForms\Models;

use App\Models\Individual;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormSubmission extends Model
{
    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'sqlsrv';

    protected $table = 'memberforms_submission';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = false;

    protected $dateFormat = 'Y-m-d H:i:s.u0';

    protected $guarded = [];

    public function Form(): BelongsTo
    {
        return $this->belongsTo(Form::class, 'form_id', 'id');
    }

    public function FormSubmissionData(): HasMany
    {
        return $this->hasMany(FormSubmissionData::class, 'submission_id', 'id');
    }

    public function SubmissionStatus(): BelongsTo
    {
        return $this->belongsTo(SubmissionStatus::class, 'submission_status_id', 'id');
    }

    public function Individual(): BelongsTo
    {
        return $this->belongsTo(Individual::class, 'IndividualId', 'IndividualId');
    }
}

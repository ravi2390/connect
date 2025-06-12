<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Relations\HasOne;

trait IndividualQuickComment
{
    public function IndividualAssessment(): HasOne
    {
        return $this->hasOne(\App\Models\IndividualAssessment::class, 'IndividualQuickCommentId', 'IndividualQuickCommentId');
    }

    public function Action(): HasOne
    {
        return $this->hasOne(\App\Models\Action::class, 'IndividualQuickCommentId', 'IndividualQuickCommentId');
    }
}

<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Http\Resources\Action as ActionResource;
use App\Models\Action;

class ActionController
{
    public function __invoke(int $commentId): ActionResource
    {
        return new ActionResource(Action::query()
            ->where('IndividualQuickCommentId', '=', $commentId)
            // ->orderBy('ActionDate', 'desc')
            ->orderBy('ActionId', 'desc')
            ->first());
    }
}

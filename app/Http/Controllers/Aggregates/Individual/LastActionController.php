<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Http\Resources\Action as ActionResource;
use App\Models\Action;

class LastActionController
{
    public function __invoke(int $individualId): ActionResource
    {
        return new ActionResource(Action::query()
            ->where('IndividualId', '=', $individualId)
            // ->orderBy('ActionDate', 'desc')
            ->orderBy('ActionId', 'desc')
            ->first());
    }
}

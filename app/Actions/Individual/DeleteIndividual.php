<?php

namespace App\Actions\Individual;

use App\Models\Individual;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteIndividual
{

    use AsAction;

    protected function handle(Individual $individual, Carbon $endDate): void
    {
        $individual->update(['DeletedAt' => $endDate]);
    }
}

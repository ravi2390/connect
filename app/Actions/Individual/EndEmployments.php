<?php

namespace App\Actions\Individual;

use App\Models\Individual;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class EndEmployments
{

    use AsAction;

    protected function handle(Individual $individual, Carbon $endDate): void
    {
        $individual->individualEmployers()->update(['EndDate' => $endDate, 'CurrentlyWorking' => false]);
    }
}

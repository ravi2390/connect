<?php

namespace App\Actions\Individual;

use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class EndAffiliations
{

    use AsAction;

    protected function handle(IndividualAffiliate $individualAffiliate, Carbon $endDate): void
    {
        $individualAffiliate->update(['EndDate' => $endDate, 'IsCurrent' => $endDate->isFuture()]);
    }
}

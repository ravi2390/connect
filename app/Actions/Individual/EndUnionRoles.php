<?php

namespace App\Actions\Individual;

use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class EndUnionRoles
{

    use AsAction;

    protected function handle(IndividualAffiliate $individualAffiliate, Carbon $endDate): void
    {
        $individualAffiliate->individualOfficers()->update(['TermEndDate' => $endDate, 'IsCurrent' => $endDate->isFuture()]);
    }
}

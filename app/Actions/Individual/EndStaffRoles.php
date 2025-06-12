<?php

namespace App\Actions\Individual;

use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class EndStaffRoles
{

    use AsAction;

    protected function handle(IndividualAffiliate $individualAffiliate, Carbon $endDate): void
    {
        $individualAffiliate->individualStaff()->update(['TermEndDate' => $endDate, 'IsCurrent' => false]);
    }
}

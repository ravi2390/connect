<?php

namespace App\Actions\Individual\Workflow;

use App\Actions\Individual\EndAffiliations;
use App\Actions\Individual\EndCommitteeMembership;
use App\Actions\Individual\EndEmployments;
use App\Actions\Individual\EndStaffRoles;
use App\Actions\Individual\EndUnionRoles;
use App\Actions\Individual\SetStopReasonIndividual;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class QuitEmploymentStopReason
{

    use AsAction;

    protected function handle(
        IndividualAffiliate $individualAffiliate,
        string $stopReason,
        Carbon $endDate,
    ): array {
        DB::transaction(function () use ($individualAffiliate, $stopReason, $endDate): void {
            SetStopReasonIndividual::run(individualAffiliate: $individualAffiliate, stopReason: $stopReason);
            EndAffiliations::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
            EndUnionRoles::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
            EndStaffRoles::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
            EndCommitteeMembership::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
            EndEmployments::run(individual: $individualAffiliate->Individual, endDate: $endDate);
        });

        return [
            'message' => 'ok',
            'statusCode' => 205,
        ];
    }
}

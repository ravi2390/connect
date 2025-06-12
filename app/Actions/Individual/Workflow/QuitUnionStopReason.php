<?php

namespace App\Actions\Individual\Workflow;

use App\Actions\Individual\CopyUnionMembership;
use App\Actions\Individual\EndCommitteeMembership;
use App\Actions\Individual\EndStaffRoles;
use App\Actions\Individual\EndUnionRoles;
use App\Actions\Individual\SetStopReasonIndividual;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class QuitUnionStopReason
{

    use AsAction;

    protected function handle(
        IndividualAffiliate     $individualAffiliate,
        string                  $stopReason,
        Carbon                  $endDate,
    ): array
    {
        DB::transaction(function () use ($individualAffiliate, $stopReason, $endDate): void {
            SetStopReasonIndividual::run(individualAffiliate: $individualAffiliate, stopReason: $stopReason);
            $affiliateSector = $individualAffiliate->Affiliate->AffiliateSector;
            $sector = count($affiliateSector) > 0 ? $affiliateSector[0]->SectorId : 0;
            $relationship = $sector == 3 ? 'Agency Fee Payer' : 'Potential Member';
            CopyUnionMembership::run(
                individualAffiliate: $individualAffiliate,
                endDate: $endDate,
                newUnionRelationship: $relationship,
                additionalProperties: [
                    'LocalDuesCategoryId' => null,
                ],
            );
            EndUnionRoles::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
            EndStaffRoles::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
            EndCommitteeMembership::run(individualAffiliate: $individualAffiliate, endDate: $endDate);
        });

        return [
            'message' => 'ok',
            'statusCode' => 205,
        ];
    }
}

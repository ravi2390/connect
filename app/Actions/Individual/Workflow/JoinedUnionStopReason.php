<?php

namespace App\Actions\Individual\Workflow;

use App\Actions\Individual\CopyUnionMembership;
use App\Actions\Individual\SetStopReasonIndividual;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class JoinedUnionStopReason
{

    use AsAction;

    protected function handle(
        IndividualAffiliate $individualAffiliate,
        string $stopReason,
        Carbon $endDate,
    ): array {
        DB::transaction(function () use ($individualAffiliate, $stopReason, $endDate): void {
            SetStopReasonIndividual::run(individualAffiliate: $individualAffiliate, stopReason: $stopReason);
            CopyUnionMembership::run(
                individualAffiliate: $individualAffiliate,
                endDate: $endDate,
                newUnionRelationship: 'Member',
                additionalProperties: [
                    'LocalDuesCategoryId' => $individualAffiliate->LocalDuesCategoryId,
                ],
            );
        });

        return [
            'message' => 'ok',
            'statusCode' => 205,
        ];
    }
}

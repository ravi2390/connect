<?php

namespace App\Actions\Individual\Workflow;

use App\Actions\Individual\MfpCopyUnionMembership;
use App\Actions\Individual\SetStopReasonIndividual;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class MfpJoinedUnionStopReason
{

    use AsAction;

    protected function handle(
        IndividualAffiliate $individualAffiliate,
        string $stopReason,
        Carbon $endDate,
        array $data,
    ): array {
        DB::transaction(function () use ($data, $individualAffiliate, $stopReason, $endDate): void {
            $oldUnionRelationshipTypeId = $data['oldUnionRelationshipTypeId'] ?? null;
            $LocalDuesCategoryId = $data['LocalDuesCategoryId'] ?? null;
            $PaymentMethodId = $data['PaymentMethodId'] ?? null;
            $PaymentFrequencyId = $data['PaymentFrequencyId'] ?? null;

            if ($oldUnionRelationshipTypeId == 2) {
                $individualAffiliate->update(
                    [
                        'EndDate' => null,
                        'IndividualDeactivationReasonId' => null,
                        'LocalDuesCategoryId' => $LocalDuesCategoryId,
                        'PaymentMethodId' => $PaymentMethodId,
                        'PaymentFrequencyId' => $PaymentFrequencyId,
                    ]
                );
            } else {
                if ($oldUnionRelationshipTypeId && $oldUnionRelationshipTypeId != 5) {
                    SetStopReasonIndividual::run(individualAffiliate: $individualAffiliate, stopReason: $stopReason);
                }

                MfpCopyUnionMembership::run(
                    individualAffiliate: $individualAffiliate,
                    endDate: $endDate,
                    oldUnionRelationshipTypeId: $oldUnionRelationshipTypeId,
                    newUnionRelationship: 'Member',
                    additionalProperties: [
                        'LocalDuesCategoryId' => $LocalDuesCategoryId,
                        'PaymentMethodId' => $PaymentMethodId,
                        'PaymentFrequencyId' => $PaymentFrequencyId,
                    ],
                );
            }
        });

        return [
            'message' => 'ok',
            'statusCode' => 205,
        ];
    }
}

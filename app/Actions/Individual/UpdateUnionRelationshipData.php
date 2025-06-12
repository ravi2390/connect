<?php

namespace App\Actions\Individual;

use App\Models\IndividualAffiliate;
use App\Services\Factories\IndividualStopReasonWorkflow;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

/***
 * Class UpdateUnionRelationshipData
 * @package App\Actions\Individual
 */
class UpdateUnionRelationshipData
{
    use AsAction;

    protected function handle(IndividualAffiliate $individualAffiliate, array $data): array
    {
        DB::transaction(function () use ($individualAffiliate, $data): void {
            $triggerWorkflow = (isset($data['IndividualDeactivationReasonId']) && $data['IndividualDeactivationReasonId'] !== $individualAffiliate->IndividualDeactivationReasonId);

            $individualAffiliate->fill($data)->save();

            $endDate = isset($data['EndDate']) && !empty($data['EndDate'])
                ? (new Carbon($data['EndDate']))
                : Carbon::now();

            if (!$endDate->isToday()) {
                $endDate->endOfDay();
            }

            if ($triggerWorkflow) {
                resolve(IndividualStopReasonWorkflow::class)
                    ->createWorkflow($individualAffiliate->IndividualDeactivationReason->IndividualDeactivationReasonName)::run(
                        individualAffiliate: $individualAffiliate,
                        stopReason: $individualAffiliate->IndividualDeactivationReason->IndividualDeactivationReasonName,
                        endDate: $endDate,
                    );
            }

        });
        return [
            'message' => 'ok',
            'statusCode' => 200,
        ];
    }
}

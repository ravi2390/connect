<?php

namespace App\Actions\Individual;

use \App\Actions\Individual\Workflow\MfpJoinedUnionStopReason;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

/***
 * Class UpdateUnionRelationshipData
 * @package App\Actions\Individual
 */
class MfpUpdateUnionRelationshipData
{
    use AsAction;

    public function handle(IndividualAffiliate $individualAffiliate, array $data): array
    {
        $endDate = isset($data['EndDate']) && !empty($data['EndDate'])
            ? (new Carbon($data['EndDate']))
            : Carbon::now();

        if (!$endDate->isToday()) {
            $endDate->endOfDay();
        }

        MfpJoinedUnionStopReason::run(
            $individualAffiliate,
            'mfp joined union',
            $endDate,
            $data,
        );

        return [
            'message' => 'ok',
            'statusCode' => 200,
        ];
    }
}

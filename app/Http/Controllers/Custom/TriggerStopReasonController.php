<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Services\Factories\IndividualStopReasonWorkflow;
use Illuminate\Http\JsonResponse;

/**
 * Class StopReasonController
 */
class TriggerStopReasonController extends Controller
{
    public function __invoke(int $individualId, string $stopReason): JsonResponse
    {
        /** @var Individual $individual */
        $individual = Individual::query()->find($individualId);

        return new JsonResponse(
            // @todo: All workflows expect IndividualAffiliate as first argument.
            resolve(IndividualStopReasonWorkflow::class)->createWorkflow($stopReason)::run(
                    individualAffiliate: $individual,
                    stopReason: $stopReason
                ),
        );
    }
}

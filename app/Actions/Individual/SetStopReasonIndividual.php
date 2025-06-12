<?php

namespace App\Actions\Individual;

use App\Models\IndividualAffiliate;
use App\Models\IndividualDeactivationReason;
use Lorisleiva\Actions\Concerns\AsAction;

class SetStopReasonIndividual
{

    use AsAction;

    protected function handle(IndividualAffiliate $individualAffiliate, string $stopReason): void
    {
        /** @var IndividualDeactivationReason $stopReasonModel */
        if ($stopReason === 'mfp joined union') {
            $stopReason = 'joined union';
        }
        $stopReasonModel = IndividualDeactivationReason::query()->where('IndividualDeactivationReasonName', $stopReason)->get()->first();

        if ($stopReasonModel) {
            $individualAffiliate->update(['IndividualDeactivationReasonId' => $stopReasonModel->getKey()]);
        }
    }
}

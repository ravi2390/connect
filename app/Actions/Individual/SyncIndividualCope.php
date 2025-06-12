<?php

namespace App\Actions\Individual;

use App\Models\IndividualCope;
use Lorisleiva\Actions\Concerns\AsAction;

class SyncIndividualCope
{

    use AsAction;

    protected function handle(array $payload): IndividualCope
    {
        $individualId = $payload['individualId'];
        $affiliateId = $payload['affiliateId'];
        $data = $payload['data'];

        $individualCope = isset($data['IndividualCopeId'])
            ? IndividualCope::query()->find($data['IndividualCopeId'])
            : new IndividualCope();

        $individualCope->AffiliateId = $affiliateId;
        $individualCope->IndividualId = $individualId;

        $individualCope->fill($data)->save();

        return $individualCope;
    }

}

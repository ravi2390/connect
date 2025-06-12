<?php

namespace App\Http\Controllers\Custom;

use App\Actions\Individual\SyncIndividualCope;
use App\Actions\Individual\UpdateUnionRelationshipData;
use App\Http\Resources\IndividualAffiliate as IndividualAffiliateResource;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateUnionRelationshipController
{
    public function __invoke(int $id, Request $request): JsonResponse
    {
        /**
         * @var IndividualAffiliate $individualAffiliate
         */
        $individualAffiliate = IndividualAffiliate::query()->find($id);

        $data = $request->validate($individualAffiliate::rules());

        $dataCope = $request->all();

        if (isset($dataCope['IndividualCope']['CopeAmount'])) {
            $dataCope['IndividualCope']['CopeAmount'] = (string) $dataCope['IndividualCope']['CopeAmount'];
            (new SyncIndividualCope())->run([
                'individualId' => $individualAffiliate->IndividualId,
                'affiliateId' => $individualAffiliate->AffiliateId,
                'data' => Validator::make($dataCope['IndividualCope'], IndividualCope::rules())->validate(),
            ]);
        }

        try {
            $individualId = $individualAffiliate->IndividualId;
            $affiliateId = $individualAffiliate->AffiliateId;
            $stopReason = $data['IndividualDeactivationReasonId'];
            $individualAffiliates = IndividualAffiliate::where('IndividualId', $individualId)->where('AffiliateId', '!=', $affiliateId)->where('IsCurrent', true)->get();
            if ((count($individualAffiliates) > 0) && ($stopReason == '11' || $stopReason == '1')) {
                return new JsonResponse([
                    'status' => 'failure',
                    'message' => 'ok',
                ], 206);
            } else {
                $result = (new UpdateUnionRelationshipData())->run($individualAffiliate, $data);
            }
        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'failure',
                'message' => $e->getTraceAsString(),
            ], 418);
        }

        return new JsonResponse((new IndividualAffiliateResource($individualAffiliate))->toArray($request), $result['statusCode']);
    }
}

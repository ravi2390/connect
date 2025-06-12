<?php

namespace App\Http\Controllers\Custom;

use App\Actions\Individual\MfpUpdateUnionRelationshipData;
use App\Actions\Individual\SyncIndividualCope;
use App\Http\Resources\IndividualAffiliate as IndividualAffiliateResource;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MfpUpdateUnionRelationshipController
{
    public function __invoke(int $id, Request $request): JsonResponse
    {
        /**
         * @var IndividualAffiliate $individualAffiliate
         */
        if ($id > 0) {
            $individualAffiliate = IndividualAffiliate::query()->find($id);
        } else {
            $individualAffiliate = new IndividualAffiliate();
        }

        $data = $request->validate($individualAffiliate::rules());

        $otherData = json_decode($request->getContent());

        $data['IndividualDeactivationReasonId'] = 13;
        $data['oldUnionRelationshipTypeId'] = $otherData->oldUnionRelationshipTypeId;
        if ($id == 0) {
            $IndividualId = $otherData->IndividualId;
            $AffiliateId = $otherData->AffiliateId;
            $individualAffiliate->IndividualId = $IndividualId;
            $individualAffiliate->AffiliateId = $AffiliateId;
        }

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
            $individualAffiliates = IndividualAffiliate::where('IndividualId', $individualId)->where('AffiliateId', '!=', $affiliateId)->get();
            if ((count($individualAffiliates) > 0) && ($stopReason == '10' || $stopReason == '11' || $stopReason == '1')) {
                return new JsonResponse([
                    'status' => 'failure',
                    'message' => 'ok',
                ], 206);
            } else {
                $result = (new MfpUpdateUnionRelationshipData())->handle($individualAffiliate, $data);
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

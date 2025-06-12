<?php

namespace App\Http\Controllers\Custom;

use App\Actions\Individual\SyncIndividualCope;
use App\Actions\Individual\Workflow\ReactivateUnionRelationship;
use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\IndividualAffiliateController as BaseController;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use App\Services\Factories\IndividualStopReasonWorkflow;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Validator;

class IndividualAffiliateController extends BaseController
{
    #[\Override]
    public function update($id): JsonResource
    {
        /**
         * @var IndividualAffiliate $model
         */
        $model = $this->createNewModel()->find($id);

        $data = $this->request->validate($model::rules());

        $triggerWorkflow = (isset($data['IndividualDeactivationReasonId']) && $data['IndividualDeactivationReasonId'] !== $model->IndividualDeactivationReasonId);

        try {
            $model->fill($this->request->validate($model::rules()))->save();

            if ($triggerWorkflow) {
                // @todo: Workflows should take an IndividualAffiliate as the first argument.
                resolve(IndividualStopReasonWorkflow::class)->createWorkflow($model->IndividualDeactivationReason->IndividualDeactivationReasonName)::run(
                    individualAffiliate: $model->Individual,
                    stopReason: $model->IndividualDeactivationReason->IndividualDeactivationReasonName
                );
            }
        } catch (\Exception $e) {
            return new JsonResource([
                'status' => 'failure',
                'message' => $e->getMessage(),
            ]);
        }

        return $this->createResource($model);
    }

    #[\Override]
    protected function beforeCreate($model): AbstractCrudController
    {
        $model->IsCurrent = true;

        return $this;
    }

    #[\Override]
    protected function afterCreate($model): AbstractCrudController
    {
        if ($data = $this->request->input('IndividualCope')) {
            (new SyncIndividualCope())->run([
                'individualId' => $model->IndividualId,
                'affiliateId' => $model->AffiliateId,
                'data' => Validator::make($data, IndividualCope::rules())->validate(),
            ]);
        }

        return $this;
    }

    public function reactivate($id): JsonResource
    {
        $individualAffiliate = IndividualAffiliate::query()->find($id);

        try {
            ReactivateUnionRelationship::run(individualAffiliate: $individualAffiliate);
        } catch (\RuntimeException) {
            return new JsonResource([
                'message' => 'Retired member relationships cannot be restored. Please contact the AFT Help Request if you need support.',
                'statusCode' => 422,
            ]);
        }

        return $this->createResource($individualAffiliate);
    }
}

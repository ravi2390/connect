<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\IndividualEmailController as BaseController;
use App\Models\IndividualEmail;
use Carbon\Carbon;

class IndividualEmailController extends BaseController
{
    #[\Override]
    protected function afterCreate($model): AbstractCrudController
    {
        return $this->afterSave($model);
    }

    #[\Override]
    protected function afterUpdate($model): AbstractCrudController
    {
        return $this->afterSave($model);
    }

    private function afterSave(IndividualEmail $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            IndividualEmail::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualEmailId', '!=', $model->getAttribute('IndividualEmailId'))
                ->update(['IsPreferred' => false]);
        }
        if ($model->getAttribute('ContactStatusId') && $model->getAttribute('ContactStatusId') === 4) {
            IndividualEmail::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualEmailId', '=', $model->getAttribute('IndividualEmailId'))
                ->update(['VerifiedDate' => Carbon::now()]);
        } else {
            IndividualEmail::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualEmailId', '=', $model->getAttribute('IndividualEmailId'))
                ->where('VerifiedDate', '!=', null)
                ->update(['VerifiedDate' => null]);
        }

        return $this;
    }
}

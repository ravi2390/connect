<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\IndividualPhoneController as BaseController;
use App\Models\IndividualPhone;
use Carbon\Carbon;

class IndividualPhoneController extends BaseController
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

    private function afterSave(IndividualPhone $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            IndividualPhone::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualPhoneId', '!=', $model->getAttribute('IndividualPhoneId'))
                ->update(['IsPreferred' => false]);
        }
        if ($model->getAttribute('ContactStatusId') && $model->getAttribute('ContactStatusId') === 4) {
            IndividualPhone::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualPhoneId', '=', $model->getAttribute('IndividualPhoneId'))
                ->update(['VerifiedDate' => Carbon::now()]);
        } else {
            IndividualPhone::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualPhoneId', '=', $model->getAttribute('IndividualPhoneId'))
                ->where('VerifiedDate', '!=', null)
                ->update(['VerifiedDate' => null]);
        }

        return $this;
    }
}

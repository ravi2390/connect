<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\IndividualAddressController as BaseController;
use App\Models\IndividualAddress;
use Carbon\Carbon;

class IndividualAddressController extends BaseController
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

    private function afterSave(IndividualAddress $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            IndividualAddress::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualAddressId', '!=', $model->getAttribute('IndividualAddressId'))
                ->update(['IsPreferred' => false]);
        }
        if ($model->getAttribute('ContactStatusId') && $model->getAttribute('ContactStatusId') === 4) {
            IndividualAddress::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualAddressId', '=', $model->getAttribute('IndividualAddressId'))
                ->update(['VerifiedDate' => Carbon::now()]);
        } else {
            IndividualAddress::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualAddressId', '=', $model->getAttribute('IndividualAddressId'))
                ->where('VerifiedDate', '!=', null)
                ->update(['VerifiedDate' => null]);
        }

        return $this;
    }
}

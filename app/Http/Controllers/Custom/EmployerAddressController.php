<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\EmployerAddressController as BaseController;
use App\Models\EmployerAddress;

class EmployerAddressController extends BaseController
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

    private function afterSave(EmployerAddress $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            EmployerAddress::query()
                ->where('EmployerId', $model->getAttribute('EmployerId'))
                ->where('EmployerAddressTypeId', $model->getAttribute('EmployerAddressTypeId'))
                ->where('EmployerAddressId', '!=', $model->getAttribute('EmployerAddressId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

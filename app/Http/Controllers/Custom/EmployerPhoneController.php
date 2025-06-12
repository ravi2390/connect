<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\EmployerPhoneController as BaseController;
use App\Models\EmployerPhone;

class EmployerPhoneController extends BaseController
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

    private function afterSave(EmployerPhone $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            EmployerPhone::query()
                ->where('EmployerId', $model->getAttribute('EmployerId'))
                ->where('EmployerPhoneTypeId', $model->getAttribute('EmployerPhoneTypeId'))
                ->where('EmployerPhoneId', '!=', $model->getAttribute('EmployerPhoneId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

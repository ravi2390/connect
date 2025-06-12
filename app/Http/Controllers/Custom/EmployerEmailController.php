<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\EmployerEmailController as BaseController;
use App\Models\EmployerEmail;

class EmployerEmailController extends BaseController
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

    private function afterSave(EmployerEmail $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            EmployerEmail::query()
                ->where('EmployerId', $model->getAttribute('EmployerId'))
                ->where('EmployerEmailTypeId', $model->getAttribute('EmployerEmailTypeId'))
                ->where('EmployerEmailId', '!=', $model->getAttribute('EmployerEmailId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

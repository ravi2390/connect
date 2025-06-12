<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\IndividualEmployerController as BaseController;
use App\Models\IndividualEmployer;

class IndividualEmployerController extends BaseController
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

    private function afterSave(IndividualEmployer $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            IndividualEmployer::query()
                ->where('IndividualId', '=', $model->getAttribute('IndividualId'))
                ->where('IndividualEmployerId', '!=', $model->getAttribute('IndividualEmployerId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

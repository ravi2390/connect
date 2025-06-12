<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\AffiliateEmailController as BaseController;
use App\Models\AffiliateEmail;

class AffiliateEmailController extends BaseController
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

    private function afterSave(AffiliateEmail $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            AffiliateEmail::query()
                ->where('AffiliateId', $model->getAttribute('AffiliateId'))
                ->where('AffiliateEmailTypeId', $model->getAttribute('AffiliateEmailTypeId'))
                ->where('AffiliateEmailId', '!=', $model->getAttribute('AffiliateEmailId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\AffiliatePhoneController as BaseController;
use App\Models\AffiliatePhone;

class AffiliatePhoneController extends BaseController
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

    private function afterSave(AffiliatePhone $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            AffiliatePhone::query()
                ->where('AffiliateId', $model->getAttribute('AffiliateId'))
                ->where('AffiliatePhoneTypeId', $model->getAttribute('AffiliatePhoneTypeId'))
                ->where('AffiliatePhoneId', '!=', $model->getAttribute('AffiliatePhoneId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

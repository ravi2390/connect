<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\AffiliateAddressController as BaseController;
use App\Models\AffiliateAddress;

class AffiliateAddressController extends BaseController
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

    private function afterSave(AffiliateAddress $model): AbstractCrudController
    {
        if ($model->getAttribute('IsPreferred')) {
            AffiliateAddress::query()
                ->where('AffiliateId', $model->getAttribute('AffiliateId'))
                ->where('AffiliateAddressTypeId', $model->getAttribute('AffiliateAddressTypeId'))
                ->where('AffiliateAddressId', '!=', $model->getAttribute('AffiliateAddressId'))
                ->update(['IsPreferred' => false]);
        }

        return $this;
    }
}

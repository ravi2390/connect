<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\AffiliateStaffController as AffiliateStaffControllerBase;

class AffiliateStaffController extends AffiliateStaffControllerBase
{
    use IndividualAffiliateFromRole;

    #[\Override]
    protected function afterCreate($model): AbstractCrudController
    {
        $this->createIndividualAffiliateIfNeeded($model);

        return parent::afterCreate($model);
    }
}

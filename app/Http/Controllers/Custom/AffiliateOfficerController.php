<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\AffiliateOfficerController as AffiliateOfficerControllerBase;

class AffiliateOfficerController extends AffiliateOfficerControllerBase
{
    use IndividualAffiliateFromRole;

    #[\Override]
    protected function afterCreate($model): AbstractCrudController
    {
        $this->createIndividualAffiliateIfNeeded($model);

        return parent::afterCreate($model);
    }
}

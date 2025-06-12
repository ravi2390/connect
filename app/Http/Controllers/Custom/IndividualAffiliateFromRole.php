<?php

namespace App\Http\Controllers\Custom;

use App\Models\IndividualAffiliate;

trait IndividualAffiliateFromRole
{
    protected function createIndividualAffiliateIfNeeded($model)
    {
        $individualAffiliate = IndividualAffiliate::query()
            ->where('IndividualId', $model->IndividualId)
            ->where('AffiliateId', $model->AffiliateId)
            ->get()->all();
        if (empty($individualAffiliate)) {
            //set officer without individual affiliate record, create new one with Other type
            $individualAffiliate = new IndividualAffiliate();
            $individualAffiliate
                ->fill([
                    'AffiliateId' => $model->AffiliateId,
                    'IndividualId' => $model->IndividualId,
                    'UnionRelationshipTypeId' => 1, //other
                    'IsCurrent' => 1,
                    'StartDate' => $model->TermStartDate,
                    'EndDate' => $model->TermEndDate,
                ])
                ->save();
        }
    }
}

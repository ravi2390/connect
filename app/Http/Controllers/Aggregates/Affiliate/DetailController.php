<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\BaseAggregateController;
use App\Models\Affiliate;
use Spatie\QueryBuilder\QueryBuilder;

class DetailController extends BaseAggregateController
{
    protected $class = \App\Http\Resources\Affiliate::class;

    protected $withRelations = [
        'affiliatePhonesOrdered',
        'affiliateEmailsOrdered',
        'affiliateAddressesOrdered.StateTerritory',
        'AffiliatePerCapita',
        'AffiliateType',
    ];

    #[\Override]
    protected function getData($id)
    {
        $query = QueryBuilder::for(Affiliate::query(), $this->request);

        return $query->find($id);
    }
}

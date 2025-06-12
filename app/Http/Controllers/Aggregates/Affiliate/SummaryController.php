<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\BaseAggregateController;
use App\Models\Affiliate;
use Spatie\QueryBuilder\QueryBuilder;

class SummaryController extends BaseAggregateController
{
    protected $class = \App\Http\Resources\Affiliate::class;

    /**
     * @var array
     */
    protected $withRelations = [
        'AffiliateType',
        'AffiliateGeoReach',
        'AffiliateDesignation',
        'AffiliateSector.Sector',
        //        'ParentAffiliate', //this will cause infinite loop as root has itself as parent and trait restriction is not respected
        'AffiliatePerCapita.FiduciaryBondCoverage',
        'AffiliateMergedOrganization.MergedOrganization',
        'AffiliateNotes',
        'RetireeEntityType',
        'Region',
    ];

    protected function getData($id)
    {
        $query = QueryBuilder::for(Affiliate::query(), $this->request);

        return $query->find($id);
    }
}

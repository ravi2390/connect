<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\BaseAggregateController;
use App\Models\LocalDuesCategory;
use Spatie\QueryBuilder\QueryBuilder;

class LocalDuesCategoryController extends BaseAggregateController
{
    protected $class = \App\Http\Resources\LocalDuesCategory::class;

    protected $returnCollection = true;

    #[\Override]
    protected function getData($id)
    {
        $query = QueryBuilder::for(LocalDuesCategory::query()
            ->join('NationalPerCapita', 'LocalDuesCategory.NationalPerCapitaId', '=', 'NationalPerCapita.NationalPerCapitaId')
            ->where('AffiliateId', $id)
            ->orderBy('NationalPerCapita.DisplayOrder'), $this->request);

        return $query->get();
    }
}

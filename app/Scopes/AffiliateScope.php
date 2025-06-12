<?php

namespace App\Scopes;

use Aft\DataModel\CustomAffiliateFilter;
use App\Models\AffiliateAware;
use App\Services\GlobalFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class AffiliateScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $globalFilter = resolve(GlobalFilter::class);
        if ($model instanceof AffiliateAware && $globalFilter->isApplicable()) {
            $builder->when($affiliates = $globalFilter->getAffiliateIds(), function (Builder $query) use ($affiliates, $model): void {
                if (method_exists($model, 'filterByAffiliate')) {
                    /** @var CustomAffiliateFilter $model */
                    $model->filterByAffiliate($query, $affiliates);
                } else {
                    $query->whereIn($model->getTable().'.AffiliateId', $affiliates);
                }
            });
        }
    }
}

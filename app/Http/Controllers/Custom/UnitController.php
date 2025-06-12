<?php

namespace App\Http\Controllers\Custom;

//use App\Filters\Unit\RetireeUnitFilter;
use App\Http\Controllers\UnitController as BaseController;
use App\Sorts\Unit\AffiliateNumberSort;
use App\Sorts\Unit\AgreementSort;
use App\Sorts\Unit\ChapterSort;
use App\Sorts\Unit\EmployerNameSort;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class UnitController extends BaseController
{
    protected function getFilterMapping(string $filter): ?AllowedFilter
    {
//        if ($filter === 'RetireeUnit') {
//            return AllowedFilter::custom($filter, new RetireeUnitFilter(), 'unionRoles');
//        }

        return parent::getFilterMapping($filter);
    }

    protected function getSortMapping(string $sort): AllowedSort|string
    {
        if (ltrim($sort, '-') === 'LocalAgreement.Employer.Chapter.Affiliate.AffiliateNumber') {
            return AllowedSort::custom('LocalAgreement.Employer.Chapter.Affiliate.AffiliateNumber', new AffiliateNumberSort());
        }
        if (ltrim($sort, '-') === 'LocalAgreement.LocalAgreementName') {
            return AllowedSort::custom('LocalAgreement.LocalAgreementName', new AgreementSort());
        }
        if (ltrim($sort, '-') === 'LocalAgreement.Employer.EmployerName') {
            return AllowedSort::custom('LocalAgreement.Employer.EmployerName', new EmployerNameSort());
        }
        if (ltrim($sort, '-') === 'LocalAgreement.Employer.Chapter.ChapterName') {
            return AllowedSort::custom('LocalAgreement.Employer.Chapter.ChapterName', new ChapterSort());
        }

        return parent::getSortMapping($sort);
    }
}

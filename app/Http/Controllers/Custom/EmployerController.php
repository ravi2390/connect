<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\EmployerController as BaseController;
use App\Sorts\Employer\AddressSort;
use App\Sorts\Employer\AffiliateSort;
use App\Sorts\Employer\EmailSort;
use App\Sorts\Employer\EmployerTypeSort;
use App\Sorts\Employer\ParentEmployerSort;
use App\Sorts\Employer\PhoneSort;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class EmployerController extends BaseController
{
    #[\Override]
    protected function getFilterMapping(string $filter): ?AllowedFilter
    {
        if ($filter === 'EmployerId') {
            return AllowedFilter::exact($filter);
        }

        return parent::getFilterMapping($filter);
    }

    #[\Override]
    protected function getSortMapping(string $sort): AllowedSort|string
    {
        if (ltrim($sort, '-') === 'EmployerType') {
            return AllowedSort::custom('EmployerType', new EmployerTypeSort());
        }
        if (ltrim($sort, '-') === 'EmployerMainPhones') {
            return AllowedSort::custom('EmployerMainPhones', new PhoneSort());
        }
        if (ltrim($sort, '-') === 'EmployerMainEmails') {
            return AllowedSort::custom('EmployerMainEmails', new EmailSort());
        }
        if (ltrim($sort, '-') === 'EmployerMainAddresses') {
            return AllowedSort::custom('EmployerMainAddresses', new AddressSort());
        }
        if (ltrim($sort, '-') === 'ParentEmployer') {
            return AllowedSort::custom('ParentEmployer', new ParentEmployerSort());
        }
        if (ltrim($sort, '-') === 'Chapter.Affiliate') {
            return AllowedSort::custom('Chapter.Affiliate', new AffiliateSort());
        }

        return parent::getSortMapping($sort);
    }
}

<?php

namespace App\Sorts\Unit;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

/**
 * Class AffiliateNumberSort
 */
class AffiliateNumberSort implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): void
    {
        $query->leftJoin('LocalAgreement', function ($query): void {
            $query->on('LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId');
        });

        $query->leftJoin('Employer', function ($query): void {
            $query->on('Employer.EmployerId', '=', 'LocalAgreement.EmployerId');
        });

        $query->leftJoin('Chapter', function ($query): void {
            $query->on('Chapter.ChapterId', '=', 'Employer.ChapterId');
        });
        $query->leftJoin('Affiliate', function ($query): void {
            $query->on('Affiliate.AffiliateId', '=', 'Chapter.AffiliateId');
        });
        Query::addSelectClause($query->getQuery(), 'Affiliate.AffiliateName');

        $query->orderBy('Affiliate.AffiliateName', $descending ? 'DESC' : 'ASC');
    }
}

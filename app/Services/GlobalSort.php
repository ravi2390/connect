<?php

namespace App\Services;

use Database\Seeders\helpers;
use App\Helpers\Query;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

class GlobalSort
{
    public function apply($sorts, $query): Builder
    {
        foreach ($sorts as $sort) {
            $descending = 0;
            if (str_contains((string) $sort, '-')) {
                $descending = 1;
            }
            $sort = str_replace('-', '', $sort);
            $methodName = 'sort'.ucfirst($sort);
            if (method_exists($this, $methodName)) {
                $query = $this->{$methodName}($sort, $query, $descending);
            }
        }

        return $query;
    }

    private function sortFirstName($sort, $query, $descending)
    {
        $query->orderBy('FirstName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortPreferredName($sort, $query, $descending)
    {
        $query->orderBy('PreferredName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortLastName($sort, $query, $descending)
    {
        $query->orderBy('LastName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortMiddleName($sort, $query, $descending)
    {
        $query->orderBy('MiddleName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortIndividualAddresses($sort, $query, $descending)
    {
        $query->leftJoin('IndividualAddress', function ($query): void {
            $query->on('IndividualAddress.IndividualId', '=', 'Individual.IndividualId');
        });
        $query->select('Individual.*');

        $query->orderBy('IndividualAddress.AddressLine1', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortIndividualPhonesHome($sort, $query, $descending)
    {
        $query->leftJoin('IndividualPhone', function ($query): void {
            $query->on('IndividualPhone.IndividualId', '=', 'Individual.IndividualId');
        });
        $query->leftJoin('IndividualPhoneType', function ($query): void {
            $query->on('IndividualPhoneType.IndividualPhoneTypeId', '=', 'IndividualPhone.IndividualPhoneTypeId')->where('IndividualPhoneType.IndividualPhoneTypeName', 'Home');
        });
        $query->select('Individual.*');

        $query->orderBy('IndividualPhone.PhoneNumber', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortIndividualPhones($sort, $query, $descending)
    {
        $query->leftJoin('IndividualPhone', function ($query): void {
            $query->on('IndividualPhone.IndividualId', '=', 'Individual.IndividualId');
        });
        $query->leftJoin('IndividualPhoneType', function ($query): void {
            $query->on('IndividualPhoneType.IndividualPhoneTypeId', '=', 'IndividualPhone.IndividualPhoneTypeId')->where('IndividualPhoneType.IndividualPhoneTypeName', 'Mobile');
        });
        $query->select('Individual.*');

        $query->orderBy('IndividualPhone.PhoneNumber', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortIndividualEmails($sort, $query, $descending)
    {
        $query->leftJoin('IndividualEmail', function ($query): void {
            $query->on('IndividualEmail.IndividualId', '=', 'Individual.IndividualId');
        });
        $query->select('Individual.*');

        $query->orderBy('IndividualEmail.Email', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortAffiliateName($sort, $query, $descending)
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');
        Query::addJoin($query->getQuery(), 'Affiliate', 'IndividualAffiliate', 'AffiliateId', 'AffiliateId');
        Query::addSelectClause($query->getQuery(), 'Affiliate.AffiliateName');

        $query->orderBy('Affiliate.AffiliateName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortAffiliateNumber($sort, $query, $descending)
    {
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId');
        Query::addJoin($query->getQuery(), 'Affiliate', 'IndividualAffiliate', 'AffiliateId', 'AffiliateId');
        Query::addSelectClause($query->getQuery(), 'Affiliate.AffiliateNumber');

        $query->orderBy('Affiliate.AffiliateNumber', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortLocalDuesCategory($sort, $query, $descending)
    {
        $query->join('IndividualAffiliate', function ($query): void {
            $query->on('IndividualAffiliate.IndividualId', '=', 'Individual.IndividualId');
        });
        $query->leftJoin('LocalDuesCategory', function ($query): void {
            $query->on('LocalDuesCategory.LocalDuesCategoryId', '=', 'IndividualAffiliate.LocalDuesCategoryId');
        });
        $query->select('Individual.*');

        $query->orderBy('LocalDuesCategory.LocalDuesCategoryName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortUnionRelationshipType($sort, $query, $descending)
    {
        $query->join('IndividualAffiliate', function ($query): void {
            $query->on('IndividualAffiliate.IndividualId', '=', 'Individual.IndividualId');
        });
        $query->leftJoin('UnionRelationshipType', function ($query): void {
            $query->on('UnionRelationshipType.UnionRelationshipTypeId', '=', 'IndividualAffiliate.UnionRelationshipTypeId');
        });
        $query->select('Individual.*');

        $query->orderBy('UnionRelationshipType.UnionRelationshipTypeName', $descending ? 'DESC' : 'ASC');

        return $query;
    }

    private function sortEmployerName($sort, $query, $descending)
    {
        $query->leftJoin('IndividualEmployer', function ($query): void {
            $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId');
        });

        $query->leftJoin('Employer', function ($query): void {
            $query->on('Employer.EmployerId', '=', 'IndividualEmployer.EmployerId');
        });
        $query->select('Individual.*');

        $query->orderBy('Employer.EmployerName', $descending ? 'DESC' : 'ASC');

        return $query;
    }
}

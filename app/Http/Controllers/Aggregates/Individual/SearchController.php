<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Helpers\LikeOperator;
use App\Helpers\Query;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Filter\ParsesQuery;
use App\Http\Controllers\Filter\ParsesQueryInterface;
use App\Http\Resources\Individual as IndividualResource;
use App\Models\Individual;
use App\Services\GlobalSort;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SearchController extends Controller implements ParsesQueryInterface
{
    use ParsesQuery;

    const HOME_PHONE = 1;

    const MOBILE_PHONE = 3;

    /**
     * @var array relations to include in response
     */
    private array $withRelations = [
        'individualAddressesOrdered.StateTerritory',
        'individualAddressesOrdered.IndividualAddressType',
        'activeIndividualAffiliates',
        'activeIndividualEmployers',
        'activeIndividualEmployers.Employer',
        'individualEmailsOrdered',
        'individualAddressesOrdered',
        'individualPhonesOrdered',
        'individualMembers',
        'Prefix',
        'Suffix',
        'activeIndividualAffiliates.Affiliate',
        'activeIndividualAffiliates.UnionRelationshipType',
        'activeIndividualAffiliates.LocalDuesCategory',
        'individualPhonesOrdered.IndividualPhoneType',
        'lastDeactivatedIndividualAffiliate',
        'lastDeactivatedIndividualAffiliate.Affiliate',
        'lastDeactivatedIndividualAffiliate.LocalDuesCategory',
        'lastDeactivatedIndividualAffiliate.UnionRelationshipType',
    ];

    /**
     * AbstractCrudController constructor.
     */
    public function __construct(private Request $request)
    {
    }

    public function __invoke(): AnonymousResourceCollection
    {
        $request = $this->request;
        $request->query->set('include', implode(',', $this->withRelations));

        $query = Individual::query();

        //$this->parseRelationships($request, $query);

        $this->processFilterField('firstName', 'FirstName', $request, $query);
        $this->processFilterField('lastName', 'LastName', $request, $query);
        $this->processFilterField('preferredName', 'PreferredName', $request, $query);
        $this->processFilterField('previousName', 'previousName', $request, $query);
        $this->processFilterField('middleName', 'MiddleName', $request, $query);

        $affiliates = $this->request->get('affiliates');
        $emailBoolean = empty($affiliates) ? 'and' : 'or';
        Query::addSelectClause($query->getQuery(), 'Individual.*');
        //Query to exclude stop reason
        Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId', [], false);
        Query::addJoin($query->getQuery(), 'Affiliate', 'IndividualAffiliate', 'AffiliateId', 'AffiliateId', [], false);
        $query->where(function ($q): void {
            $q->whereIn('IndividualAffiliate.IndividualDeactivationReasonId', ['2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '13', '14', '15', '16'])->orWhereNull('IndividualAffiliate.IndividualDeactivationReasonId');
        });

        if ($this->request->get('parentAffiliateId')) {
            $parentAffiliateId = $this->request->get('parentAffiliateId');
            $query->where(function ($q) use ($parentAffiliateId): void {
                $q->where('Affiliate.ParentAffiliateId', '=', $parentAffiliateId);
                $q->orWhere('Affiliate.AffiliateId', '=', $parentAffiliateId);
            });
        }

        if ($this->request->get('filterAffiliateId') && $this->request->get('filterAffiliateId') != 'null') {
            $filterAffiliateId = $this->request->get('filterAffiliateId');
            $query->where('Affiliate.AffiliateId', '=', $filterAffiliateId);
        }

        if ($this->processFilterField('email', 'IndividualEmail.Email', $request, $query, $emailBoolean)) {
            Query::addJoin($query->getQuery(), 'IndividualEmail', 'Individual', 'IndividualId', 'IndividualId', [], false);
        }
        if ($this->processFilterField('memberId', 'MemberId', $request, $query)) {
            Query::addJoin($query->getQuery(), 'MemberIdMapping', 'Individual', 'IndividualId', 'IndividualId', [], false);
        }
        if ($this->processFilterField('employeeId', 'EmployeeId', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualEmployer', 'Individual', 'IndividualId', 'IndividualId', [], false);
        }
        if ($this->processFilterField('affiliateName', 'Affiliate.AffiliateName', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId', [], false);
            Query::addJoin($query->getQuery(), 'Affiliate', 'IndividualAffiliate', 'AffiliateId', 'AffiliateId', [], false);
        }
        if ($this->processFilterField('affiliateNumber', 'Affiliate.AffiliateNumber', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualAffiliate', 'Individual', 'IndividualId', 'IndividualId', [], false);
            Query::addJoin($query->getQuery(), 'Affiliate', 'IndividualAffiliate', 'AffiliateId', 'AffiliateId', [], false);
        }
        if ($this->processFilterField('homeCity', 'IndividualAddress.City', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualAddress', 'Individual', 'IndividualId', 'IndividualId', [], false);
            LikeOperator::whereLike($query, 'IndividualAddressTypeId', 1);
        }
        if ($this->processFilterField('zipCode', 'IndividualAddress.PostalCode', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualAddress', 'Individual', 'IndividualId', 'IndividualId', [], false);
            LikeOperator::whereLike($query, 'IndividualAddressTypeId', 1);
        }
        if ($this->processFilterField('homeState', 'StateTerritory.StateTerritoryName', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualAddress', 'Individual', 'IndividualId', 'IndividualId', [], false);
            Query::addJoin($query->getQuery(), 'StateTerritory', 'IndividualAddress', 'StateTerritoryId', 'StateTerritoryId', [], false);
            LikeOperator::whereLike($query, 'IndividualAddressTypeId', 1);
        }
        if ($this->processStripToNumberFilterField('phoneNumber', 'PhoneNumber', $request, $query)) {
            Query::addJoin($query->getQuery(), 'IndividualPhone', 'Individual', 'IndividualId', 'IndividualId', [], false);
            $query->whereIn('IndividualPhone.IndividualPhoneTypeId', [self::HOME_PHONE, self::MOBILE_PHONE]);
        }

        $sorts = explode(',', (string) $request->input('sort', ''));
        $globalSort = new GlobalSort();
        $globalSort->apply($sorts, $query);

        return IndividualResource::collection(
            $query->paginate($this->perPage(resolve(Individual::class)))
        );
    }

    /**
     * @return bool was property added
     */
    private function processFilterField(string $field, string $property, Request $request, Builder $query, string $boolean = 'and'): bool
    {
        $fieldValue = $request->get($field);
        if ($fieldValue) {
            LikeOperator::whereLike($query, $property, $fieldValue, $boolean);

            return true;
        }

        return false;
    }

    /**
     * @return bool was property added
     */
    private function processStripToNumberFilterField(string $field, string $property, Request $request, Builder $query, string $boolean = 'and'): bool
    {
        $fieldValue = $request->get($field);
        if ($fieldValue) {
            LikeOperator::whereLikeStripNonNumbers($query, $property, $fieldValue, $boolean);

            return true;
        }

        return false;
    }

    protected function perPage(Model $model): int
    {
        return $this->request->query->has('per_page') ? $this->request->query->getInt('per_page') : $model->getPerPage();
    }
}

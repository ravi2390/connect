<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Helpers\LikeOperator;
use App\Helpers\Query;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Filter\ParsesQuery;
use App\Http\Controllers\Filter\ParsesQueryInterface;
use App\Http\Resources\Affiliate as AffiliatesResource;
use App\Models\Affiliate;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SearchController extends Controller implements ParsesQueryInterface
{
    use ParsesQuery;

    const PRESIDENT_TITLE_ID = 14;

    const SECRETARY_TITLE_ID = 16;

    /**
     * @var array relations to include in response
     */
    private array $withRelations = ['affiliateAddressesOrdered', 'affiliateAddressesOrdered.StateTerritory', 'affiliatePhonesOrdered', 'affiliateEmailsOrdered', 'affiliateOfficers.Individual', 'affiliateOfficers.AffiliateOfficerRole', 'affiliateStaff.Individual'];

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

        $query = Affiliate::query();
        $this->processFilterField('AffiliateName', 'AffiliateName', $request, $query);
        $this->processFilterField('AffiliateNumber', 'AffiliateNumber', $request, $query);
        $StateFedAssociation = $request->get('StateFedAssociation');
        if ($StateFedAssociation) {
            $query->where('ParentAffiliateId', $StateFedAssociation);
        }

        if ($this->processFilterField('City', 'AffiliateAddress.City', $request, $query)) {
            Query::addJoin($query->getQuery(), 'AffiliateAddress', 'Affiliate', 'AffiliateId', 'AffiliateId');
            LikeOperator::whereLike($query, 'AffiliateAddressTypeId', 1);
        }
        if ($this->processFilterField('HomeState', 'StateTerritory.StateTerritoryName', $request, $query)) {
            Query::addJoin($query->getQuery(), 'AffiliateAddress', 'Affiliate', 'AffiliateId', 'AffiliateId');
            Query::addJoin($query->getQuery(), 'StateTerritory', 'AffiliateAddress', 'StateTerritoryId', 'StateTerritoryId', [], false);
        }

        $data = $query->paginate($this->perPage(resolve(Affiliate::class)));

        return AffiliatesResource::collection($data);
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

    protected function perPage(Model $model): int
    {
        return $this->request->query->has('per_page') ? $this->request->query->getInt('per_page') : $model->getPerPage();
    }
}

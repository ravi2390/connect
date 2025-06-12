<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Helpers\LikeOperator;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Filter\ParsesQuery;
use App\Http\Controllers\Filter\ParsesQueryInterface;
use App\Http\Resources\Individual as IndividualResource;
use App\Models\Affiliate;
use App\Models\Individual;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;

class AutocompleteController extends Controller implements ParsesQueryInterface
{
    use ParsesQuery;

    private array $withRelations = ['individualAffiliates', 'individualAffiliates.Affiliate', 'individualEmails', 'individualPhones', 'individualMembers'];

    /**
     * AbstractCrudController constructor.
     */
    public function __construct(private Request $request)
    {
    }

    public function __invoke(): AnonymousResourceCollection
    {
        $request = $this->request;

        $affiliateId = $request->get('affiliateId', 0);
        $affiliateParentFilter = $request->get('affiliateParentFilter', false);
        $request->query->set('include', implode(',', $this->withRelations));
        $affiliateIds = [$affiliateId];

        if ($affiliateId > 1) {
            $childIds = [];
            $childrenAffiliates = Affiliate::query()->select('AffiliateId')->where('ParentAffiliateId', '=', $affiliateId)->get();
            foreach ($childrenAffiliates as $childAffiliate) {
                $childIds[] = $childAffiliate['AffiliateId'];
            }
            if ($childIds !== []) {
                $grandChildrenAffiliates = Affiliate::query()->select(['AffiliateId'])->whereIn('ParentAffiliateId', $childIds)->get();
                foreach ($grandChildrenAffiliates as $grandChildAffiliate) {
                    $childIds[] = $grandChildAffiliate['AffiliateId'];
                }
            }
            $affiliateIds = array_merge($affiliateIds, $childIds);

            if ($affiliateParentFilter == 'true') {
                $parentAffiliateId = Affiliate::query()->select('ParentAffiliateId')->where('AffiliateId', '=', $affiliateId)->get()->first()->ParentAffiliateId;
                $affiliateIds = array_merge($affiliateIds, [$parentAffiliateId]);
            }
        }

        if ($affiliateId == 1 && $affiliateParentFilter == 'false') {
            $query = QueryBuilder::for(Individual::query(), $request)
                ->select('Individual.*')
                ->join('IndividualAffiliate', 'Individual.IndividualId', '=', 'IndividualAffiliate.IndividualId');
        } else {
            $query = QueryBuilder::for(Individual::query(), $request)
                ->select('Individual.*')
                ->join('IndividualAffiliate', 'Individual.IndividualId', '=', 'IndividualAffiliate.IndividualId')
                ->whereIn('IndividualAffiliate.AffiliateId', $affiliateIds);
        }

        $search = $request->get('search');
        if ($search) {
            $query->leftJoin('MemberIdMapping', 'Individual.IndividualId', '=', 'MemberIdMapping.IndividualId');

            $words = explode(' ', (string) $search);
            foreach ($words as $word) {
                $query->where(function ($queryBuilder) use ($word): void {
                    LikeOperator::whereLike($queryBuilder, 'FirstName', $word);
                    LikeOperator::whereLike($queryBuilder, 'LastName', $word, 'or');
                    LikeOperator::whereLike($queryBuilder, 'MemberIdMapping.MemberId', $word, 'or');
                });
            }
        }
        $id = (int) $request->get('id');
        if ($id !== 0) {
            $query->where('Individual.IndividualId', $id);
        }

        $filter = $request->get('filter');
        switch ($filter) {
            case 'member':
                $query->whereIn('IndividualAffiliate.UnionRelationshipTypeId', [2, 5]);
                $this->setCurrentAffiliate($query);
                break;
            case 'current':
                $this->setCurrentAffiliate($query);
                break;
        }

        return IndividualResource::collection(
            $query->paginate($this->perPage(resolve(Individual::class)))
        );
    }

    protected function setCurrentAffiliate(QueryBuilder $query)
    {
        $query->where(function ($queryBuilder): void {
            $queryBuilder
                ->whereNull('IndividualAffiliate.EndDate')
                ->orWhere('IndividualAffiliate.EndDate', '>', Carbon::now()->startOfDay());
        });
        $query->where('StartDate', '<=', Carbon::now()->startOfDay());
    }

    protected function perPage(Model $model): int
    {
        return $this->request->query->has('per_page') ? $this->request->query->getInt('per_page') : $model->getPerPage();
    }
}

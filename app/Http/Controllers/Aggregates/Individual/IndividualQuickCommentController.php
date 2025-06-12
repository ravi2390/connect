<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Filter\ParsesQuery;
use App\Http\Controllers\Filter\ParsesQueryInterface;
use App\Http\Resources\IndividualQuickComment as IndividualQuickCommentAsset;
use App\Models\IndividualQuickComment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;

class IndividualQuickCommentController extends Controller implements ParsesQueryInterface
{
    use ParsesQuery;

    /**
     * @var array relations to include in response
     */
    private array $withRelations = ['IndividualAssessment', 'IndividualAssessment.AssessmentContactType', 'SubmittedByIndividual'];

    /**
     * AbstractCrudController constructor.
     */
    public function __construct(private Request $request)
    {
    }

    public function __invoke(int $individualId): AnonymousResourceCollection
    {
        $query = QueryBuilder::for(IndividualQuickComment::query(), $this->request);
        $this->request->query->set('include', implode(',', $this->withRelations));

        $query
            ->with($this->withRelations)
            ->where('IndividualId', '=', $individualId)
            ->orderBy('CreatedAt', 'DESC');

        return IndividualQuickCommentAsset::collection(
            $query->paginate(5)
        );
    }
}

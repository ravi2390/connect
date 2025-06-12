<?php

namespace App\Http\Controllers;

use Aft\DataModel\AftDataModel;
use App\Http\Controllers\Filter\ParsesQuery;
use App\Http\Controllers\Filter\ParsesQueryInterface;
use App\Http\Export\Excel;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use ReflectionException;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * Class AbstractCrudController
 */
abstract class AbstractCrudController extends Controller implements ParsesQueryInterface
{
    use ParsesQuery;

    /**
     * AbstractCrudController constructor.
     */
    public function __construct(protected Request $request)
    {
    }

    abstract protected function getModel(): string;

    protected function createResource($resource): JsonResource
    {
        return new JsonResource($resource);
    }

    protected function createResourceCollection($resource): AnonymousResourceCollection
    {
        return JsonResource::collection($resource);
    }

    protected function createNewModel(): AftDataModel
    {
        return resolve($this->getModel());
    }

    /**
     * @param  bool  $returnQuery
     * @return AnonymousResourceCollection|QueryBuilder
     *
     * @throws ReflectionException
     */
    public function prepareExportData($returnQuery = false)
    {
        $this->request->merge(['sort' => 'LastName,FirstName']);
        $query = $this->parseRequest($this->request, $this->getModel());
        if ($returnQuery) {
            return $query;
        }

        return $this->createResourceCollection($query->get());
    }

    public function download(string $format, string $type)
    {
        ini_set('max_execution_time', (int) getenv('DOWNLOAD_EXECUTION_TIME'));
        $export = new Excel($this->request, $this, $type);
        if ($format === 'csv') {
            return $this->streamDownload($export);
        }

        return $export->download('download.'.$format);
    }

    /**
     * @throws ReflectionException
     */
    public function all(): JsonResource
    {
        return $this->createResourceCollection(
            $this->parseRequest($this->request, $this->getModel())
                ->paginate($this->perPage($this->createNewModel()))
        );
    }

    /**
     * @throws ReflectionException
     */
    public function one($id): JsonResource
    {
        return $this->createResource($this->parseRequest($this->request, $this->getModel())->find($id));
    }

    public function create(): JsonResource
    {
        $model = $this->createNewModel();
        $this->beforeCreate($model);
        $model->fill($this->request->validate($model::rules()))
            ->save();
        $this->afterCreate($model);

        return $this->createResource($model);
    }

    public function update($id): JsonResource
    {
        /**
         * @var AftDataModel $model
         */
        $model = $this->createNewModel()->find($id);
        $this->beforeUpdate($model);
        $model->fill($this->request->validate($model::rules()))->save();
        $this->afterUpdate($model);

        return $this->createResource($model);
    }

    public function delete($id): JsonResource
    {
        tap($this->createNewModel()->find($id), function ($model): void {
            $this->beforeDelete($model);
            $model->delete();
            $this->afterDelete($model);
        });

        return $this->createResource([]);
    }

    protected function perPage(AftDataModel $model): int
    {
        return $this->request->query->has('per_page') ? $this->request->query->getInt('per_page') : $model->getPerPage();
    }

    protected function beforeCreate($model): AbstractCrudController
    {
        return $this;
    }

    protected function afterCreate($model): AbstractCrudController
    {
        return $this;
    }

    protected function beforeUpdate($model): AbstractCrudController
    {
        return $this;
    }

    protected function afterUpdate($model): AbstractCrudController
    {
        return $this;
    }

    protected function beforeDelete($model): AbstractCrudController
    {
        return $this;
    }

    protected function afterDelete($model): AbstractCrudController
    {
        return $this;
    }
}

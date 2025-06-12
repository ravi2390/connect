<?php

namespace App\Http\Controllers\Filter;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

trait ParsesQuery
{
    /**
     * @throws \ReflectionException
     */
    public function parseRequest(Request $request, string $model): QueryBuilder
    {
        $request = $this->prepareRequest($request);
        $query = QueryBuilder::for($model, $request);
        $this->parseFilters($request, $query)
            ->parseRelationshipsFields($request, $query)
            ->parseSorts($request, $query)
            ->parseRelationships($request, $query);

        return $query;
    }

    public function parseFilters(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface
    {
        $filters = $request->input('filter', []);
        $allowedFilters = [];

        foreach ($filters as $filterName => $filterValue) {
            if ($filter = $this->getFilterMapping($filterName)) {
                $allowedFilters[] = $filter;
            }
        }

        $queryBuilder->allowedFilters($allowedFilters);

        return $this;
    }

    public function parseRelationships(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface
    {
        $includes = explode(',', $request->input('include', ''));

        $queryBuilder->allowedIncludes($includes);

        return $this;
    }

    public function parseRelationshipsFields(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface
    {
        $fields = $request->input('fields', []);
        $includedFields = [];
        foreach ($fields as $relationshipName => $fieldNames) {
            $fields = explode(',', (string) $fieldNames);
            foreach ($fields as $field) {
                $includedFields[] = "$relationshipName.$field";
            }
        }

        if ($includedFields !== []) {
            $queryBuilder->allowedFields($includedFields);
        }

        return $this;
    }

    public function parseSorts(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface
    {
        $sorts = explode(',', $request->input('sort', ''));

        $queryBuilder->allowedSorts(
            collect($sorts)->filter(fn($sort): bool => $sort !== '' && $sort !== '0')->map(fn($sort) => $this->getSortMapping(trim($sort)))->toArray()
        );

        return $this;
    }

    protected function getSortMapping(string $sort): AllowedSort|string
    {
        return $sort;
    }

    protected function getFilterMapping(string $filter): ?AllowedFilter
    {
        if (Str::endsWith($filter, 'Id')) {
            return AllowedFilter::exact($filter);
        }

        return AllowedFilter::partial($filter);
    }

    /**
     * @throws \ReflectionException
     */
    protected function prepareRequest(Request $request): Request
    {
        $filters = $request->input('filter', []);

        $request->query->set('filter', $filters);

        return $request;
    }
}

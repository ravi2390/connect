<?php

namespace App\Http\Controllers\Filter;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * Interface ParsesQueryInterface
 */
interface ParsesQueryInterface
{
    public function parseRequest(Request $request, string $model): QueryBuilder;

    public function parseFilters(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface;

    public function parseRelationships(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface;

    public function parseRelationshipsFields(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface;

    public function parseSorts(Request $request, QueryBuilder $queryBuilder): ParsesQueryInterface;
}

<?php

namespace App\Helpers;

use Database\Seeders\helpers;
use Illuminate\Database\Query\Builder;

class Query
{
    public static function addJoin(Builder $builder, string $joinTableName, string $originTableName, string $joinKey, string $originKey, array $additionalSelects = [], $addSelectClause = true): void
    {
        if (! JoinFinder::isTableJoined($builder->joins ?? [], $joinTableName)) {
            self::replaceOrderClause($builder, $originKey, "{$originTableName}.{$originKey}");
            if ($addSelectClause) {
                self::addSelectClause($builder, "{$originTableName}.*");
            }

            foreach ($additionalSelects as $additionalSelect) {
                self::addSelectClause($builder, $additionalSelect);
            }

            $builder->distinct()->join($joinTableName, "{$joinTableName}.{$joinKey}", '=', "{$originTableName}.{$originKey}");
        }
    }

    public static function addSelectClause(Builder $builder, string $originalField): void
    {
        if (! SelectFinder::findColumn($builder, $originalField)) {
            $builder->columns[] = $originalField;
        }
    }

    public static function replaceOrderClause(Builder $builder, string $originalField, string $replaceField): void
    {
        $index = 0;
        if (! empty($builder->orders)) {
            foreach ($builder->orders as $orderData) {
                if ($orderData['column'] === $originalField) {
                    $builder->orders[$index]['column'] = $replaceField;

                    return;
                }
                $index++;
            }
        }
    }
}

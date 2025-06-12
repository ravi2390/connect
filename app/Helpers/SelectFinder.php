<?php

namespace App\Helpers;

use Database\Seeders\helpers;
use Illuminate\Database\Query\Builder;

class SelectFinder
{
    public static function findColumn(Builder $builder, string $originalField): bool
    {
        if (! empty($builder->columns)) {
            foreach ($builder->columns as $column) {
                if ($column === $originalField) {
                    return true;
                }
            }
        }

        return false;
    }

    public static function addSelectClause(Builder $builder, string $originalField): void
    {
        if (! self::findColumn($builder, $originalField)) {
            $builder->columns[] = $originalField;
        }
    }
}

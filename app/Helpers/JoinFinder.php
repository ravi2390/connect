<?php

namespace App\Helpers;

use Database\Seeders\helpers;
use Illuminate\Database\Query\JoinClause;

class JoinFinder
{
    public static function isTableJoined(array $joins, string $tableName): bool
    {
        /** @var JoinClause $join */
        foreach ($joins as $join) {
            if ($join->table === $tableName) {
                return true;
            }
        }

        return false;
    }
}

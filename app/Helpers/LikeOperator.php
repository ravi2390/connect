<?php

namespace App\Helpers;

use Database\Seeders\helpers;
use Illuminate\Database\Eloquent\Builder;

class LikeOperator
{
    public static function whereLike(Builder $query, $property, $value, $boolean = 'and'): void
    {
        $wrappedProperty = $query->getQuery()->getGrammar()->wrap($property);
        $sql = "LOWER({$wrappedProperty}) LIKE ?";
        $value = mb_strtolower((string) $value, 'UTF8');
        $query->whereRaw($sql, ["%{$value}%"], $boolean);
    }

    public static function whereLikeStripNonNumbers(Builder $query, $property, $fieldValue, $boolean = 'and'): void
    {
        $wrappedProperty = $query->getQuery()->getGrammar()->wrap($property);
        $sql = "REPLACE(TRANSLATE($wrappedProperty, 'abcdefghijklmnopqrstuvwxyz+()- ,#+:.', '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'), '@', '') LIKE ?";
        $value = preg_replace('/[^0-9]/', '', (string) $fieldValue);
        $query->whereRaw($sql, ["%{$value}%"], $boolean);
    }
}

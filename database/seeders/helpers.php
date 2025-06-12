<?php

namespace Database\Seeders;

use Illuminate\Support\Str;

function openInputCSV($filename, bool $useHeaders = false, &$headers = [], $snakeCase = true)
{
    $handle = fopen($filename, 'r');
    if ($useHeaders) {
        $headers = fgetcsv($handle);
        if ($snakeCase) {
            array_walk($headers, function (&$value) {
                $value = Str::snake($value);
            });
        }
    }

    return $handle;
}

function closeInputCSV($handle)
{
    fclose($handle);
}

function strToPrimitive($value)
{
    switch (true) {
        case filter_var($value, FILTER_VALIDATE_FLOAT, FILTER_NULL_ON_FAILURE) !== null:
            return filter_var($value, FILTER_VALIDATE_FLOAT);
        case filter_var($value, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE) !== null:
            return filter_var($value, FILTER_VALIDATE_INT);
        case filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) !== null:
            $value = filter_var($value, FILTER_VALIDATE_BOOLEAN);

            return $value;
        default:
            break;
    }

    return $value;
}

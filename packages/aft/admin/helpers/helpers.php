<?php

if (! function_exists('ping')) {
    function ping($host, $port): bool
    {
        try {
            $errno = 0;
            $errstr = '';
            $timeout = 1; // seconds
            fsockopen($host, $port, $errno, $errstr, $timeout);

            return true;
        } catch (\Exception) {
            return false;
        }
    }
}

if (! function_exists('undot')) {
    /**
     * @return mixed[]
     */
    function undot($keys, array $array): array
    {
        if (empty($keys)) {
            return [$array];
        }
        if (is_string($keys)) {
            $keys = explode('.', $keys);
        }
        $key = reset($keys);
        $value = $array[$key];
        $newKeys = array_diff($keys, [$key]);

        return [$value => undot($newKeys, $array)];
    }
}

if (! function_exists('unflatten')) {
    /**
     * @return mixed[]
     */
    function unflatten($keys, $items): array
    {
        if (is_string($keys)) {
            $keys = explode('.', $keys);
        }
        $result = [];
        foreach ($items as $item) {
            $result = array_merge_recursive($result, undot($keys, $item));
        }

        return $result;
    }
}

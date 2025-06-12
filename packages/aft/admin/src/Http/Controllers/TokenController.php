<?php

namespace Aft\Admin\Http\Controllers;

use App\Http\Controllers\Controller;

class TokenController extends Controller
{
    public static function urlHashGenerate(string $base, $data): string
    {
        $query = http_build_query($data, null, '&', PHP_QUERY_RFC3986);
        $hash = md5($query);

        return $base.'?'.$query.'&hash='.$hash;
    }

    public static function urlHashValidate($url): bool
    {
        parse_str(parse_url((string) $url, PHP_URL_QUERY), $data);
        $hash = $data['hash'];
        unset($data['hash']);
        $query = http_build_query($data, null, '&', PHP_QUERY_RFC3986);
        $queryHash = md5($query);

        return $hash === $queryHash;
    }

    public static function base64_encode_url($string): string
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode((string) $string));
    }

    public static function base64_decode_url($string): string
    {
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $string));
    }

    public static function makeToken($guid): string
    {
        return self::base64_encode_url(base64_encode((string) $guid));
    }
}

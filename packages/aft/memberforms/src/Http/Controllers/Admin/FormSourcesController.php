<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\MemberForms\Models\FormTestSource;
use App\Http\Controllers\Controller;
use App\Models\LocalDuesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class FormSourcesController extends Controller
{
    private static function booleanval($value)
    {
        if (is_bool($value)) {
            return $value;
        }
        if (is_numeric($value)) {
            return boolval($value);
        }
        if (is_string($value)) {
            $string = strtolower($value);
            switch ($string) {
                case '0':
                    return false;
                case '1':
                    return true;
                case 'false':
                    return false;
                case 'true':
                    return true;
            }
        }

        return false;
    }

    /**
     * @return mixed[]
     */
    private static function doParameters(array $queryOrFunction, $sources): array
    {
        $params = [];
        foreach ($queryOrFunction['parameters'] as $param) {
            if ($param['value'] ?? false) {
                $params[$param['name']] = $param['value'];
            } elseif ($param['ref']) {
                $params[$param['name']] = self::toDefault([
                    'type' => 'reference',
                    'default' => $param['ref'],
                ], $sources);
            }
        }

        return $params;
    }

    private static function doSelects(array $query, $sources)
    {
        if ($query['selects'] ?? false) {
            return $query['selects'];
        }

        return [];
    }

    private static function doQuery(array $query, $sources)
    {
        $params = self::doParameters($query, $sources);
        $selects = self::doSelects($query, $sources);
        $q = ('\\App\\Models\\'.$query['name'])::query();
        foreach ($params as $name => $value) {
            if (is_array($value)) {
                $q->whereIn($name, $value);
            } else {
                $q->where($name, '=', $value);
            }
        }
        foreach ($selects as $select) {
            $q->addSelect($select);
        }

        return $q->get();
    }

    private static function doFunction(array $function, $sources)
    {
        $params = self::doParameters($function, $sources);
        $fn = $function['name'];

        return self::$fn(...array_values($params));
    }

    private function doGetLocalDuesCategory($affiliateId)
    {
        if (is_array($affiliateId)) {
            $duesCategories = LocalDuesCategory::whereIn('AffiliateId', $affiliateId)->get();
        } else {
            $duesCategories = LocalDuesCategory::where('AffiliateId', '=', $affiliateId)->get();
        }

        return $duesCategories;
    }

    public static function toDefault(array $source, $sources)
    {
        $type = $source['type'];
        $default = $source['default'];
        switch ($type) {
            case 'null':
                return null;
            case 'binary':
                return self::booleanval($default);
            case 'number':
                if (is_float($default)) {
                    return $default;
                }
                if (is_numeric($default)) {
                    return intval($default);
                }
                break;
            case 'text':
                return strval($default);
            case 'list':
                if (is_array($default)) {
                    return $default;
                }
                if (is_object($default)) {
                    return $default;
                }
                $json = json_decode((string) $default, true);
                if ($json) {
                    return $json;
                }
                $ref = $sources[$default] ?? null;
                if ($ref) {
                    return Arr::wrap(self::toDefault($ref, $sources));
                }

                return Arr::wrap($default);
            case 'query':
                switch (gettype($default)) {
                    case 'string':
                        $query = json_decode($default, true);
                        break;
                    case 'array':
                        $query = $default;
                        break;
                    default:
                        return null;
                }

                return self::doQuery($query, $sources);
                break;
            case 'function':
                $function = json_decode((string) $default, true);

                return self::doFunction($function, $sources);
                break;
            case 'reference':
                $ref = $sources[$default] ?? null;
                if ($ref) {
                    return self::toDefault($ref, $sources);
                }

                return $default;
        }

        return null;
    }

    public function index(Request $request)
    {
        $sources = collect(FormTestSource::all()->toArray());
        $sources = $sources->mapWithKeys(fn($item, $key) => [$item['name'] => $item]);
        $sources = $sources->toArray();
        foreach ($sources as &$source) {
            $source['default'] = static::toDefault($source, $sources);
        }

        return $sources;
    }
}

<?php

namespace Aft\Admin\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use ReflectionClass;

class AbstractResource extends JsonResource
{
    /**
     * @return array
     *
     * @throws \ReflectionException
     */
    public static function getRelationships($resource): array
    {
        static $allowedRelationshipTypes = [
            'HasOne',
            'HasMany',
            'BelongsTo',
            'BelongsToMany',
            'MorphTo',
            'MorphToMany',
        ];

        $reflectionClass = new ReflectionClass($resource);
        $relationships = [];
        $methods = $reflectionClass->getMethods();

        foreach ($methods as $method) {
            $returnType = $method->getReturnType();
            $returnTypeName = null;

            if ($returnType instanceof \ReflectionNamedType) {
                $returnTypeName = class_basename($returnType->getName());
            } elseif ($returnType instanceof \ReflectionUnionType) {
                foreach ($returnType->getTypes() as $type) {
                    $baseName = class_basename($type->getName());
                    if (in_array($baseName, $allowedRelationshipTypes)) {
                        $returnTypeName = $baseName;
                        break;
                    }
                }
            }

            if ($returnTypeName && in_array($returnTypeName, $allowedRelationshipTypes)) {
                $relationships[$method->name] = $returnTypeName;
            }
        }

        return $relationships;
    }


    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     *
     * @throws \ReflectionException
     */
    #[\Override]
    public function toArray(\Illuminate\Http\Request $request)
    {
        $relationships = self::getRelationships($request->resource);
        foreach ($relationships as $name => $type) {
            if ($type == 'HasMany' || $type == 'BelongsToMany' || $type == 'MorphToMany') {
                $this->resource->$name = $this->resource->$name()->paginate();
            } else {
                $this->resource->load($name);
            }
        }

        return parent::toArray($request);
    }

    /**
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    #[\Override]
    public static function collection($resource)
    {
        $response = new ResourceCollection($resource);

        if (! empty($response->collection->first())) {
            $item = $response->collection->first();
            $attributes = array_map(fn(): null => null, $item->getAttributes());
            $relations = self::getRelationships($item);
            $headers = array_merge($attributes, $relations);
            $response->additional['meta'] = [
                'headers' => $headers,
            ];
        }

        return $response;
    }

    /**
     * @param  string  $perPageName
     * @param  int  $default
     * @return int
     */
    public static function resolvePerPage($perPageName = 'perPage', $default = 15)
    {
        $perPage = app('request')->input($perPageName);

        if (filter_var($perPage, FILTER_VALIDATE_INT) !== false && (int) $perPage >= 1) {
            return (int) $perPage;
        }

        return $default;
    }
}

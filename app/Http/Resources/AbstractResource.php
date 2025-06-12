<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

abstract class AbstractResource extends JsonResource
{
    public const IGNORE_SIMPLE_FIELDS_PARAM = 'ignore_simple';

    abstract protected function getRelationshipFields(): array;

    abstract protected function getSimpleFields(): array;

    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     */
    #[\Override]
    public function toArray($request): array
    {
        $dataToSerialize = $this->serializeSimpleFields($request, []);

        return $this->serializeRelationships($request, $dataToSerialize);
    }

    protected function serializeRelationships(Request $request, array $dataToSerialize): array
    {
        $includes = $this->parseIncludes($request->input('include', ''));

        foreach ($this->getRelationshipFields() as $relationshipField) {
            $methodName = 'include'.ucfirst((string) $relationshipField);
            if (in_array($relationshipField, $includes, true) && method_exists($this, $methodName) && ! empty($this->{$relationshipField})) {
                $dataToSerialize[$relationshipField] = $this->{$methodName}();
            }
        }

        return $dataToSerialize;
    }

    protected function serializeSimpleFields(Request $request, array $dataToSerialize): array
    {
        if ($request->query->getInt(self::IGNORE_SIMPLE_FIELDS_PARAM) === 0) {
            foreach ($this->getSimpleFields() as $simpleField) {
                $dataToSerialize[$simpleField] = $this->{$simpleField} ?? '';
            }
        }

        $request->query->remove(self::IGNORE_SIMPLE_FIELDS_PARAM);

        return $dataToSerialize;
    }

    protected function parseIncludes(string $includes): array
    {
        return collect(explode(',', $includes))->map(fn(string $item) => explode('.', $item))->flatten()->toArray();
    }

    public function exportResource(array $config, $type): array
    {
        $row = [];
        foreach ($config['fields'] as $field) {
            if ($type === 'all' || $field['visible']) {
                $row[] = $this->exportCell($field['value']);
            }
        }

        return $row;
    }

    protected function exportCell($fieldName)
    {
        if ($this->offsetExists($fieldName)) {
            return $this->{$fieldName};
        }

        return '';
    }

    protected function formatDate($value)
    {
        return $value;
    }

    protected function formatDateString(\DateTimeInterface|\Carbon\WeekDay|\Carbon\Month|string|int|float|null $value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}

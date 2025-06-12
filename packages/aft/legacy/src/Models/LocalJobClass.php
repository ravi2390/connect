<?php

namespace Aft\Legacy\Models;

class LocalJobClass extends LegacyModel
{
    protected $table = 'LocalJobClass';

    protected $primaryKey = 'LocalJobClassId';

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $dates = [
        'cdate',
        'mdate',
    ];

    public function transform(int $newUnitId): array
    {
        $attributes = [];
        $attributes['LocalJobClassGuid'] = $this->LocalJobClassId;
        $attributes['LocalJobClassName'] = $this->LocalJobClassName;
        $attributes['LocalJobClassCode'] = $this->LocalJobClassCode;
        $attributes['UnitId'] = $newUnitId;
        $attributes['IsStructural'] = 0;
        $attributes['IsUnknown'] = 0;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}

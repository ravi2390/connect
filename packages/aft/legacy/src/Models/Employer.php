<?php

namespace Aft\Legacy\Models;

use Aft\Legacy\LegacyFlatData;

class Employer extends LegacyModel
{
    protected $table = 'Employer';

    protected $primaryKey = 'EmployerId';

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $dates = [
        'cdate',
        'mdate',
    ];

    public function transform(LegacyFlatData $flatData, int $chapterId): array
    {
        $attributes = [];
        $attributes['EmployerGuid'] = $this->EmployerId;
        $attributes['EmployerName'] = $this->EmployerName;
        $attributes['EmployerTypeId'] = $flatData->getMapping('EmployerType', $this->EmployerTypeId) ?? $flatData->getMapping('EmployerType', 'Unknown');
        // Intentionally omitted - new in 2.0.
        //        $attributes['ParentEmployerId'] = null;
        $attributes['Acronym'] = '';
        $attributes['EmployerCode'] = null;
        $attributes['ChapterId'] = $chapterId;
        // Compare to uuid for government.
        $attributes['HasPrivateSector'] = $this->EmployerTypeId == '5D4A5FFE-FE85-11D4-B096-00508B6D7CC3' ? 0 : 1;
        $attributes['Area'] = $this->EmployerArea;
        $attributes['WebsiteURL'] = $this->Website;
        $attributes['IsStructural'] = 0;
        $attributes['IsUnknown'] = 0;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}

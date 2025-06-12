<?php

namespace Aft\Legacy\Models;

class Subject extends LegacyModel
{
    public function transform($newAffiliateId): array
    {
        $attributes = [];
        $attributes['SubjectGuid'] = $this->SubjectId;
        $attributes['SubjectName'] = $this->SubjectName;
        $attributes['AffiliateId'] = $newAffiliateId;

        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }
}

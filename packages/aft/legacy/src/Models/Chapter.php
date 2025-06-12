<?php

namespace Aft\Legacy\Models;

use Aft\Legacy\LegacyFlatData;

class Chapter extends LegacyModel
{
    protected $table = 'Chapter';

    protected $primaryKey = 'ChapterId';

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $dates = [
        'cdate',
        'mdate',
    ];

    public function transformChapter(int $newAffiliateId, ?string $affiliateEin = null): array
    {
        $attributes = [];
        $attributes['ChapterGuid'] = $this->ChapterId;
        $attributes['ChapterName'] = $this->ChapterName;
        $attributes['ChapterNumber'] = $this->ChapterNbr;
        $attributes['AffiliateId'] = $newAffiliateId;
        $attributes['IsChapterActive'] = 1;
        $attributes['IsStructural'] = 0;
        $attributes['IsUnknown'] = 0;
        $attributes['ChapterEIN'] = $affiliateEin;
        $attributes['IsChartered'] = $this->CharteredTF;
        $attributes['CharterDate'] = $this->DateChartered;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }

    public function transformUnit(LegacyFlatData $flatData, int $agreementId): array
    {
        $attributes = [];
        $attributes['UnitGuid'] = $this->ChapterId;
        $attributes['UnitName'] = $this->ChapterName;
        $attributes['UnitTypeId'] = static::isRetireeChapter($this->ChapterName) ?
            $flatData->getMapping('UnitType', 'Retiree') :
            $flatData->getMapping('UnitType', 'Unknown');
        $attributes['LocalAgreementId'] = $agreementId;
        $attributes['IsStructural'] = 0;
        $attributes['IsUnknown'] = 0;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }

    /**
     * Whether this is a legacy retiree chapter (2.0 retiree unit).
     */
    public static function isRetireeChapter(string $name): bool
    {
        return preg_match('/(reti)|( ret$)|(^ret )|(^ret$)/i', $name);
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class Chapter extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'employer',
            'Affiliate',
            'nonStructuralEmployer',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'ChapterId',
            'ChapterGUID',
            'ChapterNumber',
            'ChapterName',
            'IsChapterActive',
            'IsStructural',
        ];
    }

    protected function includeEmployer(): AnonymousResourceCollection
    {
        return Employer::collection($this->employer);
    }

    protected function includeAffiliate(): \App\Http\Resources\Affiliate
    {
        return new Affiliate($this->Affiliate);
    }

    protected function includeNonStructuralEmployer()
    {
        return Employer::collection($this->nonStructuralEmployer);
    }
}

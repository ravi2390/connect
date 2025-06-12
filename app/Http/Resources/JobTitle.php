<?php

namespace App\Http\Resources;

use App\Http\Resources\LocalJobClass as LocalJobClassResource;

class JobTitle extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'LocalJobClass',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'JobTitleId',
            'JobTitleName',
        ];
    }

    protected function includeLocalJobClass(): \App\Http\Resources\LocalJobClass
    {
        return new LocalJobClassResource($this->LocalJobClass);
    }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\Division as DivisionResource;
use App\Http\Resources\LocalAgreement as LocalAgreementResource;

class Unit extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'LocalAgreement',
            'Division',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'UnitId',
            'UnitName',
        ];
    }

    protected function includeLocalAgreement(): \App\Http\Resources\LocalAgreement
    {
        return new LocalAgreementResource($this->LocalAgreement);
    }

    protected function includeDivision(): \App\Http\Resources\Division
    {
        return new DivisionResource($this->Division);
    }
}

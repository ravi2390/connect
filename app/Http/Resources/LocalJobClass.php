<?php

namespace App\Http\Resources;

use App\Http\Resources\NationalJobClass as NationalJobClassResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LocalJobClass extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'NationalJobClass',
            'Unit',
            'IndividualEmployer',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'LocalJobClassId',
            'LocalJobClassGuid',
            'LocalJobClassName',
            'LocalJobClassCode',
            'UnitId',
        ];
    }

    protected function includeNationalJobClass(): \App\Http\Resources\NationalJobClass
    {
        return new NationalJobClassResource($this->NationalJobClass);
    }

    protected function includeUnit(): \App\Http\Resources\Unit
    {
        return new Unit($this->Unit);
    }

    protected function includeIndividualEmployer(): AnonymousResourceCollection
    {
        return IndividualEmployer::collection($this->IndividualEmployer);
    }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\Employer as EmployerResource;

class LocalAgreement extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'Employer',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'LocalAgreementId',
            'LocalAgreementName',
            'Chapter',
        ];
    }

    protected function includeEmployer(): \App\Http\Resources\Employer
    {
        return new EmployerResource($this->Employer);
    }
}

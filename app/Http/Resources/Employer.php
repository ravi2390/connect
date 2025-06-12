<?php

namespace App\Http\Resources;

use App\Http\Resources\Chapter as ChapterResource;
use App\Http\Resources\Employer as EmployerResource;
use App\Http\Resources\EmployerType as EmployerTypeResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class Employer extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'EmployerType',
            'EmployerMainPhones',
            'employerPhones',
            'employerEmails',
            'EmployerMainEmails',
            'employerAddresses',
            'EmployerPreferredAddresses',
            'EmployerMainAddresses',
            'WorkStructure',
            'WorkLocation',
            'Chapter',
            'ParentEmployer',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'EmployerId',
            'EmployerGUID',
            'EmployerName',
            'Acronym',
            'Code',
            'IsStructural',
            'WebsiteURL'
        ];
    }

    protected function includeEmployerType(): \App\Http\Resources\EmployerType
    {
        return new EmployerTypeResource($this->EmployerType);
    }

    protected function includeEmployerPhones(): AnonymousResourceCollection
    {
        return EmployerPhone::collection($this->employerPhones);
    }

    protected function includeEmployerMainPhones()
    {
        return EmployerPhone::collection($this->EmployerMainPhones);
    }

    protected function includeEmployerEmails(): AnonymousResourceCollection
    {
        return EmployerEmail::collection($this->employerEmails);
    }

    protected function includeEmployerMainEmails(): AnonymousResourceCollection
    {
        return EmployerEmail::collection($this->EmployerMainEmails);
    }

    protected function includeParentEmployers(): AnonymousResourceCollection
    {
        return Employer::collection($this->ParentEmployers);
    }

    protected function includeEmployerAddresses(): AnonymousResourceCollection
    {
        return EmployerAddress::collection($this->employerAddresses);
    }

    protected function includeEmployerPreferredAddresses(): AnonymousResourceCollection
    {
        return EmployerAddress::collection($this->EmployerPreferredAddresses);
    }

    protected function includeEmployerMainAddresses(): AnonymousResourceCollection
    {
        return EmployerAddress::collection($this->EmployerMainAddresses);
    }

    protected function includeWorkStructure(): AnonymousResourceCollection
    {
        return WorkStructure::collection($this->WorkStructure);
    }

    protected function includeWorkLocation(): AnonymousResourceCollection
    {
        return WorkLocation::collection($this->WorkLocation);
    }

    protected function includeChapter(): \App\Http\Resources\Chapter
    {
        return new ChapterResource($this->Chapter);
    }

    public function includeParentEmployer(): \App\Http\Resources\Employer
    {
        return new EmployerResource($this->ParentEmployer);
    }
}

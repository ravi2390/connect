<?php

namespace App\Http\Resources;

use App\Http\Resources\Employer as EmployerResource;
use App\Http\Resources\JobTitle as JobTitleResource;
use App\Http\Resources\LocalJobClass as LocalJobClassResource;
use App\Http\Resources\Subject as SubjectResource;
use App\Http\Resources\Unit as UnitResource;
use App\Http\Resources\WorkLocation as WorkLocationResource;
use App\Http\Resources\WorkStructure as WorkStructureResource;

class IndividualEmployer extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'WorkLocation',
            'WorkStructure',
            'Unit',
            'Subject',
            'LocalJobClass',
            'Employer',
            'JobTitle',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualEmployerId',
            'IndividualId',
            'EmployerId',
            'EmployeeId',
            'HireDate',
            'StartDate',
            'UnitStartDate',
            'EndDate',
            'WorkShift',
            'RetirementEffDate',
            'IsTenured',
            'IsPartTime',
            'UpdatedAt',
            'UpdatedBy',
            'RoomNumber',
            'Source',
            'StopReason',
            'CurrentlyWorking',
            'WorkLocationId',
            'WorkStructureId',
            'SubjectId',
            'LocalJobClassId',
            'JobTitleId',
            'JobDescription',
            'FullTimeEquivalent',
            'PositionId',
            'IsPreferred',
        ];
    }

    protected function includeJobTitle(): \App\Http\Resources\JobTitle
    {
        return new JobTitleResource($this->JobTitle);
    }

    protected function includeWorkLocation(): \App\Http\Resources\WorkLocation
    {
        return new WorkLocationResource($this->WorkLocation);
    }

    protected function includeWorkStructure(): \App\Http\Resources\WorkStructure
    {
        return new WorkStructureResource($this->WorkStructure);
    }

    protected function includeUnit(): \App\Http\Resources\Unit
    {
        return new UnitResource($this->Unit);
    }

    protected function includeSubject(): \App\Http\Resources\Subject
    {
        return new SubjectResource($this->Subject);
    }

    protected function includeLocalJobClass(): \App\Http\Resources\LocalJobClass
    {
        return new LocalJobClassResource($this->LocalJobClass);
    }

    protected function includeEmployer(): \App\Http\Resources\Employer
    {
        return new EmployerResource($this->Employer);
    }
}

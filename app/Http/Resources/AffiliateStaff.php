<?php

namespace App\Http\Resources;

use App\Http\Resources\Individual as IndividualResource;
use App\Http\Resources\StaffDepartment as StaffDepartmentResource;

class AffiliateStaff extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'StaffDepartment',
            'Individual',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'AffiliateStaffId',
            'AffiliateId',
            'StaffTitle',
            'TermStartDate',
            'TermEndDate',
            'IsActive',
        ];
    }

    protected function includeStaffDepartment(): \App\Http\Resources\StaffDepartment
    {
        return new StaffDepartmentResource($this->StaffDepartment);
    }

    protected function includeIndividual(): \App\Http\Resources\Individual
    {
        return new IndividualResource($this->Individual);
    }
}

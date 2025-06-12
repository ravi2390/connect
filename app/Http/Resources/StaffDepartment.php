<?php

namespace App\Http\Resources;

class StaffDepartment extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [

        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'StaffDepartmentId',
            'StaffDepartmentName',
            'CreatedBy',
            'CreatedAt',
            'UpdatedAt',
            'UpdatedBy',
            'DeletedAt',
        ];
    }
}

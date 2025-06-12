<?php

namespace App\Http\Resources;

class FiduciaryBondCoverage extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'FiduciaryBondCoverageId',
            'FiduciaryBondCoverageName',
            'DisplayOrder',
        ];
    }
}

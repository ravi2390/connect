<?php

namespace App\UI\Data\Fields\Override;

use App\UI\Provider\AbstractConfigurationProvider;

class Employer extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return [
            'fields' => [
                ['title' => 'Employer Name', 'value' => 'EmployerName', 'visible' => true, 'sortable' => true],
                ['title' => 'Type', 'value' => 'EmployerType', 'visible' => true, 'sortable' => true],
                ['title' => 'Code', 'value' => 'EmployerCode', 'visible' => true, 'sortable' => true],
                ['title' => 'Phone', 'value' => 'EmployerMainPhones', 'visible' => true, 'sortable' => true],
                ['title' => 'Email', 'value' => 'EmployerMainEmails', 'visible' => true, 'sortable' => true],
                ['title' => 'Address', 'value' => 'EmployerMainAddresses', 'visible' => true, 'sortable' => false],
                ['title' => 'GUID', 'value' => 'EmployerGUID', 'visible' => true, 'sortable' => false],
                ['title' => 'Parent Employer', 'value' => 'ParentEmployer', 'visible' => true, 'sortable' => true],
                ['title' => 'Affiliate', 'value' => 'Chapter.Affiliate', 'visible' => true, 'sortable' => false],
            ],
            'filters' => [],
        ];
    }
}

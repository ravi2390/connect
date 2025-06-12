<?php

namespace App\UI\Data\Fields\Override;

use App\UI\Provider\AbstractConfigurationProvider;

class EmployerSearch extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return [
            'fields' => [
                ['title' => 'Employer Name', 'value' => 'EmployerName', 'visible' => true, 'sortable' => false],
                ['title' => 'Affiliate Name', 'value' => 'Chapter.Affiliate.AffiliateName', 'visible' => true, 'sortable' => false],
                ['title' => 'Affiliate Number', 'value' => 'Chapter.Affiliate.AffiliateNumber', 'visible' => true, 'sortable' => false],
                ['title' => 'Employer City', 'value' => 'EmployerCity', 'visible' => true, 'sortable' => false],
                ['title' => 'Employer State', 'value' => 'EmployerState', 'visible' => true, 'sortable' => false],
            ],
            'filters' => [
                [
                    'name' => 'EmployerName',
                    'label' => 'Employer Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'Chapter.Affiliate.AffiliateName',
                    'label' => 'Associated with affiliate name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'Chapter.Affiliate.AffiliateNumber',
                    'label' => 'Associated with affiliate number',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'EmployerMainAddresses.City',
                    'label' => 'Employer City',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'EmployerMainAddresses.StateTerritory.StateTerritoryName',
                    'label' => 'Employer State',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],

            ],
        ];
    }
}

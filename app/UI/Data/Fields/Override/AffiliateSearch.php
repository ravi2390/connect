<?php

namespace App\UI\Data\Fields\Override;

use App\UI\Provider\AbstractConfigurationProvider;

class AffiliateSearch extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return [
            'fields' => [
                ['title' => 'Affiliate Name', 'value' => 'AffiliateName', 'visible' => true, 'sortable' => false],
                ['title' => 'Affiliate Number', 'value' => 'AffiliateNumber', 'visible' => true, 'sortable' => false],
                ['title' => 'Address', 'value' => 'Address', 'visible' => true, 'sortable' => false],
                ['title' => 'Contact Information', 'value' => 'ContactInformation', 'visible' => true, 'sortable' => false],
                ['title' => 'President', 'value' => 'President', 'visible' => true, 'sortable' => false],
                ['title' => 'Secretary/Treasurer', 'value' => 'SecretaryTreasurer', 'visible' => true, 'sortable' => false],
                ['title' => 'Staff', 'value' => 'Staff', 'visible' => true, 'sortable' => false],
            ],
            'filters' => [
                [
                    'name' => 'AffiliateName',
                    'label' => 'Affiliate Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'AffiliateNumber',
                    'label' => 'Affiliate Number',
                    'value' => '',
                    'type' => 'text',
                    'items' => [],
                    'visible' => true,
                ],
                [
                    'name' => 'StateFedAssociation',
                    'label' => 'State Fed Association',
                    'value' => '',
                    'type' => 'select',
                    'visible' => true,
                ],
                [
                    'name' => 'City',
                    'label' => 'City',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'HomeState',
                    'label' => 'Home State',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
            ],
        ];
    }
}

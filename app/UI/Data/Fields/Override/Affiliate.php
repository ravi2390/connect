<?php

namespace App\UI\Data\Fields\Override;

use App\UI\Provider\AbstractConfigurationProvider;

class Affiliate extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return [
            'fields' => [
                ['title' => 'Affiliate Name', 'value' => 'AffiliateName', 'visible' => true, 'sortable' => true],
                ['title' => 'Affiliate Number', 'value' => 'AffiliateNumber', 'visible' => true, 'sortable' => true],
                ['title' => 'Abbreviated Name', 'value' => 'AffiliateAbbreviatedName', 'visible' => true, 'sortable' => true],
                ['title' => 'Acronym', 'value' => 'AffiliateAcronym', 'visible' => true, 'sortable' => true],
                ['title' => 'Affiliate EIN', 'value' => 'AffiliateEIN', 'visible' => true, 'sortable' => true],
                ['title' => 'GUID', 'value' => 'AffiliateGuid', 'visible' => true, 'sortable' => true],
                ['title' => 'Affiliate type', 'value' => 'AffiliateType.AffiliateTypeName', 'visible' => true, 'sortable' => true],
                ['title' => 'BillHighway GroupID', 'value' => 'BillHighwayGroupId', 'visible' => true, 'sortable' => true],
                ['title' => 'CharterDate', 'value' => 'CharterDate', 'visible' => true, 'sortable' => true],
                ['title' => 'Address', 'value' => 'Address', 'visible' => true, 'sortable' => true],
                ['title' => 'Phone', 'value' => 'Phone', 'visible' => true, 'sortable' => true],
                ['title' => 'Email Address', 'value' => 'Email', 'visible' => true, 'sortable' => true],
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
                    'type' => 'autocomplete',
                    'items' => [],
                    'options' => [
                        'url' => '/api/v2/affiliate?scope=global',
                        'displayField' => 'AffiliateNumber',
                        'valueField' => 'AffiliateNumber',
                        'searchField' => 'AffiliateNumber',
                        'type' => 'StringInArray',
                        'eager' => true,
                    ],
                    'visible' => true,
                ],
                [
                    'name' => 'AffiliateAcronym',
                    'label' => 'Acronym',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'AffiliateTypeId',
                    'label' => 'Type',
                    'value' => '',
                    'type' => 'autocomplete',
                    'items' => [],
                    'options' => [
                        'url' => '/api/v2/affiliateType?sort=AffiliateTypeName',
                        'displayField' => 'AffiliateTypeName',
                        'valueField' => 'AffiliateTypeId',
                        'type' => 'StringInArray',
                        'eager' => true,
                    ],
                    'visible' => true,
                ],
                [
                    'name' => 'affiliateAddresses.City',
                    'label' => 'City',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'affiliateAddresses.StateTerritoryId',
                    'label' => 'State',
                    'value' => '',
                    'type' => 'autocomplete',
                    'items' => [],
                    'options' => [
                        'url' => '/api/v2/stateTerritory?sort=StateTerritoryName',
                        'displayField' => 'StateTerritoryName',
                        'valueField' => 'StateTerritoryId',
                        'searchField' => 'StateTerritoryName',
                        'type' => 'NumberInArray',
                        'eager' => true,
                    ],
                    'visible' => true,
                ],
                [
                    'name' => 'affiliateDuesCategory.StatePerCapita.StatePerCapitaName',
                    'label' => 'State Fed Per Capita',
                    'value' => '',
                    'type' => 'autocomplete',
                    'items' => [],
                    'options' => [
                        'url' => '/api/v2/StatePerCapita?sort=StatePerCapitaName',
                        'displayField' => 'StatePerCapitaName',
                        'valueField' => 'StatePerCapitaName',
                        'searchField' => 'StatePerCapitaName',
                        'type' => 'StringInArray',
                        'eager' => true,
                    ],
                    'visible' => true,
                ],
                [
                    'name' => 'affiliateDuesCategory.NationalPerCapita.NationalPerCapitaName',
                    'label' => 'National Fed Per Capita',
                    'value' => '',
                    'type' => 'autocomplete',
                    'items' => [],
                    'options' => [
                        'url' => '/api/v2/NationalPerCapita?sort=NationalPerCapitaName',
                        'displayField' => 'NationalPerCapitaName',
                        'searchField' => 'NationalPerCapitaName',
                        'valueField' => 'NationalPerCapitaName',
                        'type' => 'StringInArray',
                        'eager' => true,
                    ],
                    'visible' => true,
                ],
            ],
        ];
    }
}

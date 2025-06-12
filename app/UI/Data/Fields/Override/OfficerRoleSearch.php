<?php

namespace App\UI\Data\Fields\Override;

use App\UI\Provider\AbstractConfigurationProvider;

class OfficerRoleSearch extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return [
            'fields' => [
                ['title' => 'Full Name', 'value' => 'FullName', 'visible' => true, 'sortable' => true],
                ['title' => 'First Name', 'value' => 'FirstName', 'visible' => true, 'sortable' => false],
                ['title' => 'Middle Name', 'value' => 'MiddleName', 'visible' => true, 'sortable' => true],
                ['title' => 'Last Name', 'value' => 'LastName', 'visible' => true, 'sortable' => false],
                ['title' => 'Preferred Name', 'value' => 'PreferredName', 'visible' => true, 'sortable' => true],
                ['title' => 'Officer Roles', 'value' => 'individualAffiliates.AffiliateOfficerRoleName', 'visible' => true, 'sortable' => false],
                ['title' => 'Union Relationship', 'value' => 'activeIndividualAffiliates.UnionRelationship', 'visible' => true, 'sortable' => false],
                ['title' => 'Member ID', 'value' => 'individualMembers', 'visible' => true, 'sortable' => false],
                ['title' => 'Affiliate Name', 'value' => 'AffiliateName', 'visible' => true, 'sortable' => false],
                ['title' => 'Affiliate Number', 'value' => 'AffiliateNumber', 'visible' => true, 'sortable' => false],
                ['title' => 'Home Phone', 'value' => 'individualPhonesHome', 'visible' => true, 'sortable' => false],
                ['title' => 'Mobile Phone', 'value' => 'individualPhones', 'visible' => true, 'sortable' => false],
                ['title' => 'Personal Email', 'value' => 'individualEmails', 'visible' => true, 'sortable' => false],
                ['title' => 'Home Address', 'value' => 'HomeAddress', 'visible' => true, 'sortable' => false],
                ['title' => 'Individual Guid', 'value' => 'IndividualGuid', 'visible' => true, 'sortable' => false],
            ],
            'filters' => [
                [
                    'name' => 'FirstName',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'LastName',
                    'label' => 'Last Name',
                    'value' => '',
                    'type' => 'text',
                    'items' => [],
                    'visible' => true,
                ],
                [
                    'name' => 'MiddleName',
                    'label' => 'Middle Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'PreferredName',
                    'label' => 'Preferred Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'individualMembers.MemberId',
                    'label' => 'Member Id',
                    'value' => '',
                    'type' => 'select',
                    'visible' => true,
                ],
                [
                    'name' => 'individualAffiliates.Affiliate.AffiliateName',
                    'label' => 'Affiliate Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'individualAffiliates.Affiliate.AffiliateNumber',
                    'label' => 'Affiliate Number',
                    'value' => '',
                    'type' => 'text',
                    'items' => [],
                    'visible' => true,
                ],
                [
                    'name' => 'individualAffiliates.individualOfficers.AffiliateOfficerRole.OfficerRoleTitle.OfficerRoleTypeId',
                    'label' => 'Officer Role',
                    'value' => '',
                    'type' => 'select',
                    'visible' => true,
                ],
                [
                    'name' => 'individualAddresses.City',
                    'label' => 'Home City',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'individualAddresses.StateTerritory.StateTerritoryName',
                    'label' => 'Home State',
                    'value' => '',
                    'type' => 'select',
                    'items' => [],
                    'visible' => true,
                ],
                [
                    'name' => 'individualEmails.Email',
                    'label' => 'Personal Email Address',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'individualPhones.PhoneNumber',
                    'label' => 'Phone Number',
                    'value' => '',
                    'type' => 'select',
                    'visible' => true,
                ],
            ],
        ];
    }
}

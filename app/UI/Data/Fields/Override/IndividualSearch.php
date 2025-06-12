<?php

namespace App\UI\Data\Fields\Override;

use App\UI\Provider\AbstractConfigurationProvider;

class IndividualSearch extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return [
            'fields' => [
                ['title' => 'Full Name', 'value' => 'FullName', 'visible' => true, 'sortable' => true],
                ['title' => 'First Name', 'value' => 'FirstName', 'visible' => true, 'sortable' => true],
                ['title' => 'Middle Name', 'value' => 'MiddleName', 'visible' => true, 'sortable' => true],
                ['title' => 'Last Name', 'value' => 'LastName', 'visible' => true, 'sortable' => true],
                ['title' => 'Preferred Name', 'value' => 'PreferredName', 'visible' => true, 'sortable' => true],
                ['title' => 'Original Last Name', 'value' => 'PreviousName', 'visible' => true, 'sortable' => true],
                ['title' => 'Union Relationships', 'value' => 'UnionRelationshipType', 'visible' => true, 'sortable' => true],
                ['title' => 'Local Dues Category', 'value' => 'LocalDuesCategory', 'visible' => true, 'sortable' => true],
                ['title' => 'Member ID', 'value' => 'individualMembers', 'visible' => true, 'sortable' => true],
                ['title' => 'Affiliate Name', 'value' => 'AffiliateName', 'visible' => true, 'sortable' => true],
                ['title' => 'Affiliate Number', 'value' => 'AffiliateNumber', 'visible' => true, 'sortable' => true],
                ['title' => 'Home Phone', 'value' => 'individualPhonesHome', 'visible' => true, 'sortable' => true],
                ['title' => 'Mobile Phone', 'value' => 'individualPhones', 'visible' => true, 'sortable' => true],
                ['title' => 'Email', 'value' => 'individualEmails', 'visible' => true, 'sortable' => true],
                ['title' => 'Home Address', 'value' => 'individualAddresses', 'visible' => true, 'sortable' => true],
                ['title' => 'Employer', 'value' => 'EmployerName', 'visible' => true, 'sortable' => true],
                ['title' => 'Individual Guid', 'value' => 'IndividualGuid', 'visible' => true, 'sortable' => false],
            ],
            'filters' => [
                [
                    'name' => 'firstName',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'middleName',
                    'label' => 'Middle Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'lastName',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'preferredName',
                    'label' => 'Preferred Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'email',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'memberId',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'affiliateName',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'affiliateNumber',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'phoneNumber',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'homeCity',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'homeState',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'previousName',
                    'label' => 'First Name',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
                [
                    'name' => 'zipCode',
                    'label' => 'Zip Code',
                    'value' => '',
                    'type' => 'text',
                    'visible' => true,
                ],
            ],
        ];
    }
}

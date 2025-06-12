<?php

namespace Aft\MemberForms\Seeds;

use Aft\MemberForms\Models\Form;
use Illuminate\Database\Seeder;

class FormsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Form::withoutEvents(function (): void {
            Form::updateOrCreate(['system_name' => 'default'], [
                'affiliate_id' => 1,
                'form_template_id' => 1,
                'order' => 1,
                'display_name' => 'Default Member Signup',
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
                'sources' => [
                    'stateTerritory' => [
                        'type' => 'api:json',
                        'location' => '/api/v3/stateTerritory',
                        'key' => 'StateTerritoryId',
                        'value' => 'StateTerritoryName',
                    ],
                    'workLocation' => [
                        'type' => 'api:json',
                        'location' => '/api/v3/workLocation?filter=[employerId]',
                        'key' => 'WorkLocationId',
                        'value' => 'WorkLocationName',
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'model', 'value' => 'Aft\Forms\Form'],
                ],
                'fields' => [
                    'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dataDest' => 'form.firstName'],
                    'preferredName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dataDest' => 'form.preferredName'],
                    'middleName' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dataDest' => 'form.middleName'],
                    'lastName' => ['order' => 4, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dataDest' => 'form.lastName'],
                    'email' => ['order' => 5, 'required' => true,  'type' => 'email', 'label' => 'Personal Email Address', 'dataDest' => 'form.email'],
                    'mailingAddress' => ['order' => 6, 'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dataDest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dataDest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dataDest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'select', 'label' => 'State', 'dataSource' => 'stateTerritory', 'dataDest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dataDest' => 'form.zip'],
                        ],
                    ],
                    'signaturePrimary' => ['order' => 7, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dataDest' => 'form.signaturePrimary'],
                ],
            ]);

            Form::updateOrCreate(['system_name' => 'defaultCope'], [
                'affiliate_id' => 3133,
                'form_template_id' => 2,
                'order' => 1,
                'display_name' => 'Default Member Cope Signup',
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,

                'sources' => [
                    'stateTerritory' => [
                        'type' => 'api:json',
                        'location' => '/api/v3/stateTerritory',
                        'key' => 'StateTerritoryId',
                        'value' => 'StateTerritoryName',
                    ],
                    'copeAmounts' => [
                        'type' => 'array:json',
                        'location' => '',
                        'key' => 'amounts',
                        'value' => '[5.25, 10, 22.22]',
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'model', 'value' => 'Aft\MemberForms\Form'],
                ],
                'fields' => [
                    'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dataDest' => 'form.firstName'],
                    'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dataDest' => 'form.middleName'],
                    'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dataDest' => 'form.lastName'],
                    'mailingAddress' => ['order' => 4, 'type' => 'group',
                        'label' => 'Mailing Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dataDest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dataDest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dataDest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'select', 'label' => 'State', 'dataSource' => 'stateTerritory', 'dataDest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dataDest' => 'form.zip'],
                        ],
                    ],
                    'email' => ['order' => 5, 'required' => true,  'type' => 'email', 'label' => 'Personal Email', 'dataDest' => 'form.email'],
                    'phoneMobile' => ['order' => 6, 'required' => false, 'type' => 'phone', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile'],
                    'phoneHome' => ['order' => 7, 'required' => false, 'type' => 'phone', 'label' => 'Home Phone', 'dataDest' => 'form.phoneHome'],
                    'customField1' => ['order' => 8, 'required' => true, 'type' => 'text', 'label' => 'Employee ID Number', 'dataDest' => 'form.customField1'],
                    'customField2' => ['order' => 9, 'required' => true, 'type' => 'text', 'label' => 'Work Location Number', 'dataDest' => 'form.customField2'],
                    'copeAffiliateNumber' => ['order' => 10, 'required' => false, 'type' => 'text', 'label' => 'Cope Affiliate Number', 'dataDest' => 'form.copeAffiliateNumber'],
                    'copeAmounts' => ['order' => 11, 'required' => true, 'type' => 'select', 'label' => 'Cope Amount', 'dataSource' => 'copeAmounts', 'dataDest' => 'form.copeAmount'],
                    'signaturePrimary' => ['order' => 12, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dataDest' => 'form.signaturePrimary'],
                ],
            ]);
        });
    }
}

<?php

namespace Aft\MemberForms\Seeds;

use Aft\MemberForms\Models\Template;
use Illuminate\Database\Seeder;

class TemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Template::withoutEvents(function (): void {
            Template::updateOrCreate(['system_name' => 'default'], [
                'order' => 1,
                'display_name' => 'Payroll Deduction',
                'description' => 'Standard payroll deduction form',
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'optional_fields' => [
                    'duesCategories' => [
                        'type' => 'select',
                        'label' => 'Dues Category',
                        'source' => 'duesCategories',
                    ],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 2,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => [
                                'order' => 4,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 4, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'signature' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'legal' => [
                                'order' => 1,
                                'type' => 'textarea',
                                'label' => 'Legal Language',
                                'required' => false,
                                'default' => 'I hereby apply for and voluntarily accept membership in the Union and agree to abide by its Constitution and Bylaws.  I authorize the Union to act as my exclusive representative in collective bargaining over wages, hours, and other terms and conditions of employment with my employer. My membership in the Union shall be continuous unless I notify my Local President in writing that I intend to resign.
I hereby agree to pay the annual dues, fees, and assessments established by the Union in consideration for the services the Union provides. I understand that those annual amounts are subject to periodic change by the governing body of the Union.  I authorize on a continuing basis, and regardless of my membership status, the payment of those annual amounts established by the Union through payroll deduction unless I revoke this authorization in a signed writing sent to [union address] via U.S. mail, between [a period of no less than 15 days and up to 30 days].  Such revocation shall become effective on [date].
I UNDERSTAND THAT THIS AGREEMENT IS VOLUNTARY AND IS NOT A CONDITION OF EMPLOYMENT AND THAT I HAVE THE LEGAL RIGHT TO REFUSE TO SIGN THIS AGREEMENT WITHOUT SUFFERING ANY REPRISAL.',
                            ],
                            'signature' => ['order' => 3, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signature'],
                        ],
                    ],
                    'emailWorkGroup' => [
                        'order' => 7,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 8,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 10,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 6, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 16, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 17, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 18, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 11, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 12, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 13, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 15, 'type' => 'text', 'label' => 'Custom Text field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 20, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 19, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 14,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 3, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues and signing up for membership with the {affiliate_name}, local {affiliate_number}. This email confirms your authorization of a bi-weekly dues payment to the {affiliate_name}, local {affiliate_number}.
You will receive written notification in the event of any changes to the dues amount. If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue dues deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'defaultCope'], [
                'order' => 2,
                'display_name' => 'Payroll Deduction And COPE',
                'description' => 'Standard payroll deduction form with COPE options',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 2,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 4, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'signature' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'legal' => [
                                'order' => 1,
                                'type' => 'textarea',
                                'label' => 'Legal Language',
                                'default' => 'I hereby apply for and voluntarily accept membership in the Union and agree to abide by its Constitution and Bylaws.  I authorize the Union to act as my exclusive representative in collective bargaining over wages, hours, and other terms and conditions of employment with my employer. My membership in the Union shall be continuous unless I notify my Local President in writing that I intend to resign.
I hereby agree to pay the annual dues, fees, and assessments established by the Union in consideration for the services the Union provides. I understand that those annual amounts are subject to periodic change by the governing body of the Union.  I authorize on a continuing basis, and regardless of my membership status, the payment of those annual amounts established by the Union through payroll deduction unless I revoke this authorization in a signed writing sent to [union address] via U.S. mail, between [a period of no less than 15 days and up to 30 days].  Such revocation shall become effective on [date].
I UNDERSTAND THAT THIS AGREEMENT IS VOLUNTARY AND IS NOT A CONDITION OF EMPLOYMENT AND THAT I HAVE THE LEGAL RIGHT TO REFUSE TO SIGN THIS AGREEMENT WITHOUT SUFFERING ANY REPRISAL.',
                            ],
                            'signature' => ['order' => 3, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signature'],
                        ],
                    ],
                    'customCope' => [
                        'order' => 6,
                        'fixed' => false,
                        'required' => false,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 8,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 11,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 10,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 7, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 17, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 18, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 19, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 12, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 13, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 14, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 16, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 21, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 20, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 15,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 3, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues and signing up for membership with the {affiliate_name}, local {affiliate_number}. This email confirms your authorization of a bi-weekly dues payment to the {affiliate_name}, local {affiliate_number}.
You will receive written notification in the event of any changes to the dues amount. If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue dues deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'cope'], [
                'order' => 3,
                'display_name' => 'Payroll COPE',
                'description' => 'Standard COPE options',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 2,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 4, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'customCope' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 7,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 8,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 10,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 6, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 16, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 17, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 18, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 11, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 12, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 13, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 15, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 20, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 19, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 14,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 3, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues. This email confirms your authorization of a bi-weekly cope payment to the {affiliate_name}, local {affiliate_number}.
If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue cope deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'paymentProcessingDues'], [
                'order' => 4,
                'display_name' => 'eDues',
                'description' => 'Standard payment processing Dues form',
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'optional_fields' => [
                    'duesCategories' => [
                        'type' => 'select',
                        'label' => 'Dues Category',
                        'source' => 'duesCategories',
                    ],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 2,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => [
                                'order' => 4,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'billingAddress' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'billingAddress',
                        'label' => 'Billing Address',
                        'fields' => [
                            'billingSameAsHome' => ['fieldName' => 'billingSameAsHome', 'order' => 1, 'required' => false, 'type' => 'checkbox', 'label' => 'Same as Home Address'],
                            'billingAddressLine1' => ['fieldName' => 'billingAddressLine1', 'order' => 2, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1'],
                            'billingAddressLine2' => ['fieldName' => 'billingAddressLine2', 'order' => 3, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2'],
                            'billingCity' => ['fieldName' => 'billingCity', 'order' => 4, 'required' => true,  'type' => 'text', 'label' => 'City'],
                            'billingState' => [
                                'fieldName' => 'billingState',
                                'order' => 5,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'billingZip' => ['fieldName' => 'billingZip', 'order' => 6, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'maxlength' => 5, 'minlength' => 5],
                            'addressBillingPreferred' => ['fieldName' => 'addressBillingPreferred', 'order' => 7, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 4,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 10,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 5, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'payment' => ['order' => 6, 'fixed' => true, 'required' => true, 'type' => 'payment', 'label' => 'Payment Information'],
                    'signature' => [
                        'order' => 7,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'legal' => [
                                'order' => 1,
                                'type' => 'textarea',
                                'label' => 'Legal Language',
                                'required' => false,
                                'default' => 'I hereby apply for and voluntarily accept membership in the Union and agree to abide by its Constitution and Bylaws.  I authorize the Union to act as my exclusive representative in collective bargaining over wages, hours, and other terms and conditions of employment with my employer. My membership in the Union shall be continuous unless I notify my Local President in writing that I intend to resign.
I hereby agree to pay the annual dues, fees, and assessments established by the Union in consideration for the services the Union provides. I understand that those annual amounts are subject to periodic change by the governing body of the Union.  I authorize on a continuing basis, and regardless of my membership status, the payment of those annual amounts established by the Union through payroll deduction unless I revoke this authorization in a signed writing sent to [union address] via U.S. mail, between [a period of no less than 15 days and up to 30 days].  Such revocation shall become effective on [date].
I UNDERSTAND THAT THIS AGREEMENT IS VOLUNTARY AND IS NOT A CONDITION OF EMPLOYMENT AND THAT I HAVE THE LEGAL RIGHT TO REFUSE TO SIGN THIS AGREEMENT WITHOUT SUFFERING ANY REPRISAL.',
                            ],
                            'signature' => ['order' => 3, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signature'],
                        ],
                    ],
                    'emailWorkGroup' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 12,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 11,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobileExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneMobileExt'],
                                    'phoneMobilePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 8, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 17, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 18, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 19, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 13, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 14, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 15, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 20, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 22, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 21, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 16,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 3, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues and signing up for membership with the {affiliate_name}, local {affiliate_number}. This email confirms your authorization of a bi-weekly dues payment to the {affiliate_name}, local {affiliate_number}.
You will receive written notification in the event of any changes to the dues amount. If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue dues deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'paymentProcessingDuesAndCope'], [
                'order' => 5,
                'display_name' => 'eDues and COPE',
                'description' => 'Standard payment processing Dues form with COPE options',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'billingAddress' => [
                        'order' => 4,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'billingAddress',
                        'label' => 'Billing Address',
                        'fields' => [
                            'billingSameAsHome' => ['fieldName' => 'billingSameAsHome', 'order' => 1, 'required' => false, 'type' => 'checkbox', 'label' => 'Same as Home Address'],
                            'billingAddressLine1' => ['fieldName' => 'billingAddressLine1', 'order' => 2, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1'],
                            'billingAddressLine2' => ['fieldName' => 'billingAddressLine2', 'order' => 3, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2'],
                            'billingCity' => ['fieldName' => 'billingCity', 'order' => 4, 'required' => true,  'type' => 'text', 'label' => 'City'],
                            'billingState' => [
                                'fieldName' => 'billingState',
                                'order' => 5,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'billingZip' => ['fieldName' => 'billingZip', 'order' => 6, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'maxlength' => 5, 'minlength' => 5],
                            'addressBillingPreferred' => ['fieldName' => 'addressBillingPreferred', 'order' => 7, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 12,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 6, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'payment' => ['order' => 7, 'fixed' => true, 'required' => true, 'type' => 'payment', 'label' => 'Payment Information'],
                    'signature' => [
                        'order' => 8,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'legal' => [
                                'order' => 1,
                                'type' => 'textarea',
                                'label' => 'Legal Language',
                                'default' => 'I hereby apply for and voluntarily accept membership in the Union and agree to abide by its Constitution and Bylaws.  I authorize the Union to act as my exclusive representative in collective bargaining over wages, hours, and other terms and conditions of employment with my employer. My membership in the Union shall be continuous unless I notify my Local President in writing that I intend to resign.
I hereby agree to pay the annual dues, fees, and assessments established by the Union in consideration for the services the Union provides. I understand that those annual amounts are subject to periodic change by the governing body of the Union.  I authorize on a continuing basis, and regardless of my membership status, the payment of those annual amounts established by the Union through payroll deduction unless I revoke this authorization in a signed writing sent to [union address] via U.S. mail, between [a period of no less than 15 days and up to 30 days].  Such revocation shall become effective on [date].
I UNDERSTAND THAT THIS AGREEMENT IS VOLUNTARY AND IS NOT A CONDITION OF EMPLOYMENT AND THAT I HAVE THE LEGAL RIGHT TO REFUSE TO SIGN THIS AGREEMENT WITHOUT SUFFERING ANY REPRISAL.',
                            ],
                            'signature' => ['order' => 3, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signature'],
                        ],
                    ],
                    'customCope' => [
                        'order' => 9,
                        'fixed' => false,
                        'required' => false,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 11,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 14,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 13,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 10, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 19, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 20, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 21, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 15, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 16, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 17, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 22, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 24, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 23, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 18,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 2, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [
                    'duesCategories' => [
                        'type' => 'select',
                        'label' => 'Dues Category',
                        'source' => 'duesCategories',
                    ],
                ],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues and signing up for membership with the {affiliate_name}, local {affiliate_number}. This email confirms your authorization of a bi-weekly dues payment to the {affiliate_name}, local {affiliate_number}.
You will receive written notification in the event of any changes to the dues amount. If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue dues deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'paymentProcessingCope'], [
                'order' => 6,
                'display_name' => 'Recurring COPE',
                'description' => 'Standard payment processing COPE form',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'billingAddress' => [
                        'order' => 4,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'billingAddress',
                        'label' => 'Billing Address',
                        'fields' => [
                            'billingSameAsHome' => ['fieldName' => 'billingSameAsHome', 'order' => 1, 'required' => false, 'type' => 'checkbox', 'label' => 'Same as Home Address'],
                            'billingAddressLine1' => ['fieldName' => 'billingAddressLine1', 'order' => 2, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1'],
                            'billingAddressLine2' => ['fieldName' => 'billingAddressLine2', 'order' => 3, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2'],
                            'billingCity' => ['fieldName' => 'billingCity', 'order' => 4, 'required' => true,  'type' => 'text', 'label' => 'City'],
                            'billingState' => [
                                'fieldName' => 'billingState',
                                'order' => 5,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'billingZip' => ['fieldName' => 'billingZip', 'order' => 6, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'maxlength' => 5, 'minlength' => 5],
                            'addressBillingPreferred' => ['fieldName' => 'addressBillingPreferred', 'order' => 7, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 10,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 6, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'payment' => ['order' => 7, 'fixed' => true, 'required' => true, 'type' => 'payment', 'label' => 'Payment Information'],
                    'customCope' => [
                        'order' => 8,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 12,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 11,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 8, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 17, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 18, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 19, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 13, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 14, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 15, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 20, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 22, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 21, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 16,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 3, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues. This email confirms your authorization of a bi-weekly cope payment to the {affiliate_name}, local {affiliate_number}.
If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue cope deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'dataForm'], [
                'order' => 7,
                'display_name' => 'Data Form',
                'description' => 'Data Form',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 2,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 4,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'employmentInformation' => ['order' => 5, 'required' => true, 'fixed' => true, 'type' => 'select', 'label' => 'Employment Information', 'dataSource' => 'employmentInformation', 'dataDest' => 'form.employmentInformation'],
                    'paymentAmountGroup' => [
                        'order' => 6,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Payment Amount',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'paymentAmount' => ['order' => 1, 'required' => true, 'type' => 'amount', 'label' => 'Payment Amount', 'maxlength' => 7],
                        ],
                    ],
                    'notesGroup' => [
                        'order' => 7,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Notes',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'notes' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Notes', 'maxlength' => 250],
                        ],
                    ],
                    'customCope' => [
                        'order' => 8,
                        'fixed' => false,
                        'required' => false,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 10,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 11,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 12, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 13, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'employerHireDate' => ['order' => 14, 'type' => 'date', 'label' => 'Employer Hire Date', 'dataSource' => 'hireDate', 'dataDest' => 'form.employerHireDate'],
                    'employerStartDate' => ['order' => 15, 'type' => 'date', 'label' => 'Employer Start Date', 'dataSource' => 'startDate', 'dataDest' => 'form.employerStartDate'],
                    'workLocation' => ['order' => 16, 'type' => 'workLocation', 'label' => 'Work Location', 'dataSource' => 'workLocation', 'dataDest' => 'form.workLocationId'],
                    'workStructure' => ['order' => 17, 'type' => 'workStructure', 'label' => 'Work Structure', 'dataSource' => 'workStructure', 'dataDest' => 'form.workStructureId'],
                    'jobTitle' => ['order' => 18, 'type' => 'jobTitle', 'label' => 'Job Title', 'dataSource' => 'jobTitle', 'dataDest' => 'form.jobTitleId'],
                    'customTextField' => ['order' => 19, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 22, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 20, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 21,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 2, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [
                    'duesCategories' => [
                        'type' => 'select',
                        'label' => 'Dues Category',
                        'source' => 'duesCategories',
                    ],
                ],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues and signing up for membership with the {affiliate_name}, local {affiliate_number}. This email confirms your authorization of a bi-weekly dues payment to the {affiliate_name}, local {affiliate_number}.
You will receive written notification in the event of any changes to the dues amount. If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue dues deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'stateFedRecurringCope'], [
                'order' => 8,
                'display_name' => 'State Fed Recurring COPE',
                'description' => 'Standard payment processing COPE form',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 2,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'billingAddress' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'billingAddress',
                        'label' => 'Billing Address',
                        'fields' => [
                            'billingSameAsHome' => ['fieldName' => 'billingSameAsHome', 'order' => 1, 'required' => false, 'type' => 'checkbox', 'label' => 'Same as Home Address'],
                            'billingAddressLine1' => ['fieldName' => 'billingAddressLine1', 'order' => 2, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1'],
                            'billingAddressLine2' => ['fieldName' => 'billingAddressLine2', 'order' => 3, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2'],
                            'billingCity' => ['fieldName' => 'billingCity', 'order' => 4, 'required' => true,  'type' => 'text', 'label' => 'City'],
                            'billingState' => [
                                'fieldName' => 'billingState',
                                'order' => 5,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'billingZip' => ['fieldName' => 'billingZip', 'order' => 6, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'maxlength' => 5, 'minlength' => 5],
                            'addressBillingPreferred' => ['fieldName' => 'addressBillingPreferred', 'order' => 7, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 4,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'payment' => ['order' => 6, 'fixed' => true, 'required' => true, 'type' => 'payment', 'label' => 'Payment Information'],
                    'customCope' => [
                        'order' => 7,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 8,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 9,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 10,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 11, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'employeeID' => ['order' => 12, 'type' => 'text', 'label' => 'Employee ID', 'dataDest' => 'form.employeeID'],
                    'customTextField' => ['order' => 15, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'markupTextField' => ['order' => 18, 'type' => 'markup', 'label' => 'Markup Text Field', 'dataDest' => 'form.markupTextField'],
                    'customSelectionField' => ['order' => 16, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 17,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 3, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues. This email confirms your authorization of a bi-weekly cope payment to the {affiliate_name}, local {affiliate_number}.
If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue cope deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);

            Template::updateOrCreate(['system_name' => 'paymentProcessingRetireeOnlyDuesAndCope'], [
                'order' => 5,
                'display_name' => 'eDues and COPE Retiree only',
                'description' => 'eDues and COPE Retiree only',
                'parameters' => [],
                'sources' => [
                    'stateTerritory' => [
                        'name' => 'stateTerritoryQuery',
                        'type' => 'query',
                        'label' => 'Get States and Territories',
                        'default' => [
                            'name' => 'StateTerritory',
                            'parameters' => [],
                            'selects' => ['StateTerritoryId as itemValue', 'StateTerritoryName as itemText'],
                        ],
                    ],
                ],
                'destinations' => [
                    'form' => ['type' => 'object', 'value' => ''],
                ],
                'fields' => [
                    'fullName' => [
                        'order' => 1,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Full Name',
                        'dest' => 'form.fullName',
                        'fields' => [
                            'firstName' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'First Name',     'dest' => 'firstName'],
                            'middleName' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Middle Name',    'dest' => 'middleName'],
                            'lastName' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'Last Name',      'dest' => 'lastName'],
                            'preferredName' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'Preferred Name', 'dest' => 'preferredName'],
                        ],
                    ],
                    'mailingAddress' => [
                        'order' => 3,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Address',
                        'fields' => [
                            'addressLine1' => ['order' => 1, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1', 'dest' => 'form.addressLine1'],
                            'addressLine2' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2', 'dest' => 'form.addressLine2'],
                            'city' => ['order' => 3, 'required' => true,  'type' => 'text', 'label' => 'City', 'dest' => 'form.city'],
                            'state' => ['order' => 4, 'required' => true,  'type' => 'search', 'label' => 'State', 'source' => 'stateTerritory', 'dest' => 'form.state'],
                            'zip' => ['order' => 5, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'dest' => 'form.zip', 'maxlength' => 5, 'minlength' => 5],
                            'addressHomePreferred' => ['order' => 6, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'billingAddress' => [
                        'order' => 4,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'billingAddress',
                        'label' => 'Billing Address',
                        'fields' => [
                            'billingSameAsHome' => ['fieldName' => 'billingSameAsHome', 'order' => 1, 'required' => false, 'type' => 'checkbox', 'label' => 'Same as Home Address'],
                            'billingAddressLine1' => ['fieldName' => 'billingAddressLine1', 'order' => 2, 'required' => true,  'type' => 'text', 'label' => 'Address Line 1'],
                            'billingAddressLine2' => ['fieldName' => 'billingAddressLine2', 'order' => 3, 'required' => false, 'type' => 'text', 'label' => 'Address Line 2'],
                            'billingCity' => ['fieldName' => 'billingCity', 'order' => 4, 'required' => true,  'type' => 'text', 'label' => 'City'],
                            'billingState' => [
                                'fieldName' => 'billingState',
                                'order' => 5,
                                'required' => true,
                                'type' => 'search',
                                'label' => 'State',
                                'source' => 'stateTerritory',
                                'dest' => 'form.state',
                            ],
                            'billingZip' => ['fieldName' => 'billingZip', 'order' => 6, 'required' => true,  'type' => 'number', 'label' => 'Zip Code', 'maxlength' => 5, 'minlength' => 5],
                            'addressBillingPreferred' => ['fieldName' => 'addressBillingPreferred', 'order' => 7, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'emailPersonalGroup' => [
                        'order' => 5,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Personal Email',
                        'dest' => 'form.emailPersonalGroup',
                        'fields' => [
                            'email' => ['order' => 1, 'required' => true, 'type' => 'email', 'label' => 'Personal Email Address', 'dest' => 'form.email'],
                            'emailPersonalPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneHomeGroup' => [
                        'order' => 12,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Home Phone',
                        'dest' => 'form.phoneHomeGroup',
                        'fields' => [
                            'phoneHome' => ['order' => 1, 'type' => 'home', 'label' => 'Home Phone', 'dest' => 'form.phoneHome', 'maxlength' => 14, 'minlength' => 14],
                            'phoneHomeExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneHomeExt'],
                            'phoneHomePreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'payment' => ['order' => 7, 'fixed' => true, 'required' => true, 'type' => 'payment', 'label' => 'Payment Information'],
                    'signature' => [
                        'order' => 8,
                        'fixed' => true,
                        'required' => true,
                        'type' => 'group',
                        'label' => 'Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'legal' => [
                                'order' => 1,
                                'type' => 'textarea',
                                'label' => 'Legal Language',
                                'default' => 'I hereby apply for and voluntarily accept membership in the Union and agree to abide by its Constitution and Bylaws.  I authorize the Union to act as my exclusive representative in collective bargaining over wages, hours, and other terms and conditions of employment with my employer. My membership in the Union shall be continuous unless I notify my Local President in writing that I intend to resign.
            I hereby agree to pay the annual dues, fees, and assessments established by the Union in consideration for the services the Union provides. I understand that those annual amounts are subject to periodic change by the governing body of the Union.  I authorize on a continuing basis, and regardless of my membership status, the payment of those annual amounts established by the Union through payroll deduction unless I revoke this authorization in a signed writing sent to [union address] via U.S. mail, between [a period of no less than 15 days and up to 30 days].  Such revocation shall become effective on [date].
            I UNDERSTAND THAT THIS AGREEMENT IS VOLUNTARY AND IS NOT A CONDITION OF EMPLOYMENT AND THAT I HAVE THE LEGAL RIGHT TO REFUSE TO SIGN THIS AGREEMENT WITHOUT SUFFERING ANY REPRISAL.',
                            ],
                            'signature' => ['order' => 3, 'required' => true, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signature'],
                        ],
                    ],
                    'customCope' => [
                        'order' => 9,
                        'fixed' => false,
                        'required' => false,
                        'type' => 'customCope',
                        'label' => 'COPE',
                        'defaultSignatureText' => 'I hereby voluntarily authorize my employer to deduct from my salary the sum selected above and to forward that amount to the Union’s Committee on Political Education (COPE). COPE will use the money contributed to make political contributions and expenditures in connection with federal, state, and local elections. This authorization is not a requirement for union membership or employment, and I am signing it freely and voluntarily. This voluntary authorization may be revoked at any time by notifying the Union in writing of my desire to do so. Contributions to the Union’s Committee on Political Education are not deductible as charitable contributions for Federal Income Tax purposes and can be made only by union members who are U.S. Citizens or Legal Permanent Residents.',
                    ],
                    'emailWorkGroup' => [
                        'order' => 11,
                        'type' => 'group',
                        'label' => 'Work Email',
                        'dest' => 'form.emailWorkGroup',
                        'fields' => [
                            'emailWork' => ['order' => 1, 'required' => false, 'type' => 'email', 'label' => 'Work Email Address', 'dest' => 'form.emailWork'],
                            'emailWorkPreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneWorkGroup' => [
                        'order' => 14,
                        'type' => 'group',
                        'label' => 'Work Phone',
                        'dest' => 'form.phoneWorkGroup',
                        'fields' => [
                            'phoneWork' => ['order' => 1, 'type' => 'work', 'label' => 'Work Phone', 'dest' => 'form.phoneWork', 'maxlength' => 14, 'minlength' => 14],
                            'phoneWorkExt' => ['order' => 2, 'required' => false, 'type' => 'text', 'label' => 'Ext',    'dest' => 'phoneWorkExt'],
                            'phoneWorkPreferred' => ['order' => 3, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                        ],
                    ],
                    'phoneMobile' => [
                        'order' => 13,
                        'type' => 'group',
                        'label' => 'Mobile Phone',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'phoneMobileGroup' => [
                                'order' => 1,
                                'type' => 'group',
                                'fields' => [
                                    'phoneMobile' => ['order' => 1, 'type' => 'mobile', 'label' => 'Mobile Phone', 'dataDest' => 'form.phoneMobile', 'maxlength' => 14, 'minlength' => 14],
                                    'phoneMobilePreferred' => ['order' => 2, 'required' => false, 'type' => 'checkbox', 'label' => 'Preferred'],
                                ],
                            ],
                            'agree' => [
                                'order' => 2,
                                'label' => 'Agree',
                                'value' => '1',
                                'type' => 'checktext',
                                'default' => 'Telephone Consumer Protection Act Statement: By providing my cell phone number, I understand that the Union may use automated calling technologies and/or text message me on my cell phone on a periodic basis, and that I can unsubscribe from these messages. The Union will never charge for text message alerts; carrier message and data rates may apply to such texts.',
                            ],
                        ],
                    ],
                    'dateOfBirth' => ['order' => 10, 'type' => 'date', 'label' => 'Date of Birth', 'dataSource' => 'dateOfBirth', 'dataDest' => 'form.dateOfBirth'],
                    'customTextField' => ['order' => 22, 'type' => 'text', 'label' => 'Custom Text Field', 'dataDest' => 'form.customTextField'],
                    'customSelectionField' => ['order' => 23, 'type' => 'customSelectionField', 'label' => 'Custom Single/Multi Selection Field', 'dataSource' => 'customUserField'],
                    'signatureOther' => [
                        'order' => 18,
                        'type' => 'group',
                        'label' => 'Additional Signature',
                        'fieldsAsRows' => 'true',
                        'fields' => [
                            'signatureText' => ['order' => 1, 'type' => 'textarea', 'label' => 'Legal Language'],
                            'signatureOther' => ['order' => 2, 'type' => 'drawing', 'label' => 'Signature', 'dest' => 'form.signatureOther'],
                        ],
                    ],
                ],
                'optional_fields' => [
                    'duesCategories' => [
                        'type' => 'select',
                        'label' => 'Dues Category',
                        'source' => 'duesCategories',
                    ],
                ],
                'thankyou_fields' => [
                    'order' => 3,
                    'type' => 'group',
                    'label' => 'Thank you',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'thankyouHeader' => ['order' => 1, 'required' => true, 'type' => 'text', 'label' => 'Thank You Header', 'default' => 'Welcome to AFT!'],
                        'thankyouBody' => ['order' => 2, 'required' => true, 'type' => 'textarea', 'label' => 'Thank You Body', 'default' => 'Congratulations on joining your union.'],
                    ],
                ],
                'confirmation_email_fields' => [
                    'order' => 4,
                    'type' => 'group',
                    'label' => 'Confirmation Email',
                    'fieldsAsRow' => 'true',
                    'fields' => [
                        'sendConfirmationEmail' => ['order' => 1, 'required' => true, 'type' => 'checkbox', 'label' => 'Send Submission Emails'],
                        'confirmationEmailFrom' => ['order' => 2, 'required' => true, 'type' => 'text', 'label' => 'Email From', 'disabled' => true, 'default' => 'edues@aft.org'],
                        'confirmationEmailCC' => ['order' => 3, 'required' => false, 'type' => 'text', 'label' => 'CC Email', 'disabled' => true],
                        'confirmationEmailBCC' => ['order' => 4, 'required' => false, 'type' => 'text', 'label' => 'BCC Email', 'disabled' => true],
                        'confirmationEmailSubject' => ['order' => 5, 'required' => true, 'type' => 'textarea', 'label' => 'Email Subject', 'disabled' => true, 'default' => 'Thank you for keeping our union strong!'],
                        'confirmationEmailBody' => ['order' => 6, 'required' => true, 'type' => 'textarea', 'label' => 'Submission Mail', 'disabled' => true, 'default' => 'Dear {submission_first_name} {submission_last_name}:
Thank you for standing strong with your colleagues and signing up for membership with the {affiliate_name}, local {affiliate_number}. This email confirms your authorization of a bi-weekly dues payment to the {affiliate_name}, local {affiliate_number}.
You will receive written notification in the event of any changes to the dues amount. If at any time you separate from your current employer and/or are no longer a member of the bargaining unit, {affiliate_name}, local {affiliate_number}, you can discontinue dues deduction by sending us notification in writing (please allow 30 days for processing).
Keep standing up and showing up. Your presence and your activism are so important. Thanks again for keeping our union strong.'],
                    ],
                ],
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);
        });
    }
}

<?php

// This list will come from any tables referenced in the spreadsheets' SQL
// queries, or tables referenced by those tables via foreign key constraints.
// It is keyed by the name of the table to be copied/sanitized. The value is a
// list of string columns which do not need to be sanitized.
return [
    'Address' => [
        'AddressOwnertype',
        'CountryName',
        'CountryCode',
        'CountyName',
        'LocalUnionNbr',
        'OwnerNbr',
        'PostalCarrierRte',
        'PostalCode',
        'StateCode',
        'StateName',
    ],
    'AddressProperty' => ['LocalUnionNbr'],
    'Affiliate' => [
        'AffiliateNbr',
        'AffiliateType',
        'FiscalYearEnd',
        'LocalComp',
        'LocalDeleteReason',
        'LocalNbrSuf',
        'LocalSuf',
        'LocationStateAbr',
        'ParentNbr',
        'StatusFlag',
    ],
    'AffiliateConstitution' => ['ConstitutionYear'],
    'AffiliateDivision' => ['AffiliateNbr'],
    'AffiliateName' => [],
    'Chapter' => [
        'ChapterDesignation',
        'ChapterNbr',
        'LocalUnionNbr',
    ],
    'COPE' => [
        'LocalUnionNbr',
    ],
    'COPEType' => [
        'COPETypeName',
    ],
    'Country' => [
        'CountryName',
        'CountryCode',
    ],
    'DeactivateReason' => ['DeactivateReasonName'],
    'DeactivateReasonLocal' => ['DeactivateReasonLocalName'],
    'Division' => ['DivisionName'],
    'DuesCategory' => ['DuesCategoryName'],
    'DuesCategoryLocal' => [
        'DuesCategoryLocalName',
        'LocalUnionNbr',
    ],
    'DuesCategoryState' => ['DuesCategoryStateName'],
    'EducationLevel' => ['EducationLevelName'],
    'EducationLevelLocal' => [
        'EducationLevelLocalName',
        'LocalUnionNbr',
    ],
    'EmployeeType' => ['EmployeeTypeName'],
    'Employer' => ['LocalUnionNbr'],
    'EmployerType' => ['EmployerTypeName'],
    'IndividualAffiliate' => [
        'CommentPriv',
        'DeactivateReasonLocalname',
        'DeactivateReasonname',
        'DuesCategoryLocalname',
        'DuesCategoryname',
        'DuesCategoryStatename',
        'JobClassname',
        'JobTitle',
        'LocalJobClassname',
        'LocalUnionNbr',
        'MemberStatusname',
        'NonMemberTypename',
    ],
    'IndividualComments' => [
        'LocalUnionNbr',
    ],
    'IndividualDetail' => [
        'Gender',
        'MaritalStatusname',
        'PoliticalPartyname',
        'PrefAddrIndicator',
        'Prefixname',
        'Suffix',
    ],
    'IndividualMemberIDs' => [
        'LocalUnionNbr',
        'LocationStateAbr',
        'MemberId',
    ],
    'IndividualSchedule' => [
        'EndTime',
        'LocalUnionNbr',
        'StartTime',
    ],
    'InstitutionSubType' => ['InstitutionSubTypeName'],
    'InstitutionType' => ['InstitutionTypeName'],
    'InstitutionTypeLocal' => [
        'InstitutionTypeLocalName',
        'LocalUnionNbr',
    ],
    'JobClass' => [
        'JobClassCode',
        'JobClassName',
    ],
    'Leadership' => [
        'LocalUnionNbr',
    ],
    'LeadershipPosition' => [
        'LeadershipPositionName',
        'TitleCode',
    ],
    'LeadershipPositionLocal' => [
        'LeadershipPositionLocalName',
        'LocalUnionNbr',
    ],
    'LocalJobClass' => [
        'LocalJobClassCode',
        'LocalJobClassName',
        'LocalUnionNbr',
    ],
    'MaritalStatus' => ['MaritalStatusName'],
    'MemberStatus' => ['MemberStatusName'],
    'NonMemberType' => ['NonMemberTypeName'],
    'PaymentMethod' => ['PaymentMethodName'],
    'PoliticalParty' => ['PoliticalPartyName'],
    'PreferredCommunication' => ['PreferredCommunicationName'],
    'Prefix' => ['PrefixName'],
    'ScheduleTypeLocal' => ['ScheduleType', 'LocalUnionNbr'],
    'SessionLocal' => ['SessionName', 'LocalUnionNbr'],
    'StateTerritory' => [
        'StateCode',
        'StateName',
    ],
    'Subject' => [
        'LocalUnionNbr',
        'SubjectName',
    ],
    'Suffix' => ['SuffixName'],
    'Worksite' => ['WorksiteNumber'],
    'WorksiteComments' => ['LocalUnionNbr'],
];

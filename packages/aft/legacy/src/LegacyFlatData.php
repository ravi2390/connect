<?php

namespace Aft\Legacy;

/**
 * Load legacy lookup maps.
 */
class LegacyFlatData
{
    /**
     * Mappings from legacy identifiers to Connect 2.0 names.
     *
     * @var array
     */
    protected $maps = [];

    /**
     * Load all the (possibly cached) mappings.
     */
    public function loadMappings(bool $refreshFlatData = false): void
    {
        $cachePath = rtrim((string) config('legacy.cache.path'), '/').'/mapcache.json';
        if (! file_exists($cachePath) || $refreshFlatData) {
            // Migrate all the lookup models - you just need to add a new function
            // starting with "migrate" to get it loaded.
            $reflection = new \ReflectionClass(static::class);
            foreach ($reflection->getMethods() as $method) {
                $method_name = $method->getName();
                if (str_starts_with($method_name, 'migrate')) {
                    $this->$method_name();
                }
            }
            $mapcache = fopen($cachePath, 'w');
            fwrite($mapcache, json_encode($this->maps));
            fclose($mapcache);
        } else {
            // Cached maps exist, just read them in.
            $mapcache = fopen($cachePath, 'r');
            $json = fread($mapcache, filesize($cachePath));
            fclose($mapcache);
            $this->maps = json_decode($json, true);
        }
    }

    /**
     * Return the 2.0 name for a given legacy identifier from a given model.
     *
     *
     * @return mixed|null
     */
    public function getMapping(string $model, ?string $key)
    {
        if (empty($key)) {
            return null;
        }
        if (! array_key_exists($model, $this->maps)) {
            echo "No map found for model $model\n";

            return null;
        }
        if (! array_key_exists($key, $this->maps[$model])) {
            // @todo Too verbose for now.
            //            print "No entry in $model map for key $key\n";
            return null;
        }

        return $this->maps[$model][$key];
    }

    /**
     * Load the mapping from a legacy code to an AFTDB name into the map.
     *
     * @param  array  $data
     *                       Data to load: keys are legacy codes, values are AFTDB names.
     * @param  string  $model
     *                         The model class name (matching the AFTDB table name).
     * @param  string  $column
     *                          The AFTDB column for the name.
     */
    protected function saveModelMappings(array $data, string $model, string $column)
    {
        $modelName = '\\App\\Models\\'.$model;
        foreach ($data as $key => $value) {
            // Lookup the name in AFTDB, and create it if it doesn't exist.
            /** @var \Aft\DataModel\AftDataModel $item */
            $item = $modelName::where($column, '=', $value)->first();
            if (empty($item)) {
                $item = new $modelName();
                $item->forceFill([$column => $value]);
                $item->CreatedBy = 1;
                $item->UpdatedBy = 1;
                $item->save();
            }
            $this->saveMapping($model, $key, $item->getKey());
        }
    }

    /**
     * Save a mapping from a legacy identifier to 2.0 name for a given model.
     */
    protected function saveMapping(string $model, string $key, string $value)
    {
        $this->maps[$model][$key] = $value;
    }

    protected function migrateEntityType()
    {
        $entityTypes = [
            'Affiliate' => 'Affiliate',
            'Chapter' => 'Chapter',
            'Employer' => 'Employer',
            'Local Agreement' => 'Local Agreement',
            'Unit' => 'Unit',
            'Local Job Class' => 'Local Job Class',
            'Individual' => 'Individual',
        ];
        $this->saveModelMappings($entityTypes, 'EntityType', 'EntityTypeName');
    }

    protected function migrateAffiliateDesignations()
    {
        $affiliateDesignations = [
            'C' => 'Typical',
            'G' => 'Typical',
            'L' => 'Typical',
            'M' => 'Typical',
            'N' => 'Typical',
            'P' => 'Typical',
            'R' => 'Typical',
            'S' => 'Typical',
            'V' => 'Typical',
            'O' => 'Provisional',
            'unknown1' => 'Retiree',
            'E' => 'Reserved',
            'unknown2' => 'Temporary',
        ];
        $this->saveModelMappings($affiliateDesignations, 'AffiliateDesignation', 'AffiliateDesignationName');
    }

    protected function migrateAffiliateTypes()
    {
        $affiliateTypes = [
            'N' => 'National',
            'S' => 'State Federation',
            'C' => 'Council',
            'L' => 'Local',
            'G' => 'Local',
            'unknown1' => 'Federated Local',
            'M' => 'Local',
            'O' => 'Local',
            'P' => 'Local',
            'R' => 'Local',
            'V' => 'Local',
        ];
        $this->saveModelMappings($affiliateTypes, 'AffiliateType', 'AffiliateTypeName');
    }

    protected function migrateAffiliateGeoReach()
    {
        $affiliateGeoReaches = [
            'N' => 'National',
            'L' => 'Local',
            'unknown1' => 'Statewide Local',
            'C' => 'Local',
            'E' => 'Local',
            'G' => 'Local',
            'M' => 'Local',
            'O' => 'Local',
            'P' => 'Local',
            'R' => 'Local',
            'S' => 'Statewide Local',
            'V' => 'Local',
        ];
        $this->saveModelMappings($affiliateGeoReaches, 'AffiliateGeoReach', 'AffiliateGeoReachName');
    }

    protected function migrateAffiliateAddressType()
    {
        // @todo Are these the right mappings?
        $affiliateAddressTypes = [
            'LocalUnion' => 'Main',
            'Federation' => 'Other',
            'Individual' => 'Other',
            'Region' => 'Other',
        ];
        $this->saveModelMappings($affiliateAddressTypes, 'AffiliateAddressType', 'AffiliateAddressTypeName');
    }

    protected function migrateEmployerAddressTypes()
    {
        $employerAddressTypes = [
            'Main' => 'Main',
            'Other' => 'Other',
        ];
        $this->saveModelMappings($employerAddressTypes, 'EmployerAddressType', 'EmployerAddressTypeName');
    }

    protected function migrateEmployerTypes()
    {
        $employerTypes = [
            'Charter School' => 'Charter School',
            'Early child education' => 'Early child education',
            'Health Care' => 'Health Care',
            'Higher Education' => 'Higher Education',
            'Pre-K-12' => 'Pre-K-12',
            'PSRP' => 'PSRP',
            'State or Local Government' => 'State or Local Government',
            'Union' => 'Union',
            'Unknown' => 'Unknown',
        ];
        $this->saveModelMappings($employerTypes, 'EmployerType', 'EmployerTypeName');
    }

    protected function migrateLocalAgreementTypes()
    {
        $localAgreementTypes = [
            'Contract' => 'Contract',
            'Meet and Confer Agreement' => 'Meet and Confer Agreement',
            'District Policy' => 'District Policy',
            'No agreement' => 'No agreement',
            'Unknown' => 'Unknown',
        ];
        $this->saveModelMappings($localAgreementTypes, 'LocalAgreementType', 'LocalAgreementTypeName');
    }

    protected function migrateUnitTypes()
    {
        $unitTypes = [
            'Non Collective Bargain Unit' => 'Non Collective Bargain Unit',
            'Collective Bargain Unit' => 'Collective Bargain Unit',
            'Retiree' => 'Retiree',
            'No Bargain Unit' => 'No Bargain Unit',
            'No Unit' => 'No Unit',
            'Unknown' => 'Unknown',
        ];
        $this->saveModelMappings($unitTypes, 'UnitType', 'UnitTypeName');
    }

    protected function migrateIndividualAddressType()
    {
        // @todo Are these the right mappings?
        $individualAddressTypes = [
            'Home' => 'Home',
            'Work' => 'Work',
            'Chapter' => 'Work',
            'Employer' => 'Work',
            'Affiliate' => 'Work',
            'Local' => 'Work',
            'Worksite' => 'Work',
            'Alternate' => 'Work',
            '' => 'Work',
        ];
        $this->saveModelMappings($individualAddressTypes, 'IndividualAddressType', 'IndividualAddressTypeName');
    }

    protected function migrateIndividualEmailType()
    {
        $individualEmailTypes = [
            'Primary' => 'Home',
            'Secondary' => 'Work',
        ];
        $this->saveModelMappings($individualEmailTypes, 'IndividualEmailType', 'IndividualEmailTypeName');
    }

    protected function migrateIndividualPhoneType()
    {
        $individualPhoneTypes = [
            'Home' => 'Home',
            'Mobile' => 'Mobile',
        ];
        $this->saveModelMappings($individualPhoneTypes, 'IndividualPhoneType', 'IndividualPhoneTypeName');
    }

    protected function migrateContactStatus()
    {
        $contactStatus = [
            'Invalid' => 'Invalid',
            'New' => 'New',
            'Old' => 'Old',
            'Verified' => 'Verified',
        ];
        $this->saveModelMappings($contactStatus, 'ContactStatus', 'ContactStatusName');
    }

    protected function migrateUnionRelationshipTypeName()
    {
        $types = [
            'member' => 'Member',
            'potential' => 'Potential Member',
            'agency' => 'Agency Fee Payer',
            'retired' => 'Retired Member',
            'other' => 'Other',
        ];
        $this->saveModelMappings($types, 'UnionRelationshipType', 'UnionRelationshipTypeName');
    }

    protected function migratePrefix()
    {
        // @todo Skip the unmapped prefixes? There's only 1 Major, 1 Mr & Mrs,
        // 3 Prof/Prof.
        $prefixes = [
            'Dr' => 'Dr.',
            'Dr.' => 'Dr.',
            'Fr.' => 'Fr.',
            //            'Major' => NULL,
            'Miss' => 'Miss',
            'Miss.' => 'Miss',
            'Mr' => 'Mr.',
            //            'Mr & Mrs' => NULL,
            'Mr.' => 'Mr.',
            'Mrs.' => 'Mrs.',
            'Ms' => 'Ms.',
            'Ms.' => 'Ms.',
            //            'Prof' => NULL,
            //            'Prof.' => NULL,
            'Representative' => 'Representative',
            'Senator' => 'Senator',
        ];
        $this->saveModelMappings($prefixes, 'Prefix', 'PrefixName');
    }

    protected function migrateSuffix()
    {
        // Note there is a *lot* of garbage in this column.
        $suffixes = [
            'I' => 'I',
            'II' => 'II',
            '2nd' => 'II',
            'll' => 'II',
            ', II' => 'II',
            'III' => 'III',
            '3rd' => 'III',
            'I I I' => 'III',
            '111' => 'III',
            'IV' => 'IV',
            '4th' => 'IV',
            'V' => 'V',
            'DDS' => 'DDS',
            'Ed.D' => 'EdD',
            'EdD' => 'EdD',
            'Esq' => 'Esq.',
            'Jr.' => 'Jr.',
            'Jr..' => 'Jr.',
            'x Jr.' => 'Jr.',
            'Junior' => 'Jr.',
            'LMSW' => 'LMSW',
            'LPN' => 'LPN',
            'MA' => 'MA',
            'MD' => 'MD',
            'M.D.' => 'MD',
            'PE' => 'PE',
            'PhD' => 'PhD',
            'Ph.D' => 'PhD',
            'Ph.D.' => 'PhD',
            'PhD.' => 'PhD',
            'PsyD' => 'PsyD',
            'Psy.D' => 'PsyD',
            'RN' => 'RN',
            'Sr.' => 'Sr.',
            'Sr' => 'Sr.',
            'x Sr.' => 'Sr.',
        ];
        $this->saveModelMappings($suffixes, 'Suffix', 'SuffixName');
    }

    protected function migrateGender()
    {
        $gender = [
            'Female' => 'Female',
            'F' => 'Female',
            'Male' => 'Male',
            'M' => 'Male',
            'Other' => 'Other',
        ];
        $this->saveModelMappings($gender, 'Gender', 'GenderName');
    }

    protected function migrateMaritalStatus()
    {
        $maritalStatus = [
            'Divorced' => 'Divorced',
            'Domestic Partner' => 'Domestic Partner',
            'Married' => 'Married',
            'Single' => 'Single',
        ];
        $this->saveModelMappings($maritalStatus, 'MaritalStatus', 'MaritalStatusName');
    }

    protected function migratePoliticalParty()
    {
        $politicalParty = [
            'American Independent' => 'American Independent',
            'AIP' => 'American Independent',
            'Conservative' => 'Conservative',
            'CNS' => 'Conservative',            // @todo ?
            'CST' => 'Conservative',            // @todo ?
            'Consumer' => 'Consumer',
            'DC Statehood' => 'DC Statehood',
            'DCS' => 'DC Statehood',
            'Democrat' => 'Democrat',
            'DEM' => 'Democrat',
            // @todo    'DTS' => ?,
            'Green' => 'Green',
            'GRE' => 'Green',
            'Independent' => 'Independent',
            'IND' => 'Independent',
            'Independent NM Party' => 'Independent NM Party',
            'liberal' => 'liberal',
            'Libertarian' => 'Libertarian',
            'LIB' => 'Libertarian',
            'Natural Law' => 'Natural Law',
            'None' => 'None',
            // @todo    'NPA' => ?,
            'Other' => 'Other',
            'OTH' => 'Other',
            'Peace & Freedom' => 'Peace & Freedom',
            'Reform' => 'Reform',
            'REF' => 'Reform',
            'Republican' => 'Republican',
            'REP' => 'Republican',
            'Right to Life' => 'Right to Life',
            // @todo    'SOC or SWP' => Socialist Workers Party?,
            'UMOJA' => 'UMOJA',
            'Unaffliated/Non Affiliated' => 'Unaffliated/Non Affiliated',
            'Undeclared' => 'Undeclared',
            'UNK' => 'Undeclared',
            'Working Families' => 'Working Families',
            'WOR' => 'Working Families',
        ];
        $this->saveModelMappings($politicalParty, 'PoliticalParty', 'PoliticalPartyName');
    }

    protected function migratePaymentMethod()
    {
        $paymentMethod = [
            'Bank Draft' => 'Bank Draft',
            'BankDraftOneTime' => 'BankDraftOneTime',
            'Cash' => 'Cash',
            'Check' => 'Check',
            'CREDIT' => 'Credit Card',
            'Credit Card' => 'Credit Card',
            'CreditCardOneTime' => 'CreditCardOneTime',
            'Local Payroll Deduction' => 'Local Payroll Deduction',
            'Money Order' => 'Money Order',
            'n/a' => 'n/a',
            'Payroll Deduction' => 'Payroll Deduction',
            'PAYROLL' => 'Payroll Deduction',
            'Payroll Deductions' => 'Payroll Deduction',
            'PayrollDeduction' => 'Payroll Deduction',
        ];
        $this->saveModelMappings($paymentMethod, 'PaymentMethod', 'PaymentMethodName');
    }

    protected function migrateCountries()
    {
        $countries = [
            'USA' => 'United States of America',
            'OS' => 'Over Seas',
            'CAN' => 'Canada',
            'AP' => 'Overseas',
        ];
        $this->saveModelMappings($countries, 'Country', 'CountryName');
    }

    protected function migrateStates()
    {
        $states = [
            'AA' => 'Armed Forces Americas',
            'AE' => 'Armed Forces',
            'AK' => 'Alaska',
            'AL' => 'Alabama',
            // @todo It looks like about 60 records in the Address table should
            // be Armed Forces Pacific and 67 Overseas.
            'AP' => 'Armed Forces Pacific',
            //            'AP' => 'Overseas',
            'AR' => 'Arkansas',
            'AS' => 'American Samoa',
            'AZ' => 'Arizona',
            'CA' => 'California',
            'CO' => 'Colorado',
            'CT' => 'Connecticut',
            'DC' => 'District of Columbia',
            'DE' => 'Delaware',
            'FL' => 'Florida',
            'GA' => 'Georgia',
            'GU' => 'Guam',
            'HI' => 'Hawaii',
            'IA' => 'Iowa',
            'ID' => 'Idaho',
            'IL' => 'Illinois',
            'IN' => 'Indiana',
            'KS' => 'Kansas',
            'KY' => 'Kentucky',
            'LA' => 'Louisiana',
            'MA' => 'Massachusetts',
            'MD' => 'Maryland',
            'ME' => 'Maine',
            'MI' => 'Michigan',
            'MN' => 'Minnesota',
            'MO' => 'Missouri',
            'MP' => 'North Mariana Islands',
            'MS' => 'Mississippi',
            'MT' => 'Montana',
            'NC' => 'North Carolina',
            'ND' => 'North Dakota',
            'NE' => 'Nebraska',
            'NH' => 'New Hampshire',
            'NJ' => 'New Jersey',
            'NM' => 'New Mexico',
            'NV' => 'Nevada',
            'NY' => 'New York',
            'OH' => 'Ohio',
            'OK' => 'Oklahoma',
            'ON' => 'Ontario',
            'OR' => 'Oregon',
            'OS' => 'Over Seas ',
            'PA' => 'Pennsylvania',
            'PR' => 'Puerto Rico',
            'QU' => 'Quebec',
            'RI' => 'Rhode Island',
            'SA' => 'Saipan',
            'SC' => 'South Carolina',
            'SD' => 'South Dakota',
            'TN' => 'Tennessee',
            'TX' => 'Texas',
            'UT' => 'Utah',
            'VA' => 'Virginia',
            'VI' => 'Virgin Islands',
            'VT' => 'Vermont',
            'WA' => 'Washington',
            'WI' => 'Wisconsin',
            'WV' => 'West Virginia',
            'WY' => 'Wyoming',
        ];
        // @todo Note that to create AFTDB rows we need the CountryId. If we
        // always run this after the 1.0->2.0 migration has populated
        // StateTerritory, that won't be a problem.
        $this->saveModelMappings($states, 'StateTerritory', 'StateTerritoryName');
    }

    protected function migrateNationalPerCapita()
    {
        $perCapita = [
            'Eighth Agency Fee Non Member' => 'Eighth Agency Fee Non Member',
            'Eighth Dues' => 'Eighth Dues',
            'Full Agency Fee Non Member' => 'Full Agency Fee Non Member',
            'Full Dues' => 'Full Dues',
            'Half Agency Fee Non Member' => 'Half Agency Fee Non Member',
            'Half Dues' => 'Half Dues',
            //'Left Profession' => '',
            'Quarter Agency Fee Non Member' => 'Quarter Agency Fee Non Member',
            'Quarter Dues' => 'Quarter Dues',
            'Retired' => 'Retired',
            'Student Member' => 'Student Member',
            'Terminated' => 'Unpaid Leave/Laid Off',
            'Unpaid Leave/Laid Off' => 'Unpaid Leave/Laid Off',
        ];
        $this->saveModelMappings($perCapita, 'NationalPerCapita', 'NationalPerCapitaName');
    }

    protected function migrateNationalInstitutionTypes()
    {
        $nationalInstitutionTypes = [
            'Elementary School' => 'Elementary School',
            'Middle School' => 'Middle School',
            'High School' => 'High School',
            'Child Care' => 'Child Care',
            'Other' => 'Other',
            'City Agency' => 'City Agency',
            'Community College' => 'Community College',
            'Hospital' => 'Hospital',
            'Parochial School' => 'Parochial School',
            'School District' => 'School District',
            'Technical Institute' => 'Technical Institute',
            'University' => 'University',
        ];
        $this->saveModelMappings($nationalInstitutionTypes, 'NationalInstitutionType', 'NationalInstitutionTypeName');
    }

    protected function migrateStaffDepartments()
    {
        $nationalInstitutionTypes = [
            'Administrative' => 'Administrative',
            'Communications' => 'Communications',
            'Community Outreach' => 'Community Outreach',
            'Information Services' => 'Information Services',
            'Legal' => 'Legal',
            'Membership Services' => 'Membership Services',
            'Membership Contact' => 'Membership Contact',
            'Organizing' => 'Organizing',
            'Per-capita Contact' => 'Per-capita Contact',
            'Political Action' => 'Political Action',
            'Other' => 'Other',
        ];
        $this->saveModelMappings($nationalInstitutionTypes, 'StaffDepartment', 'StaffDepartmentName');
    }

    protected function migrateDivisions()
    {
        $divisions = [
            'AFT Teachers' => 'AFT Teachers',
            'AFT Nurses and Health Professionals' => 'AFT Nurses and Health Professionals',
            'AFT Higher Education' => 'AFT Higher Education',
            'AFT PSRP' => 'AFT PSRP',
            'AFT Public Employees' => 'AFT Public Employees',
        ];
        $this->saveModelMappings($divisions, 'Division', 'DivisionName');
    }

    protected function migrateNationalEducationLevels()
    {
        $nationalEducationLevels = [
            'High School or GED' => 'High School or GED',
            'High School + 30 Credits' => 'High School + 30 Credits',
            'High School + 60 Credits' => 'High School + 60 Credits',
            'High School + 90 Credits' => 'High School + 90 Credits',
            'Technical School' => 'Technical School',
            'Vocational School' => 'Vocational School',
            'Associate Degree' => 'Associate Degree',
            'Bachelors Degree' => 'Bachelors Degree',
            'Masters Degree' => 'Masters Degree',
            'Doctorate' => 'Doctorate',
        ];
        $this->saveModelMappings($nationalEducationLevels, 'NationalEducationLevel', 'NationalEducationLevelName');
    }
}

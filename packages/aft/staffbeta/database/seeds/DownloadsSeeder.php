<?php

namespace Aft\StaffBeta\Seeds;

use Aft\StaffBeta\Models\Download;
use Illuminate\Database\Seeder;

class DownloadsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        Download::withoutEvents(function (): void {
            Download::updateOrCreate(['name' => 'affpresidents'], [
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
                'label' => 'Affiliate Presidents',
                'description' => 'Affiliate Presidents list will generate the current president per affiliate. <ul><li>Affiliates with more than one president or co-presidents will return more than one record.</li><li>Affiliates having presidents with expired term dates will be excluded.</li><li>If an affiliate does not have a current president they will not appear.</li></ul>This list should not be used for official correspondence, as officers change and update files may be in the queue that would make this list inaccurate.<br><br><strong>If an official correspondence list is needed, please fill out a help request at <a href="//bit.ly/HelpRequests">bit.ly/HelpRequests</a></strong>',
                'order' => 1,
                'ability' => 'affpresidents',
                'action' => [
                    'icon' => 'fa-cloud-download',
                    'label' => 'Download',
                    'method' => 'download',
                ],
                'source' => [
                    'type' => 'MsSqlStoredProcedure',
                    'name' => 'sp_AffiliatePresidents ?',
                    'parameters' => [
                        'AffiliateId' => null,
                    ],
                ],
            ]);
            Download::updateOrCreate(['name' => 'aftppcs'], [
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
                'label' => 'AFT PPC List',
                'description' => 'PPC lists will generate the list of current members of a PPC, their preferred contact information, and the contact information for their home-affiliate.<br><br><strong>If you need a list with more/different information, please fill out a help request at <a href="//bit.ly/HelpRequests">bit.ly/HelpRequests</a></strong>',
                'order' => 2,
                'ability' => 'aftppcs',
                'action' => [
                    'icon' => 'fa-filter',
                    'label' => 'Choose PPCs',
                    'method' => 'chooseOptions',
                ],
                'options' => [
                    [
                        'parameter' => 'AffiliateCommitteeId',
                        'type' => 'checklist',
                        'label' => 'Choose the PPCs to include in this download',
                        'source' => [
                            'type' => 'search',
                            'name' => 'ppclist',
                        ],
                    ],
                ],
                'source' => [
                    'type' => 'MsSqlStoredProcedure',
                    'name' => 'sp_CommitteeMembers ?, ?',
                    'parameters' => [
                        'AffiliateId' => 1,
                        'AffiliateCommitteeId' => null,
                    ],
                ],
            ]);
            Download::updateOrCreate(['name' => 'aftcommittees'], [
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
                'label' => 'AFT Committees',
                'description' => 'Committee lists will generate the list of current members of an AFT committee, their preferred contact information, and the contact information for their home-affiliate.<br><br><strong>If you need a list with more/different information, please fill out a help request at <a href="//bit.ly/HelpRequests">bit.ly/HelpRequests</a></strong>',
                'order' => 3,
                'ability' => 'aftcommittees',
                'action' => [
                    'icon' => 'fa-filter',
                    'label' => 'Choose Committees',
                    'method' => 'chooseOptions',
                ],
                'options' => [
                    [
                        'parameter' => 'AffiliateCommitteeId',
                        'type' => 'checklist',
                        'label' => 'Choose the committees to include in this download',
                        'source' => [
                            'type' => 'search',
                            'name' => 'committeelist',
                        ],
                    ],
                ],
                'source' => [
                    'type' => 'MsSqlStoredProcedure',
                    'name' => 'sp_CommitteeMembers ?, ?',
                    'parameters' => [
                        'AffiliateId' => 1,
                        'AffiliateCommitteeId' => null,
                    ],
                ],
            ]);
            Download::updateOrCreate(['name' => 'aftexeccouncil'], [
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
                'label' => 'AFT Exec Council',
                'description' => 'This is the list of current officers and executive council members...',
                'order' => 4,
                'ability' => 'aftexeccouncil',
                'action' => [
                    'icon' => 'fa-cloud-download',
                    'label' => 'Download',
                    'method' => 'download',
                ],
                'source' => [
                    'type' => 'MsSqlStoredProcedure',
                    'name' => 'sp_AffiliateOfficers ?',
                    'parameters' => [
                        'AffiliateId' => 1,
                    ],
                ],
            ]);
        });
    }
}

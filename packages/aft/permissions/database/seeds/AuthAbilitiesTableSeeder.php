<?php

namespace Aft\Permissions\Database\Seeds;

use Aft\Permissions\Models\AuthAbility;
use Illuminate\Database\Seeder;

class AuthAbilitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        AuthAbility::withoutEvents(function (): void {
            AuthAbility::updateOrCreate(['type' => 'memberforms'], [
                'name' => 'Access Member Forms Portal',
                'order' => 0,
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);
            AuthAbility::updateOrCreate(['type' => 'staffportal'], [
                'name' => 'Access Staff Portal',
                'order' => 1,
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);
            AuthAbility::updateOrCreate(['type' => 'memberlists'], [
                'name' => 'Access Staff Portal - Membership Lists',
                'order' => 2,
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);
            AuthAbility::updateOrCreate(['type' => 'leaderlists'], [
                'name' => 'Access Staff Portal - Leadership Lists',
                'order' => 3,
                'CreatedAt' => now(),
                'CreatedBy' => 1,
                'UpdatedAt' => now(),
                'UpdatedBy' => 1,
            ]);
        });
    }
}

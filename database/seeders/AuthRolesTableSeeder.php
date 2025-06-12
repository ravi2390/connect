<?php

namespace Database\Seeders;

require_once 'helpers.php';

use Aft\Permissions\Models\AuthRole;
use Illuminate\Database\Seeder;

class AuthRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $auditColumns = [
            'CreatedBy' => 1,
            'UpdatedBy' => 1,
        ];

        $roleFile = openInputCSV(__DIR__.'/data/roles.csv', true, $headers, false);

        AuthRole::withoutEvents(function () use ($roleFile, $headers, $auditColumns) {
            while ($roleData = fgetcsv($roleFile)) {
                $roleData = array_combine($headers, $roleData);
                $roleName = $roleData['name'];
                unset($roleData['name']);
                array_walk($roleData, function (&$value) {
                    $value = strToPrimitive($value);
                });
                $abilityBase = ['ability_base' => $roleData];
                AuthRole::updateOrCreate(['name' => $roleName], array_merge($abilityBase, $auditColumns));
            }
        });

        closeInputCSV($roleFile);
    }
}

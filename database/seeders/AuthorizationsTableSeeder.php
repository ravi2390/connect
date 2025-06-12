<?php

namespace Database\Seeders;

require_once 'helpers.php';

use Aft\Permissions\Models\Authorization;
use Aft\Permissions\Models\AuthRole;
use App\Models\Affiliate;
use App\Models\User;
use Illuminate\Database\Seeder;

class AuthorizationsTableSeeder extends Seeder
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

        $authFile = openInputCSV(__DIR__.'/data/users.csv', true, $headers);

        Authorization::withoutEvents(function () use ($authFile, $headers, $auditColumns) {
            while ($userData = fgetcsv($authFile)) {
                $userData = array_combine($headers, $userData);
                $userData = array_intersect_key($userData, array_flip(['email', 'role', 'local', 'inherit']));
                $userData['role'] = explode(',', $userData['role']);
                $userData['local'] = explode(',', $userData['local']);
                $userData['inherit'] = explode(',', $userData['inherit']);

                array_walk($userData['role'], function (&$value) {
                    $value = trim($value);
                });
                array_walk($userData['local'], function (&$value) {
                    $value = sprintf('%05d', trim($value));
                });
                array_walk($userData['inherit'], function (&$value) {
                    $value = strToPrimitive(trim($value));
                });

                foreach ($userData['role'] as $key => $role) {
                    $local = $userData['local'][$key];
                    $inherit = $userData['inherit'][$key];
                    $user = User::where('email', $userData['email'])->firstOrFail();
                    $role = AuthRole::where('name', $role)->firstOrFail();
                    if ($local === '08080') {
                        $entityID = 0;
                    } else {
                        $affiliate = Affiliate::withoutGlobalScopes()->where('AffiliateNumber', $local)->firstOrFail();
                        $entityID = $affiliate->getKey();
                    }
                    Authorization::updateOrCreate(
                        [
                            'user_id' => $user->getKey(),
                            'entity_type' => Affiliate::class,
                            'entity_id' => $entityID,
                        ],
                        array_merge([
                            'role_id' => $role->getKey(),
                            'entity_inherit' => $inherit,
                            'order' => $key,
                        ], $auditColumns)
                    );
                }
            }
        });

        closeInputCSV($authFile);
    }
}

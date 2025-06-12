<?php

namespace Database\Seeders;

require_once 'helpers.php';

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
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

        $usersFile = openInputCSV(__DIR__.'/data/users.csv', true, $headers);

        User::withoutEvents(function () use ($usersFile, $headers, $auditColumns) {
            while ($userData = fgetcsv($usersFile)) {
                $userData = array_combine($headers, $userData);
                $userData['password'] = Hash::make($userData['password']);
                $userData['email_verified_at'] = strToPrimitive($userData['email_verified_at']);
                $userData['password_expires_at'] = strToPrimitive($userData['password_expires_at']);
                unset($userData['local']);
                unset($userData['inherit']);
                unset($userData['role']);
                $user = User::updateOrCreate(
                    ['email' => $userData['email']],
                    array_merge(
                        $userData,
                        ['email_verified_at' => ($userData['email_verified_at'] === true) ? now() : null],
                        ['password_expires_at' => ($userData['password_expires_at'] === true) ? now() : null],
                        $auditColumns
                    )
                );
                $userID = $user->getKey();
                $profile = UserProfile::updateOrCreate(['id' => $userID]);
                $profileID = $profile->getKey();
                $user->profile_id = $profileID;
                $user->save();
            }
        });

        closeInputCSV($usersFile);
    }
}

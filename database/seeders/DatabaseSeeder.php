<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UsersTableSeeder::class);
        $this->call(AuthRolesTableSeeder::class);
        $this->call(AuthorizationsTableSeeder::class);
        $this->call(FileAttachmentTypesTableSeeder::class);
    }
}

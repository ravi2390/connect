<?php

namespace Aft\Permissions\Database\Seeds;

use Illuminate\Database\Seeder;

class AbilitiesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call(AuthAbilitiesTableSeeder::class);
        // $this->call(AuthUserAbilitiesTableSeeder::class);
    }
}

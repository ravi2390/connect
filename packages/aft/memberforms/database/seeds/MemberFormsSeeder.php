<?php

namespace Aft\MemberForms\Seeds;

use Illuminate\Database\Seeder;

class MemberFormsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call(TemplatesTableSeeder::class);
        $this->call(SubmissionStatusSeeder::class);
        // $this->call(FormsTableSeeder::class);
    }
}

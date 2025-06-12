<?php

namespace Aft\MemberForms\Seeds;

use Aft\MemberForms\Models\FormTestSource;
use Illuminate\Database\Seeder;

class FormsTestSourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $file = file_get_contents(__DIR__.'/sourceRef.json');
        $sources = json_decode($file, true);
        foreach ($sources as $source) {
            FormTestSource::withoutEvents(function () use ($source): void {
                FormTestSource::updateOrCreate(['name' => $source['name']], $source);
            });
        }
    }
}

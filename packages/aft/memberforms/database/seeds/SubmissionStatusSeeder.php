<?php

namespace Aft\MemberForms\Seeds;

use Aft\MemberForms\Models\SubmissionStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubmissionStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        SubmissionStatus::withoutEvents(function (): void {
            SubmissionStatus::updateOrCreate(
                ['status_name' => 'New', 'order' => 1]
            );
            SubmissionStatus::updateOrCreate(
                ['status_name' => 'Active', 'order' => 2]
            );
            SubmissionStatus::updateOrCreate(
                ['status_name' => 'Exists in connect', 'order' => 3]
            );
            DB::table('memberforms_submission_status')->where('order', 2)->update(['status_name' => 'Created Individual']);
            SubmissionStatus::updateOrCreate(
                ['status_name' => 'Not a Member', 'order' => 4]
            );
        });
    }
}

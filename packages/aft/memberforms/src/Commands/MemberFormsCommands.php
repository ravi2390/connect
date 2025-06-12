<?php

namespace Aft\MemberForms\Commands;

use Aft\MemberForms\Models\DuesMapping;
use Aft\MemberForms\Models\EDuesEnrollment;
use Aft\MemberForms\Models\Form;
use Aft\MemberForms\Models\FormSubmission;
use Aft\MemberForms\Models\FormSubmissionData;
use Aft\MemberForms\Models\SubmissionStatus;
use Aft\MemberForms\Models\Template;
use Aft\MemberForms\Models\UrlRedirect;
use Aft\MemberForms\Seeds\SubmissionStatusSeeder;
use Aft\MemberForms\Seeds\TemplatesTableSeeder;
use App\Models\MemberFormAssign;
use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Illuminate\Support\Facades\DB;

class MemberFormsCommands extends Command
{
    use ConfirmableTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mfp:data {cmd*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        if (! $this->confirmToProceed()) {
            return;
        }

        $cmd = $this->argument('cmd');
        switch ($cmd[0]) {
            case 'clear':
                $this->info('Truncating submission data...');
                FormSubmissionData::truncate();
                $this->info('Truncating submissions...');
                FormSubmission::truncate();
                $this->info('Truncating forms...');
                Form::truncate();
                $this->info('Truncating templates...');
                Template::truncate();
                $this->info('Truncating URL redirects...');
                UrlRedirect::truncate();
                $this->info('Truncating submission status...');
                SubmissionStatus::truncate();
                $this->info('Truncating memberform assign data...');
                MemberFormAssign::truncate();
                $this->info('Truncating dues mapping data...');
                DuesMapping::truncate();
                $this->info('Truncating eDues enrollment data...');
                EDuesEnrollment::truncate();
                break;
            case 'clearNoSubs':
                $this->info('Truncating templates...');
                Template::truncate();
                $this->info('Truncating URL redirects...');
                UrlRedirect::truncate();
                $this->info('Truncating submission status...');
                SubmissionStatus::truncate();
                $this->info('Truncating memberform assign data...');
                MemberFormAssign::truncate();
                break;
            case 'seed':
                $this->info('Seeding '.TemplatesTableSeeder::class);
                $this->call('db:seed', ['--class' => TemplatesTableSeeder::class, '--force' => true]);
                $this->info('Seeding '.SubmissionStatusSeeder::class);
                $this->call('db:seed', ['--class' => SubmissionStatusSeeder::class, '--force' => true]);
                break;
            case 'updateFromEmail':
                $this->info('Updating Form Table confirmation_email_fields field: no-reply@aft.org to edues@aft.org...');
                DB::connection('sqlsrv')->statement("UPDATE laravel_memberforms_forms SET confirmation_email_fields = replace(confirmation_email_fields, 'no-reply@aft.org', 'edues@aft.org')  where [confirmation_email_fields] like '%no-reply@aft.org%'");
                break;
            case 'updateTemplateAssign':
                $this->info('Updating form_assign table');
                DB::connection('sqlsrv')->statement("UPDATE laravel_member_form_assign SET [type]='[\"100\"]', updated_at=getdate() where [type] = '[\"9\"]' and deleted_at is null");
                break;
            default:
                $this->error('Unknown command "'.$cmd[0].'"');
                break;
        }
    }
}

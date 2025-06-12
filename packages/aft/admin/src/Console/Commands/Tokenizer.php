<?php

namespace Aft\Admin\Console\Commands;

use Aft\Admin\Http\Controllers\TokenController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Tokenizer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tokens:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Tokens';

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
        $chunkSize = 100;
        $individualAffiliates = DB::connection('aftdb')->table('IndividualAffiliate as ia')
            ->join('Affiliate as a', 'a.AffiliateId', '=', 'ia.AffiliateId')
            ->join('Individual as i', 'i.IndividualId', '=', 'ia.IndividualId')
            ->join('MemberIdMapping as mid', 'ia.IndividualId', '=', 'mid.IndividualId')
            ->select('a.AffiliateNumber as AffiliateNumber', 'i.IndividualId as IndividualId', 'i.IndividualGuid as IndividualGuid', 'i.FirstName as FirstName', 'i.LastName as LastName', 'mid.MemberId as MemberId')
            ->whereIn('ia.UnionRelationshipTypeId', [2, 5])
            ->whereNull('ia.EndDate')
            ->whereNull('ia.DeletedAt')
            ->whereNull('i.DeletedAt')
            ->whereNull('mid.DeletedAt')
            ->orderBy('ia.IndividualAffiliateId');

        $this->info('Start time: '.date('m/d/Y h:i:s a', time()));
        $count = $individualAffiliates->count();
        $progress = $this->output->createProgressBar($count);
        $progress->start();

        $individualAffiliates->chunk($chunkSize, function ($items) use ($chunkSize, &$progress): void {
            $data = $items->map(function ($item): array {
                if ($item->row_num ?? false) {
                    unset($item->row_num);
                }
                $token = TokenController::makeToken($item->IndividualGuid);
                $item->link = 'https://membership.aft.org/welcome?token='.$token;

                return (array) $item;
            })->toArray();
            DB::connection('member')->table('member_tokens')->insert($data);
            $progress->advance($chunkSize);
        });

        $progress->finish();
    }
}

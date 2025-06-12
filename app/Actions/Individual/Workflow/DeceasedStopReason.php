<?php

namespace App\Actions\Individual\Workflow;

use App\Actions\Individual\EndAffiliations;
use App\Actions\Individual\EndCommitteeMembership;
use App\Actions\Individual\EndEmployments;
use App\Actions\Individual\EndStaffRoles;
use App\Actions\Individual\EndUnionRoles;
use App\Actions\Individual\SetStopReasonIndividual;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class DeceasedStopReason
{

    use AsAction;

    protected function handle(
        IndividualAffiliate $individualAffiliate,
        string $stopReason,
        Carbon $endDate,
    ): array {
        $results = $this->findIndividualAffiliates($individualAffiliate);

        DB::transaction(function () use ($individualAffiliate, $results, $stopReason, $endDate): void {
            if (!empty($results)) {
                foreach ($results as $result) {
                    SetStopReasonIndividual::run(individualAffiliate: $result, stopReason: $stopReason);
                    EndAffiliations::run(individualAffiliate: $result, endDate: $endDate);
                    EndUnionRoles::run(individualAffiliate: $result, endDate: $endDate);
                    EndStaffRoles::run(individualAffiliate: $result, endDate: $endDate);
                    EndCommitteeMembership::run(individualAffiliate: $result, endDate: $endDate);
                }
            }
            EndEmployments::run(individual: $individualAffiliate->Individual, endDate: $endDate);
        });

        return [
            'message' => 'ok',
            'statusCode' => 204,
        ];
    }

    protected function findIndividualAffiliates(IndividualAffiliate $individualAffiliate): array
    {
        return IndividualAffiliate::query()
            ->where(static function ($query): void {
                $query->whereNull('IndividualAffiliate.EndDate')->orWhereDate('IndividualAffiliate.EndDate', '>',
                    Carbon::now()->startOfDay()->toDateString());
            })
            ->where('IndividualAffiliate.IndividualId', $individualAffiliate->IndividualId)
            ->get()->all();
    }
}

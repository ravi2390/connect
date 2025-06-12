<?php

namespace App\Actions\Individual\Workflow;

use App\Actions\Individual\CopyUnionMembership;
use App\Actions\Individual\CreateRetiredEmployment;
use App\Actions\Individual\EndEmployments;
use App\Actions\Individual\SetStopReasonIndividual;
use App\Models\Affiliate;
use App\Models\IndividualAffiliate;
use App\Models\LocalDuesCategory;
use App\Models\NationalPerCapita;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class MemberRetiredStopReason
{

    use AsAction;

    protected array $retiredLocalDuesCategoryNames = [
        'Retired',
        'Retired - LifeTime',
        'Retired - No Dues',
        'Retired - Retired',
    ];

    protected function handle(
        IndividualAffiliate $individualAffiliate,
        string $stopReason,
        Carbon $endDate,
    ): array {
        DB::transaction(function () use ($individualAffiliate, $stopReason, $endDate): void {
            SetStopReasonIndividual::run(individualAffiliate: $individualAffiliate, stopReason: $stopReason);
            $retireeAffiliate = $this->checkAffiliate($individualAffiliate->Affiliate);
            CopyUnionMembership::run(
                individualAffiliate: $individualAffiliate,
                endDate: $endDate,
                newUnionRelationship: 'Retired Member',
                additionalProperties: [
                    'LocalDuesCategoryId' => optional($this->findLocalDuesCategory($individualAffiliate))->LocalDuesCategoryId,
                    'AffiliateId' => $retireeAffiliate->AffiliateId,
                    'IsCurrent' => $endDate->isFuture()
                ],
            );
            EndEmployments::run(individual: $individualAffiliate->Individual, endDate: $endDate);
            CreateRetiredEmployment::run(
                individual: $individualAffiliate->Individual,
                endDate: $endDate,
                affiliate: $retireeAffiliate,
            );
        });

        return [
            'message' => 'ok',
            'statusCode' => 205,
        ];
    }

    protected function findLocalDuesCategory(IndividualAffiliate $individualAffiliate): ?LocalDuesCategory
    {
        return LocalDuesCategory::query()
            ->where('AffiliateId', $individualAffiliate->Affiliate->getKey())
            ->where('NationalPerCapitaId',
                NationalPerCapita::query()->where('NationalPerCapitaName', 'Retired')->first()->getKey())
            ->whereIn('LocalDuesCategoryName', $this->retiredLocalDuesCategoryNames)
            ->latest()
            ->first();
    }

    protected function checkAffiliate(Affiliate $affiliate): Affiliate
    {
        $retireeEntity = $affiliate->RetireeDestinationEntity();

        return $retireeEntity instanceof Affiliate ? $retireeEntity : $affiliate;
    }
}

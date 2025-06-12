<?php

namespace App\Actions\Individual;

use App\Models\IndividualAffiliate;
use App\Models\UnionRelationshipType;
use Carbon\Carbon;
use Lorisleiva\Actions\Concerns\AsAction;

class MfpCopyUnionMembership
{

    use AsAction;

    protected array $replicateFields = [
        'IndividualId',
        'AffiliateId',
        'LocalDuesCategoryId',
        'PaymentMethodId',
        'PaymentFrequencyId',
    ];

    protected function handle(
        IndividualAffiliate $individualAffiliate,
        Carbon              $endDate,
        int                 $oldUnionRelationshipTypeId,
        string              $newUnionRelationship,
        array               $additionalProperties = []
    ): void
    {
        $copy = $this->replicate($individualAffiliate);

        if ($oldUnionRelationshipTypeId && $oldUnionRelationshipTypeId != 5) {
            $individualAffiliate->update(['EndDate' => $endDate, 'IsCurrent' => false]);
        }

        /** @var UnionRelationshipType $newUnionRelationshipModel */
        $newUnionRelationshipModel = UnionRelationshipType::query()->where('UnionRelationshipTypeName', $newUnionRelationship)->get()->first();

        $copy->fill(
            array_merge([
                'EndDate' => null,
                'UnionRelationshipTypeId' => $newUnionRelationshipModel->getKey(),
                'IsCurrent' => 1,
                'StartDate' => ($endDate->isToday()) ? $endDate : $endDate->copy()->addDay()->startOfDay(),
            ], $additionalProperties)
        )->save();
    }

    protected function replicate(IndividualAffiliate $individualAffiliate): IndividualAffiliate
    {
        $replicated = new IndividualAffiliate();

        foreach ($this->replicateFields as $replicateField) {
            $replicated->setAttribute($replicateField, $individualAffiliate->getAttribute($replicateField));
        }

        return $replicated;
    }
}

<?php

namespace App\Actions\Individual\Workflow;

use App\Models\IndividualAffiliate;
use App\Scopes\AffiliateScope;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class ReactivateUnionRelationship
{
    use AsAction;

    protected function handle(IndividualAffiliate $individualAffiliate): array
    {
        if ($this->isRetired($individualAffiliate)) {
            throw new \RuntimeException('Already retired');
        }

        DB::transaction(function () use ($individualAffiliate): void {
            $individualAffiliate->update(
                [
                    'EndDate' => null,
                    'IndividualDeactivationReasonId' => null,
                ]
            );
            $individualAffiliate->Individual->individualEmployers()->update(['EndDate' => null]);
            $individualAffiliate->individualCommitteeMember()->update(['EndDate' => null]);
            $individualAffiliate->individualStaff()->update(['TermEndDate' => null]);
            $individualAffiliate->individualOfficers()->update(['TermEndDate' => null]);
        });

        return [
            'message' => 'ok',
            'statusCode' => 200,
        ];
    }

    protected function isRetired(IndividualAffiliate $individualAffiliate): bool
    {
        return IndividualAffiliate::query()->withoutGlobalScopes([AffiliateScope::class])
                ->join('UnionRelationshipType', 'UnionRelationshipType.UnionRelationshipTypeId', '=', 'IndividualAffiliate.UnionRelationshipTypeId')
                ->where('UnionRelationshipType.UnionRelationshipTypeName', 'Retired Member')
                ->where(static function ($query): void {
                    $query->whereNull('IndividualAffiliate.EndDate')->orWhereDate('IndividualAffiliate.EndDate', '>', Carbon::now()->startOfDay()->toDateString());
                })
                ->where('IndividualAffiliate.IndividualId', $individualAffiliate->IndividualId)->get()->count() > 0;
    }
}

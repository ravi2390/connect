<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\Controller;
use App\Models\IndividualDeactivationReason;
use App\Models\UnionRelationshipType;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class StopReasonController
 */
class StopReasonController extends Controller
{
    /**
     * Returns stop reason for the individuals union relationship type.
     *
     * @param  int  $individualId
     */
    public function __invoke(UnionRelationshipType $unionRelationshipType): JsonResource
    {
        $stopReasons = IndividualDeactivationReason::query()->where(function ($query) use ($unionRelationshipType): void {
            switch ($unionRelationshipType->UnionRelationshipTypeName) {
                case 'Other':
                    $query->where('ApplicableToOther', true);
                    break;
                case 'Member':
                    $query->where('ApplicableToMember', true);
                    break;
                case 'Potential Member':
                    $query->where('ApplicableToPotentialMember', true);
                    break;
                case 'Agency Fee Payer':
                    $query->where('ApplicableToAgencyFee', true);
                    break;
                case 'Retired Member':
                    $query->where('ApplicableToRetiree', true);
                    break;
            }
        })->orderBy('DisplayOrder')->get(['IndividualDeactivationReasonId', 'IndividualDeactivationReasonName']);

        return new JsonResource($stopReasons ?? []);
    }
}

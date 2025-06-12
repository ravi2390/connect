<?php

namespace App\Services\Factories;

use App\Actions\Individual\Workflow\DeceasedStopReason;
use App\Actions\Individual\Workflow\JoinedUnionStopReason;
use App\Actions\Individual\Workflow\MemberRetiredStopReason;
use App\Actions\Individual\Workflow\MfpJoinedUnionStopReason;
use App\Actions\Individual\Workflow\PromotedStopReason;
use App\Actions\Individual\Workflow\QuitEmploymentStopReason;
use App\Actions\Individual\Workflow\QuitUnionStopReason;

class IndividualStopReasonWorkflow
{
    public function createWorkflow(string $stopReason)
    {
        //@TODO: move this to the IndividualDeactivationReason table - store the workflow name in it so we don't have it hardcoded in here:
        return match (strtolower($stopReason)) {
            'deceased', 'erroneous record', 'duplicate record' => DeceasedStopReason::make(),
            'job change - out of unit', 'non-member retired', 'non member retired' => PromotedStopReason::make(),
            'left employment', 'terminated by employer', 'unknown', 'record not on file for upload', 'not on file sent for upload', 'graduated' => QuitEmploymentStopReason::make(),
            'member retired' => MemberRetiredStopReason::make(),
            'quit union (eligible to rejoin)' => QuitUnionStopReason::make(),
            'joined union' => JoinedUnionStopReason::make(),
            'mfp joined union' => MfpJoinedUnionStopReason::make(),
            default => throw new \RuntimeException('No workflow found for stop reason: '.$stopReason),
        };
    }
}

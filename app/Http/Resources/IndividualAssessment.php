<?php

namespace App\Http\Resources;

class IndividualAssessment extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
            'IndividualQuickComment',
            'AssessmentContactType',
            'SubmittedByIndividual',
        ];
    }

    protected function getSimpleFields(): array
    {
        return [
            'IndividualQuickCommentId',
            'IndividualId',
            'Rating',
            'ContactDate',
            'SubmitUserId',
            'IndividualCommentId',
            'AssessmentContactTypeId',
            'CreatedAt',
        ];
    }

    protected function includeIndividualQuickComment(): \App\Http\Resources\IndividualQuickComment
    {
        return new IndividualQuickComment($this->IndividualQuickComment);
    }

    protected function includeAssessmentContactType(): \App\Http\Resources\AssessmentContactType
    {
        return new AssessmentContactType($this->AssessmentContactType);
    }

    protected function includeSubmittedByIndividual(): \App\Http\Resources\Individual
    {
        return new Individual($this->SubmittedByIndividual);
    }
}

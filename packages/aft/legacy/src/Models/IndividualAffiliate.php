<?php

namespace Aft\Legacy\Models;

use Aft\Legacy\LegacyFlatData;
use App\Models\LocalDuesCategory;

class IndividualAffiliate extends LegacyModel
{
    public function transform($newIndividualId, string $newAffiliateId, LegacyFlatData $flatData): array
    {
        $attributes = [];
        $attributes['IndividualId'] = $newIndividualId;
        $attributes['AffiliateId'] = $newAffiliateId;
        $memberStatusName = strtolower($this->MemberStatusname);
        $duesCategoryName = strtolower($this->DuesCategoryname);
        switch (true) {
            case $memberStatusName == 'active' &&
            str_contains(strtolower($this->NonMemberTypeName), 'staff'):
                $unionRelationshipTypeName = 'other';
                break;
            case $this->MemberTF &&
            $memberStatusName == 'active' &&
            $duesCategoryName == 'retired':
                $unionRelationshipTypeName = 'retired';
                break;
            case $this->MemberTF &&
            $memberStatusName == 'active' &&
            (str_contains($duesCategoryName, 'agency')):
                $unionRelationshipTypeName = 'agency';
                break;
            case $this->MemberTF:
                $unionRelationshipTypeName = 'member';
                break;
            case (! $this->MemberTF) &&
            $memberStatusName == 'active' &&
            strtolower($this->NonMemberTypename) == 'prospect':
                $unionRelationshipTypeName = 'potential';
                break;
            case (! $this->MemberTF) &&
            $memberStatusName == 'active':
                $unionRelationshipTypeName = 'other';
                break;
            case (! $this->MemberTF) &&
            $memberStatusName == 'inactive':
                $unionRelationshipTypeName = 'none';
                break;
            default:
                $exceptionMessage = <<<MESSAGE
Inconsistent IndividualAffiliate data:
IndividualAffiliateId: {$this->IndividualAffiliateId}
MemberTF: {$this->MemberTF}
MemberStatusname: {$this->MemberStatusname}
DuesCategoryname: {$this->DuesCategoryname}
NonMemberTypename: {$this->NonMemberTypename}
MESSAGE;
                throw new \Exception($exceptionMessage);
                break;
        }
        $attributes['UnionRelationshipTypeId'] = $flatData->getMapping('UnionRelationshipType', $unionRelationshipTypeName);
        // $attributes['ChapterId'] = $this->;
        if (! empty($this->DuesCategoryname)) {
            $attributes['LocalDuesCategoryId'] = $this->getLocalDuesCategoryId(
                $newAffiliateId,
                $this->DuesCategoryname,
                $flatData
            );
        }
        $attributes['HasLiabilityInsurance'] = $this->OccupLiabInsurTF;
        $attributes['HasAccidentInsurance'] = $this->AccidentInsurTF;
        $attributes['IsCurrent'] = ($memberStatusName == 'active');
        // @todo DeactivateReasonname or DeactivateReasonLocalname? They're not
        // consistent...
        // @todo $attributes['IndividualDeactivationReasonId'] = $this->DeactivateReasonId;
        $attributes['StartDate'] = $this->UnionInitDate ?? $this->cdate;
        $attributes['EndDate'] = $this->DeactivateEffectiveDate;
        $attributes['PaidThroughDate'] = $this->PaidThroughDate;
        $attributes['PaymentMethodId'] = $flatData->getMapping('PaymentMethod', $this->PaymentMethodname);
        // $attributes['PaymentFrequencyId'] = $this->;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }

    public function transformIndividualEmployer(
        $newIndividualId,
        $newEmployerId,
        $newLocalJobClassId,
        $newSubjectId = null,
        $worksiteId = null
    ): array {
        $attributes = [];
        $attributes['IndividualId'] = $newIndividualId;
        $attributes['EmployerId'] = $newEmployerId;
        $attributes['EmployeeId'] = $this->EmployerAssignedId;
        $attributes['LocalJobClassId'] = $newLocalJobClassId;
        $attributes['JobDescription'] = $this->JobTitle;
        $attributes['HireDate'] = $this->HireDate;
        // @todo Is this the right source field and right default?
        $attributes['StartDate'] = $this->HireDate ?? '2020-12-31 23:59:59';
        $attributes['WorkShift'] = $this->WorkShift;
        $attributes['RetirementEffDate'] = $this->RetireEffDate;
        $attributes['IsPartTime'] = $this->PartTimeTF ?? 0;
        $attributes['IsTenured'] = $this->TenuredTF ?? false;
        $attributes['SubjectId'] = $newSubjectId;
        $attributes['WorkLocationId'] = $worksiteId;
        $attributes['IsCurrent'] = strcasecmp($this->MemberStatusname, 'Active') === 0;

        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }

    /**
     * Get the local dues category, creating a record if necessary.
     */
    public function getLocalDuesCategoryId(string $affiliateId, string $name, LegacyFlatData $flatData): int
    {
        $id = LocalDuesCategory::where('AffiliateId', '=', $affiliateId)
            ->where('LocalDuesCategoryName', '=', $name)
            ->value('LocalDuesCategoryId');
        if (empty($id)) {
            $item = new LocalDuesCategory();
            $item->forceFill([
                'AffiliateId' => $affiliateId,
                'LocalDuesCategoryName' => $name,
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
                'NationalPerCapitaId' => $flatData->getMapping('NationalPerCapita', $name),
            ]);
            $item->save();
            $id = $item->getKey();
        }

        return $id;
    }
}

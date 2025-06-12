<?php

namespace Aft\Legacy\Models;

class ComplianceAffiliateView extends LegacyModel
{
    public function transform(int $newAffiliateId): array
    {
        $attributes = [];
        $attributes['AffiliateId'] = $newAffiliateId;
        $attributes['AffiliateGUID'] = $this->AffiliateId;
        $attributes['AffiliateNumber'] = $this->AffiliateNbr;
        $attributes['AuditDate'] = $this->AuditDate;
        $attributes['AuditCompliance'] = $this->AuditCompliance;
        $attributes['AuditCertifiedTF'] = $this->AuditCertifiedTF;
        $attributes['AuditResultId'] = $this->AuditResult;
        $attributes['ConstitutionDate'] = $this->ConstitutionDate;
        $attributes['ConstitutionCompliance'] = $this->ConstitutionCompliance;
        $attributes['ConstitutionCertifiedTF'] = $this->ConstitutionCertifiedTF;
        $attributes['ConstitutionResultId'] = $this->ConstitutionResult;
        $attributes['DuesDate'] = $this->DuesDate;
        $attributes['DuesCompliance'] = $this->DuesCompliance;
        $attributes['DuesCertifiedTF'] = $this->DuesCertifiedTF;
        $attributes['DuesResultId'] = $this->DuesResult;
        $attributes['OfficersDate'] = $this->OfficersDate;
        $attributes['OfficersCompliance'] = $this->OfficersCompliance;
        $attributes['OfficersCertifiedTF'] = $this->OfficersCertifiedTF;
        $attributes['OfficersResultId'] = $this->OfficersResult;
        $attributes['ExecBoardDate'] = $this->ExecBoardDate;
        $attributes['ExecBoardCompliance'] = $this->ExecBoardCompliance;
        $attributes['ExecBoardCertifiedTF'] = $this->ExecBoardCertifiedTF;
        $attributes['ExecBoardResultId'] = $this->ExecBoardResult;
        $attributes['MembershipDate'] = $this->MembershipDate;
        $attributes['MembershipCompliance'] = $this->MembershipCompliance;
        $attributes['MembershipCertifiedTF'] = $this->MembershipCertifiedTF;
        $attributes['MembershipResultId'] = $this->MembershipResult;
        $attributes['StateDuesDate'] = $this->StateDuesDate;
        $attributes['StateDuesCompliance'] = $this->StateDuesCompliance;
        $attributes['StateDuesCertifiedTF'] = $this->StateDuesCertifiedTF;
        $attributes['StateDuesResultId'] = $this->StateDuesResult;

        return $attributes;
    }
}

<?php

namespace Aft\Legacy\Models;

use App\Models\AffiliateOfficerRole;
use App\Models\OfficerRoleTitle;
use App\Models\OfficerRoleType;
use Illuminate\Support\Facades\DB;

class Leadership extends LegacyModel
{
    protected $roleTitles = [];

    public function transform(int $newIndividualId, int $newAffiliateId): array
    {
        $attributes = [];
        $attributes['AffiliateId'] = $newAffiliateId;
        $attributes['IndividualId'] = $newIndividualId;
        $attributes['AffiliateOfficerRoleId'] = $this->getAffiliateOfficerRoleId(
            $newAffiliateId,
            $this->LeadershipPositionId
        );
        $attributes['TermStartDate'] = $this->TermStartDate;
        $attributes['TermEndDate'] = $this->TermEndDate;
        $attributes['IsElected'] = ! empty($this->ElectionDate);
        $attributes['IsCurrent'] = 1;
        $attributes['IsPreferredTitle'] = $this->PreferredTitleTF ?? 0;
        $attributes['CreatedAt'] = $this->cdate;
        $attributes['UpdatedAt'] = $this->mdate;
        $attributes['CreatedBy'] = 1;
        $attributes['UpdatedBy'] = 1;

        return $attributes;
    }

    /**
     * Get the officer role, creating a record if necessary.
     */
    public function getAffiliateOfficerRoleId(int $affiliateId, string $legacyPositionId): int
    {
        $legacyPositionName = DB::connection('legacy')->table('LeadershipPosition')
            ->where('LeadershipPositionId', '=', $legacyPositionId)
            ->value('LeadershipPositionName');
        $officerRoleId = AffiliateOfficerRole::where('AffiliateId', '=', $affiliateId)
            ->where('AffiliateOfficerRoleName', '=', $legacyPositionName)
            ->value('AffiliateOfficerRoleId');
        if (empty($officerRoleId)) {
            $item = new AffiliateOfficerRole();
            $item->forceFill([
                'AffiliateOfficerRoleName' => $legacyPositionName,
                'AffiliateId' => $affiliateId,
                'OfficerRoleTitleId' => $this->getOfficerRoleTitleId($legacyPositionName),
                'CreatedBy' => 1,
                'UpdatedBy' => 1,
            ]);
            $item->save();
            $officerRoleId = $item->getKey();
        }

        return $officerRoleId;
    }

    /**
     * Get the role title, creating a record if necessary.
     */
    public function getOfficerRoleTitleId(string $positionName): int
    {
        if (empty($this->roleTitles[$positionName])) {
            $this->roleTitles[$positionName] = OfficerRoleTitle::where(
                'OfficerRoleTitleName',
                '=',
                $positionName
            )
                ->value('OfficerRoleTitleId');
            if (empty($this->roleTitles[$positionName])) {
                $item = new OfficerRoleTitle();
                $item->forceFill([
                    'OfficerRoleTitleName' => $positionName,
                    // @todo Add smarts to pick a type
                    'OfficerRoleTypeId' => $this->getOtherTypeId(),
                    'DisplayOrder' => 1,
                    'CreatedBy' => 1,
                    'UpdatedBy' => 1,
                ]);
                $item->save();
                $this->roleTitles[$positionName] = $item->getKey();
            }
        }

        return $this->roleTitles[$positionName];
    }

    /**
     * Get and cache the "Other" type ID.
     */
    public function getOtherTypeId(): int
    {
        if (empty($this->otherTypeId)) {
            $this->otherTypeId = OfficerRoleType::where(
                'OfficerRoleTypeName',
                '=',
                'Other'
            )
                ->value('OfficerRoleTypeId');
        }

        return $this->otherTypeId;
    }
}

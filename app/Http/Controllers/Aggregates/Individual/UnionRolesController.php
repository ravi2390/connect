<?php

namespace App\Http\Controllers\Aggregates\Individual;

use App\Http\Controllers\Controller;
use App\Models\IndividualAffiliate;
use Illuminate\Http\Resources\Json\JsonResource;

class UnionRolesController extends Controller
{
    public function __invoke(int $individualId)
    {
        $individualAffilites = IndividualAffiliate::query()->where('IndividualId', $individualId)->with(['Affiliate', 'individualOfficers', 'currentIndividualOfficers', 'pastIndividualOfficers', 'individualOfficers.AffiliateOfficerRole', 'currentIndividualOfficers.AffiliateOfficerRole', 'pastIndividualOfficers.AffiliateOfficerRole', 'individualStaff', 'currentIndividualStaff.StaffDepartment', 'pastIndividualStaff.StaffDepartment', 'individualCommitteeMember', 'currentIndividualCommitteeMember.CommitteeMemberType', 'currentIndividualCommitteeMember.AffiliateCommittee', 'pastIndividualCommitteeMember.CommitteeMemberType', 'pastIndividualCommitteeMember.AffiliateCommittee', 'individualGroupMember', 'currentIndividualGroupMember.AffiliateGroup', 'pastIndividualGroupMember.AffiliateGroup', 'currentIndividualStaff', 'pastIndividualStaff', 'currentIndividualCommitteeMember', 'pastIndividualCommitteeMember', 'currentIndividualGroupMember', 'pastIndividualGroupMember',
        ])->get();

        return JsonResource::collection($individualAffilites);
    }
}

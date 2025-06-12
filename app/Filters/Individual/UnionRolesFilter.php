<?php

namespace App\Filters\Individual;

use Database\Seeders\helpers;
use App\Helpers\JoinFinder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class UnionRolesFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property): void
    {
        switch ($value) {
            case 'Officer Roles':
                if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'AffiliateOfficer')) {
                    $query->select('Individual.*')->distinct()->join('AffiliateOfficer', 'AffiliateOfficer.IndividualId', '=', 'Individual.IndividualId')->whereNull('AffiliateOfficer.DeletedAt');
                }
                break;
            case 'Staff Roles':
                if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'AffiliateStaff')) {
                    $query->select('Individual.*')->distinct()->join('AffiliateStaff', 'AffiliateStaff.IndividualId', '=', 'Individual.IndividualId')->whereNull('AffiliateStaff.DeletedAt');
                }
                break;
            case 'Committee Roles':
                if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'AffiliateCommitteeMember')) {
                    $query->select('Individual.*')->distinct()->join('AffiliateCommitteeMember', 'AffiliateCommitteeMember.IndividualId', '=', 'Individual.IndividualId')->whereNull('AffiliateCommitteeMember.DeletedAt');
                }
                break;
            case 'Group Roles':
                if (! JoinFinder::isTableJoined($query->getQuery()->joins ?? [], 'AffiliateGroupMember')) {
                    $query->select('Individual.*')->distinct()->join('AffiliateGroupMember', 'AffiliateGroupMember.IndividualId', '=', 'Individual.IndividualId')->whereNull('AffiliateGroupMember.DeletedAt');
                }
                break;
        }
    }
}

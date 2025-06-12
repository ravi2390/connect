<?php

namespace App\Models\Traits;

use App\Models\AffiliateCommitteeMember;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait AffiliateCommittee
{
    public function affiliateCommitteeMember(): HasMany
    {
        return $this->hasMany(AffiliateCommitteeMember::class, 'AffiliateCommitteeId', 'AffiliateCommitteeId');
    }
}

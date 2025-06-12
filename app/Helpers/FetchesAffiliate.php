<?php

namespace App\Helpers;

use Database\Seeders\helpers;
use App\Models\Affiliate;

/**
 * Trait FetchesAffiliate
 */
trait FetchesAffiliate
{
    public function fetchAffiliateId(): ?int
    {
        if (($user = auth()->user()) && isset($user->profile->selected_entity['entity_type'], $user->profile->selected_entity['entity_id'])) {
            return $user->profile->selected_entity['entity_type'] === Affiliate::class ? (int) $user->profile->selected_entity['entity_id'] : null;
        }

        return null;
    }
}

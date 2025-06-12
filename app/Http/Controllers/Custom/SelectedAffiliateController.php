<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class SelectedAffiliateController extends Controller
{
    public function __invoke(): JsonResource
    {
        //@TODO: move to morph relationship in the future (morphTo in the UserProfile).
        if (($user = Auth::user()) && (! empty($user->profile?->selected_entity) && $user->profile->selected_entity['entity_type'] === Affiliate::class)) {
            return new JsonResource(
                Affiliate::with(['AffiliateType', 'AffiliatePerCapita'])->find((int) $user->profile->selected_entity['entity_id'])->setAppends(['hasCope', 'hasChapters'])
            );
        }

        return new JsonResource([]);
    }
}

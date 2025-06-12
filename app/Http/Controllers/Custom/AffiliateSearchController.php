<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\Controller;
use App\Http\Resources\Affiliate as AffiliateResource;
use App\Models\Affiliate;
use Illuminate\Http\Request;

class AffiliateSearchController extends Controller
{
    public function search(Request $request)
    {
        $search = '%'.preg_replace('/\s+/', '%', (string) $request->input('search')).'%';

        return AffiliateResource::collection(Affiliate::query()
            ->where('AffiliateName', 'like', $search)
            ->orWhere('AffiliateNumber', 'like', $search)
            ->orderBy('AffiliateName')
            ->paginate(10));
    }
}

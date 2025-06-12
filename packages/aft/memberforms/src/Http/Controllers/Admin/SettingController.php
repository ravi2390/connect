<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\MemberForms\Models\AffiliateLogo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function uploadLogo(Request $request): array
    {
        if ($request->input('affiliateId')) {
            if ($request->hasFile('fed') && $request->file('fed')->isValid()) {
                $fileName = Storage::disk('public')->put('aft-logo', $request->file('fed'));
                AffiliateLogo::updateOrCreate(
                    ['affiliate_id' => $request->input('affiliateId')],
                    ['fed_logo' => $fileName]
                );
            }
            if ($request->hasFile('local') && $request->file('local')->isValid()) {
                $fileNameLocal = Storage::disk('public')->put('aft-logo', $request->file('local'));
                AffiliateLogo::updateOrCreate(
                    ['affiliate_id' => $request->input('affiliateId')],
                    ['local_logo' => $fileNameLocal]
                );
            }

            return ['status' => 1, 'message' => 'Uploaded successfully'];
        } else {
            return ['status' => 2, 'message' => 'Unable to upload'];
        }
    }

    public function getLogos(Request $request): ?array
    {
        if ($request->input('affiliateId')) {
            $logoData = AffiliateLogo::where('affiliate_id', $request->input('affiliateId'))->first();

            return ['localLogo' => $logoData && $logoData->local_logo ? Storage::url($logoData->local_logo) : null, 'fedLogo' => $logoData && $logoData->fed_logo ? Storage::url($logoData->fed_logo) : null];
        } else {
            return null;
        }
    }

    public function removeLogo(Request $request): ?string
    {
        if ($request->input('affiliateId')) {
            $logoData = AffiliateLogo::where('affiliate_id', $request->input('affiliateId'))->first();
            if ($request->input('type') == 'fed') {
                $logoData->fed_logo = '';
            } elseif ($request->input('type') == 'local') {
                $logoData->local_logo = '';
            }
            $logoData->save();

            return 'removed successfully';
        } else {
            return null;
        }
    }
}

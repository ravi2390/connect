<?php

namespace Aft\Lsdk\Http\Controllers;

use App\Http\Controllers\Controller;
use Aft\Lsdk\Services\LookerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Affiliate;

class LookerController extends Controller
{
    public function __construct(protected \Aft\Lsdk\Services\LookerService $lookerService)
    {
    }

    public function searchDashboardList(Request $request)
    {
        $user = $request->user();
        $folderId = 25;
        $dashboardList  = [];

        try {
            $dashboardList = $this->lookerService->searchDashboard($folderId);
        } catch (\Exception $e) {
            Log::error('Failed to generate search dashboard URL', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'folder_id' => $folderId,
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate search dashboard URL: ' . $e->getMessage(),
            ], 500);
        }

        $dashboardListWithThumbnail  = [];

        foreach ($dashboardList as $dashboard) {
            try {
                $thumbnailImage = $this->lookerService->getContentThumbnailByDashboard($dashboard['id']);
                $dashboard['thumbnailImage'] = $thumbnailImage;
                $dashboardListWithThumbnail[] = $dashboard;
            } catch (\Exception $e) {
                Log::error('Failed to get thumbnail image', [
                    'error' => $e->getMessage(),
                    'user_id' => $user->id,
                    'folder_id' => $folderId,
                ]);
            }
        }

        return response()->json(['status' => 'success', 'url' => $dashboardListWithThumbnail]);
    }

    public function createEmbedUrl(Request $request)
    {
        $user = $request->user();
        $dashboardId = $request->input('dashboard_id');
        $selectedAffiliateId = $request->input('affiliates', '08080');
        $affiliateObject = Affiliate::find($selectedAffiliateId);
        $selectedAffiliateNumber = $affiliateObject->AffiliateNumber;

        // $affiliateNumbers = [];
        // $groups = $user->getUserAuthorizationList(new Affiliate());
        // $affiliateIDs = [];
        // $hasWildcardAccess = false;
    
        // foreach ($groups as $group) {
        //     if ($group['entity_type'] == Affiliate::class) {
        //         if ($group['entity_id'] == '*') {
        //             $hasWildcardAccess = true;
        //             break;
        //         } else {
        //             $affiliateIDs[] = $group['entity_id'];
        //         }
        //     }
        // }
    
        // if ($hasWildcardAccess) {
        //     $affiliateNumbers = ['08080'];
        // } else {
        //     // at least one affiliate will always be found
        //     $affiliateObjects = Affiliate::whereIn('AffiliateId', $affiliateIDs)->get(['AffiliateNumber']);
        //     foreach ($affiliateObjects as $affiliateObject) {
        //         $affiliateNumbers[] = $affiliateObject->AffiliateNumber;
        //     }
        // }
    
        $ssoParams = [
            'target_url' => "https://aftorg.cloud.looker.com/dashboards/{$dashboardId}?allow_login_screen=true",
            'session_length' => 3600,
            'force_logout_login' => true,
            'permissions' => ['access_data', 'see_lookml_dashboards', 'see_user_dashboards'],
            'models' => ['test_access_filter'],
            'user_attributes' => [
                'affiliate_number' => $selectedAffiliateNumber,
            ],
            // 'external_user_id' => '25'
        ];
    
        try {
            $embedUrl = $this->lookerService->createSsoEmbedUrl($ssoParams);
            return response()->json(['status' => 'success', 'url' => $embedUrl]);
        } catch (\Exception $e) {
            Log::error('Failed to generate embed URL', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'affiliate_numbers' => $selectedAffiliateNumber,
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate embed URL: ' . $e->getMessage(),
            ], 500);
        }
    }
}

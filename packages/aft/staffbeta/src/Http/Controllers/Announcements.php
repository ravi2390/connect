<?php

namespace Aft\StaffBeta\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;

class Announcements extends Controller
{
    public function index()
    {
        $localWelcome = [
            'id' => '1234',
            'title' => 'Welcome to the AFT Connect Staff Portal!',
            'content' => '<p><em>The AFT Connect Staff Portal (SPORT) is for your use as a National Staffperson. This system is the replacement for SAMS and Member Lookup (if you have been around long enough to remember those). It gives you access to affiliate contact information.
            <br>
            <br>If you have questions, concerns, or see information you know is out-of-date, please reach out via AFT Help requests as <a href="http://go.aft.org/helprequests">go.aft.org/helprequests</a></em></p>',
            'type' => 'staffannouncement',
        ];

        /*$announcements = ContentBlock::where('is_active', '=', true)
            ->orderBy('updated_at', 'desc')
            ->get();
        $announcements->prepend($localWelcome);*/
        return collect(['data' => $localWelcome]);
    }
}

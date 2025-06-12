<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class DebugInfo extends Controller
{
    public function getDebugInfo()
    {
        $accessToUsers = ['cgutta@aft.org', 'nlolla@aft.org', 'ryarlaga@aft.org', 'onakhawa@aft.org'];
        $user = Auth::user();

        $data = (object) [];
        if (in_array($user->email, $accessToUsers)) {
            $data->environment = App::environment();
            $data->name = $data->environment;
            $data->appPath = app_path();
            $data->basePath = base_path();
            $data->publicPath = public_path();
            $data->storagePath = storage_path();
        }

        return json_encode($data);
    }
}

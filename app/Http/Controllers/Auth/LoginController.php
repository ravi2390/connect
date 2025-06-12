<?php

namespace App\Http\Controllers\Auth;

use Aft\Permissions\Models\Authorization;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\User;
use App\Models\UserProfile;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers {
        authenticated as traitAuthenticated;
    }

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * The user has been authenticated.
     *
     * @param  mixed  $user
     * @return mixed
     */
    public function authenticated(Request $request, $user)
    {
        $entityId = $user->profile->selected_entity_id;
        $entityType = $user->profile->selected_entity_type;
        $profileId = $user->profile_id;
        $affiliates = [];

        if ($entityType == Affiliate::class) {
            $affiliates = Affiliate::query()
                ->where('Affiliate.AffiliateId', $entityId)
                ->get()
                ->all();
        }
        if (count($affiliates) == 0) {
            $authorizations = Authorization::query()
                ->where('user_id', $user->id)
                ->where('entity_type', Affiliate::class)
                ->get()
                ->all();

            if (count($authorizations) > 0) {
                $selectedAffiliateId = $authorizations[0]->entity_id;
                if ($selectedAffiliateId == 0) {
                    $affiliates = Affiliate::query()
                        ->get()
                        ->all();
                    $selectedAffiliateId = $affiliates[0]->AffiliateId;
                }

                $profile = UserProfile::find($profileId);
                $profile->selected_entity_type = Affiliate::class;
                $profile->selected_entity_id = $selectedAffiliateId;
                $profile->save();
            }
        }
        $result = $this->traitAuthenticated($request, $user); // just in case this ever returns anything in the future

        // TODO: this code or $user->auditEvent('login'); ???
        User::withoutEvents(function () use ($request, $user): void {
            $date = Carbon::now();
            $date->setTimezone('GMT-4');
            $user->update([
                'last_login_at' => $date,
                'last_login_ip' => $request->ip(),
                'last_login_agent' => $request->header('User-Agent'),
            ]);
            $user->save();
        });

        if ($user->type == 'staff') {
            return redirect('/app/staff');
        }

        return $result;
    }
}

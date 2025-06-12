<?php

namespace App\Http\Controllers\Auth;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ExpiredPasswordController extends Controller
{
    public function showExpiredForm(): View
    {
        return view('auth.passwords.expired');
    }

    public function reset(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => 'required|confirmed|min:8',
        ], []);

        $user = $request->user();

        $user->password = Hash::make($request->password);

        $expireDays = config('auth.passwords.users.password_expire_days');
        $user->password_expires_at = $expireDays ? Carbon::now()->addDays($expireDays) : null;

        $user->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordReset($user));

        Auth::guard()->login($user);

        return redirect()->back()->with(['status' => 'updated', 'message' => 'Password changed successfully']);
    }
}

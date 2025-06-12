<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfStaff
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ?string $guard = null): Response
    {
        // TODO: I _really_ wanted to get rid of this, but because there is no negative query for staff, it has to stay.
        if (Auth::guard($guard)->check()) {
            $user = Auth::user();
            $path = $request->path();
            if ($user->type == 'staff' && ($path != 'logout' && ! preg_match('/app\/staff.*/i', $path) && ! preg_match('/email.*/i', $path) && ! preg_match('/password.*/i', $path))) {
                return redirect('/app/staff');
            }
        }

        return $next($request);
    }
}

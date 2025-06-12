<?php

namespace Aft\Permissions\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckForAbility
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $abilityType)
    {
        if (Auth::guard()->check()) {
            $user = Auth::user();
            if ($user->type === 'admin') {
                return $next($request);
            }
            if ($abilityType === 'reports') {
                return $next($request);
            }
            if ($user->type === 'staff' && $abilityType === 'staffportal') {
                // TODO: horrible awful terrible hack...
                $path = $request->path();
                if ($path === 'logout') {
                    return $next($request);
                }
                if (preg_match('/app\/staff.*/i', $path)) {
                    return $next($request);
                }
                if (preg_match('/api\/staff.*/i', $path)) {
                    return $next($request);
                }
            }
            if ($user->hasAbility($abilityType)) {
                return $next($request);
            }
        }

        abort(404);
    }
}

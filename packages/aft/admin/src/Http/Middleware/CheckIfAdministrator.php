<?php

namespace Aft\Admin\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckIfAdministrator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (! empty($user) && $user->type === 'admin') {
            return $next($request);
        }
        abort(403);
    }
}

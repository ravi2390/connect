<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Closure;

class CheckForExpiredPassword
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/password/expired',
    ];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->inExceptArray($request)) {
            $user = $request->user();
            if (! empty($user->password_expires_at) && (Carbon::now() > $user->password_expires_at)) {
                return redirect()->route('password.expired');
            }
        }

        return $next($request);
    }

    /**
     * Determine if the request has a URI that should pass through expiration check.
     */
    protected function inExceptArray(Request $request): bool
    {
        foreach ($this->except as $except) {
            if ($except !== '/') {
                $except = trim((string) $except, '/');
            }

            if ($request->fullUrlIs($except) || $request->is($except)) {
                return true;
            }
        }

        return false;
    }
}

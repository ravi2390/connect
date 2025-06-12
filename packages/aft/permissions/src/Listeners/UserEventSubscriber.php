<?php

namespace Aft\Permissions\Listeners;

use Illuminate\Support\Facades\Auth;

class UserEventSubscriber
{
    public function onUserLogin($event): void
    {
        $user = Auth::user();
        if (method_exists($user, 'flushUserAuthorizationList')) {
            $user->flushUserAuthorizationList();
        }
    }

    public function onUserLogout($event): void
    {
        // This is probably redundant for production as the auth ttl will prune
        // authorizations but it's useful for testing right now
        $user = Auth::user();
        if (method_exists($user, 'flushUserAuthorizationList')) {
            $user->flushUserAuthorizationList();
        }
    }

    public function subscribe($events): void
    {
        $events->listen(
            \Illuminate\Auth\Events\Login::class,
            'Aft\Permissions\Listeners\UserEventSubscriber@onUserLogin'
        );
        $events->listen(
            \Illuminate\Auth\Events\Logout::class,
            'Aft\Permissions\Listeners\UserEventSubscriber@onUserLogout'
        );
    }
}

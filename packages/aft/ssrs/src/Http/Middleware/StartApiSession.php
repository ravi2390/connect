<?php

namespace Aft\SSRS\Http\Middleware;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Session\SessionManager;

class StartApiSession extends StartSession
{
    public function __construct(Application $app, SessionManager $manager)
    {
        parent::__construct($manager);
        $app->singleton(StartApiSession::class);
    }
}

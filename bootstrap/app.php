<?php

use App\Providers\AppServiceProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders()
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        // channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->redirectGuestsTo(fn () => route('login'));
        $middleware->redirectUsersTo(AppServiceProvider::HOME);

        $middleware->validateCsrfTokens(except: [
            'logout',
        ]);

        $middleware->web([
            \App\Http\Middleware\CheckForExpiredPassword::class,
            \App\Http\Middleware\RedirectIfStaff::class,
            \Laravel\Passport\Http\Middleware\CreateFreshApiToken::class,
        ]);

        $middleware->replace(\Illuminate\Http\Middleware\TrustProxies::class, \App\Http\Middleware\TrustProxies::class);

        $middleware->alias([
            'admin' => \Aft\Admin\Http\Middleware\CheckIfAdministrator::class,
            'admin:api' => \Aft\Admin\Http\Middleware\CheckIfAdministrator::class,
            'client' => \Laravel\Passport\Http\Middleware\CheckClientCredentials::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->reportable(function (Throwable $e): void {
            //
        });
    })->create();

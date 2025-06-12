<?php

namespace App\Providers;

use App\Services\GlobalFilter;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Register any application services.
     */
    #[\Override]
    public function register(): void
    {
        //if ($this->app->isLocal()) {
        $this->app->register(TelescopeServiceProvider::class);
        //}
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //provide app with `$view_name`
        view()->composer('*', function ($view): void {
            $view_name = str_replace('.', '-', $view->getName());
            view()->share('view_name', $view_name);
        });

        app()->bind(GlobalFilter::class);

        User::created(function ($user): void {
            $id = $user->getKey();
            $profile = UserProfile::firstOrCreate(['id' => $id]);
            $user->profile_id = $profile->getKey();
            $user->syncOriginalAttribute('id');
            $user->save();
        });

        User::deleted(function ($user): void {
            $user->profile->delete();
        });

        $this->bootRoute();
    }

    public function bootRoute(): void
    {
        RateLimiter::for('api', fn(Request $request) => Limit::perMinute(60)->by($request->user()?->id ?: $request->ip()));
    }
}

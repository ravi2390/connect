<?php

namespace Aft\FileUploader;

use Illuminate\Support\Facades\Route;

class FileUploader
{
    /**
     * Binds the routes into the controller.
     *
     * @param  callable|null  $callback
     * @param  array  $options
     * @return void
     */
    public static function routes($callback = null, array $options = []): void
    {
        $callback = $callback ?: function ($router): void {
            $router->all();
        };

        $defaultOptions = [
            'prefix' => 'custom/oneschema',
            'namespace' => '\Aft\FileUploader\Http\Controllers',
        ];

        $options = array_merge($defaultOptions, $options);

        Route::group($options, function ($router) use ($callback): void {
            $callback(new RouteRegistrar($router));
        });
    }
}

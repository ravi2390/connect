<?php

use App\Http\Controllers\AbstractCrudController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

$additionalRouteFolders = ['aggregate', 'ui', 'custom', 'search', 'fileAttachment', 'billHighway', 'looker'];

Route::prefix('v2')->group(function () use ($additionalRouteFolders): void {
    foreach ($additionalRouteFolders as $additionalRouteFolder) {
        foreach (File::allFiles(__DIR__.'/'.$additionalRouteFolder) as $file) {
            if ($file->getExtension() === 'php') {
                require $file->getPathname();
            }
        }
    }

    // Route::get('aft/news', 'HomeController@aftNewsBlockPreRender')->name('aft_news');

    Route::get('{model}', fn(string $model): \Illuminate\Http\Resources\Json\JsonResource => resolveOrFail($model)->all());

    Route::get('{model}/download/{format}/{type}', fn(string $model, string $format, string $type) => resolveOrFail($model)->download($format, $type));

    Route::get('{model}/{id}', fn(string $model, $id): \Illuminate\Http\Resources\Json\JsonResource => resolveOrFail($model)->one($id));

    Route::post('{model}', fn(string $model): \Illuminate\Http\Resources\Json\JsonResource => resolveOrFail($model)->create());

    Route::put('{model}/{id}', fn(string $model, $id): \Illuminate\Http\Resources\Json\JsonResource => resolveOrFail($model)->update($id));

    Route::delete('{model}/{id}', fn(string $model, $id): \Illuminate\Http\Resources\Json\JsonResource => resolveOrFail($model)->delete($id));
});

/**
 * @TODO: move to helpers.
 */
if (! function_exists('resolveOrFail')) {
    function resolveOrFail(string $model): AbstractCrudController
    {
        $modelName = ucfirst($model);

        $controllerClass = "App\\Http\\Controllers\\Custom\\{$modelName}Controller";

        if (! class_exists($controllerClass)) {
            $controllerClass = "App\Http\\Controllers\\{$modelName}Controller";
        }

        return resolve($controllerClass);
    }
}

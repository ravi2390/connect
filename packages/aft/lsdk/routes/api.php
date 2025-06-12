<?php

use Illuminate\Support\Facades\Route;
use Aft\Lsdk\Http\Controllers\LookerController;

Route::prefix('looker/api')->middleware(['api', 'auth:api'])->group(function (): void {
    Route::post('create-embed-url', [LookerController::class, 'createEmbedUrl']);
});

<?php

Route::prefix('api/sisense/')->middleware(['api', 'auth:api'])->group(function (): void {
    Route::get('reports', '\Aft\Sisense\Controllers\SisenseController@reports');
});

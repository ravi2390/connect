<?php

use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware(['web', 'auth', 'admin'])->group(function (): void {
    Route::get('{url?}', fn() => view('admin::admin'))->where('url', '^(?!api|vendor).*$');
});

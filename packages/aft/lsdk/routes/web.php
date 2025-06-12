<?php

use Illuminate\Support\Facades\Route;

Route::prefix('looker')->middleware(['web', 'auth'])->group(function (): void {
    Route::get('{url?}', fn() => view('lsdk::looker'))->where('url', '^(?!api|vendor).*$');
});

<?php

use Illuminate\Support\Facades\Route;

Route::get('{url?}', 'Http\Controllers\ReportController@index')
    ->where('url', '^(?!'.config('ssrs.uri.api').'|vendor).*$');

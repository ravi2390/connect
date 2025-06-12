<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'Http\Controllers\ReportController@index');
Route::get('/options/{path?}', 'Http\Controllers\ReportController@options')
    ->where('path', '[0-9A-Za-z_\/\(\) ]+');
Route::post('/show/{path?}', 'Http\Controllers\ReportController@show')
    ->where('path', '[0-9A-Za-z_\/\(\) ]+');
Route::get('/download/{path?}', 'Http\Controllers\ReportController@download')
    ->where('path', '[0-9A-Za-z_\/\(\) ]+');

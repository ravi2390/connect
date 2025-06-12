<?php

use Illuminate\Support\Facades\Route;

Route::get('{url?}', fn() => view('staffbeta::staff'))->where('url', '^(?!vendor).*$');

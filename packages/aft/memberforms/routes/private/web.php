<?php

use Illuminate\Support\Facades\Route;

Route::get('{url?}', fn() => view('memberforms::private'))->where('url', '^(?!'.config('memberforms.uri.private.api').'|vendor).*$');

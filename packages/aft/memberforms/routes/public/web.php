<?php

use Illuminate\Support\Facades\Route;

Route::get('{url?}', fn() => view('memberforms::public'))->where('url', '^(?!'.config('memberforms.uri.public.api').'|vendor).*$');

<?php

use App\Http\Controllers\Custom;
use Illuminate\Support\Facades\Route;

Route::post('search/affiliate', [Custom\AffiliateSearchController::class, 'search']);

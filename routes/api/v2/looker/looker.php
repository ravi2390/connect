<?php

// use App\Http\Controllers\Looker\LookerController;
use Aft\Lsdk\Http\Controllers\LookerController;
use Illuminate\Support\Facades\Route;

Route::get('looker/embed-url/', [LookerController::class, 'createEmbedUrl']);
Route::get('looker/search-dashboard/', [LookerController::class, 'searchDashboardList']);

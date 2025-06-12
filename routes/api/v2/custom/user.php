<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('user', [UserController::class, 'show']);
Route::post('user/select-entity', [UserController::class, 'setSelectedEntity']);
Route::get('user/affiliate-user-list', [UserController::class, 'getAffiliateUserList']);

<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\Auth\ExpiredPasswordController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

Auth::routes(['register' => false, 'verify' => true]);
Route::middleware('auth')->group(function (): void {
    Route::get('password/expired', [ExpiredPasswordController::class, 'showExpiredForm'])->name('password.expired');
    Route::post('password/expired', [ExpiredPasswordController::class, 'reset'])->name('password.expired.update');
});

Route::middleware('auth')->group(function (): void {
    Route::get('/app/fileuploader', fn() => view('home'));
});

Route::middleware('auth')->group(function (): void {
    Route::get('/{url?}', fn() => view('home'))->where('url', '^(?!admin|api|password|app|public).*$');
    Route::get('public/index', [PublicController::class, 'index']);
});

Route::get('public/{id}', [PublicController::class, 'show']);

Route::fallback(function (Request $request) {
    if (Auth::check()) {
        abort(404);
    }

    return redirect('/login');
});

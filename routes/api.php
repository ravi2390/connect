<?php

use App\Http\Controllers\UserController;
use Aft\MuseApi\Http\Controllers\AffiliateIDsDataController;
use Aft\MuseApi\Http\Controllers\LookupListsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', [UserController::class, 'login'])->name('login_api');

Route::middleware('auth:api')->get('/user', fn(Request $request) => $request->user());


// Define specific muse routes first
Route::prefix('v2/muse')->middleware('client')->group(function (): void {
    // @todo Remove 'getAffiliateIDsData/{id}' once 'getAffiliateIDsData' has replaced it everywhere.
    Route::post('getAffiliateIDsData/{id}', [AffiliateIDsDataController::class, 'postAffiliateIDsDataId'])->name('muse.getAffiliateIDsDataId');
    Route::post('getAffiliateIDsData', [AffiliateIDsDataController::class, 'postAffiliateIDsData'])->name('muse.getAffiliateIDsData');
    Route::post('getLookupLists', [LookupListsController::class, 'postLookupLists'])->name('muse.getLookupLists');

    // Disable all other methods for these endpoints
    Route::match(['get', 'put', 'delete', 'patch', 'options'], 'getAffiliateIDsData/{id}', fn() => response()->json(['error' => 'Method Not Allowed'], 405));

    Route::match(['get', 'put', 'delete', 'patch', 'options'], 'getAffiliateIDsData', fn() => response()->json(['error' => 'Method Not Allowed'], 405));

    Route::match(['get', 'put', 'delete', 'patch', 'options'], 'getLookupLists', fn() => response()->json(['error' => 'Method Not Allowed'], 405));
});

Route::middleware('auth:api')->group(function (): void {
    include 'api/routes.php';
});

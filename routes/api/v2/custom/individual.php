<?php

use App\Http\Controllers\Custom;
use App\Http\Controllers\Custom\IndividualAffiliateController;

Route::get('custom/individual/stop-reasons/{unionRelationshipType}', Custom\StopReasonController::class);
Route::post('custom/individual/trigger-stop-reason/{individualId}/{stopReason}', Custom\TriggerStopReasonController::class);

Route::put('custom/individualaffiliate/{individualId}', Custom\UpdateUnionRelationshipController::class);
Route::put('custom/individualaffiliate/{individualId}/mfpUpdate', Custom\MfpUpdateUnionRelationshipController::class);
Route::put('custom/individualaffiliate/{id}/reactivate', [IndividualAffiliateController::class, 'reactivate']);

<?php

use Aft\Admin\Http\Resources\AbstractResource;
use Illuminate\Support\Facades\Route;

Route::prefix('admin/api/')->middleware(['api', 'auth:api'])->group(function (): void {
    Route::get('content-block', 'Aft\Admin\Http\Controllers\ContentBlockController@index');
    Route::get('active-content-block', 'Aft\Admin\Http\Controllers\ContentBlockController@activeContentBlocks');
    Route::post('content-block/uploadFile', 'Aft\Admin\Http\Controllers\ContentBlockController@uploadFile');
    Route::get('audit', 'Aft\Admin\Http\Controllers\AuditController@indexWithRelations');
    Route::get('audit/search', 'Aft\Admin\Http\Controllers\AuditController@search');
});
Route::get('public-content-block', 'Aft\Admin\Http\Controllers\ContentBlockController@activeContentBlocks');
Route::get('public-release-notes', 'Aft\Admin\Http\Controllers\ReleaseNoteController@activeReleaseNotes');

Route::prefix('admin/api/')->middleware(['api', 'auth:api', 'admin:api'])->group(function (): void {
    Route::apiResource('content-block', \Aft\Admin\Http\Controllers\ContentBlockController::class);
    Route::get('localjobclass/get-individuals-by-jobclass/{id}', 'Aft\Admin\Http\Controllers\LocalJobClassController@getIndividualsByJobclass');

    Route::apiResource('member-form-assign', \Aft\Admin\Http\Controllers\MemberFormController::class);
    Route::apiResource('release-note', \Aft\Admin\Http\Controllers\ReleaseNoteController::class);

    Route::post('affiliate/search', 'Aft\Admin\Http\Controllers\AffiliateController@search');
    Route::post('affiliate/childCount', 'Aft\Admin\Http\Controllers\AffiliateController@getAffiliateChildCount');
    Route::apiResource('affiliate', \Aft\Admin\Http\Controllers\AffiliateController::class);
    Route::apiResource('localjobclass', \Aft\Admin\Http\Controllers\LocalJobClassController::class);
    Route::apiResource('nationaljobclass', \Aft\Admin\Http\Controllers\NationalJobClassController::class);

    Route::get('user/options', 'Aft\Admin\Http\Controllers\UserController@options');
    Route::get('user/abilities/{id?}', 'Aft\Admin\Http\Controllers\UserController@abilities');
    Route::get('user/export', 'Aft\Admin\Http\Controllers\UserController@export');
    Route::get('user/restore/{id}', 'Aft\Admin\Http\Controllers\UserController@restore');
    Route::apiResource('user', \Aft\Admin\Http\Controllers\UserController::class);
    Route::apiResource('form', \Aft\Admin\Http\Controllers\MfpFormController::class);
    Route::post('form/search', 'Aft\Admin\Http\Controllers\MfpFormController@search');
    Route::post('member-form-assign/search', 'Aft\Admin\Http\Controllers\MemberFormController@search');
    Route::get('aggregate/individual/autocomplete', \Aft\Admin\Http\Controllers\AutocompleteController::class);

    Route::get('performance/{context?}/{type?}/{subtype?}', 'Aft\Admin\Http\Controllers\PerformanceLogController@show');

    Route::get('{entity_type}', function ($entity_type) {
        $modelName = 'App\\Models\\'.ucfirst($entity_type);

        return AbstractResource::collection($modelName::paginate());
    });

    Route::get('{entity_type}/{entity_id}', function ($entity_type, $entity_id): \Aft\Admin\Http\Resources\AbstractResource {
        $modelName = 'App\\Models\\'.ucfirst($entity_type);

        return new AbstractResource($modelName::find($entity_id));
    });
});

<?php

use Illuminate\Support\Facades\Route;

Route::get('announcements', 'Http\Controllers\Announcements@index');

Route::post('searchAffiliate', 'Http\Controllers\SearchAffiliateController@search');
Route::get('searchAffiliate/options', 'Http\Controllers\SearchAffiliateController@options');
Route::get('searchAffiliate/officers/options', 'Http\Controllers\SearchAffiliateController@officerOptions');
Route::get('searchAffiliate/officers/{id}', 'Http\Controllers\SearchAffiliateController@officers');
Route::get('searchAffiliate/staff/options', 'Http\Controllers\SearchAffiliateController@staffOptions');
Route::get('searchAffiliate/staff/{id}', 'Http\Controllers\SearchAffiliateController@staff');
Route::get('affiliate/{id}', 'Http\Controllers\SearchAffiliateController@show');

Route::middleware('ability:memberlists')->group(function (): void {
    Route::post('searchIndividual', 'Http\Controllers\SearchIndividualController@search');
    Route::get('searchIndividual/options', 'Http\Controllers\SearchIndividualController@options');
});

Route::middleware('ability:leaderlists')->group(function (): void {
    Route::post('searchCommittee', 'Http\Controllers\SearchCommitteeController@search');
    Route::get('searchCommittee/committees', 'Http\Controllers\SearchCommitteeController@committees');
    Route::get('searchCommittee/options', 'Http\Controllers\SearchCommitteeController@options');
});

Route::get('lists', 'Http\Controllers\ListController@index');
Route::get('lists/{id}/options', 'Http\Controllers\ListController@options');
Route::post('lists/{id}', 'Http\Controllers\ListController@download');

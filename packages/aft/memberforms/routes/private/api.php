<?php

use Illuminate\Support\Facades\Route;

Route::get('/response/{id}', 'Http\Controllers\Admin\FormController@responseIndex');
Route::post('/template', 'Http\Controllers\Admin\TemplateController@index');
Route::get('/template/{id}', 'Http\Controllers\Admin\TemplateController@show');
Route::get('/member-form-assign/{id}', 'Http\Controllers\Admin\TemplateController@memberFormAssign');
Route::get('/has-edues/{id}', 'Http\Controllers\Admin\TemplateController@getHasEdues');

Route::post('/form', 'Http\Controllers\Admin\FormController@index');
Route::get('/form/{id}', 'Http\Controllers\Admin\FormController@show');
Route::get('/view-form/{id}', 'Http\Controllers\Admin\FormController@showForm');
Route::post('/form/create', 'Http\Controllers\Admin\FormController@store');
Route::delete('/form/{id}', 'Http\Controllers\Admin\FormController@delete');
Route::post('/form/clone-to-dataform', 'Http\Controllers\Admin\FormController@cloneToDataForm');
Route::put('/submission/update-dataform-submission', 'Http\Controllers\Admin\FormSubmissionController@updateDataFormSubmission');

Route::post('/submission', 'Http\Controllers\Admin\FormSubmissionController@index');
Route::post('/submissionV2', 'Http\Controllers\Admin\FormSubmissionController@getSubmissionsFromSearch');
Route::get('/submission/{id}', 'Http\Controllers\Admin\FormSubmissionController@show');
Route::get('/edues-submission', 'Http\Controllers\Admin\FormSubmissionController@getEdues');
Route::get('/get-templates', 'Http\Controllers\Admin\TemplateController@getTemplates');
Route::get('/child-affiliates', 'Http\Controllers\Admin\FormSubmissionController@getChildAffiliates');
Route::get('/edues-submission-details/{individualId}/{affiliateId}', 'Http\Controllers\Admin\FormSubmissionController@getEduesDetails');
Route::get('/individual-edues-status/{individualId}', 'Http\Controllers\Admin\FormSubmissionController@getIndividualEduesStatus');
Route::get('/submission-details/{id}', 'Http\Controllers\Admin\FormSubmissionController@getSubmissionData');
Route::post('/submission-update-individual/{id}', 'Http\Controllers\Admin\FormSubmissionController@updateIndividual');
Route::post('/submission-proceed-cope/{id}', 'Http\Controllers\Admin\FormSubmissionController@createIndividualCope');
Route::post('/mark-submission-as-duplicate/{id}', 'Http\Controllers\Admin\FormSubmissionController@markAsDuplicate');
Route::post('/mark-submission-as-cope/{id}', 'Http\Controllers\Admin\FormSubmissionController@markAsCope');
Route::post('/mark-submission-as-notamember/{id}', 'Http\Controllers\Admin\FormSubmissionController@markAsNotAMember');
Route::post('/mark-submission-as-new/{id}', 'Http\Controllers\Admin\FormSubmissionController@markAsNew');
Route::get('/submission/{id}/download', 'Http\Controllers\Admin\FormSubmissionController@download');
Route::post('/submission/download/{format}/{type}', 'Http\Controllers\Admin\FormSubmissionController@downloadCsv');
Route::delete('/submission/{id}', 'Http\Controllers\Admin\FormSubmissionController@delete');
Route::post('/submission/update-payment/{individualId}', 'Http\Controllers\Admin\FormSubmissionController@updatePayment');
Route::post('/submission/update-member-status', 'Http\Controllers\Admin\FormSubmissionController@updateMemberStatus');
Route::get('/submission/has-new-submission-for-dues/{affiliateId}', 'Http\Controllers\Admin\FormSubmissionController@hasNewSubmissionForDues');
Route::get('/resend-email/{id}', 'Http\Controllers\FormController@resendEmail');

Route::post('/search', 'Http\Controllers\Admin\SearchController@search');
Route::get('/search/{type}/{id}', 'Http\Controllers\Admin\SearchController@access');

Route::get('/is-edues-eligible/{id}', 'Http\Controllers\Admin\EDuesEnrollmentController@isSubmissionEligibleForEDues');
Route::post('/edues-enrollment', 'Http\Controllers\Admin\EDuesEnrollmentController@setupBillHighwayProfile');

//URL Redirects
Route::post('/url-redirect', 'Http\Controllers\Admin\UrlRedirectController@index');
Route::post('/url-redirect/create', 'Http\Controllers\Admin\UrlRedirectController@store');
Route::post('/submission-qr-code', 'Http\Controllers\Admin\UrlRedirectController@generateQrCode');
Route::post('/download-qr-code', 'Http\Controllers\Admin\UrlRedirectController@downloadQrCode');
Route::delete('/url-redirect/{id}', 'Http\Controllers\Admin\UrlRedirectController@delete');
//DuesMapping
Route::post('/dues-mapping/create', 'Http\Controllers\Admin\DuesMappingController@store');
Route::post('/create-dues-category', 'Http\Controllers\Admin\DuesMappingController@createDuesCategory');
Route::post('/dues-mapping', 'Http\Controllers\Admin\DuesMappingController@index');
Route::get('/dues-mapping/getBillHighwayBillingTypes/{affiliateId}', 'Http\Controllers\Admin\DuesMappingController@getBillHighwayBillingTypes');
Route::get('/national-per-capita/getNationalPerCapita', 'Http\Controllers\Admin\DuesMappingController@getNationalPerCapita');
//Logo upload
Route::post('/upload-logos', 'Http\Controllers\Admin\SettingController@uploadLogo');
Route::post('/get-logos', 'Http\Controllers\Admin\SettingController@getLogos');
Route::post('/remove-logo', 'Http\Controllers\Admin\SettingController@removeLogo');
//Form Archive
Route::post('/archive-form', 'Http\Controllers\Admin\FormController@archive');
Route::post('/unarchive-form', 'Http\Controllers\Admin\FormController@unarchive');

Route::get('/test/sources', 'Http\Controllers\Admin\FormSourcesController@index');

Route::get('/debug/get-debug-info', 'Http\Controllers\Admin\DebugInfo@getDebugInfo');

<?php

use Illuminate\Support\Facades\Route;

Route::get('/state', 'Http\Controllers\FormController@stateIndex');
Route::get('/state/{state}', 'Http\Controllers\FormController@index');
Route::get('/countries', 'Http\Controllers\FormController@getCountries');
Route::get('/form/{id}', 'Http\Controllers\FormController@show');
Route::post('/form/{id}', 'Http\Controllers\FormController@store');
Route::put('/update-submission/{id}', 'Http\Controllers\FormController@updateSubmissionData');
Route::get('/update-existing-individual/{id}/{IndividualId}/{status}', 'Http\Controllers\FormController@updateExistingIndividual');
Route::post('/form-url/get-form-id-custom-url', 'Http\Controllers\FormController@getFormIdByCustomUrl');
Route::post('/search', 'Http\Controllers\SearchController@search');
Route::get('/search/{type}/{id}', 'Http\Controllers\SearchController@access');
Route::get('/recaptcha/get-info', 'Http\Controllers\Captcha\ReCaptchaController@getInfo');
Route::post('/recaptcha/create-assessment', 'Http\Controllers\Captcha\ReCaptchaController@createAssessment');
Route::get('/mathcaptcha/get-info', 'Http\Controllers\Captcha\MathCaptchaController@getInfo');
Route::get('/mathcaptcha/generate', 'Http\Controllers\Captcha\MathCaptchaController@generate');

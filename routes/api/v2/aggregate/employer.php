<?php

use App\Http\Controllers\Aggregates;

Route::get('aggregate/employer/jobtitle/{id}', Aggregates\Employer\JobTitleController::class);
Route::get('aggregate/employer/contactinformation/{id}', Aggregates\Employer\ContactInformationController::class);
Route::get('aggregate/employer/byaffiliate/{id}', Aggregates\Employer\ByAffiliateController::class);
Route::get('aggregate/employer/units/{employerId}', Aggregates\Employer\UnitController::class);
Route::get('aggregate/employer/localjobclass/{id}', Aggregates\Employer\JobClassController::class);
Route::get('aggregate/employer/worklocation/{employer}', Aggregates\Employer\WorkLocationController::class);
Route::get('aggregate/employer/workstructure/{employer}', Aggregates\Employer\WorkStructureController::class);

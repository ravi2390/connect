<?php

use App\Http\Controllers\Custom\LocalDuesCategoryController;

Route::get('custom/localduescategory/byunionrelationshiptype/{unionRelationshipType}', [LocalDuesCategoryController::class, 'getByUnionRelationshipType']);
Route::get('custom/localduescategory/byunionrelationshiptype/{unionRelationshipType}/{IndividualId}', [LocalDuesCategoryController::class, 'getByUnionRelationshipType']);
Route::get('custom/localduescategory/byunionrelationshiptypewithfrequency/{unionRelationshipType}', [LocalDuesCategoryController::class, 'getByUnionRelationshipTypeWithPaymentFrequency']);

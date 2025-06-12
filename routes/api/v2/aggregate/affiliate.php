<?php

use App\Http\Controllers\Aggregates;

Route::get('aggregate/affiliate/detail/{id}', Aggregates\Affiliate\DetailController::class);
Route::get('aggregate/affiliate/staff/{id}', Aggregates\Affiliate\StaffController::class);
Route::get('aggregate/affiliate/summary/{id}', Aggregates\Affiliate\SummaryController::class);
Route::get('aggregate/affiliate/unit/{id}', Aggregates\Affiliate\UnitController::class);
Route::get('aggregate/affiliate/user', Aggregates\Affiliate\UserAffiliateController::class);
Route::get('aggregate/affiliate/unioncount/{id}', Aggregates\Affiliate\UnionCountController::class);
Route::get('aggregate/affiliate/search', Aggregates\Affiliate\SearchController::class);
Route::get('aggregate/affiliate/localduescategory/{id}', Aggregates\Affiliate\LocalDuesCategoryController::class);
Route::get('aggregate/affiliate/unionrelationshiptype/', Aggregates\Affiliate\UnionRelationshipTypeController::class);

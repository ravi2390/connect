<?php

use App\Http\Controllers\Aggregates;
use Illuminate\Support\Facades\Route;

Route::get('aggregate/individual/search', Aggregates\Individual\SearchController::class);
Route::get('aggregate/individual/unionroles/{id}', Aggregates\Individual\UnionRolesController::class);
Route::get('aggregate/individual/autocomplete', Aggregates\Individual\AutocompleteController::class);
Route::get('aggregate/individual/unionRelationshipType/{id}', Aggregates\Individual\UnionRelationshipController::class);
Route::get('aggregate/individual/individualQuickComment/{id}', Aggregates\Individual\IndividualQuickCommentController::class);
Route::get('aggregate/individual/lastAction/{id}', Aggregates\Individual\LastActionController::class);
Route::get('aggregate/individual/action/{id}', Aggregates\Individual\ActionController::class);
Route::get('aggregate/individual/memberlogin/{id}', Aggregates\Individual\MemberController::class);
Route::post('aggregate/individual/sendEmail/{id}', [Aggregates\Individual\MemberController::class, 'sendEmail']);

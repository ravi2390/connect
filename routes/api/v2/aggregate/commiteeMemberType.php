<?php

use App\Http\Controllers\Aggregates;

Route::get('aggregate/committee-member-type/list', Aggregates\Committee\CommitteeMemberTypeListController::class);

<?php

use App\Http\Controllers\Search;

Route::get('search/employer/{id}/{term}', Search\EmployerController::class);

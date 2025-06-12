<?php

use App\Http\Controllers\UI;

Route::get('ui/component/{model}/{key?}', UI\ComponentController::class);
Route::post('ui/component/{model}/{key}', UI\SaveUserConfigurationController::class);

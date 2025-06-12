<?php

namespace App\Http\Controllers\UI;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class ComponentController
 */
class SaveUserConfigurationController extends AbstractUiController
{
    public function __invoke(Request $request, string $model, string $key): JsonResponse
    {
        return $this->saveUserConfiguration($request, $model, $key);
    }
}

<?php

namespace App\Http\Controllers\UI;

use App\Http\Controllers\Controller;
use App\Models\ComponentState;
use App\UI\Provider\Facade\ConfigurationProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AbstractUiController extends Controller
{
    public function configuration(Request $request, string $model, string $key): JsonResponse
    {
        /**
         * @var ConfigurationProvider $provider
         */
        $provider = resolve(ConfigurationProvider::class);

        return new JsonResponse($provider->provide($model, $key));
    }

    public function saveUserConfiguration(Request $request, string $model, string $key): JsonResponse
    {
        /**
         * @var ComponentState $state
         */
        ComponentState::where('model', $model)
            ->where('user_id', auth()->user()->id)
            ->update(['is_default' => false]);
        $state = ComponentState::firstOrNew([
            'component_key' => $key,
            'model' => $model,
            'user_id' => auth()->user()->id,
        ]);

        $settingsKey = $request->input('settings-key');
        $settings = $request->input('settings', []);
        $currentSettings = $state->settings ?? [];

        if ($settingsKey && $settings) {
            $currentSettings[$settingsKey] = $settings;
            $state->settings = $currentSettings;
        }

        $state->is_default = true;
        $state->save();

        $currentSettings['selectedPreset'] = $key;

        return new JsonResponse($currentSettings);
    }
}

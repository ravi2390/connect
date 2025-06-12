<?php

namespace App\UI\Provider\Decorator;

use App\Models\ComponentState;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserSavedConfiguration
 */
class UserSavedConfiguration implements ConfigurationDecorator
{
    public function decorate(array $configuration, string $model, string $key): array
    {
        $configuration['presets'] = ComponentState::query()->where('model', $model)->where('user_id', Auth::user()->id)->orderBy('updated_at', 'desc')->get(['component_key', 'is_default']);
        if (empty($key) && $configuration['presets'] && $configuration['presets']->count()) {
            $is_default = $this->getDefaultPreset($configuration);
            if ($is_default) {
                $firstPreset = $is_default;
            } else {
                $firstPreset = $configuration['presets']->first();
            }
            $key = $firstPreset['component_key'];
        }
        $configuration['selectedPreset'] = $key;

        /**
         * @var ComponentState $state
         */
        $state = ComponentState::query()->where('model', $model)->where('component_key', $key)->where('user_id', Auth::user()->id)->first();

        if ($state) {
            $settings = $state->settings;

            if (isset($settings['fields'], $configuration['fields'])) {
                foreach ($settings['fields'] as $fieldConfig) {
                    $configuration = $this->updateFieldSettings($fieldConfig, $configuration, 'fields', 'value');
                }
            }
            if (isset($settings['filters'], $configuration['filters'])) {
                foreach ($settings['filters'] as $fieldConfig) {
                    $configuration = $this->updateFieldSettings($fieldConfig, $configuration, 'filters', 'name');
                }
            }
        }

        return $configuration;
    }

    protected function getDefaultPreset(array $configuration)
    {
        foreach ($configuration['presets'] as $preset) {
            if ($preset['is_default']) {
                return $preset;
            }
        }

        return false;
    }

    protected function updateFieldSettings(array $fieldConfig, array $configuration, string $configurationKey, string $configurationFieldName): array
    {
        foreach ($configuration[$configurationKey] as &$configurationItem) {
            if ($configurationItem[$configurationFieldName] === $fieldConfig['value']) {
                $configurationItem['visible'] = $fieldConfig['visible'];
                break;
            }
        }

        return $configuration;
    }
}

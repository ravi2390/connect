<?php

namespace App\UI\Provider\Decorator;

/**
 * Class PreloadedConfiguration
 */
class PreloadedConfiguration implements ConfigurationDecorator
{
    public function decorate(array $configuration, string $model, string $key): array
    {
        return $configuration;
    }
}

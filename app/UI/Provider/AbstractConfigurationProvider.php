<?php

namespace App\UI\Provider;

/**
 * Class AbstractConfigurationProvider
 */
abstract class AbstractConfigurationProvider
{
    abstract public function provide(string $model, string $key): array;
}

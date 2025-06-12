<?php

namespace App\UI\Provider\Decorator;

interface ConfigurationDecorator
{
    public function decorate(array $configuration, string $model, string $key): array;
}

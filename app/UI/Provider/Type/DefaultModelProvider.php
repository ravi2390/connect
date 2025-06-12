<?php

namespace App\UI\Provider\Type;

use App\Exceptions\UIDataProviderException;
use App\UI\Provider\AbstractConfigurationProvider;

class DefaultModelProvider extends AbstractConfigurationProvider
{
    public function provide(string $model, string $key): array
    {
        return $this->resolveDataFile($model)->provide($model, $key);
    }

    private function resolveDataFile(string $model): AbstractConfigurationProvider
    {
        $defaultNamespace = 'App\\UI\\Data\\Fields\\';

        $providerClass = $defaultNamespace.'Override\\'.ucfirst($model);

        if (! class_exists($providerClass)) {
            $providerClass = $defaultNamespace.ucfirst($model);
        }

        if (! class_exists($providerClass)) {
            throw new UIDataProviderException('Could not find provider for model: '.$model);
        }

        return new $providerClass;
    }
}

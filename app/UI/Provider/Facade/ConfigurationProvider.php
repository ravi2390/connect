<?php

namespace App\UI\Provider\Facade;

use App\UI\Provider\AbstractConfigurationProvider;
use App\UI\Provider\Decorator\PreloadedConfiguration;
use App\UI\Provider\Decorator\UserSavedConfiguration;
use App\UI\Provider\Type\DefaultModelProvider;
use Illuminate\Http\Request;

class ConfigurationProvider extends AbstractConfigurationProvider
{
    public function __construct(private readonly DefaultModelProvider $defaultProvider, private readonly UserSavedConfiguration $savedConfigurationDecorator, private readonly PreloadedConfiguration $preloadedConfigurationDecorator, private readonly Request $request)
    {
    }

    public function provide(string $model, string $key): array
    {
        $data = $this->defaultProvider->provide($model, $key);

        return $this->preloadedConfigurationDecorator->decorate(
            $this->savedConfigurationDecorator->decorate($data, $model, $key),
            $model,
            $key
        );
    }
}

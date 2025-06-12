<?php

namespace App\UI\Provider;

class Field
{
    /**
     * @var string
     */
    protected $key;

    /**
     * @var string
     */
    protected $modelName;

    public function setKey(string $key): Field
    {
        $this->key = $key;

        return $this;
    }

    public function setModelName(string $modelName): Field
    {
        $this->modelName = $modelName;

        return $this;
    }
}

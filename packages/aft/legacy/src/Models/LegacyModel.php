<?php

namespace Aft\Legacy\Models;

/**
 * Base class for our legacy database models.
 */
class LegacyModel
{
    public function __construct(protected \stdClass $attributes)
    {
    }

    /**
     * Dynamically retrieve attributes on the model.
     *
     * @param  string  $key
     * @return mixed
     */
    public function __get($key)
    {
        return $this->attributes->$key ?? null;
    }

    /**
     * Dynamically check existence of attributes on the model.
     *
     * @param  string  $key
     * @return bool
     */
    public function __isset($key)
    {
        return isset($this->attributes->$key);
    }
}

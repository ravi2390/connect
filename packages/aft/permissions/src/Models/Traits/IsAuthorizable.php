<?php

namespace Aft\Permissions\Models\Traits;

use Aft\Permissions\Scopes\AuthorizationScope;
use Illuminate\Database\Eloquent\Builder;

trait IsAuthorizable
{
    public static $isAuthorizable = true;

    public static function bootIsAuthorizable(): void
    {
        static::addGlobalScope(new AuthorizationScope());
    }

    public function getAuthorizableModel()
    {
        return $this;
    }

    public function buildAuthorizationQuery(Builder $builder, array $ids): void
    {
        $builder->whereIn($this->getTable().'.'.$this->getKeyName(), $ids);
    }
}

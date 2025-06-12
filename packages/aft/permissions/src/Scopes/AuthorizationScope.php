<?php

namespace Aft\Permissions\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthorizationScope implements Scope
{
    public function __construct(private $modelOverride = null, private $keyOverride = null)
    {
    }

    public function apply(Builder $builder, Model $model): void
    {

        $model = $this->modelOverride ?? $model;
        $keyName = $this->keyOverride ?? $model->getKeyName();

        // TODO: this does not yet honor global authorization overrides.
        // I.e. If you have at least one direct global authorization ('*') then
        // you have that authorization for all models regardless if you have
        // another direct authorization to a specific model.

        $authList = Auth::user()->getUserAuthorizationList($model->getAuthorizableModel());

        if (empty($authList)) {
            //$builder->where('true', '=', 'false');
            //abort(403);
            //return;
            $authList = [];
        }

        // get the last authorization for global access. if someone accidently
        // adds an earlier direct global authorizations we should honor the order
        $lastGlobalAuth = Arr::last($authList, fn($value, $key): bool => $key === '*');

        // TODO: I'm not convinced the viewAny ability makes sense, but works for now
        if ($lastGlobalAuth['role']['ability_base']['viewAny'] ?? false) {
            return;
        }

        $ids = array_keys($authList);

        if ($keyName == 'owner_id') {
            $builder->whereIn($keyName, $ids);
        } else {
            $model->buildAuthorizationQuery($builder, $ids);
        }
    }
}

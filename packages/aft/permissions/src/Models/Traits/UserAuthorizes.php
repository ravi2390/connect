<?php

namespace Aft\Permissions\Models\Traits;

use Aft\DataModel\AftDataModel;
use Aft\Permissions\Models\Authorization;
use Aft\Permissions\Scopes\AuthorizationScope;
use Illuminate\Support\Arr;

trait UserAuthorizes
{
    use UserCache;

    protected $userAuthScope = 'authorizations';

    /**
     * Recursively examine all children of a given model and inherit the authorization
     */
    private function getUserAuthorizationInherits(AftDataModel $model, int $entity_id, array $baseAuth, array &$authorizations): void
    {
        $children = $model::withoutGlobalScope(AuthorizationScope::class)
            ->find($entity_id)
            ->children()
            ->withoutGlobalScope(AuthorizationScope::class)
            ->get($model->getKeyName());
        foreach ($children as $child) {
            // the reason a new object is built instead of constructing an array
            // is so future changes to the model will be enforced and not forgotten
            $inheritAuth = new Authorization();
            $inheritAuth->forceFill($baseAuth);
            unset($inheritAuth->id); // if this ever needs to be saved to the db then it can't have a dupe id
            $inheritAuth->entity_id = $child->AffiliateId;
            $inheritAuth = $inheritAuth->toArray();
            $authorizations[$inheritAuth['entity_id']] = $inheritAuth;
            $this->getUserAuthorizationInherits($model, $inheritAuth['entity_id'], $inheritAuth, $authorizations);
        }
    }

    /**
     * Build a list of authorizations for a given model type
     *
     *
     * @return array
     */
    public function getUserAuthorizationList(AftDataModel $model)
    {
        $modelName = $model::class;
        $authorizations = $this->userCacheGet($this->userAuthScope, $modelName);
        // if not cached, rebuild full authorization list for a given model
        if (empty($authorizations)) {
            $directAuthorization = $this->authorizations()
                ->where('entity_type', '=', $modelName)
                ->orderBy('order')
                ->get()
                ->toArray();
            foreach ($directAuthorization as $authKey => $auth) {
                if ($auth['entity_id'] === 0) {
                    $authOverride = new Authorization();
                    $authOverride->forceFill($auth);
                    unset($authOverride->id);
                    $authOverride = $authOverride->toArray();
                    $authOverride['entity_id'] = '*';
                    $authorizations[$authOverride['entity_id']] = $authOverride;
                    unset($directAuthorization[$authKey]);
                }
            }
            foreach ($directAuthorization as $auth) {
                $authorizations[$auth['entity_id']] = $auth;
                if ($auth['entity_inherit']) {
                    $this->getUserAuthorizationInherits($model, $auth['entity_id'], $auth, $authorizations);
                }
            }
            // cache the full authorization list
            $this->userCachePut($this->userAuthScope, $modelName, $authorizations);
        }

        return $authorizations;
    }

    /**
     * Destroy all authorization lists regardless of model
     */
    public function flushUserAuthorizationList(): void
    {
        $this->userCacheFlush($this->userAuthScope);
    }

    /**
     * Directly authorize an ability on a specific model
     *
     * @return bool|mixed
     */
    public function getUserAuthorization(string $ability, string $entity_type, int $entity_id)
    {
        $authList = $this->getUserAuthorizationList(new $entity_type);
        if ($authList && ! array_key_exists($entity_id, $authList)) {
            $lastGlobalAuth = Arr::last($authList, fn($value, $key): bool => $key === '*');

            return $lastGlobalAuth['role']['ability_base'][$ability] ?? false;
        }

        return $authList[$entity_id]['role']['ability_base'][$ability] ?? false;
    }

    public function authorizations()
    {
        return $this->hasMany(Authorization::class, 'user_id', 'id');
    }
}

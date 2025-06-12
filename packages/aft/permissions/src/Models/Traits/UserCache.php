<?php

namespace Aft\Permissions\Models\Traits;

use Illuminate\Support\Facades\Cache;

trait UserCache
{
    /**
     * @var string The current user's cache root key
     */
    protected $userCacheRootKey;

    /**
     * @var string Key name for the array holding all other keys in the scope
     */
    protected $userCacheScopeKeys = '__keys';

    /**
     * Ensure that cache TTL is always something reasonable and will always expire
     *
     * @param  null  $ttl  In seconds
     * @return int
     */
    protected function userCacheTTL($ttl = null): int|float
    {
        if (is_null($ttl)) {
            // SESSION_LIFETIME is in minutes so we multiply by 60 to get ttl in seconds
            $ttl = env('SESSION_LIFETIME', 120) * 60;
        }

        return $ttl;
    }

    /**
     * Build a fully qualified cache key from the $scope and $key
     * NOTE: $scope and $key are not checked for colons (:). Redis treats colons
     *       as branch separators. Care should be taken to remember scopes and
     *       keys with colons are not treated hierarchically in this trait.
     * TODO: This trait would me much cooler if it used scopes and keys with colons recursively
     *
     * @param  string  $scope
     * @param  string  $key
     * @return string
     */
    protected function userCacheKey($scope, $key): string
    {
        $root = $this->userCacheRootKey ?? ($this->userCacheRootKey = 'users:'.$this->getAuthIdentifier());
        // array_filter removes possible null $scope
        $key = implode(':', array_filter([$root, $scope, $key]));

        return $key;
    }

    /**
     * Add a value to the user cache
     *
     * @param  string  $scope
     * @param  string  $key
     * @param  mixed  $value
     * @param  null  $ttl
     */
    public function userCachePut($scope, $key, $value, $ttl = null): void
    {
        // fixup null $ttl
        $ttl = $this->userCacheTTL($ttl);

        // add scope name to the root key store
        $keys = Cache::get($this->userCacheKey(null, $this->userCacheScopeKeys)) ?? [];
        if (! in_array($scope, $keys)) {
            $keys[] = $scope;
        }
        Cache::put($this->userCacheKey(null, $this->userCacheScopeKeys), $keys, $ttl);

        // add key name to the scope key store
        $keys = Cache::get($this->userCacheKey($scope, $this->userCacheScopeKeys)) ?? [];
        if (! in_array($key, $keys)) {
            $keys[] = $key;
        }
        Cache::put($this->userCacheKey($scope, $this->userCacheScopeKeys), $keys, $ttl);

        // actually add the value to the cache
        Cache::put($this->userCacheKey($scope, $key), $value, $ttl);
    }

    /**
     * Get a value from the user cache
     *
     * @param  string  $scope
     * @param  string  $key
     * @return mixed
     */
    public function userCacheGet($scope, $key)
    {
        return Cache::get($this->userCacheKey($scope, $key));
    }

    /**
     * Flush all cached values within a scope
     *
     * @param  string  $scope
     */
    public function userCacheFlush($scope): void
    {
        // walk through each key name in the scope key store and forget it
        $keys = Cache::get($this->userCacheKey($scope, $this->userCacheScopeKeys)) ?? [];
        foreach ($keys as $key) {
            Cache::forget($this->userCacheKey($scope, $key));
        }
        // remove the scope key store
        Cache::forget($this->userCacheKey($scope, $this->userCacheScopeKeys));

        // remove the key name from the root key store
        $keys = Cache::get($this->userCacheKey(null, $this->userCacheScopeKeys)) ?? [];
        if (($key = array_search($scope, $keys)) !== false) {
            unset($keys[$key]);
        }
        // remove the root key store if empty
        if (empty($keys)) {
            Cache::forget($this->userCacheKey(null, $this->userCacheScopeKeys));
        } else {
            Cache::put($this->userCacheKey(null, $this->userCacheScopeKeys), $keys, $this->userCacheTTL());
        }
    }
}

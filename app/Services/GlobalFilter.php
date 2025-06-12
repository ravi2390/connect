<?php

namespace App\Services;

use Illuminate\Support\Arr;

class GlobalFilter
{
    const SCOPE_GLOBAL = 'global';

    const SCOPE_LOCAL = 'local';

    public function getAffiliateIds(): array
    {
        if (! app()->runningInConsole()) {
            return Arr::wrap(request('affiliates', []));
        }

        return [];
    }

    public function isApplicable(): bool
    {
        if (request('scope', self::SCOPE_LOCAL) === self::SCOPE_GLOBAL || count(Arr::wrap(request('affiliates', []))) === 0) {
            return false;
        }

        return true;
    }
}

<?php

namespace Aft\DataModel;

use Aft\Audit\Auditable;
use App\Scopes\AffiliateScope;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class AftDataModel extends Model
{
    use Auditable;

    #[\Override]
    protected static function boot()
    {
        parent::boot();

        static::$snakeAttributes = false;

        static::addGlobalScope(new AffiliateScope());
    }

    protected function asDateTime($value)
    {
        $value = preg_replace('/\.[0-9]+$/', '', (string) $value);

        return parent::asDateTime(Carbon::parse($value));
    }
}

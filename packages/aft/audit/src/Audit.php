<?php

namespace Aft\Audit;

use Aft\Permissions\Scopes\AuthorizationScope;
use App\Models\Affiliate;
use App\Scopes\AffiliateScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Audit extends Model
{
    /**
     * {@inheritdoc}
     */
    protected $guarded = [];

    protected $connection = 'aftdb';

    protected $table = 'laravel_audits';

    /**
     * {@inheritdoc}
     */
    protected $casts = [
        'old_values' => 'json',
        'new_values' => 'json',
    ];

    protected $with = [
        'user',
        'owner',
        'auditable',
    ];

    protected $hidden = [
        'user_type', 'user_id', 'owner_type', 'owner_id',
    ];

    #[\Override]
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('owner_type', function (Builder $builder): void {
            $builder->where('owner_type', '=', \App\Models\Affiliate::class);
        });
        static::addGlobalScope(new AuthorizationScope(new Affiliate(), 'owner_id'));
    }

    public function getEventAttribute($value): string
    {
        switch ($value) {
            case 'retrieved':
                $value = 'retrieved';
                break;
            case 'creating':
                $value = 'created';
                break;
                //case 'created':   $value = 'created'; break;
            case 'updating':
                $value = 'updated';
                break;
                //case 'updated':   $value = 'updated'; break;
            case 'saving':
                $value = 'saved';
                break;
                //case 'saved':     $value = 'saved'; break;
            case 'deleting':
                $value = 'deleted';
                break;
                //case 'deleted':   $value = 'deleted'; break;
            case 'restoring':
                $value = 'restored';
                break;
                //case 'restored':  $value = 'restored'; break;
        }

        return ucfirst((string) $value);
    }

    public function user(): MorphTo
    {
        return $this->setConnection('sqlsrv')->morphTo();
    }

    public function owner(): MorphTo
    {
        return $this->setConnection('aftdb')->morphTo()->withoutGlobalScope(AffiliateScope::class);
    }

    public function auditable(): MorphTo
    {
        return $this->setConnection('aftdb')->morphTo()->withoutGlobalScope(AffiliateScope::class);
    }
}

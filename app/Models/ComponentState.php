<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ComponentState
 *
 * @property string $component_key
 * @property string $model
 * @property User $user
 * @property array $settings
 */
class ComponentState extends Model
{
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getSettingsAttribute(?string $settings): ?array
    {
        return json_decode((string) $settings, true);
    }

    public function setSettingsAttribute(array $settings): void
    {
        $this->attributes['settings'] = json_encode($settings);
    }
}

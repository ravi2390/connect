<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProfile extends Model
{
    use SoftDeletes;

    const DELETED_AT = 'DeletedAt';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'profile_id', 'id');
    }

    public function selected(): MorphTo
    {
        return $this->morphTo('selected_entity');
    }

    public function setSelectedEntityAttribute(array $value): void
    {
        $this->selected_entity_type = $value['entity_type'];
        $this->selected_entity_id = $value['entity_id'];
    }

    public function getSelectedEntityAttribute(): ?array
    {
        if (empty($this->selected_entity_type) || empty($this->selected_entity_id)) {
            return null;
        }

        return [
            'entity_type' => $this->selected_entity_type,
            'entity_id' => $this->selected_entity_id,
        ];
    }
}

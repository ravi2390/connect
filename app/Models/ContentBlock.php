<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContentBlock extends Model
{
    use SoftDeletes;

    protected $connection = 'sqlsrv';

    protected $table = 'content_blocks';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $appends = [
        'url',
        'expanded',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    // TODO: remove all this once datetime is no longer different across tables
    protected function asDateTime($value)
    {
        $value = preg_replace('/\.[0-9]+$/', '', (string) $value);

        return parent::asDateTime($value);
    }

    public function getUrlAttribute()
    {
        if ($this->application == 'public') {
            return url('public/'.$this->id);
        }

        return null;
    }

    public function getExpandedAttribute(): int
    {
        return 0;
    }
}

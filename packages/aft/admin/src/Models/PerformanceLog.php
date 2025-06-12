<?php

namespace Aft\Admin\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class PerformanceLog extends Model
{
    public $timestamps = false;

    protected $guarded = [];

    public function getCreatedAtAttribute(\DateTimeInterface|\Carbon\WeekDay|\Carbon\Month|string|int|float|null $value): string
    {
        return Carbon::parse($value)->roundMinute()->format($this->getDateFormat());
    }

    public function getValueAttribute($value): float
    {
        return round($value, 2);
    }
}

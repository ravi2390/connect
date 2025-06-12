<?php

namespace Aft\StaffBeta\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AffiliatePerCapita extends Model
{
    use SoftDeletes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    protected $connection = 'aftdb';

    protected $table = 'AffiliatePerCapita';

    protected $primaryKey = 'AffiliatePerCapitaId';

    public $incrementing = true;

    protected $keyType = 'integer';

    public $timestamps = true;

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $with = [
    ];

    protected $appends = [
        'FiscalYearEnd',
    ];

    protected $visible = [
        'FiscalYearEnd',
        'HasCope',
    ];

    protected $casts = [
        'HasCope' => 'boolean',
    ];

    protected function asDateTime($value)
    {
        $value = preg_replace('/\.[0-9]+$/', '', (string) $value);

        return parent::asDateTime(Carbon::parse($value));
    }

    #[\Override]
    protected static function boot()
    {
        parent::boot();
        static::$snakeAttributes = false;
    }

    public function getFiscalYearEndAttribute(): string
    {
        $fye = DateTime::createFromFormat('!m d', $this->FiscalYearEndMonth.' '.$this->FiscalYearEndDay);
        if (! $fye) {
            return 'n/a';
        }

        return $fye->format('F jS');
    }
}

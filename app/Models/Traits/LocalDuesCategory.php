<?php

namespace App\Models\Traits;

use App\Models\PaymentFrequency;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait LocalDuesCategory
{
    public function PaymentFrequency(): HasOne
    {
        return $this->hasOne(PaymentFrequency::class, 'PaymentFrequencyId', 'PaymentFrequencyId');
    }
}

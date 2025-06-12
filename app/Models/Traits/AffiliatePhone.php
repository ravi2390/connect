<?php

namespace App\Models\Traits;

trait AffiliatePhone
{
    public function getFullPhoneAttribute($value): string
    {
        return $this->PhoneNumber.($this->Extension ? '-'.$this->Extension : '');
    }
}

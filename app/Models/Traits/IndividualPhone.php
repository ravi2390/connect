<?php

namespace App\Models\Traits;

trait IndividualPhone
{
    public function getFullPhoneAttribute($value): string
    {
        return (isset($this->Country->CountryCallingCode) ? '+'.$this->Country->CountryCallingCode.' ' : '').$this->PhoneNumber.($this->Extension ? '-'.$this->Extension : '');
    }
}

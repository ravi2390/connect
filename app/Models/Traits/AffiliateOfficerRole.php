<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Auth;

trait AffiliateOfficerRole
{
    public function toArray()
    {
        $this->setAttributeVisibility();

        return parent::toArray();
    }

    protected static function boot()
    {
        parent::boot();

        self::deleting(function ($modal): void {
            $modal->UpdatedBy = Auth::user()->id;
            $modal->save();
        });
    }

    public function setAttributeVisibility(): void
    {
        $this->makeVisible(array_merge($this->fillable, $this->appends, ['OfficerRoleTitleId']));
    }
}

<?php

namespace App\Models\Traits;

use App\Models\Employer;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait Chapter
{
    public function employer(): HasMany
    {
        return $this->hasMany(Employer::class, 'ChapterId', 'ChapterId');
    }

    public function nonStructuralEmployer(): HasMany
    {
        return $this->employer()->where('Employer.IsStructural', false);
    }
}

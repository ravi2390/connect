<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReleaseNote extends Model
{
    use SoftDeletes;

    protected $connection = 'sqlsrv';

    protected $table = 'release_notes';

    protected $primaryKey = 'id';

    public $incrementing = true;

    public $timestamps = true;

    public $guarded = [];
}

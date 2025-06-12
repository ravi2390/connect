<?php

namespace Aft\Legacy\Models;

class LeadershipPosition extends LegacyModel
{
    protected $table = 'LeadershipPosition';

    protected $primaryKey = 'LeadershipPositionId';

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $dates = [
        'cdate',
        'mdate',
    ];
}

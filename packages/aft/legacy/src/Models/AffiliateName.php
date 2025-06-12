<?php

namespace Aft\Legacy\Models;

class AffiliateName extends LegacyModel
{
    protected $table = 'AffiliateName';

    protected $primaryKey = 'AffiliateId';

    public $incrementing = false;

    protected $keyType = 'uuid';

    protected $dates = [
        'cdate',
        'mdate',
    ];
}

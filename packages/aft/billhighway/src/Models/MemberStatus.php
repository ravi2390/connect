<?php

namespace Aft\BillHighway\Models;

// Comments will be removed once implementation is complete. Record keeping.
/*
Following values provided by Dylan Smith (BillHighway) in MS Team Chat during AFT/BH meeting
Expected member status values:
A      = Active status
A-MP     = Active - manual payment
I       = Inactive status
*/
class MemberStatus
{
    public const Active = 'A';

    public const RetireeActive = 'RA';

    public const ActiveManualPayment = 'A-MP';

    public const Inactive = 'I';

    public const RetireeInactive = 'RI';
}

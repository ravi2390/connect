<?php

namespace Aft\BillHighway\Models;

// Comments will be removed once implementation is complete. Record keeping.
/*
Following values provided by Dylan Smith (BillHighway) in MS Team Chat during AFT/BH meeting
Expected member TYPE values:
    A   = Active
    I   = Inactive
    Member   = Looks like a default member type
    NM   =  Non Member.
*/
class MemberType
{
    public const Member = 'Member';

    public const NonMember = 'NM';

    public const Active = 'A';

    public const Inactive = 'I';
}

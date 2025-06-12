<?php

namespace Aft\BillHighway\Models;

class Individual
{
    public ?string $BillHighwayIndividualId = null;

    public ?string $AftIndividualGuid = null;

    public ?string $FirstName = null;

    public ?string $MiddleName = null;

    public ?string $LastName = null;

    public ?string $Phone = null;

    public ?string $Email = null;

    public Address $Address;

    public ?string $AftMemberId = null;

    public ?string $MemberStatus = null;

    public ?string $MemberType = null;
}

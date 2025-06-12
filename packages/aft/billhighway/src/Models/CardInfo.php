<?php

namespace Aft\BillHighway\Models;

class CardInfo
{
    public ?string $NameOnCard = null;

    public ?string $CardNumber = null;

    public ?string $ExpMonth = null;

    public ?string $ExpYear = null;

    public ?string $Cvv = null;

    public Address $Address;

    public ?string $CardType = null; //Introduced for RefNumber implementation - VISA, MC, AMEX, DISC
}

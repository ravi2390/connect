<?php

namespace Aft\BillHighway;

use Aft\BillHighway\Helpers\UUID;
use Aft\BillHighway\Models\AchInfo;
use Aft\BillHighway\Models\Address;
use Aft\BillHighway\Models\CardInfo;

class Payment extends BaseBillHighway
{
    public function __construct()
    {
    }

    public static function GetPaymentTokenForACH(string $GroupId, AchInfo $AchInfo): mixed
    {
        $configSecurePayments = config('billhighway.endpoints.securePayments');
        $data = (object) [];
        $data->Amount = 0;
        $data->AchInfo = $AchInfo;
        $data->ReferenceIds = [[
            'Type' => 'ChapterId',
            'Value' => $GroupId,
        ]];

        return self::getResponseFromBillHighway(
            'securePayments',
            'POST',
            $configSecurePayments['apis']['GetPaymentToken'],
            $data
        );
    }

    public static function GetPaymentTokenForCreditCard(string $GroupId, CardInfo $CardInfo): mixed
    {
        $configSecurePayments = config('billhighway.endpoints.securePayments');
        $data = (object) [];
        $data->Amount = 0;
        $data->CardInfo = $CardInfo;
        $data->ReferenceIds = [[
            'Type' => 'ChapterId',
            'Value' => $GroupId,
        ]];

        return self::getResponseFromBillHighway(
            'securePayments',
            'POST',
            $configSecurePayments['apis']['GetPaymentToken'],
            $data
        );
    }

    public static function MapPaymentTokenToIndividual(string $GroupId, string $AftIndividualGuid, string $PaymentToken, $LoggingParams = null): mixed
    {
        $configConnect = config('billhighway.endpoints.connect');
        $data = (object) [];
        $data->Token = $PaymentToken;

        return self::getResponseFromBillHighway(
            'connect',
            'POST',
            str_replace(
                '{memberId}',
                $AftIndividualGuid,
                str_replace('{chapterId}', $GroupId, $configConnect['apis']['MapPaymentTokenToIndividual'])
            ),
            $data,
            [$AftIndividualGuid],
            $LoggingParams
        );
    }

    public static function MapCCReferenceNoToIndividual(string $GroupId, string $AftIndividualGuid, int $BillHighwayUserId, Address $BillingAddress, CardInfo $CardInfo, $LoggingParams = null): mixed
    {
        $configCloud = config('billhighway.endpoints.cloud');
        $ccDetails = (object) [];
        $ccDetails->ClassName = 'CreditCardPayment';
        $ccDetails->UniqueId = UUID::v4();
        $ccDetails->ClientId = config('billhighway.clientId');
        $ccDetails->GroupId = $GroupId;
        $ccDetails->UserId = $AftIndividualGuid;
        $ccDetails->BhUserId = $BillHighwayUserId;
        $ccDetails->Location = 1;
        $ccDetails->CurrencyType = 'USD';
        $ccDetails->Address1 = $BillingAddress->AddressLine1;
        $ccDetails->Address2 = $BillingAddress->AddressLine2;
        $ccDetails->BillingCity = $BillingAddress->City;
        $ccDetails->BillingState = $BillingAddress->State;
        $ccDetails->PostalCode = $BillingAddress->Zip;
        $ccDetails->Country = 'USA';
        $ccDetails->CardReferenceOrCardNumber = $CardInfo->CardNumber;
        $ccDetails->NameOnCard = $CardInfo->NameOnCard;
        $ccDetails->ExpMonth = $CardInfo->ExpMonth;
        $ccDetails->ExpYear = $CardInfo->ExpYear;
        $ccDetails->CardType = strtoupper((string) $CardInfo->CardType); // VISA, MC, AMEX, DISC
        $ccDetails->Amount = 0;
        $ccDetails->StoreCardInfo = false;
        $ccDetails->AutoPay = true;

        $data = (object) [];
        $data->CreditCardPaymentList = [$ccDetails];

        return self::getResponseFromBillHighway(
            'cloud',
            'POST',
            $configCloud['apis']['MapCCReferenceNoToIndividual'],
            $data,
            [$AftIndividualGuid],
            $LoggingParams
        );
    }

    public static function MapACHReferenceNoToIndividual(string $GroupId, string $AftIndividualGuid, int $BillHighwayUserId, AchInfo $AchInfo, $LoggingParams = null): mixed
    {
        $configCloud = config('billhighway.endpoints.cloud');
        $achDetails = (object) [];
        $achDetails->ClassName = 'ACHPayment';
        $achDetails->UniqueId = UUID::v4();
        $achDetails->ClientId = config('billhighway.clientId');
        $achDetails->GroupId = $GroupId;
        $achDetails->UserId = $AftIndividualGuid;
        $achDetails->BhUserId = $BillHighwayUserId;
        $achDetails->Location = 1;
        $achDetails->CurrencyType = 'USD';
        $achDetails->Country = 'USA';
        $achDetails->ACHReference = $AchInfo->AccountNumber;
        $achDetails->PayerName = $AchInfo->AccountHolderName;
        $achDetails->AccountType = strtoupper((string) $AchInfo->AccountType); //C, S
        $achDetails->Amount = 0;
        $achDetails->StoreAchInfo = false;
        $achDetails->AutoPay = true;
        $achDetails->CheckNumber = "";

        $data = (object) [];
        $data->AchPaymentList = [$achDetails];

        return self::getResponseFromBillHighway(
            'cloud',
            'POST',
            $configCloud['apis']['MapACHReferenceNoToIndividual'],
            $data,
            [$AftIndividualGuid],
            $LoggingParams
        );
    }
}

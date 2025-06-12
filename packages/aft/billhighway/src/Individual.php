<?php

namespace Aft\BillHighway;

class Individual extends BaseBillHighway
{
    public static function GetIndividual(string $GroupId, string $IndividualId): mixed
    {
        $configConnect = config('billhighway.endpoints.connect');

        return self::getResponseFromBillHighway(
            'connect',
            'GET',
            str_replace(
                '{memberId}',
                $IndividualId,
                str_replace('{chapterId}', $GroupId, $configConnect['apis']['GetIndividual'])
            ),
            null
        );
    }

    // As discussed int the BH meeting today, possibly send all fields including optional fields. Send null as value if that field is not required.
    // Comment will be removed once implementation is complete.
    /*
    Following values provided by Dylan Smith (BillHighway) in MS Team Chat during meeting.
    Creating models for the following to store the values.
    Expected member status values:
    A      = Active status
    A-MP     = Active - manual payment
    I       = Inactive status
    Expected member TYPE values:
    A   = Active
    I   = Inactive
    Member   = Looks like a default member type
    NM   =  Non Member.
    */
    public static function getMemberPayload(): \stdClass
    {
        return json_decode('{
          "Members": [
            {
              "ClassName": "Member",
              "UniqueId": "",
              "CreatedDateTime": "",
              "ClientId": null,
              "GroupId": null,
              "UserId": "",
              "FirstName": "",
              "LastName": "",
              "PreferredAddress1": "",
              "PreferredAddress2": "",
              "PreferredCity": "",
              "PreferredState": "",
              "PreferredZip": "",
              "PreferredCountry": "USA",
              "PreferredPhoneNumber": "",
              "PreferredEmailAddress": "",
              "MemberTypeClient": "",
              "MemberStatus": "",
              "AccessLevel": "Mem",
              "BillingType": null,
              "RecurringInvoiceSettings": {
                "DonationAmount": 0
                }
            }
          ]
        }');
    }

    public static function getMemberStatusPayload(): \stdClass
    {
        return json_decode('{
          "Members": [
            {
              "ClientId": null,
              "GroupId": null,
              "UserId": "",
              "MemberStatus": ""
            }
          ]
        }');
    }

    public static function SaveIndividual(
        string $BillHighwayGroupId,
        Models\Individual $Individual,
        string $BillingTypeId,
        $CopeAmount,
        $LoggingParams = null
    ): mixed {
        $configCloud = config('billhighway.endpoints.cloud');
        $data = self::getMemberPayload();
        $data->Members[0]->UniqueId = Helpers\UUID::v4();
        $data->Members[0]->ClientId = config('billhighway.clientId');
        $data->Members[0]->GroupId = $BillHighwayGroupId;
        $data->Members[0]->UserId = $Individual->AftIndividualGuid;
        $data->Members[0]->FirstName = $Individual->FirstName;
        $data->Members[0]->LastName = $Individual->LastName;
        $data->Members[0]->PreferredAddress1 = $Individual->Address->AddressLine1;
        $data->Members[0]->PreferredAddress2 = $Individual->Address->AddressLine2;
        $data->Members[0]->PreferredCity = $Individual->Address->City;
        $data->Members[0]->PreferredState = $Individual->Address->State;
        $data->Members[0]->PreferredZip = $Individual->Address->Zip;
        $data->Members[0]->PreferredCountry = $Individual->Address->Country ?? $data->Members[0]->PreferredCountry;
        $data->Members[0]->PreferredPhoneNumber = $Individual->Phone;
        $data->Members[0]->PreferredEmailAddress = $Individual->Email;
        $data->Members[0]->MemberTypeClient = $Individual->MemberType;
        $data->Members[0]->MemberStatus = $Individual->MemberStatus;
        $data->Members[0]->BillingType = $BillingTypeId;

        if (isset($CopeAmount)) {
            $data->Members[0]->RecurringInvoiceSettings->DonationAmount = $CopeAmount;
        } else {
            unset($data->Members[0]->RecurringInvoiceSettings);
        }

        return self::getResponseFromBillHighway(
            'cloud',
            'POST',
            $configCloud['apis']['SaveIndividual'],
            $data,
            [$Individual->AftIndividualGuid],
            $LoggingParams
        );
    }

    public static function updateMemberStatus(
        string $BillHighwayGroupId,
        Models\Individual $Individual,
        $LoggingParams = null
    ): mixed {
        $configCloud = config('billhighway.endpoints.cloud');
        $data = self::getMemberStatusPayload();
        // echo var_dump($data); exit;
        $data->Members[0]->ClientId = config('billhighway.clientId');
        $data->Members[0]->GroupId = $BillHighwayGroupId;
        $data->Members[0]->UserId = $Individual->AftIndividualGuid;
        $data->Members[0]->MemberStatus = $Individual->MemberStatus;

        return self::getResponseFromBillHighway(
            'cloud',
            'POST',
            $configCloud['apis']['SaveIndividual'],
            $data,
            [$Individual->AftIndividualGuid],
            $LoggingParams
        );
    }

    //Update Individual with the fields having value except null
    public static function UpdateIndividual(
        string $BillHighwayGroupId,
        Models\Individual $Individual,
        ?string $BillingTypeId = null,
        ?string $CopeAmount = null,
        $LoggingParams = null
    ): mixed {
        $configCloud = config('billhighway.endpoints.cloud');
        $data = (object) [];
        $data->Members = [];
        $data->Members[0] = (object) [];
        $data->Members[0]->UniqueId = Helpers\UUID::v4();
        $data->Members[0]->ClientId = config('billhighway.clientId');
        $data->Members[0]->GroupId = $BillHighwayGroupId;
        $data->Members[0]->UserId = $Individual->AftIndividualGuid;

        if (isset($Individual->FirstName)) {
            $data->Members[0]->FirstName = $Individual->FirstName;
        }
        if (isset($Individual->LastName)) {
            $data->Members[0]->LastName = $Individual->LastName;
        }

        if (isset($Individual->Address)) {
            $data->Members[0]->PreferredAddress1 = $Individual->Address->AddressLine1;
            $data->Members[0]->PreferredAddress2 = $Individual->Address->AddressLine2;
            $data->Members[0]->PreferredCity = $Individual->Address->City;
            $data->Members[0]->PreferredState = $Individual->Address->State;
            $data->Members[0]->PreferredZip = $Individual->Address->Zip;
            $data->Members[0]->PreferredCountry = $Individual->Address->Country ?? 'USA';
        }

        if (isset($Individual->Phone)) {
            $data->Members[0]->PreferredPhoneNumber = $Individual->Phone;
        }
        if (isset($Individual->Email)) {
            $data->Members[0]->PreferredEmailAddress = $Individual->Email;
        }
        if (isset($Individual->AftMemberId)) {
            $data->Members[0]->AlternateUserID = $Individual->AftMemberId;
        }
        if (isset($Individual->MemberType)) {
            $data->Members[0]->MemberTypeClient = $Individual->MemberType;
        }
        if (isset($Individual->MemberStatus)) {
            $data->Members[0]->MemberStatus = $Individual->MemberStatus;
        }
        if (isset($BillingTypeId)) {
            $data->Members[0]->BillingType = $BillingTypeId;
        }
        if (isset($CopeAmount)) {
            $data->Members[0]->RecurringInvoiceSettings = (object) [];
            $data->Members[0]->RecurringInvoiceSettings->DonationAmount = $CopeAmount;
        }

        return self::getResponseFromBillHighway(
            'cloud',
            'POST',
            $configCloud['apis']['SaveIndividual'],
            $data,
            [$Individual->AftIndividualGuid],
            $LoggingParams
        );
    }

    public static function GetBillHighwayStatus(string $GroupId, string $AftIndividualGuid): mixed
    {
        $configConnect = config('billhighway.endpoints.cloud');

        return self::getResponseFromBillHighway(
            'cloud',
            'GET',
            $configConnect['apis']['GetBillHighwayStatus'].'?GroupId=' . $GroupId . '&UserId=' . $AftIndividualGuid,
            null
        );
    }

    public static function DisableAutoPay(string $BillHighwayGroupId, string $AftIndividualGuid, $LoggingParams = null): mixed
    {
        $configCloud = config('billhighway.endpoints.cloud');
        $data = (object) [];
        $data->ClassName = 'Member';
        $data->UniqueId = Helpers\UUID::v4();
        $data->ClientId = config('billhighway.clientId');
        $data->GroupId = $BillHighwayGroupId;
        $data->UserId = $AftIndividualGuid;

        return self::getResponseFromBillHighway(
            'cloud',
            'POST',
            $configCloud['apis']['DisableAutoPay'],
            $data,
            [$AftIndividualGuid],
            $LoggingParams
        );
    }
}

<?php

namespace App\Http\Controllers\BillHighway;

use Aft\BillHighway\BillingTypes as BillHighwayBillingTypes;
use Aft\BillHighway\Individual as BillHighwayIndividual;
use Aft\BillHighway\Models\AchInfo;
use Aft\BillHighway\Models\Address as BillHighwayAddress;
use Aft\BillHighway\Models\AutoPayStatus as BillHighwayAutoPayStatus;
use Aft\BillHighway\Models\CardInfo;
use Aft\BillHighway\Models\Individual as BillHighwayIndividualModel;
use Aft\BillHighway\Models\MemberStatus as BillHighwayMemberStatus;
use Aft\BillHighway\Models\MemberType as BillHighwayMemberType;
use Aft\BillHighway\Payment as BillHighwayPayment;
use Aft\MemberForms\Models\DuesMapping;
use Aft\MemberForms\Models\EDuesEnrollment;
use Aft\MemberForms\Models\FormSubmission;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Individual;
use App\Models\IndividualAddress;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use App\Models\IndividualEmail;
use App\Models\IndividualPhone;
use App\Models\MemberIdMapping;
use App\Models\PaymentMethod;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Aft\Permissions\Scopes\AuthorizationScope;
use Illuminate\Support\Facades\Auth;

class BillHighwayController extends Controller
{
    public function UpdateIndividual(Request $request)
    {
        $data = $request->validate([
            'IndividualId' => 'required|integer',
            'AffiliateId' => 'required|integer',
            'InvokedFrom' => 'required|string',
        ]);

        $returnResponse = json_decode('{"billHighway": {"UpdateIndividual": ""}}');

        $eDuesEnrollment = EDuesEnrollment::where('IndividualId', $data['IndividualId'])
            ->where('AffiliateId', $data['AffiliateId'])
            ->whereNull('DeletedAt')
            ->get()
            ->first();

        if (isset($eDuesEnrollment)) {
            $billHighwayBillingTypeId = null;
            $copeAmount = null;
            $billHighwayGroupId = Affiliate::withoutGlobalScopes([AuthorizationScope::class])->where('AffiliateId', $data['AffiliateId'])
                ->get('BillHighwayGroupId')
                ->first()
                ->BillHighwayGroupId;
            $currentDate = now();
            $user = Auth::user();
            if (!isset($user)) {
                $user = (object)[];
                $user->id = -1;
            }
            $individual = Individual::withoutGlobalScopes()->find($data['IndividualId']);
            // Billhighway individual
            $bhIndividualModel = new BillHighwayIndividualModel();
            $bhIndividualModel->AftIndividualGuid = $individual->IndividualGuid;

            switch ($data['InvokedFrom']) {
                case 'basicDetails':
                    $bhIndividualModel->FirstName = $individual->FirstName;
                    $bhIndividualModel->LastName = $individual->LastName;
                    break;

                case 'phone':
                    $individualPhone = IndividualPhone::where('IndividualId', $data['IndividualId'])
                        ->whereNull('DeletedAt')
                        ->where('IsPreferred', true)
                        ->orderBy('IsPreferred', 'desc')
                        ->orderBy('VerifiedDate', 'desc')
                        ->orderBy('UpdatedAt', 'desc')
                        ->get()
                        ->first();
                    if (isset($individualPhone)) {
                        $bhIndividualModel->Phone = preg_replace('/[^0-9]/', '', $individualPhone->PhoneNumber);
                    }
                    break;

                case 'email':
                    $individualEmail = IndividualEmail::where('IndividualId', $data['IndividualId'])
                        ->whereNull('DeletedAt')
                        ->where('IsPreferred', true)
                        ->orderBy('IsPreferred', 'desc')
                        ->orderBy('VerifiedDate', 'desc')
                        ->orderBy('UpdatedAt', 'desc')
                        ->get()
                        ->first();
                    if (isset($individualEmail)) {
                        $bhIndividualModel->Email = $individualEmail->Email;
                    }
                    break;

                case 'address':
                    $billingAddress = IndividualAddress::where('IndividualId', $data['IndividualId'])
                        ->whereNull('DeletedAt')
                        ->where('IndividualAddressTypeId', 3) // Billing
                        ->where('ContactStatusId', 4) // Verified
                        ->orderBy('VerifiedDate', 'desc')
                        ->orderBy('UpdatedAt', 'desc')
                        ->get(['AddressLine1', 'AddressLine2', 'City', 'StateTerritoryId', 'PostalCode'])
                        ->first();
                    if (isset($billingAddress)) {
                        $bhAddress = new BillHighwayAddress();
                        $bhAddress->AddressLine1 = $billingAddress->AddressLine1;
                        $bhAddress->AddressLine2 = $billingAddress->AddressLine2;
                        $bhAddress->City = $billingAddress->City;
                        $bhAddress->State = $billingAddress->StateTerritory->StateTerritoryCode;
                        $bhAddress->Zip = $billingAddress->PostalCode;

                        $bhIndividualModel->Address = $bhAddress;
                    }
                    break;

                case 'unionRelationship':
                    $individualAffiliate = IndividualAffiliate::where('IndividualId', $data['IndividualId'])
                        ->where('AffiliateId', $data['AffiliateId'])
                        ->whereNull('DeletedAt')
                        ->orderBy('UpdatedAt', 'desc')
                        ->orderBy('CreatedAt', 'desc')
                        ->get(['LocalDuesCategoryId', 'UnionRelationshipTypeId', 'EndDate'])
                        ->first();
                    $isDataForm = $eDuesEnrollment->TemplateId == 7;
                    // If Connect Non-member, then deactivate individual in BillHighway
                    if ($individualAffiliate
                            && (
                                ($individualAffiliate->UnionRelationshipTypeId == 2
                                    && ! empty($individualAffiliate->EndDate)
                                    && $individualAffiliate->EndDate <= $currentDate)
                                || ($individualAffiliate->UnionRelationshipTypeId != 2)
                            )
                    ) {
                        //Check Cope
                        $copeModel = IndividualCope::where('IndividualId', $data['IndividualId'])
                            ->where('AffiliateId', $data['AffiliateId'])
                            ->whereNull('DeletedAt')
                            ->get()
                            ->first();
                        if (isset($copeModel)) {
                            $copeModel->CopeAmount = 0;
                            $copeModel->UpdatedAt = $currentDate;
                            $copeModel->save();
                        }

                        // Get BH MemberStatus - Check if Active
                        $bhIndividualStatus = BillHighwayIndividual::GetBillHighwayStatus($billHighwayGroupId, $individual->IndividualGuid);
                        if ($bhIndividualStatus
                                && ! $bhIndividualStatus->IsError
                                && ($bhIndividualStatus->MemberStatusCode == BillHighwayMemberStatus::Active ||
                                        $bhIndividualStatus->MemberStatusCode == BillHighwayMemberStatus::ActiveManualPayment)
                        ) {
                            $returnResponse = json_decode('{"billHighway": {"CancelIndividualPayment": "Success"}}');
                            $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/UnionRelationship/CancelIndividualPayment');
                            $this->CancelIndividualPayment($billHighwayGroupId, $individual->IndividualGuid, $isDataForm, $loggingParams);

                            return json_encode($returnResponse); //Todo: Error handling
                        }
                    } elseif ($individualAffiliate
                        && $individualAffiliate->UnionRelationshipTypeId == 2
                            && (empty($individualAffiliate->EndDate) || (! empty($individualAffiliate->EndDate) && $individualAffiliate->EndDate > $currentDate))
                    ) { // If Connect Member, then reactivate individual or do modifications in BillHighway
                        // If cope only
                        if ($eDuesEnrollment->TemplateId == 6) {
                            // Get BillHighway BillingTypeId for Cope only form
                            $modelSubmission = FormSubmission::find($eDuesEnrollment->SubmissionId);
                            $billHighwayBillingTypeId = $modelSubmission->form->sources['copeOnlyBillingTypeId'];
                        } else {
                            //Dues Category / Billing Type
                            $duesMapping = DuesMapping::where('dues_category_id', $individualAffiliate->LocalDuesCategoryId)
                                ->where('affiliate_id', $data['AffiliateId'])
                                ->whereNull('DeletedAt')
                                ->get(['bill_highway_type_id'])
                                ->first();
                            if (isset($duesMapping)) {
                                $billHighwayBillingTypeId = $duesMapping->bill_highway_type_id;
                            }
                        }

                        //Cope Amount
                        $copeModel = IndividualCope::where('IndividualId', $data['IndividualId'])
                            ->where('AffiliateId', $data['AffiliateId'])
                            ->whereNull('DeletedAt')
                            ->get(['CopeAmount'])
                            ->first();
                        if (isset($copeModel) && isset($copeModel->CopeAmount)) {
                            $copeAmount = $copeModel->CopeAmount;
                        }

                        if ($isDataForm) {
                            $bhIndividualModel->MemberStatus = BillHighwayMemberStatus::ActiveManualPayment;
                            $bhIndividualModel->MemberType = BillHighwayMemberType::Active;
                        } else {
                            // In BillHighway: if MemberStatus = Inactive and AutoPay = Inactive
                            $bhIndividualStatus = BillHighwayIndividual::GetBillHighwayStatus($billHighwayGroupId, $individual->IndividualGuid);
                            if ($bhIndividualStatus
                                && ! $bhIndividualStatus->IsError
                                && $bhIndividualStatus->MemberStatusCode == BillHighwayMemberStatus::Inactive
                                && $bhIndividualStatus->AutoPayStatus == BillHighwayAutoPayStatus::Inactive
                            ) {
                                $bhIndividualModel->MemberStatus = BillHighwayMemberStatus::Active;
                                $bhIndividualModel->MemberType = BillHighwayMemberType::Active;

                                if (isset($eDuesEnrollment->PaymentToken)) {
                                    $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/UnionRelationship/MapPaymentTokenToIndividual');
                                    BillHighwayPayment::MapPaymentTokenToIndividual($billHighwayGroupId, $individual->IndividualGuid, $eDuesEnrollment->PaymentToken, $loggingParams);
                                } elseif ($bhIndividualStatus->AutoPayInfo) {
                                    // OFC support for migration of reference numbers
                                    // Remove dependency on database reference numbers. AutoPayInfo/Reference number fetch from BillHighway directly.
                                    if ($bhIndividualStatus->AutoPayInfo->PaymentMethod === 'Credit Card') {
                                        $billingAddress = IndividualAddress::where('IndividualId', $data['IndividualId'])
                                            ->whereNull('DeletedAt')
                                            ->where('IndividualAddressTypeId', 3) // Billing
                                            ->where('ContactStatusId', 4) // Verified
                                            ->orderBy('VerifiedDate', 'desc')
                                            ->orderBy('UpdatedAt', 'desc')
                                            ->get(['AddressLine1', 'AddressLine2', 'City', 'StateTerritoryId', 'PostalCode'])
                                            ->first();
                                        $bhAddress = null;
                                        if (isset($billingAddress)) {
                                            $bhAddress = new BillHighwayAddress();
                                            $bhAddress->AddressLine1 = $billingAddress->AddressLine1;
                                            $bhAddress->AddressLine2 = $billingAddress->AddressLine2;
                                            $bhAddress->City = $billingAddress->City;
                                            $bhAddress->State = $billingAddress->StateTerritory->StateTerritoryCode;
                                            $bhAddress->Zip = $billingAddress->PostalCode;
                                        }
                                        $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/UnionRelationship/MapCCReferenceNoToIndividual');
                                        $cardInfo = new CardInfo();
                                        $cardInfo->CardType = $bhIndividualStatus->AutoPayInfo->CardType;
                                        $cardInfo->NameOnCard = $bhIndividualStatus->AutoPayInfo->PayerName;
                                        $cardInfo->ExpMonth = $bhIndividualStatus->AutoPayInfo->ExpMonth;
                                        $cardInfo->ExpYear = $bhIndividualStatus->AutoPayInfo->ExpYear;
                                        $cardInfo->CardNumber = $bhIndividualStatus->AutoPayInfo->CardReference; //$eDuesEnrollment->ReferenceNo;
                                        BillHighwayPayment::MapCCReferenceNoToIndividual($billHighwayGroupId, $individual->IndividualGuid, $bhIndividualStatus->BhUserId, $bhAddress, $cardInfo, $loggingParams);
                                    } elseif ($bhIndividualStatus->AutoPayInfo->PaymentMethod === 'Bank Account') {
                                        $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/UnionRelationship/MapACHReferenceNoToIndividual');
                                        $achInfo = new AchInfo();
                                        $achInfo->AccountType = substr($bhIndividualStatus->AutoPayInfo->AccountType, 0, 1); //C or S
                                        $achInfo->AccountHolderName = $bhIndividualStatus->AutoPayInfo->PayerName;
                                        $achInfo->AccountNumber = $bhIndividualStatus->AutoPayInfo->AchReference; //$eDuesEnrollment->ReferenceNo;
                                        BillHighwayPayment::MapACHReferenceNoToIndividual($billHighwayGroupId, $individual->IndividualGuid, $bhIndividualStatus->BhUserId, $achInfo, $loggingParams);
                                    }
                                }
                            }
                        }
                    }
                    break;

                default:
            }

            try {
                // Update Individual in BillHighway System
                $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/' . $data['InvokedFrom'] . '/UpdateIndividual');
                $bhResponseUpdateIndividual = BillHighwayIndividual::UpdateIndividual($billHighwayGroupId, $bhIndividualModel, $billHighwayBillingTypeId, $copeAmount, $loggingParams);
                if (! $bhResponseUpdateIndividual->IsError) {
                    $returnResponse->billHighway->UpdateIndividual = 'Success - '.$data['InvokedFrom'];
                } else {
                    $returnResponse->billHighway->UpdateIndividual = 'Error: '.$bhResponseUpdateIndividual->MemberReply[0]->ErrorCode.' - '.$bhResponseUpdateIndividual->MemberReply[0]->ErrorMessage;
                }
            } catch (Exception $ex) {
                $returnResponse->billHighway->UpdateIndividual = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
            }
        }

        return json_encode($returnResponse);
    }

    // --Deactivate BillHighway Individual Profile--
    // MemberStatus to Inactive
    // BillingType to No fees
    // Disable AutoPay
    private function CancelIndividualPayment(string $BillHighwayGroupId, string $AftIndividualGuid, bool $IsDataForm = false, $loggingParams = null): void
    {
        $bhIndividualModel = new BillHighwayIndividualModel();
        $bhIndividualModel->AftIndividualGuid = $AftIndividualGuid;
        $bhIndividualModel->MemberStatus = BillHighwayMemberStatus::Inactive;
        $bhIndividualModel->MemberType = BillHighwayMemberType::Inactive;
        $noFeeBillingTypeId = $this->getNoFeeBillingTypeId($BillHighwayGroupId);

        // Update Individual in BillHighway System as MemberStatus = Inactive and Dues category = 'No Fees'
        try {
            $bhResponse = BillHighwayIndividual::UpdateIndividual($BillHighwayGroupId, $bhIndividualModel, $noFeeBillingTypeId, null, $loggingParams);
        } catch (Exception) { /*Log Exception*/
        }

        // Disable AutoPay
        try {
            if (! $IsDataForm) {
                $bhResponse = BillHighwayIndividual::DisableAutoPay($BillHighwayGroupId, $AftIndividualGuid, $loggingParams);
            }
        } catch (Exception) { /*Log Exception*/
        }
    }

    private function getNoFeeBillingTypeId(string $BillHighwayGroupId)
    {
        $noFeeBillingTypeId = null;
        try {
            $billingTypes = array_filter(BillHighwayBillingTypes::GetBillingTypes($BillHighwayGroupId)->Results, fn($billingType): bool => $billingType->BillingTypeName == 'No Fees');
            $noFeeBillingType = current($billingTypes);
            $noFeeBillingTypeId = $noFeeBillingType->BillingTypeID;
        } catch (Exception) { /*Log Exception*/
        }

        return $noFeeBillingTypeId;
    }

    public function MoveToLocalPayrollDeduction(Request $request): void
    {
        $data = $request->validate([
            'IndividualId' => 'required|integer',
            'AffiliateId' => 'required|integer',
        ]);

        $user = Auth::user();
        $eDuesEnrollment = EDuesEnrollment::where('IndividualId', $data['IndividualId'])
            ->where('AffiliateId', $data['AffiliateId'])
            ->get(['EDuesEnrollmentId', 'DeletedAt'])
            ->first();

        if (isset($eDuesEnrollment)) {
            $billHighwayGroupId = Affiliate::find($data['AffiliateId'])
                ->get('BillHighwayGroupId')
                ->first()
                ->BillHighwayGroupId;
            $currentDate = now();
            $isDataForm = $eDuesEnrollment->TemplateId == 7;
            $individual = Individual::withoutGlobalScopes()->find($data['IndividualId']);

            // 1 - Cancel Individual Payment
            $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/MoveToLocalPayrollDeduction/CancelIndividualPayment');
            $this->CancelIndividualPayment($billHighwayGroupId, $individual->IndividualGuid, $isDataForm, $loggingParams);
            // 2 - EDues_Enrollment table: Mark as deleted
            $eDuesEnrollment->DeletedAt = $currentDate;
            $eDuesEnrollment->save();
            // 3 - Change Payment Method for the individual
            $individualAffiliate = IndividualAffiliate::where('IndividualId', $data['IndividualId'])
                ->where('AffiliateId', $data['AffiliateId'])
                ->whereNull('DeletedAt')
                ->orderBy('UpdatedAt', 'desc')
                ->get(['IndividualAffiliateId', 'PaymentMethodId'])
                ->first();
            if (isset($individualAffiliate)) {
                $paymentMethodId = PaymentMethod::where('PaymentMethodName', 'Local Payroll Deduction')
                    ->get(['PaymentMethodId'])
                    ->first()
                    ->PaymentMethodId;
                $individualAffiliate->PaymentMethodId = $paymentMethodId;
                $individualAffiliate->UpdatedAt = $currentDate;
                $individualAffiliate->save();
            }
        }
    }

    public function CopeCancelPayment(Request $request): void
    {
        $data = $request->validate([
            'IndividualId' => 'required|integer',
            'AffiliateId' => 'required|integer',
        ]);

        $user = Auth::user();
        $eDuesEnrollment = EDuesEnrollment::where('IndividualId', $data['IndividualId'])
            ->where('AffiliateId', $data['AffiliateId'])
            ->get(['EDuesEnrollmentId', 'TemplateId'])
            ->first();

        if (isset($eDuesEnrollment)
            && ($eDuesEnrollment->TemplateId == 6 || $eDuesEnrollment->TemplateId == 8)) {
            $billHighwayGroupId = Affiliate::find($data['AffiliateId'])
                ->get('BillHighwayGroupId')
                ->first()
                ->BillHighwayGroupId;

            $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/CopeCancelPayment/CancelIndividualPayment');
            $individual = Individual::withoutGlobalScopes()->find($data['IndividualId']);
            $this->CancelIndividualPayment($billHighwayGroupId, $individual->IndividualGuid, false, $loggingParams);
        }
    }

    public function UpdateCopeAmount(Request $request): void
    {
        $data = $request->validate([
            'IndividualId' => 'required|integer',
            'AffiliateId' => 'required|integer',
            'CopeAmount' => 'required',
        ]);

        $user = Auth::user();
        $eDuesEnrollment = EDuesEnrollment::where('IndividualId', $data['IndividualId'])
            ->where('AffiliateId', $data['AffiliateId'])
            ->get(['EDuesEnrollmentId'])
            ->first();

        if (isset($eDuesEnrollment)) {
            $affiliate = Affiliate::withoutGlobalScopes()->find($data['AffiliateId']);
            $individual = Individual::withoutGlobalScopes()->find($data['IndividualId']);

            $bhIndividualStatus = BillHighwayIndividual::GetBillHighwayStatus($affiliate->BillHighwayGroupId, $individual->IndividualGuid);

            $bhIndividualModel = new BillHighwayIndividualModel();
            $bhIndividualModel->AftIndividualGuid = $individual->IndividualGuid;
            $loggingParams = $this->getParametersForLogging($eDuesEnrollment->EDuesEnrollmentId, $user->id, 'Connect/UpdateCopeAmount/CancelIndividualPayment');
            $bhResponse = BillHighwayIndividual::UpdateIndividual($affiliate->BillHighwayGroupId, $bhIndividualModel, $bhIndividualStatus->BillingTypeId, $data['CopeAmount'], $loggingParams);
            if (!$bhResponse->IsError) {
                $copeModel = IndividualCope::where('IndividualId', $data['IndividualId'])
                    ->where('AffiliateId', $data['AffiliateId'])
                    ->whereNull('DeletedAt')
                    ->get()
                    ->first();
                if (isset($copeModel)) {
                    $copeModel->CopeAmount = $data['CopeAmount'];
                    $copeModel->UpdatedBy = $user->id;
                    $copeModel->UpdatedAt = now();
                    $copeModel->save();
                }
            }
        }
    }

    public function UpstreamMemberIds(): void
    {
        $eDuesEnrollment = EDuesEnrollment::whereNull('DeletedAt')
            ->where(function ($query): void {
                $query->whereNull('MemberIdSyncedToBH')
                    ->orWhere('MemberIdSyncedToBH', false);
            })
            ->get(['EDuesEnrollmentId', 'IndividualId', 'AffiliateId', 'MemberIdSyncedToBH']);

        if (isset($eDuesEnrollment)) {
            foreach ($eDuesEnrollment as $individualEnrollment) {
                $memberIdMappingModel = MemberIdMapping::where('IndividualId', $individualEnrollment->IndividualId)
                    ->where('AffiliateId', $individualEnrollment->AffiliateId)
                    ->whereNull('DeletedAt')
                    ->orderBy('UpdatedAt', 'desc')
                    ->get(['MemberId'])
                    ->first();

                if (isset($memberIdMappingModel) && isset($memberIdMappingModel->MemberId)) {
                    try {
                        $affiliate = Affiliate::withoutGlobalScopes()
                            ->find($individualEnrollment->AffiliateId);

                        $individual = Individual::withoutGlobalScopes()
                            ->find($individualEnrollment->IndividualId);

                        if (isset($affiliate) && isset($individual) && isset($affiliate->BillHighwayGroupId)) {
                            $bhIndividualModel = new BillHighwayIndividualModel();
                            $bhIndividualModel->AftIndividualGuid = $individual->IndividualGuid;
                            $bhIndividualModel->AftMemberId = $memberIdMappingModel->MemberId;
                            $bhResponse = BillHighwayIndividual::UpdateIndividual($affiliate->BillHighwayGroupId, $bhIndividualModel);
                            if (! $bhResponse->IsError) {
                                $individualEnrollment->MemberIdSyncedToBH = true;
                                $individualEnrollment->save();
                            }
                        }
                    } catch (Exception) { /* Log Exception */
                    }
                }
            }
        }
    }

    public function SyncIndividualBillHighway($time, $affiliate_id = null): void
    {
        $typesList = ['basicDetails','phone','email','address','unionRelationship'];
        foreach ($typesList as $ty) {
            $this->SyncIndividualBillHighwayByType($ty, $time, $affiliate_id);
        }
    }

    public function SyncIndividualBillHighwayByType($type, $time, $affiliate_id = null): void
    {
        $request = '';
        $eDuesEnrollmentQuery = EDuesEnrollment::whereNull('DeletedAt');
        $individualIds = [];
        if ($affiliate_id) {
            $affiliateData = Affiliate::withoutGlobalScopes([AuthorizationScope::class])->where('AffiliateNumber', $affiliate_id)->first();
            if ($affiliateData && $affiliateData->AffiliateId) {
                $eDuesEnrollmentQuery->where('AffiliateId', $affiliateData->AffiliateId);
            }
        }
        $eduesData = $eDuesEnrollmentQuery->get(['IndividualId','AffiliateId'])->toArray();
        foreach ($eduesData as $eData) {
            $individualIds[] = $eData['IndividualId'];
        }
        switch ($type) {
            case 'basicDetails':
                $individuals = Individual::withoutGlobalScopes()->whereNull('DeletedAt')->whereIn('IndividualId', $individualIds)->where('UpdatedAt', '>=', Carbon::now()->subHours($time)->toDateTimeString())->pluck('IndividualId');
                if ($individuals) {
                    foreach ($eduesData as $eData) {
                        if (in_array($eData['IndividualId'], $individuals->toArray())) {
                            $request = request()->merge(['IndividualId' => $eData['IndividualId'], 'AffiliateId'=> $eData['AffiliateId'], 'InvokedFrom'=>$type]);
                        }
                    }
                }
                break;
            case 'phone':
                $phoneIndividuals = IndividualPhone::whereNull('DeletedAt')->whereIn('IndividualId', $individualIds)->where('UpdatedAt', '>=', Carbon::now()->subHours($time)->toDateTimeString())->pluck('IndividualId');
                if ($phoneIndividuals) {
                    foreach ($eduesData as $eData) {
                        if (in_array($eData['IndividualId'], $phoneIndividuals->toArray())) {
                            $request = request()->merge(['IndividualId' => $eData['IndividualId'], 'AffiliateId'=> $eData['AffiliateId'], 'InvokedFrom'=>$type]);
                        }
                    }
                }
                break;
            case 'email':
                $emailIndividuals = IndividualEmail::whereNull('DeletedAt')->whereIn('IndividualId', $individualIds)->where('UpdatedAt', '>=', Carbon::now()->subHours($time)->toDateTimeString())->pluck('IndividualId');
                if ($emailIndividuals) {
                    foreach ($eduesData as $eData) {
                        if (in_array($eData['IndividualId'], $emailIndividuals->toArray())) {
                            $request = request()->merge(['IndividualId' => $eData['IndividualId'], 'AffiliateId'=> $eData['AffiliateId'], 'InvokedFrom'=>$type]);
                        }
                    }
                }
                break;
            case 'address':
                $addressIndividuals = IndividualAddress::whereNull('DeletedAt')->whereIn('IndividualId', $individualIds)->where('UpdatedAt', '>=', Carbon::now()->subHours($time)->toDateTimeString())->pluck('IndividualId');
                if ($addressIndividuals) {
                    foreach ($eduesData as $eData) {
                        if (in_array($eData['IndividualId'], $addressIndividuals->toArray())) {
                            $request = request()->merge(['IndividualId' => $eData['IndividualId'], 'AffiliateId'=> $eData['AffiliateId'], 'InvokedFrom'=>$type]);
                        }
                    }
                }
                break;
            case 'unionRelationship':
                $individualAffiliates = IndividualAffiliate::withoutGlobalScopes()->whereNull('DeletedAt')->whereIn('IndividualId', $individualIds)->where('UpdatedAt', '>=', Carbon::now()->subHours($time)->toDateTimeString())->pluck('IndividualId');
                if ($individualAffiliates) {
                    foreach ($eduesData as $eData) {
                        if (in_array($eData['IndividualId'], $individualAffiliates->toArray())) {
                            $request = request()->merge(['IndividualId' => $eData['IndividualId'], 'AffiliateId'=> $eData['AffiliateId'], 'InvokedFrom'=>$type]);
                        }
                    }
                }
                break;
            default:
                print_r('Invalid Type');
                break;
        }
        if ($request != '') {
            $this->UpdateIndividual($request);
        } else {
            print_r('No Data To Be Sync');
        }
    }

    private function getParametersForLogging($EDuesEnrollmentId, $UserId, string $ErrorTriggeredFrom)
    {
        $loggingParams = (object) [];
        $loggingParams->EDuesEnrollmentId = $EDuesEnrollmentId;
        $loggingParams->UserId = $UserId;
        $loggingParams->ErrorTriggeredFrom = $ErrorTriggeredFrom;
        return $loggingParams;
    }
}

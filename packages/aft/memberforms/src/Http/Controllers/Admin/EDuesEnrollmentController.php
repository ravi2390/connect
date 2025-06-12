<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\BillHighway\Individual as BillHighwayIndividual;
use Aft\BillHighway\Models\Address as BillHighwayAddress;
use Aft\BillHighway\Models\Individual as BillHighwayIndividualModel;
use Aft\BillHighway\Models\MemberStatus as BillHighwayMemberStatus;
use Aft\BillHighway\Models\MemberType as BillHighwayMemberType;
use Aft\BillHighway\Payment as BillHighwayPayment;
use Aft\MemberForms\Models\DuesMapping;
use Aft\MemberForms\Models\EDuesEnrollment;
use Aft\MemberForms\Models\FormSubmission;
use Aft\MemberForms\Models\FormSubmissionData;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Individual;
use App\Models\StateTerritory;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EDuesEnrollmentController extends Controller
{
    public function isSubmissionEligibleForEDues($id)
    {
        $returnResponse = json_decode('{"isSubmissionEligibleForEDues": false}');
        $modelTemplate = FormSubmission::find($id)->form->Template;
        $returnResponse->isSubmissionEligibleForEDues = (str_starts_with($modelTemplate->system_name, 'paymentProcessing')
            || str_starts_with($modelTemplate->system_name, 'dataForm'));

        return json_encode($returnResponse);
    }

    private function getSubmissionDataValue($submissionDataCollection, string $key)
    {
        $item = $submissionDataCollection->firstWhere('data_name', $key);

        return isset($item) ? $item->data_value : '';
    }

    //1. Create or Update Individual in BillHighway
    //2. Map Payment Token from submission to the BillHighwayIndividualId
    //3. Create or Update Individual eDues Enrollment record in AftDB
    public function setupBillHighwayProfile(Request $request)
    {
        $data = $request->all();
        $individualId = $data['IndividualId'];
        $affiliateId = $data['AffiliateId'];
        $submissionId = $data['SubmissionId'];
        $source = $data['Source'];

        $returnResponse = json_decode('{"setupBillHighwayProfile": {"BillHighwaySaveIndividual": "",
            "BillHighwayMapPaymentTokenToIndividual": "", "SaveEDuesEnrollment": ""}}');
        $modelSubmission = FormSubmission::find($submissionId);
        $modelForm = $modelSubmission->form;
        $modelTemplate = $modelSubmission->form->Template;

        $isPaymentProcessingForm = str_starts_with($modelTemplate->system_name, 'paymentProcessing');
        $isPaymentProcessingRetireeForm = str_starts_with($modelTemplate->system_name, 'paymentProcessingRetiree');
        $isDataForm = str_starts_with($modelTemplate->system_name, 'dataForm');
        $isStateFedRecurringCope = str_starts_with($modelTemplate->system_name, 'stateFedRecurringCope');

        if ($isPaymentProcessingForm || $isDataForm || $isStateFedRecurringCope) {
            $individualGuid = Individual::withoutGlobalScopes()
                ->where('IndividualId', $individualId)
                ->get(['IndividualGuid'])
                ->first()
                ->IndividualGuid;

            $modelSubmissionData = FormSubmissionData::where('submission_id', $submissionId)
                ->get(['data_name', 'data_value']);

            if (isset($modelSubmissionData)) {
                $stateCode = StateTerritory::where('StateTerritoryId', $this->getSubmissionDataValue($modelSubmissionData, 'billingState'))
                    ->get(['StateTerritoryCode'])
                    ->first()
                    ->StateTerritoryCode;

                $phone = $this->getSubmissionDataValue($modelSubmissionData, 'phoneMobile');
                $phone = empty($phone) ? $this->getSubmissionDataValue($modelSubmissionData, 'phoneHome') : $phone;
                $phone = empty($phone) ? $this->getSubmissionDataValue($modelSubmissionData, 'phoneWork') : $phone;

                // Billhighway address
                $bhAddress = new BillHighwayAddress();
                $bhAddress->AddressLine1 = $this->getSubmissionDataValue($modelSubmissionData, 'billingAddressLine1');
                $bhAddress->AddressLine2 = $this->getSubmissionDataValue($modelSubmissionData, 'billingAddressLine2');
                $bhAddress->City = $this->getSubmissionDataValue($modelSubmissionData, 'billingCity');
                $bhAddress->State = $stateCode;
                $bhAddress->Zip = $this->getSubmissionDataValue($modelSubmissionData, 'billingZip');
                // Billhighway individual
                $bhIndividualModel = new BillHighwayIndividualModel();
                if ($isPaymentProcessingRetireeForm) {
                    $bhIndividualModel->MemberStatus = BillHighwayMemberStatus::RetireeActive;
                } else {
                    $bhIndividualModel->MemberStatus = $isDataForm ? BillHighwayMemberStatus::ActiveManualPayment : BillHighwayMemberStatus::Active;
                }
                $bhIndividualModel->MemberType = BillHighwayMemberType::Active;
                $bhIndividualModel->FirstName = $this->getSubmissionDataValue($modelSubmissionData, 'firstName');
                $bhIndividualModel->LastName = $this->getSubmissionDataValue($modelSubmissionData, 'lastName');
                $bhIndividualModel->Phone = $phone;
                $bhIndividualModel->Email = $this->getSubmissionDataValue($modelSubmissionData, 'email');
                $bhIndividualModel->Address = $bhAddress;
                $bhIndividualModel->AftIndividualGuid = $individualGuid;

                $billHighwayGroupId = Affiliate::withoutGlobalScopes()
                    ->where('Affiliate.AffiliateId', $affiliateId)
                    ->get(['BillHighwayGroupId'])
                    ->first()
                    ->BillHighwayGroupId;

                $billHighwayBillingTypeId = 0;
                if ($modelForm->form_template_id == 6 || $modelForm->form_template_id == 8) {
                    $billHighwayBillingTypeId = $modelForm->sources['copeOnlyBillingTypeId'];
                } else {
                    $billHighwayBillingTypeId = DuesMapping::where('dues_category_id', $this->getSubmissionDataValue($modelSubmissionData, 'LocalDuesCategory'))
                        ->where('affiliate_id', $affiliateId)
                        ->whereNull('DeletedAt')
                        ->get(['bill_highway_type_id'])
                        ->first()
                        ->bill_highway_type_id;
                }

                //If Cope amount found in submission
                $copeAmount = $this->getSubmissionDataValue($modelSubmissionData, 'copeAmount');
                $copeAmount = (isset($copeAmount) && $copeAmount == '') ? null : trim((string) $copeAmount, '$');

                $user = Auth::user();
                $currentDateTime = now();
                $modelEDues = null;
                try {
                    // Save Individual in AftDB/EduesEnrollment table
                    $user = Auth::user();
                    $currentDateTime = now();
                    $modelEDues = EDuesEnrollment::where('IndividualId', $individualId)
                        ->where('AffiliateId', $affiliateId)->get()->first();
                    if (! isset($modelEDues)) {
                        // Insert information in eDues enrollment table
                        $modelEDues = new EDuesEnrollment();
                        $modelEDues->CreatedBy = $user->id;
                        $modelEDues->CreatedAt = $currentDateTime;
                    }
                    $modelEDues->IndividualId = $individualId;
                    $modelEDues->AffiliateId = $affiliateId;
                    $modelEDues->BHIndividualId = (isset($bhIndividualId) && $bhIndividualId > 0) ? $bhIndividualId : -1;
                    $modelEDues->Source = 'Membership Forms Portal'; // $source;
                    $modelEDues->UpdatedBy = $user->id;
                    $modelEDues->UpdatedAt = $currentDateTime;
                    $modelEDues->DeletedAt = null;
                    $modelEDues->SubmissionId = $submissionId;
                    $modelEDues->SubmissionFileName = 'MFPSubmission-'.$submissionId.'.pdf'; //Note: File created during submission using SubmissionId
                    $modelEDues->SubmissionDate = $modelSubmission->CreatedAt;
                    $modelEDues->TemplateId = $modelTemplate->id;
                    $modelEDues->ReferenceNo = null;

                    $modelEDues->save();
                } catch (Exception $ex) {
                    //Log any other exception
                    $returnResponse->setupBillHighwayProfile->SaveEDuesEnrollment = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
                }

                $bhIndividualId = null;
                $paymentInformation = null;
                try {
                    $loggingParams = $this->getParametersForLogging($modelEDues->EDuesEnrollmentId, $user->id, 'MFP/SetupBillHighwayProfile/SaveIndividual');
                    // Save Individual in BillHighway System
                    $bhResponseSaveIndividual = BillHighwayIndividual::SaveIndividual($billHighwayGroupId, $bhIndividualModel, $billHighwayBillingTypeId, $copeAmount, $loggingParams);
                    if (! $bhResponseSaveIndividual->IsError) {
                        $bhIndividualId = $bhResponseSaveIndividual->MemberReply[0]->BillhighwayuserId;
                        $returnResponse->setupBillHighwayProfile->BillHighwaySaveIndividual = 'Success';
                    } else {
                        //Log Exception
                        $returnResponse->setupBillHighwayProfile->BillHighwaySaveIndividual = 'Error: '.$bhResponseSaveIndividual->MemberReply[0]->ErrorCode.' - '.$bhResponseSaveIndividual->MemberReply[0]->ErrorMessage;
                    }
                } catch (Exception $ex) {
                    //Log any other exception
                    $returnResponse->setupBillHighwayProfile->BillHighwaySaveIndividual = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
                }

                if ($isPaymentProcessingForm || $isStateFedRecurringCope) {
                    $paymentInformation = json_decode((string) $this->getSubmissionDataValue($modelSubmissionData, 'Token'));
                    if ($returnResponse->setupBillHighwayProfile->BillHighwaySaveIndividual == 'Success') {
                        try {
                            //Map Payment Token to Individual in BillHighway System
                            $loggingParams = $this->getParametersForLogging($modelEDues->EDuesEnrollmentId, $user->Id, 'MFP/SetupBillHighwayProfile/MapPaymentTokenToIndividual');
                            $bhResponseMapToken = BillHighwayPayment::MapPaymentTokenToIndividual($billHighwayGroupId, $individualGuid, $paymentInformation->Token, $loggingParams);
                            $returnResponse->setupBillHighwayProfile->BillHighwayMapPaymentTokenToIndividual = 'Success';
                            if (isset($bhResponseMapToken->Messages[0]->Type) && $bhResponseMapToken->Messages[0]->Type == 'Error') {
                                //Log Exception
                                $bhIndividualId = -1; // Overriding -1 for enabling Resubmission menu in case of error
                                $returnResponse->setupBillHighwayProfile->BillHighwayMapPaymentTokenToIndividual = 'Error: '.$bhResponseMapToken->Messages[0]->Code.' - '.$bhResponseMapToken->Messages[0]->Message;
                            }
                        } catch (Exception $ex) {
                            //Log any other exception
                            $bhIndividualId = -1; // Overriding -1 for enabling Resubmission menu in case of error
                            $returnResponse->setupBillHighwayProfile->BillHighwayMapPaymentTokenToIndividual = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
                        }
                    }
                }

                try {
                    // Update Payment Info and BillHighway Individual Id in AftDB/EduesEnrollment table
                    if (isset($modelEDues)) {
                        $modelEDues->BHIndividualId = (isset($bhIndividualId) && $bhIndividualId > 0) ? $bhIndividualId : -1;
                        if ($isPaymentProcessingForm || $isStateFedRecurringCope) {
                            $modelEDues->PaymentMethod = isset($paymentInformation->CardDetails)
                                ? 'Credit Card' : 'Bank Draft';
                            $modelEDues->AccountType = isset($paymentInformation->CardDetails)
                                ? $paymentInformation->CardDetails->CardType : $paymentInformation->AchDetails->AccountType;
                            $modelEDues->AccountNumberLastFour = isset($paymentInformation->CardDetails)
                                ? $paymentInformation->CardDetails->Last4 : $paymentInformation->AchDetails->AccountNumberLast4;
                            $modelEDues->PaymentToken = $paymentInformation->Token;
                        }
                        $modelEDues->save();

                        $returnResponse->setupBillHighwayProfile->SaveEDuesEnrollment = 'Success';
                    }
                } catch (Exception $ex) {
                    //Log any other exception
                    $returnResponse->setupBillHighwayProfile->SaveEDuesEnrollment = 'Error: ' . $ex->getCode() . ' - ' . $ex->getMessage();
                }

                return json_encode($returnResponse);
            }

            return 'Error: setupBillHighwayProfile - Submission not found';
        }

        return 'Error: setupBillHighwayProfile - Not a paymentProcessing or dataForm template';
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

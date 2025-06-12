<?php

namespace Aft\MemberForms\Http\Resources;

use Aft\MemberForms\Models\EDuesEnrollment;
use App\Models\IndividualAffiliate;
use App\Models\StateTerritory;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FormSubmission extends AbstractResource
{
    protected function getRelationshipFields(): array
    {
        return [
        ];
    }

    protected function getSimpleFields(): array
    {
        return [

        ];
    }

    #[\Override]
    protected function exportCell($fieldName)
    {
        $form_submission_data_arr = [];
        foreach ($this->FormSubmissionData as $item) {
            $form_submission_data_arr[$item->data_name] = $item;
        }
        $form_submission_data = (object) $form_submission_data_arr;
        switch ($fieldName) {
            case 'Form Name':
                return $this->form->system_name;
            case 'Form Title':
                return $this->form->display_name;
            case 'Submission Type':
                return $this->SubmissionStatus->status_name;
            case 'Date Submitted':
                return date('M d, Y', strtotime($this->CreatedAt));
            case 'fullName':
                if (isset($form_submission_data->middleName)) {
                    return $form_submission_data->firstName->data_value.' '.$form_submission_data->middleName->data_value.' '.$form_submission_data->lastName->data_value;
                } else {
                    return $form_submission_data->firstName->data_value.' '.$form_submission_data->lastName->data_value;
                }
            case 'firstName':
                return $form_submission_data->firstName->data_value;
            case 'middleName':
                return isset($form_submission_data->middleName) ? $form_submission_data->middleName->data_value : '';
            case 'lastName':
                return $form_submission_data->lastName->data_value;
            case 'preferredName':
                return isset($form_submission_data->preferredName) ? $form_submission_data->preferredName->data_value : '';
            case 'dateOfBirth':
                return isset($form_submission_data->dateOfBirth) ? $form_submission_data->dateOfBirth->data_value : '';
            case 'email':
                return $form_submission_data->email->data_value;
            case 'emailPersonalPreferred':
                $preferred = isset($form_submission_data->emailPersonalPreferred) ? $form_submission_data->emailPersonalPreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'emailWork':
                return isset($form_submission_data->emailWork) ? $form_submission_data->emailWork->data_value : '';
            case 'emailWorkPreferred':
                $preferred = isset($form_submission_data->emailWorkPreferred) ? $form_submission_data->emailWorkPreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'phoneWork':
                return isset($form_submission_data->phoneWork) ? $form_submission_data->phoneWork->data_value : '';
            case 'phoneMobile':
                return isset($form_submission_data->phoneMobile) ? $form_submission_data->phoneMobile->data_value : '';
            case 'phoneHome':
                return isset($form_submission_data->phoneHome) ? $form_submission_data->phoneHome->data_value : '';
            case 'phoneWorkPreferred':
                $preferred = isset($form_submission_data->phoneWorkPreferred) ? $form_submission_data->phoneWorkPreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'phoneMobilePreferred':
                $preferred = isset($form_submission_data->phoneMobilePreferred) ? $form_submission_data->phoneMobilePreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'phoneHomePreferred':
                $preferred = isset($form_submission_data->phoneHomePreferred) ? $form_submission_data->phoneHomePreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'address':
                $stateValue = StateTerritory::where('stateterritoryid', $form_submission_data->state->data_value)
                    ->first('StateTerritoryName')
                    ->StateTerritoryName;
                return $form_submission_data->addressLine1->data_value.' '.$form_submission_data->city->data_value.' '.$stateValue.' '.$form_submission_data->zip->data_value;

            case 'addressLine1':
                return isset($form_submission_data->addressLine1) ? $form_submission_data->addressLine1->data_value : '';
            case 'addressLine2':
                return isset($form_submission_data->addressLine2) ? $form_submission_data->addressLine2->data_value : '';
            case 'city':
                return isset($form_submission_data->city) ? $form_submission_data->city->data_value : '';
            case 'state':
                return StateTerritory::where('stateterritoryid', $form_submission_data->state->data_value)
                ->first('StateTerritoryName')
                ->StateTerritoryName;
            case 'zip':
                return isset($form_submission_data->zip) ? $form_submission_data->zip->data_value : '';
            case 'addressHomePreferred':
                $preferred = isset($form_submission_data->addressHomePreferred) ? $form_submission_data->addressHomePreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'billingAddress':
                $billingAddress = '';
                if (isset($form_submission_data->billingSameAsHome) && $form_submission_data->billingSameAsHome->data_value) {
                    $billingAddress = 'Same as Home addess';
                } elseif (isset($form_submission_data->billingState)) {
                    $stateValue = StateTerritory::where('stateterritoryid', $form_submission_data->billingState->data_value)
                    ->first('StateTerritoryName')
                    ->StateTerritoryName;

                    $billingAddress = $form_submission_data->billingAddressLine1->data_value.' '.$form_submission_data->billingCity->data_value.' '.$stateValue.' '.$form_submission_data->billingZip->data_value;
                }
                return $billingAddress;

            case 'billingAddressLine1':
                return isset($form_submission_data->billingAddressLine1) ? $form_submission_data->billingAddressLine1->data_value : '';
            case 'billingAddressLine2':
                return isset($form_submission_data->billingAddressLine2) ? $form_submission_data->billingAddressLine2->data_value : '';
            case 'billingCity':
                return isset($form_submission_data->billingCity) ? $form_submission_data->billingCity->data_value : '';
            case 'billingState':
                return StateTerritory::where('stateterritoryid', $form_submission_data->billingState->data_value)
                ->first('StateTerritoryName')
                ->StateTerritoryName;
            case 'billingZip':
                return isset($form_submission_data->billingZip) ? $form_submission_data->billingZip->data_value : '';
            case 'addressBillingPreferred':
                $preferred = isset($form_submission_data->addressBillingPreferred) ? $form_submission_data->addressBillingPreferred->data_value : '';
                return $preferred ? 'Yes' : 'No';
            case 'employeeID':
                return isset($form_submission_data->employeeID) ? $form_submission_data->employeeID->data_value : '';
            case 'employerHireDate':
                return isset($form_submission_data->employerHireDate) ? $form_submission_data->employerHireDate->data_value : '';
            case 'localJobClassName':
                return isset($form_submission_data->localJobClassName) ? $form_submission_data->localJobClassName->data_value : '';
            case 'LocalDuesCategoryName':
                return isset($form_submission_data->LocalDuesCategoryName) ? $form_submission_data->LocalDuesCategoryName->data_value : '';
            case 'LocalDuesCategoryPrice':
                return isset($form_submission_data->LocalDuesCategoryPrice) ? $form_submission_data->LocalDuesCategoryPrice->data_value : '';
            case 'copeAmount':
                return isset($form_submission_data->copeAmount) ? $form_submission_data->copeAmount->data_value : '';
            case 'BillingTypeName':
                return isset($form_submission_data->BillingTypeName) ? $form_submission_data->BillingTypeName->data_value : '';
            case 'ChapterName':
                return isset($form_submission_data->ChapterName) ? $form_submission_data->ChapterName->data_value : '';
            case 'EmployerName':
                return isset($form_submission_data->EmployerName) ? $form_submission_data->EmployerName->data_value : '';
            case 'UnitName':
                return isset($form_submission_data->UnitName) ? $form_submission_data->UnitName->data_value : '';
            case 'workLocationName':
                return isset($form_submission_data->workLocationName) ? $form_submission_data->workLocationName->data_value : '';
            case 'customField1':
                return isset($form_submission_data->customField1) ? $form_submission_data->customField1->data_value : '';
            case 'customField2':
                return isset($form_submission_data->customField2) ? $form_submission_data->customField2->data_value : '';
            case 'customField3':
                return isset($form_submission_data->customField3) ? $form_submission_data->customField3->data_value : '';
            case 'customUserField1':
                return isset($form_submission_data->customUserField1) ? $form_submission_data->customUserField1->data_value : '';
            case 'customTextField-1':
                return isset($form_submission_data_arr['customTextField-1']) ? $form_submission_data_arr['customTextField-1']->data_value : '';
            case 'customTextField-2':
                return isset($form_submission_data_arr['customTextField-2']) ? $form_submission_data_arr['customTextField-2']->data_value : '';
            case 'customTextField-3':
                return isset($form_submission_data_arr['customTextField-3']) ? $form_submission_data_arr['customTextField-3']->data_value : '';
            case 'markupTextField-1':
                return isset($form_submission_data_arr['markupTextField-1']) ? $form_submission_data_arr['markupTextField-1']->data_value : '';
            case 'markupTextField-2':
                return isset($form_submission_data_arr['markupTextField-2']) ? $form_submission_data_arr['markupTextField-2']->data_value : '';
            case 'markupTextField-3':
                return isset($form_submission_data_arr['markupTextField-3']) ? $form_submission_data_arr['markupTextField-3']->data_value : '';
            case 'customSelectionField-1':
                return isset($form_submission_data_arr['customSelectionField-1']) ? $form_submission_data_arr['customSelectionField-1']->data_value : '';
            case 'customSelectionField-2':
                return isset($form_submission_data_arr['customSelectionField-2']) ? $form_submission_data_arr['customSelectionField-2']->data_value : '';
            case 'customSelectionField-3':
                return isset($form_submission_data_arr['customSelectionField-3']) ? $form_submission_data_arr['customSelectionField-3']->data_value : '';
            case 'paymentMethod':
                return isset($form_submission_data->paymentMethod) ? $form_submission_data->paymentMethod->data_value : '';
            case 'Individual Guid':
                return  $this->Individual ? $this->Individual->IndividualGuid : "";
            case 'Billhighway Individual Id':
                $billhighwayIndividualId = "";
                if ($this->Individual) {
                    $individualId = $this->Individual->IndividualId;
                    $billhighwayIndividualId = EDuesEnrollment::where('IndividualId', $individualId)
                        ->first('BHIndividualId');
                    if ($billhighwayIndividualId) {
                        $billhighwayIndividualId = $billhighwayIndividualId->BHIndividualId;
                    }
                }
                return $billhighwayIndividualId;
            // case 'Billhighway Group Id':
            //     $billhighwayId = "";
            //     if($this->Form && $this->Form->Affiliate){
            //         $billhighwayId = $this->Form->Affiliate->BillHighwayGroupId;
            //     }
            //     return  $billhighwayId;
        }
    }

    protected function includeLastDeactivatedIndividualAffiliate(): AnonymousResourceCollection
    {
        return IndividualAffiliate::collection($this->lastDeactivatedIndividualAffiliate);
    }
}

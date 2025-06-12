<?php

namespace Aft\MemberForms\Http\Controllers;

use Aft\BillHighway\BillingTypes;
use Aft\BillHighway\Models\AchInfo;
use Aft\BillHighway\Models\Address;
use Aft\BillHighway\Models\CardInfo;
use Aft\BillHighway\Payment;
use Aft\MemberForms\Http\Controllers\Admin\FormSourcesController;
use Aft\MemberForms\Http\Controllers\Admin\FormSubmissionController;
use Aft\MemberForms\Http\Controllers\Captcha\MathCaptchaController;
use Aft\MemberForms\Http\Email\Email;
use Aft\MemberForms\Models\DuesMapping;
use Aft\MemberForms\Models\Form;
use Aft\MemberForms\Models\FormSubmission;
use Aft\MemberForms\Models\FormSubmissionData;
use Aft\MemberForms\Models\UrlRedirect;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Chapter;
use App\Models\JobTitle;
use App\Models\LocalDuesCategory;
use App\Models\LocalJobClass;
use App\Models\StateTerritory;
use App\Models\Country;
use App\Models\Unit;
use App\Models\WorkLocation;
use App\Models\WorkLocationType;
use App\Models\WorkStructure;
use App\Models\WorkStructureType;
use Dompdf\Dompdf;
use Dompdf\Options;
use Exception;
use Generator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class FormController extends Controller
{
    public function stateIndex()
    {
        $affiliateIds = Form::select('affiliate_id')
            ->where('show_in_directory', '=', true)
            ->pluck('affiliate_id');

        return Affiliate::withoutGlobalScopes()
            ->select('LocationStateAbr')
            ->whereIn('AffiliateId', $affiliateIds)
            ->orderBy('LocationStateAbr')
            ->get();
    }

    public function index($state)
    {
        $affiliateIds = Affiliate::withoutGlobalScopes()
            ->select('AffiliateId')
            ->where('LocationStateAbr', '=', $state)
            ->pluck('AffiliateId');

        return Form::with('Affiliate:AffiliateId,AffiliateNumber,AffiliateName')
            ->where('show_in_directory', true)
            ->whereIn('affiliate_id', $affiliateIds)
            ->orderBy('order')
            ->get();
    }

    public function getCountries()
    {
        return Country::whereNotNull('CountryCallingCode')
            ->whereNull('DeletedAt')
            ->orderBy('DisplayOrder')
            ->select(
                'CountryId',
                'CountryGuid',
                'CountryName',
                'CountryCode',
                'ISO3',
                'CountryCallingCode',
                DB::raw("'+' + CountryCallingCode + ' (' + CountryCode + ')' as CountryCallingCodeDisplay"),
                'DisplayOrder'
            )
            ->get();
    }

    public function sourceSearch(): array
    {
        return [1, 2, 3, 4];
    }

    private function getFieldSource($fields, $sources, $templateId)
    {
        foreach ($fields as &$field) {
            if ($field['type'] == 'LocalDuesCategory') {
                $LocalDuesCategoryName = array_column($field['source'], 'LocalDuesCategoryName');
                array_multisort($LocalDuesCategoryName, SORT_ASC, $field['source']);
            }
            if ($field['type'] == 'group' || $field['type'] == 'billingAddress') {
                $field['fields'] = $this->getFieldSource($field['fields'], $sources, $templateId);
            } else {
                if ($field['type'] != 'LocalDuesCategory' && $field['type'] != 'employmentInformation' && $field['type'] != 'workLocation' && $field['type'] != 'workStructure' && $field['type'] != 'jobTitle' && $field['type'] != 'childAffiliate') {
                    if (($field['source'] ?? false) && ($sources[$field['source']] ?? false)) {
                        $field['source'] = FormSourcesController::toDefault($sources[$field['source']], $sources);
                        /*switch ($sources[$field['source']]['type']) {
                            case 'search':
                                //$field['source'] = $this->sourceSearch();
                                $field['source'] = FormSourcesController::toDefault($source, $sources);
                                break;
                            default: break;
                        }*/
                    }
                } elseif ($field['type'] == 'LocalDuesCategory') {
                    if ($templateId == 1 || $templateId == 2) {
                        $source = $field['source'];
                        $localDuesCategoryIds = [];

                        foreach ($source as $s) {
                            $localDuesCategoryIds[] = $s['LocalDuesCategoryId'];
                        }
                        $localDuesCategories = LocalDuesCategory::whereIn('LocalDuesCategoryId', $localDuesCategoryIds)->get();
                        $duesCategoryAmount = [];
                        $duesCategoryPercentage = [];

                        foreach ($localDuesCategories as $localDuesCategory) {
                            $duesCategoryAmount[$localDuesCategory->LocalDuesCategoryId] = $localDuesCategory->LocalDuesAmount;
                            $duesCategoryPercentage[$localDuesCategory->LocalDuesCategoryId] = $localDuesCategory->LocalDuesPercentage;
                        }

                        foreach ($source as $key => $src) {
                            $localDuesCategoryId = $src['LocalDuesCategoryId'];
                            if(isset($duesCategoryAmount[$localDuesCategoryId])|| isset($duesCategoryPercentage[$localDuesCategoryId]))
                            {
                                $source[$key]['LocalDuesAmount'] = $duesCategoryAmount[$localDuesCategoryId];
                            } else {
                                unset($source[$key]);
                            }
                        }

                        $field['source'] = array_values($source);
                    }
                }
            }
        }

        return $fields;
    }

    private function setPreferredFields($fields)
    {
        $addressFieldsCount = 0;
        $phoneFieldsCount = 0;
        $emailFieldsCount = 0;

        foreach ($fields as $field) {
            if (isset($field['fieldName']) && $field['fieldName'] == 'mailingAddress') {
                $addressFieldsCount++;
            }
            if (isset($field['fieldName']) && $field['fieldName'] == 'billingAddress') {
                $addressFieldsCount++;
            }

            if (isset($field['fieldName']) && $field['fieldName'] == 'phoneHomeGroup') {
                $phoneFieldsCount++;
            }
            if (isset($field['fieldName']) && $field['fieldName'] == 'phoneWorkGroup') {
                $phoneFieldsCount++;
            }
            if (isset($field['fieldName']) && $field['fieldName'] == 'phoneMobile') {
                $phoneFieldsCount++;
            }

            if (isset($field['fieldName']) && $field['fieldName'] == 'emailPersonalGroup') {
                $emailFieldsCount++;
            }
            if (isset($field['fieldName']) && $field['fieldName'] == 'emailWorkGroup') {
                $emailFieldsCount++;
            }
        }
        foreach ($fields as &$field) {
            if ($field['type'] == 'group' || $field['type'] == 'billingAddress') {
                foreach ($field['fields'] as $key => &$field2) {
                    if ($addressFieldsCount == 1 && ($key == 'addressHomePreferred' || $key == 'addressBillingPreferred')) {
                        $field2['value'] = true;
                    }
                    if ($phoneFieldsCount == 1 && ($key == 'phoneHomePreferred' || $key == 'phoneWorkPreferred' || $key == 'phoneMobilePreferred')) {
                        $field2['value'] = true;
                    }
                    if ($emailFieldsCount == 1 && ($key == 'emailPersonalPreferred' || $key == 'emailWorkPreferred')) {
                        $field2['value'] = true;
                    }
                }
            }
        }

        return $fields;
    }

    private function filterFieldAttributes($fields)
    {
        foreach ($fields as &$field) {
            foreach ($field as $key => $value) {
                if ($key == 'fields') {
                    $field[$key] = $this->filterFieldAttributes($value);
                }
                if (! in_array($key, [
                    'order',
                    'fieldName',
                    'fields',
                    'label',
                    'required',
                    'type',
                    'default',
                    'value',
                    'fieldsAsRows',
                    'source',
                    'showPrice',
                    'showCope',
                    'templateId',
                    'minlength',
                    'maxlength',
                ])) {
                    unset($field[$key]);
                }
            }
        }

        return $fields;
    }

    public function show($id)
    {
        $form = Form::where('memberforms_forms.id', $id)
            ->select('memberforms_forms.id', 'memberforms_forms.form_template_id', 'memberforms_forms.affiliate_id', 'memberforms_forms.display_name', 'memberforms_forms.description', 'memberforms_forms.sources', 'memberforms_forms.fields', 'memberforms_forms.thankyou_fields', 'memberforms_forms.show_aft_logo', 'show_local_logo', 'show_fed_logo', 'affiliate_logo.local_logo as local_logo', 'affiliate_logo.fed_logo as fed_logo')
            ->leftJoin('affiliate_logo', 'affiliate_logo.affiliate_id', '=', 'memberforms_forms.affiliate_id')
            ->whereNull('deletedAt')
            ->where('archived', false)
            ->first();
        if ($form) {
            if ($form->show_local_logo && $form->local_logo) {
                $form->local_logo_url = Storage::url($form->local_logo);
            }
            if ($form->show_fed_logo && $form->fed_logo) {
                $form->fed_logo_url = Storage::url($form->fed_logo);
            }

            $form->fields = Arr::sort($form->fields, fn($field) => $field['order']);
            $form->fields = $this->getFieldSource($form->fields, $form->sources, $form->form_template_id);
            $form->fields = $this->filterFieldAttributes($form->fields);
            $form->fields = $this->setPreferredFields($form->fields);

            if ($form->form_template_id == 4 || $form->form_template_id == 5 || $form->form_template_id == 9) {
                //Rebuild LocalDuesCategory's source with real time BH billing type information
                $form->fields = $this->rebuildSourceForBillHighwayBillingTypes($form->affiliate_id, $form->fields);
            }

            return $form;
        }

        return null;
    }

    //Fetch real-time billhighway billing type information for payment processing templates
    private function rebuildSourceForBillHighwayBillingTypes($affiliateId, $fields)
    {
        foreach ($fields as &$field) {
            if ($field['fieldName'] == 'LocalDuesCategory') {
                $formSourceIds = [];
                $index = 0;
                //Get the form's LocalDuesCategoryIds from the LocalDuesCategory's source to rebuild from BillHighway
                foreach ($field['source'] as $val) {
                    $formSourceIds[$index] = $val['LocalDuesCategoryId'];
                    $index++;
                }
                //Fetch Billing types from BH for the affiliate
                $billHighwayGroupId = Affiliate::withoutGlobalScopes()
                    ->where('Affiliate.AffiliateId', $affiliateId)
                    ->get('BillHighwayGroupId')
                    ->first()->BillHighwayGroupId;
                if ($billHighwayGroupId) {
                    //fetch Active BillingTypes
                    $activeBillingTypes = array_filter(BillingTypes::GetRecurringBillingTypes($billHighwayGroupId)->Results, fn($billingType) => $billingType->IsActive);

                    $rebuildSource = [];
                    $index = 0;
                    //Rebuild LocalDuesCategory's source to reflect real-time BH Billing Type information
                    foreach ($activeBillingTypes as $billHighwayData) {
                        if (count($formSourceIds) > 0) {
                            if (in_array($billHighwayData->BillingTypeID, $formSourceIds)) {
                                $rebuildSource[$index]['LocalDuesCategoryId'] = $billHighwayData->BillingTypeID;
                                $rebuildSource[$index]['LocalDuesCategoryName'] = $billHighwayData->BillingTypeName;
                                $rebuildSource[$index]['LocalDuesAmount'] = $billHighwayData->Amount;
                                $rebuildSource[$index]['LocalDuesPercentage'] = null;
                                $rebuildSource[$index]['InvoiceDescription'] = $billHighwayData->InvoiceDescription;
                                $index++;
                            }
                        }
                    }
                    $field['source'] = $rebuildSource;
                }
                break;
            }
        }

        return $fields;
    }

    /**
     * @return mixed[]
     */
    private function flattenSubmissionFields($submission, $parent = null): array
    {
        $fields = [];
        $customField1Count = 1;
        $customField2Count = 1;
        $customField3Count = 1;
        $customField4Count = 1;
        $customField5Count = 1;
        $customField6Count = 1;
        $customField7Count = 1;
        foreach ($submission as $fieldName => $field) {
            switch ($field['type']) {
                case 'group':
                case 'billingAddress':
                    $fields = array_merge($fields, $this->flattenSubmissionFields($field['fields'], $field));
                    break;
                default:
                    if (is_numeric($fieldName)) {
                        if ($field['type'] == 'LocalDuesCategory' && $field['templateId'] == 3) {
                            $field['value'] = 1;
                        }
                        if ($field['type'] == 'employmentInformation') {
                            if (is_numeric($field['value'])) {
                                $field['value'] = '';
                            }
                        }
                        if ($field['type'] == 'workLocation') {
                            if (is_numeric($field['value'])) {
                                $field['value'] = '';
                            }
                        }
                        if ($field['type'] == 'workStructure') {
                            if (is_numeric($field['value'])) {
                                $field['value'] = '';
                            }
                        }
                        if ($field['type'] == 'jobTitle') {
                            if (isset($field['value']) && is_numeric($field['value'])) {
                                $field['value'] = '';
                            }
                        }
                        if ($field['fieldName'] == 'customSelectionField') {
                            $key = 'customSelectionField-'.$customField1Count;
                            $fields[$key] = $field;
                            $customField1Count += 1;
                        } elseif ($field['fieldName'] == 'customField1') {
                            $key = 'customField1-'.$customField3Count;
                            $fields[$key] = $field;
                            $customField3Count += 1;
                        } elseif ($field['fieldName'] == 'customField2') {
                            $key = 'customField2-'.$customField4Count;
                            $fields[$key] = $field;
                            $customField4Count += 1;
                        } elseif ($field['fieldName'] == 'customField3') {
                            $key = 'customField3-'.$customField5Count;
                            $fields[$key] = $field;
                            $customField5Count += 1;
                        } elseif ($field['fieldName'] == 'customSelectionField1') {
                            $key = 'customSelectionField1-'.$customField6Count;
                            $fields[$key] = $field;
                            $customField6Count += 1;
                        } elseif ($field['fieldName'] == 'customTextField') {
                            $key = 'customTextField-'.$customField2Count;
                            $fields[$key] = $field;
                            $customField2Count += 1;
                        } elseif ($field['fieldName'] == 'markupTextField') {
                            $key = 'markupTextField-'.$customField7Count;
                            $fields[$key] = $field;
                            $customField7Count += 1;
                        } else {
                            $fields[$field['fieldName']] = $field;
                        }
                    } else {
                        if (! is_null($parent)) {
                            if (array_key_exists('label', $parent) && array_key_exists('label', $field) && $field['label'] == 'Phone Number') {
                                $field['label'] = $parent['label'];
                            }
                        }
                        $fields[$fieldName] = $field;
                    }
                    break;
            }
        }

        return $fields;
    }

    private function generateFormFields($fields): Generator
    {
        foreach ($fields as $fieldName => $field) {
            switch ($field['type']) {
                case 'group':
                case 'billingAddress':
                    yield from $this->generateFormFields($field['fields']);
                    break;
                default:
                    if (is_numeric($fieldName)) {
                        yield $field['fieldName'] => $field;
                    } else {
                        yield $fieldName => $field;
                    }
                    break;
            }
        }
    }

    private function validateFormSubmission(array $submissionFields, array $formFields): void
    {
        $errors = [];
        $customField1Count = 1;
        $customTextFieldCount = 1;
        $preferredPhoneCount = 0;
        $preferredAddressCount = 0;
        $preferredEmailCount = 0;
        $hasPreferredEmail = false;
        $hasPreferredPhone = false;
        $hasPreferredAddress = false;
        foreach ($formFields as $formFieldName => $formField) {
            if ($formFieldName == 'customSelectionField') {
                $key = 'customSelectionField-'.$customField1Count;
                $customField1Count += 1;
                if (($formField['required'] ?? false) && empty($submissionFields[$key]['value']['selectionChoicesAnswer'])) {
                    $errors[] = [$formFieldName => $formField['label'].' is required'];
                }
            } elseif ($formFieldName == 'workLocation') {
                if (($formField['required'] ?? false) && empty($submissionFields[$formFieldName]['value']['selectedWorkLocation'])) {
                    $errors[] = [$formFieldName => $formField['label'].' is required'];
                }
            } elseif ($formFieldName == 'workStructure') {
                if (($formField['required'] ?? false) && empty($submissionFields[$formFieldName]['value']['selectedWorkStructure'])) {
                    $errors[] = [$formFieldName => $formField['label'].' is required'];
                }
            } elseif ($formFieldName == 'jobTitle') {
                if (($formField['required'] ?? false) && empty($submissionFields[$formFieldName]['value']['jobTitleId'])) {
                    $errors[] = [$formFieldName => $formField['label'].' is required'];
                }
            } elseif ($formFieldName == 'phoneHomePreferred') {
                $hasPreferredPhone = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredPhoneCount += 1;
                }
            } elseif ($formFieldName == 'phoneMobilePreferred') {
                $hasPreferredPhone = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredPhoneCount += 1;
                }
            } elseif ($formFieldName == 'phoneWorkPreferred') {
                $hasPreferredPhone = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredPhoneCount += 1;
                }
            } elseif ($formFieldName == 'addressHomePreferred') {
                $hasPreferredAddress = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredAddressCount += 1;
                }
            } elseif ($formFieldName == 'addressBillingPreferred') {
                $hasPreferredAddress = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredAddressCount += 1;
                }
            } elseif ($formFieldName == 'emailPersonalPreferred') {
                $hasPreferredEmail = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredEmailCount += 1;
                }
            } elseif ($formFieldName == 'emailWorkPreferred') {
                $hasPreferredEmail = true;
                if (! empty($submissionFields[$formFieldName]['value'])) {
                    $preferredEmailCount += 1;
                }
            } elseif ($formFieldName == 'customTextField') {
                $key = 'customTextField-'.$customTextFieldCount;
                $customTextFieldCount += 1;
                if (($formField['required'] ?? false) && (!isset($submissionFields[$key]['value']) || empty($submissionFields[$key]['value']))) {
                    $errors[] = [$formFieldName => $formField['label'].' is required'];
                }
            } elseif ($formFieldName == 'customCope') {
                if (($formField['required'] ?? false) && ! empty($submissionFields[$formFieldName]['value']) && is_null($submissionFields[$formFieldName]['value']['signature'])) {
                    $errors[] = [$formFieldName => $formField['label'].'- signature is required'];
                }
            } elseif (($formField['required'] ?? false) && empty($submissionFields[$formFieldName]['value'])) {
                $errors[] = [$formFieldName => $formField['label'].' is required'];
            }
        }
        if ($hasPreferredEmail && $preferredEmailCount > 1) {
            $errors[] = 'Please select only one preferred email';
        }

        if ($hasPreferredEmail && $preferredEmailCount == 0) {
            $errors[] = 'Please select one preferred email';
        }

        if ($hasPreferredPhone && $preferredPhoneCount > 1) {
            $errors[] = 'Please select only one preferred phone';
        }

        if ($hasPreferredPhone && $preferredPhoneCount == 0) {
            $errors[] = 'Please select one preferred phone';
        }

        if ($hasPreferredAddress && $preferredAddressCount > 1) {
            $errors[] = 'Please select only one preferred address';
        }

        if ($hasPreferredAddress && $preferredAddressCount == 0) {
            $errors[] = 'Please select one preferred address';
        }

        $this->validateHireAndStartDate($submissionFields, $formFields, $errors);
        if (! empty($errors)) {
            throw ValidationException::withMessages($errors);
        }
    }

    private function validateMathCaptcha($mathCaptchaAnswer, $randomImageId, $templateId): void
    {
        if ($templateId == 4 || $templateId == 5 || $templateId == 6) {
            if (empty($mathCaptchaAnswer)) {
                $errors[] = ['Math answer is required'];
                throw ValidationException::withMessages($errors);
            } else {
                $mcc = new MathCaptchaController();
                if (! $mcc->isValid($mathCaptchaAnswer, $randomImageId)) {
                    $errors[] = ['Math answer is invalid. Please retry...'];
                    throw ValidationException::withMessages($errors);
                }
            }
        }
    }

    private function validateHireAndStartDate(array $submissionFields, array $formFields, &$errors): void
    {
        $hireDateFieldName = 'employerHireDate';
        $startDateFieldName = 'employerStartDate';
        if (! empty($submissionFields[$hireDateFieldName]['value']) && ! empty($submissionFields[$startDateFieldName]['value'])) {
            if (strtotime((string) $submissionFields[$hireDateFieldName]['value']) > strtotime((string) $submissionFields[$startDateFieldName]['value'])) {
                $errors[] = [$hireDateFieldName => $formFields[$hireDateFieldName]['label'].' should be earlier than '.$formFields[$startDateFieldName]['label']];
            }
        }
    }

    private function getTokenForPaymentInformation(array $submissionFields, $form)
    {
        $tokenResponse = null;
        $BillHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $form->affiliate_id)
            ->get('BillHighwayGroupId')
            ->first()->BillHighwayGroupId;

        $paymentInfo = $submissionFields['payment']['value'];
        if ($paymentInfo['PaymentMethodSelected'] == 'Credit Card') {
            $billingAddress = new Address();

            $billingAddress->AddressLine1 = $submissionFields['billingAddressLine1']['value'];
            $billingAddress->AddressLine2 = $submissionFields['billingAddressLine2']['value'] ?? '';
            $billingAddress->City = $submissionFields['billingCity']['value'];
            $stateCode = StateTerritory::find($submissionFields['billingState']['value'])
                ->get('StateTerritoryCode')
                ->first()
                ->StateTerritoryCode;
            $billingAddress->State = $stateCode;
            $billingAddress->Zip = $submissionFields['billingZip']['value'];

            $cardInfoFromRequest = $paymentInfo['CreditCardInformation'];
            $cardInfo = new CardInfo();
            $cardInfo->NameOnCard = $cardInfoFromRequest['cardHolderName'];
            $cardInfo->CardNumber = $cardInfoFromRequest['cardNumber'];
            $cardInfo->Cvv = $cardInfoFromRequest['cvv'];
            $cardInfo->ExpMonth = explode('-', (string) $cardInfoFromRequest['exp'])[0];
            $cardInfo->ExpYear = explode('-', (string) $cardInfoFromRequest['exp'])[1];
            $cardInfo->Address = $billingAddress;

            $tokenResponse = Payment::GetPaymentTokenForCreditCard($BillHighwayGroupId, $cardInfo);
        } elseif ($paymentInfo['PaymentMethodSelected'] == 'Bank Draft') {
            $bankDraftInfoFromRequest = $paymentInfo['BankDraftInformation'];
            $achInfo = new AchInfo();
            $achInfo->AccountType = $bankDraftInfoFromRequest['accountType'];
            $achInfo->AccountHolderName = $bankDraftInfoFromRequest['accountHolderName'];
            $achInfo->RoutingNumber = $bankDraftInfoFromRequest['routingNumber'];
            $achInfo->AccountNumber = $bankDraftInfoFromRequest['accountNumber'];

            $tokenResponse = Payment::GetPaymentTokenForACH($BillHighwayGroupId, $achInfo);
        }

        return $tokenResponse;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return JsonResponse
     *
     * @throws Exception
     */
    public function store($id, Request $request)
    {
        $form = Form::where('id', $id)
            ->first();
        $data = $request->all();

        $submissionFields = $this->flattenSubmissionFields($data['fields'] ?? []);

        $employmentInformationFields = $form['employment_information_fields'] ?? [];

        $formFields = [];
        foreach ($this->generateFormFields($form['fields']) as $formFieldName => $formField) {
            $formFields[$formFieldName] = $formField;
        }
        $this->validateFormSubmission($submissionFields, $formFields);

        $tokenResponse = null;
        if (isset($submissionFields['payment']) && $submissionFields['payment']['type'] == 'payment') {
            // Captcha required for payment component
            if (env('MATH_CAPTCHA_ENABLED', false)) {
                $this->validateMathCaptcha($data['mathCaptchaAnswer'], $data['randomImageId'], $form->form_template_id);
            }
            try {
                $tokenResponse = $this->getTokenForPaymentInformation($submissionFields, $form);
            } catch (Exception) {
                throw ValidationException::withMessages([
                    // 'payment' => $ex->getMessage()
                    'payment' => 'Error occurred. Please try again later...',
                ]);
            }
            if (isset($tokenResponse) && isset($tokenResponse->Messages)) {
                if (strtolower($tokenResponse->Messages[0]->Type) == 'error') {
                    throw ValidationException::withMessages([
                        'payment' => $tokenResponse->Messages[0]->Message,
                    ]);
                }
            }
        }

        if ($form->form_template_id == 4 || $form->form_template_id == 5 || $form->form_template_id == 7 || $form->form_template_id == 9) {
            //Fetch AFT LocalDuesCategoryId before saving
            if (isset($submissionFields['LocalDuesCategory']) && $submissionFields['LocalDuesCategory']['type'] == 'LocalDuesCategory') {
                $billhighwayTypeId = $submissionFields['LocalDuesCategory']['value'];
                $localDuesCategoryIdFromMapping = DuesMapping::where('affiliate_id', $form->affiliate_id)
                    ->where('bill_highway_type_id', $billhighwayTypeId)
                    ->whereNull('DeletedAt')
                    ->get(['dues_category_id', 'billing_type_name'])
                    ->first();
                $submissionFields['LocalDuesCategory']['value'] = $localDuesCategoryIdFromMapping ? $localDuesCategoryIdFromMapping->dues_category_id : '';

                //Add BillHighway BillingType details (possibly mapping could change in future so saving the required details)
                $submissionFields['BillingTypeId']['value'] = $billhighwayTypeId;
                $submissionFields['BillingTypeId']['label'] = 'BillingTypeId';
                $submissionFields['BillingTypeId']['type'] = 'hidden';
                $submissionFields['BillingTypeName']['value'] = $localDuesCategoryIdFromMapping ? $localDuesCategoryIdFromMapping->billing_type_name : '';
                $submissionFields['BillingTypeName']['label'] = 'BillingTypeName';
                $submissionFields['BillingTypeName']['type'] = 'hidden';
            }
        }

        //Verify Phone fields for country codes; if no phone number exists, remove default country code
        if (isset($submissionFields['phoneWork'])
                && empty($submissionFields['phoneWork']['value'])
                && isset($submissionFields['phoneWorkCountry'])
        ) {
            $submissionFields['phoneWorkCountry']['value'] = null;
        }
        if (isset($submissionFields['phoneMobile'])
                && empty($submissionFields['phoneMobile']['value'])
                && isset($submissionFields['phoneMobileCountry'])
        ) {
            $submissionFields['phoneMobileCountry']['value'] = null;
        }
        if (isset($submissionFields['phoneHome'])
            && empty($submissionFields['phoneHome']['value'])
            && isset($submissionFields['phoneHomeCountry'])
        ) {
            $submissionFields['phoneHomeCountry']['value'] = null;
        }

        DB::transaction(function () use ($form, $submissionFields, $employmentInformationFields, &$submissionId, $tokenResponse): void {
            $submission = new FormSubmission([
                'form_id' => $form->id,
                'CreatedBy' => 0,
                'UpdatedBy' => 0,
            ]);
            $submission->save();
            $submissionId = $submission->id;
            $haveEmploymentInformation = false;

            foreach ($submissionFields as $fieldName => $field) {
                if (! empty($field['value'])) {
                    if ($field['type'] != 'employmentInformation' && $field['type'] != 'workLocation' && $field['type'] != 'workStructure' && $field['type'] != 'jobTitle' && $field['type'] != 'jobTitle') {
                        if ($field['type'] == 'payment') {
                            if (isset($tokenResponse) && $tokenResponse->Token) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'Token',
                                    'data_label' => 'Token',
                                    'data_value' => json_encode($tokenResponse),
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                            }

                            continue;
                        }

                        if ($field['type'] != 'workLocation' && $fieldName != 'childAffiliate') {
                            if (isset($field['label']) && $field['label'] != 'Cope') {
                                if ($field['type'] == 'customSelectionField') {
                                    $selectedChoice = $field['value']['selectionChoicesAnswer'];
                                    if (is_array($selectedChoice)) {
                                        $selectedChoice = implode(',', $selectedChoice);
                                    }
                                    $submissionData = new FormSubmissionData([
                                        'form_id' => $form->id,
                                        'submission_id' => $submission->id,
                                        'data_type' => $field['type'],
                                        'data_name' => $fieldName,
                                        'data_label' => $field['label'] ?? '',
                                        'data_value' => $selectedChoice,
                                        'CreatedBy' => 0,
                                        'UpdatedBy' => 0,
                                    ]);
                                    $submissionData->save();
                                } else {
                                    if ($field['type'] != 'customCope') {
                                        $submissionData = new FormSubmissionData([
                                            'form_id' => $form->id,
                                            'submission_id' => $submission->id,
                                            'data_type' => $field['type'],
                                            'data_name' => $fieldName,
                                            'data_label' => $field['label'] ?? '',
                                            'data_value' => $field['value'],
                                            'CreatedBy' => 0,
                                            'UpdatedBy' => 0,
                                        ]);
                                        $submissionData->save();
                                    }
                                }
                            }
                        }

                        if ($field['type'] == 'LocalDuesCategory') {
                            $localDuesCategoryId = $field['value'];
                            $localDuesCategory = LocalDuesCategory::find($localDuesCategoryId);
                            if ($localDuesCategory) {
                                if ($field['templateId'] != 3) {
                                    $submissionData = new FormSubmissionData([
                                        'form_id' => $form->id,
                                        'submission_id' => $submission->id,
                                        'data_type' => $field['type'],
                                        'data_name' => $fieldName.'Name',
                                        'data_label' => 'Local Dues Category Name',
                                        'data_value' => $localDuesCategory->LocalDuesCategoryName,
                                        'CreatedBy' => 0,
                                        'UpdatedBy' => 0,
                                    ]);
                                    $submissionData->save();
                                    if ($field['showPrice']) {
                                        $submissionData = new FormSubmissionData([
                                            'form_id' => $form->id,
                                            'submission_id' => $submission->id,
                                            'data_type' => $field['type'],
                                            'data_name' => $fieldName.'Price',
                                            'data_label' => 'Dues Amount',
                                            'data_value' => '$'.$localDuesCategory->LocalDuesAmount,
                                            'CreatedBy' => 0,
                                            'UpdatedBy' => 0,
                                        ]);
                                        $submissionData->save();
                                    }
                                }
                            }
                        }

                        if ($fieldName == 'childAffiliate') {
                            $localIds = [$field['value']];
                            if (count($localIds) > 0) {
                                $localCount = 1;
                                foreach ($localIds as $localId) {
                                    $childAffiliate = Affiliate::withoutGlobalScopes()->find($localId);
                                    if ($childAffiliate) {
                                        $submissionData = new FormSubmissionData([
                                            'form_id' => $form->id,
                                            'submission_id' => $submission->id,
                                            'data_type' => 'childAffiliate',
                                            'data_name' => $fieldName.'Id',
                                            'data_label' => 'Local '.$localCount,
                                            'data_value' => $childAffiliate->AffiliateId,
                                            'CreatedBy' => 0,
                                            'UpdatedBy' => 0,
                                        ]);
                                        $submissionData->save();
                                        $submissionData = new FormSubmissionData([
                                            'form_id' => $form->id,
                                            'submission_id' => $submission->id,
                                            'data_type' => 'childAffiliate',
                                            'data_name' => $fieldName.'Name',
                                            'data_label' => 'Local '.$localCount,
                                            'data_value' => $childAffiliate->AffiliateName,
                                            'CreatedBy' => 0,
                                            'UpdatedBy' => 0,
                                        ]);
                                        $submissionData->save();
                                        $submissionData = new FormSubmissionData([
                                            'form_id' => $form->id,
                                            'submission_id' => $submission->id,
                                            'data_type' => 'childAffiliate',
                                            'data_name' => $fieldName.'Number',
                                            'data_label' => 'Local '.$localCount,
                                            'data_value' => $childAffiliate->AffiliateNumber,
                                            'CreatedBy' => 0,
                                            'UpdatedBy' => 0,
                                        ]);
                                        $submissionData->save();
                                    }
                                    $localCount++;
                                }
                            }
                        }

                        if ($field['type'] == 'customCope') {
                            $copeData = $field['value'];
                            if (! empty($copeData['copeAmountSelected'])) {
                                $copeData = (object) $copeData;
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'copeAmount',
                                    'data_label' => 'Cope Amount',
                                    'data_value' => $copeData->copeAmountSelected == 'other' ?
                                        '$'.$copeData->copeOtherAmount : '$'.$copeData->copeAmountSelected,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                if (intval($form->form_template_id) != 7) {
                                    $submissionData = new FormSubmissionData([
                                        'form_id' => $form->id,
                                        'submission_id' => $submission->id,
                                        'data_type' => 'textarea',
                                        'data_name' => 'copeLegal',
                                        'data_label' => 'Cope Legal Language',
                                        'data_value' => $copeData->signatureText,
                                        'CreatedBy' => 0,
                                        'UpdatedBy' => 0,
                                    ]);
                                    $submissionData->save();

                                    $submissionData = new FormSubmissionData([
                                        'form_id' => $form->id,
                                        'submission_id' => $submission->id,
                                        'data_type' => 'drawing',
                                        'data_name' => 'copeSignature',
                                        'data_label' => 'Cope Signature',
                                        'data_value' => $copeData->signature,
                                        'CreatedBy' => 0,
                                        'UpdatedBy' => 0,
                                    ]);
                                    $submissionData->save();
                                }
                            }
                        }
                    }
                    if ($field['type'] == 'employmentInformation') {
                        $haveEmploymentInformation = true;
                        $employmentInformationData = $field['value'];

                        if (isset($employmentInformationData['chapterId'])) {
                            $chapterData = Chapter::find($employmentInformationData['chapterId']);
                            if ($chapterData) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'ChapterName',
                                    'data_label' => 'Chapter Name',
                                    'data_value' => $chapterData->ChapterName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'chapter',
                                    'data_label' => 'Chapter',
                                    'data_value' => $employmentInformationData['chapterId'],
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'ChapterName',
                                'data_label' => 'Chapter Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'chapter',
                                'data_label' => 'Chapter',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }

                        if (isset($employmentInformationData['employerId'])) {
                            $employerData = DB::connection('aftdb')->table('Employer')
                                ->where('EmployerId', '=', $employmentInformationData['employerId'])
                                ->first();
                            if ($employerData) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'EmployerName',
                                    'data_label' => 'Employer Name',
                                    'data_value' => $employerData->EmployerName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'employer',
                                    'data_label' => 'Employer',
                                    'data_value' => $employmentInformationData['employerId'],
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'EmployerName',
                                'data_label' => 'Employer Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'employer',
                                'data_label' => 'Employer',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }

                        if (isset($employmentInformationData['unitId'])) {
                            $unitData = Unit::find($employmentInformationData['unitId']);
                            if ($unitData) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'UnitName',
                                    'data_label' => 'Unit Name',
                                    'data_value' => $unitData->UnitName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'unit',
                                    'data_label' => 'Unit',
                                    'data_value' => $employmentInformationData['unitId'],
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'UnitName',
                                'data_label' => 'Unit Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'unit',
                                'data_label' => 'Unit',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }

                        if (isset($employmentInformationData['localJobClassId'])) {
                            $localJobClassData = LocalJobClass::find($employmentInformationData['localJobClassId']);
                            if ($localJobClassData) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'localJobClassName',
                                    'data_label' => 'Local Job Class Name',
                                    'data_value' => $localJobClassData->LocalJobClassName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'localJobClass',
                                    'data_label' => 'localJobClass',
                                    'data_value' => $employmentInformationData['localJobClassId'],
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'localJobClassName',
                                'data_label' => 'Local Job Class Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'localJobClass',
                                'data_label' => 'localJobClass',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }
                    }

                    if ($field['type'] == 'workLocation') {
                        $workLocationData = $field['value'];
                        if (isset($workLocationData['selectedWorkLocation'])) {
                            $workLocationId = $workLocationData['selectedWorkLocation'];
                            $workLocation = WorkLocation::find($workLocationId);
                            // echo var_dump($workLocation);exit;
                            if ($workLocation) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => $fieldName,
                                    'data_label' => 'Worklocation',
                                    'data_value' => $workLocationId,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $workLocationType = WorkLocationType::find($workLocation->WorkLocationTypeId);

                                $workLocationLabel = $workLocationType ? $workLocationType->WorkLocationTypeName : 'Work Location Name';

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => $fieldName.'Name',
                                    'data_label' => $workLocationLabel,
                                    'data_value' => $workLocation->WorkLocationName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                                $workLocationObj = $workLocation;
                                while ($workLocationObj->ParentWorkLocationId) {
                                    $workLocationObj = WorkLocation::find($workLocation->ParentWorkLocationId);
                                    $workLocationType = WorkLocationType::find($workLocationObj->WorkLocationTypeId);

                                    $workLocationLabel = $workLocationType ? $workLocationType->WorkLocationTypeName : 'Work Location Name';

                                    $submissionData = new FormSubmissionData([
                                        'form_id' => $form->id,
                                        'submission_id' => $submission->id,
                                        'data_type' => $field['type'],
                                        'data_name' => $fieldName.'Name',
                                        'data_label' => $workLocationLabel,
                                        'data_value' => $workLocationObj->WorkLocationName,
                                        'CreatedBy' => 0,
                                        'UpdatedBy' => 0,
                                    ]);
                                    $submissionData->save();
                                }
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => $fieldName.'Name',
                                'data_label' => 'Work Location Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => $fieldName,
                                'data_label' => 'Work Location',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }
                    }

                    if ($field['type'] == 'workStructure') {
                        $workStructureData = $field['value'];
                        if (isset($workStructureData['selectedWorkStructure'])) {
                            $workStructureId = $workStructureData['selectedWorkStructure'];
                            $workStructure = WorkStructure::find($workStructureId);
                            if ($workStructure) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => $fieldName,
                                    'data_label' => 'Work Structure',
                                    'data_value' => $workStructureId,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $workStructureType = WorkStructureType::find($workStructure->WorkStructureTypeId);

                                $workStructureLabel = $workStructureType ? $workStructureType->WorkStructureTypeName : 'Work Structure Name';

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => $fieldName.'Name',
                                    'data_label' => $workStructureLabel,
                                    'data_value' => $workStructure->WorkStructureName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $workStructureObj = $workStructure;
                                while ($workStructureObj->ParentWorkStructureId) {
                                    $workStructureObj = WorkStructure::find($workStructure->ParentWorkStructureId);
                                    $workStructureType = WorkStructureType::find($workStructureObj->WorkStructureTypeId);

                                    $workStructureLabel = $workStructureType ? $workStructureType->WorkStructureTypeName : 'Work Structure Name';

                                    $submissionData = new FormSubmissionData([
                                        'form_id' => $form->id,
                                        'submission_id' => $submission->id,
                                        'data_type' => $field['type'],
                                        'data_name' => $fieldName.'Name',
                                        'data_label' => $workStructureLabel,
                                        'data_value' => $workStructureObj->WorkStructureName,
                                        'CreatedBy' => 0,
                                        'UpdatedBy' => 0,
                                    ]);
                                    $submissionData->save();
                                }
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => $fieldName.'Name',
                                'data_label' => 'Work Structure Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => $fieldName,
                                'data_label' => 'Workstructure',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }
                    }

                    if ($field['type'] == 'jobTitle') {
                        $jobTitleData = $field['value'];
                        if (isset($jobTitleData['jobTitleId'])) {
                            $jobTitle = JobTitle::find($jobTitleData['jobTitleId']);
                            if ($jobTitle) {
                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'jobTitleName',
                                    'data_label' => 'Job Title Name',
                                    'data_value' => $jobTitle->JobTitleName,
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();

                                $submissionData = new FormSubmissionData([
                                    'form_id' => $form->id,
                                    'submission_id' => $submission->id,
                                    'data_type' => $field['type'],
                                    'data_name' => 'jobTitle',
                                    'data_label' => 'jobTitle',
                                    'data_value' => $jobTitleData['jobTitleId'],
                                    'CreatedBy' => 0,
                                    'UpdatedBy' => 0,
                                ]);
                                $submissionData->save();
                            }
                        } else {
                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'jobTitleName',
                                'data_label' => 'Job Title Name',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();

                            $submissionData = new FormSubmissionData([
                                'form_id' => $form->id,
                                'submission_id' => $submission->id,
                                'data_type' => $field['type'],
                                'data_name' => 'jobTitle',
                                'data_label' => 'jobTitle',
                                'data_value' => 'N/A',
                                'CreatedBy' => 0,
                                'UpdatedBy' => 0,
                            ]);
                            $submissionData->save();
                        }
                    }
                }
            }

            if (! $haveEmploymentInformation) {
                if (isset($employmentInformationFields['chapterId'])) {
                    $chapterData = Chapter::find($employmentInformationFields['chapterId']);
                    if ($chapterData) {
                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'ChapterName',
                            'data_label' => 'Chapter Name',
                            'data_value' => $chapterData->ChapterName,
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();

                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'chapter',
                            'data_label' => 'Chapter',
                            'data_value' => $employmentInformationFields['chapterId'],
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();
                    }
                } else {
                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'ChapterName',
                        'data_label' => 'Chapter Name',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();

                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'chapter',
                        'data_label' => 'Chapter',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();
                }

                if (isset($employmentInformationFields['employerId'])) {
                    $employerData = DB::connection('aftdb')->table('Employer')
                        ->where('EmployerId', '=', $employmentInformationFields['employerId'])
                        ->first();
                    if ($employerData) {
                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'EmployerName',
                            'data_label' => 'Employer Name',
                            'data_value' => $employerData->EmployerName,
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();

                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'employer',
                            'data_label' => 'Employer',
                            'data_value' => $employmentInformationFields['employerId'],
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();
                    }
                } else {
                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'EmployerName',
                        'data_label' => 'Employer Name',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();

                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'employer',
                        'data_label' => 'Employer',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();
                }

                if (isset($employmentInformationFields['unitId'])) {
                    $unitData = Unit::find($employmentInformationFields['unitId']);
                    if ($unitData) {
                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'UnitName',
                            'data_label' => 'Unit Name',
                            'data_value' => $unitData->UnitName,
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();

                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'unit',
                            'data_label' => 'Unit',
                            'data_value' => $employmentInformationFields['unitId'],
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();
                    }
                } else {
                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'UnitName',
                        'data_label' => 'Unit Name',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();

                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'unit',
                        'data_label' => 'Unit',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();
                }

                if (isset($employmentInformationFields['localJobClassId'])) {
                    $localJobClassData = LocalJobClass::find($employmentInformationFields['localJobClassId']);
                    if ($localJobClassData) {
                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'localJobClassName',
                            'data_label' => 'Local Job Class Name',
                            'data_value' => $localJobClassData->LocalJobClassName,
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();

                        $submissionData = new FormSubmissionData([
                            'form_id' => $form->id,
                            'submission_id' => $submission->id,
                            'data_type' => 'employmentInformation',
                            'data_name' => 'localJobClass',
                            'data_label' => 'localJobClass',
                            'data_value' => $employmentInformationFields['localJobClassId'],
                            'CreatedBy' => 0,
                            'UpdatedBy' => 0,
                        ]);
                        $submissionData->save();
                    }
                } else {
                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'localJobClassName',
                        'data_label' => 'Local Job Class Name',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();

                    $submissionData = new FormSubmissionData([
                        'form_id' => $form->id,
                        'submission_id' => $submission->id,
                        'data_type' => 'employmentInformation',
                        'data_name' => 'localJobClass',
                        'data_label' => 'localJobClass',
                        'data_value' => 'N/A',
                        'CreatedBy' => 0,
                        'UpdatedBy' => 0,
                    ]);
                    $submissionData->save();
                }
            }
        });

        //--Save Form PDF--
        $pdfOutput = $this->generatePDF($submissionId);
        $this->saveFormSubmissionPDF($submissionId, $pdfOutput);

        //--Confirmation Email--
        $emailStatus = (object) [];
        $emailStatus->sendConfirmationEmail = false;
        $confirmationEmail = collect($form['confirmation_email_fields']['fields']);
        if ($confirmationEmail['sendConfirmationEmail']['value']) {
            $emailStatus->sendConfirmationEmail = $confirmationEmail['sendConfirmationEmail']['value'];
            $this->sendConfirmationEmail($form->toArray(), $submissionFields, $submissionId, $pdfOutput, $emailStatus);
        }
        //----------------------

        return response()->json(['formFields' => $formFields, 'submissionFields' => $submissionFields, 'submissionId' => $submissionId, 'emailStatus' => $emailStatus]);
    }

    public function saveFormSubmissionPDF(string $submissionId, $pdfOutput): void
    {
        try {
            $fileName = storage_path('app/private/submission-pdf/MFPSubmission-'.$submissionId.'.pdf');
            file_put_contents($fileName, $pdfOutput);
        } catch (Exception) {
            // Log exception or suppress file saving error
        }
    }

    private function sendConfirmationEmail(array $form, array $submissionFields, $submissionId, $pdfOutput, &$emailStatus): bool
    {
        try {
            if (! empty(FormSubmission::find($submissionId))) {
                $confirmationEmail = collect($form['confirmation_email_fields']['fields']);
                // $emailFrom = $confirmationEmail['confirmationEmailFrom']['value'];
                $emailFrom = 'edues@aft.org';
                $emailTo = $submissionFields['email']['value'];
                $emailTo_Name = $submissionFields['firstName']['value'].' '.$submissionFields['lastName']['value'];
                $emailCC = $confirmationEmail['confirmationEmailCC']['value'];
                $emailBCC = $confirmationEmail['confirmationEmailBCC']['value'];
                $emailSubject = $confirmationEmail['confirmationEmailSubject']['value'];
                $emailBody = $this->prepTokens($confirmationEmail['confirmationEmailBody']['value'], $form, $submissionFields);

                $email = new Email();
                $email->from($emailFrom);
                $email->to($emailTo, $emailTo_Name);
                if (! empty($emailCC)) {
                    $emailCC = preg_replace('/\s+/', '', (string) $emailCC);
                    $emailCC = str_replace(',', ';', $emailCC);
                    $email->cc(explode(';', $emailCC));
                }
                if (! empty($emailBCC)) {
                    $emailBCC = preg_replace('/\s+/', '', (string) $emailBCC);
                    $emailBCC = str_replace(',', ';', $emailBCC);
                    $email->bcc(explode(';', $emailBCC));
                }
                $email->subject($emailSubject);
                $email->html($emailBody);
                $email->attachData($pdfOutput, 'form.pdf', ['mime' => 'application/pdf']);
                Mail::send($email);

                // Email sent successfully
                $emailStatus->emailSent = true;
            }
        } catch (Exception $e) {
            // Log exception or suppress mail error
            $emailStatus->emailSent = false;
            $emailStatus->error = 'code: '.$e->getCode().' | message: '.$e->getMessage();

            return false;
        }

        return true;
    }

    public function generatePDF($submissionId)
    {
        $fsc = new FormSubmissionController();
        $html = $fsc->showSimple($submissionId, $name)->render();
        $dompdfOptions = new Options();
        $dompdfOptions->setIsRemoteEnabled(true);
        $dompdf = new Dompdf();
        $dompdf->setOptions($dompdfOptions);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4');
        $dompdf->render();

        return $dompdf->output();
    }

    public function resendEmail($submissionId)
    {
        $formSubmission = FormSubmission::where('id', '=', $submissionId)
            ->with(['FormSubmissionData', 'Form', 'Form.affiliate'])
            ->first();
        $form = $formSubmission->Form;

        $submissionFields = [];

        foreach ($formSubmission->FormSubmissionData as $item) {
            $submissionFields[$item->data_name]['value'] = $item->data_value;
        }
        //--Save Form PDF--
        $pdfOutput = $this->generatePDF($submissionId);
        $this->saveFormSubmissionPDF($submissionId, $pdfOutput);

        $emailStatus = (object) [];
        $emailStatus->sendConfirmationEmail = false;
        $confirmationEmail = collect($form['confirmation_email_fields']['fields']);
        if ($confirmationEmail['sendConfirmationEmail']['value']) {
            $emailStatus->sendConfirmationEmail = $confirmationEmail['sendConfirmationEmail']['value'];
            $this->sendConfirmationEmail($form->toArray(), $submissionFields, $submissionId, $pdfOutput, $emailStatus);
        }
        //----------------------

        return response()->json(['submissionFields' => $submissionFields, 'submissionId' => $submissionId, 'emailStatus' => $emailStatus]);
    }

    private function prepTokens($emailBody, array $form, array $submissionFields): string|array
    {
        //Affiliate tokens
        $affiliateTokenList = ['affiliate_number', 'affiliate_name',
            'affiliate_address_line1', 'affiliate_address_line2',
            'affiliate_address_city', 'affiliate_address_state', 'affiliate_address_zip',
            'affiliate_phone', 'affiliate_email',
        ];

        $affiliateInfo = $this->getAffiliate($form['affiliate_id']);
        if (isset($affiliateInfo)) {
            foreach ($affiliateTokenList as $token) {
                if ($affiliateInfo[$token]) {
                    $emailBody = str_ireplace('{'.$token.'}', $affiliateInfo[$token], $emailBody);
                }
            }
        }

        //Work location (Chapter and Unit) tokens
        $chapterName = null;
        $unitName = null;
        if (isset($submissionFields['employmentInformation']) && $submissionFields['employmentInformation'] && isset($submissionFields['employmentInformation']['value']) && ! empty($submissionFields['employmentInformation']['value'])) {
            $employmentInformationData = $submissionFields['employmentInformation']['value'];
            $chapterName = isset($employmentInformationData['chapterId']) ?
                DB::connection('aftdb')->table('Chapter')
                    ->where('ChapterId', $employmentInformationData['chapterId'])
                    ->get(['ChapterName'])->first()->ChapterName
                : null;
            $unitName = isset($employmentInformationData['unitId']) ?
                DB::connection('aftdb')->table('Unit')
                    ->where('UnitId', $employmentInformationData['unitId'])
                    ->get(['UnitName'])->first()->UnitName
                : null;
        } elseif ($form['employment_information_fields']) {
            $employmentInformationData = $form['employment_information_fields'];
            $chapterName = isset($employmentInformationData['chapterId']) ?
                DB::connection('aftdb')->table('Chapter')
                    ->where('ChapterId', $employmentInformationData['chapterId'])
                    ->get(['ChapterName'])->first()->ChapterName
                : null;
            $unitName = isset($employmentInformationData['unitId']) ?
                DB::connection('aftdb')->table('Unit')
                    ->where('UnitId', $employmentInformationData['unitId'])
                    ->get(['UnitName'])->first()->UnitName
                : null;
        }

        if (isset($chapterName)) {
            $emailBody = str_ireplace('{chapter_name}', $chapterName, $emailBody);
        }

        if (isset($unitName)) {
            $emailBody = str_ireplace('{unit_name}', $unitName, $emailBody);
        }

        //Personal info tokens
        $emailBody = str_ireplace('{submission_first_name}', $submissionFields['firstName']['value'], $emailBody);
        $emailBody = str_ireplace('{submission_last_name}', $submissionFields['lastName']['value'], $emailBody);

        return str_ireplace(PHP_EOL, '<br>', $emailBody);
    }

    private function getAffiliate($affiliateId)
    {
        return Affiliate::withoutGlobalScopes()
            ->leftjoin('AffiliateAddress', function ($join): void {
                $join->on('Affiliate.AffiliateId', 'AffiliateAddress.AffiliateId')
                    ->whereIn('AffiliateAddress.ContactStatusId', [4, 2]);
            })
            ->leftjoin('StateTerritory', 'AffiliateAddress.StateTerritoryId', 'StateTerritory.StateTerritoryId')
            ->leftjoin('ContactStatus as csAddress', 'AffiliateAddress.ContactStatusId', 'csAddress.ContactStatusId')
            ->leftjoin('AffiliatePhone', function ($join): void {
                $join->on('Affiliate.AffiliateId', 'AffiliatePhone.AffiliateId')
                    ->whereIn('AffiliatePhone.ContactStatusId', [4, 2]);
            })
            ->leftjoin('AffiliateEmail', function ($join): void {
                $join->on('Affiliate.AffiliateId', 'AffiliateEmail.AffiliateId')
                     ->whereIn('AffiliateEmail.ContactStatusId', [4, 2]);
            })
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->orderby('AffiliateAddress.IsPreferred', 'desc')
            ->orderby('AffiliateAddress.ContactStatusId', 'desc')
            ->orderby('AffiliatePhone.IsPreferred', 'desc')
            ->orderby('AffiliatePhone.ContactStatusId', 'desc')
            ->orderby('AffiliateEmail.IsPreferred', 'desc')
            ->orderby('AffiliateEmail.ContactStatusId', 'desc')
            ->limit(1)
            ->get(['AffiliateNumber as affiliate_number', 'AffiliateName as affiliate_name',
                'AddressLine1 as affiliate_address_line1', 'AddressLine2 as affiliate_address_line2',
                'City as affiliate_address_city', 'StateTerritoryCode as affiliate_address_state', 'PostalCode as affiliate_address_zip',
                'PhoneNumber as affiliate_phone', 'Email as affiliate_email',
            ])
            ->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function updateSubmissionData(Request $request, $id)
    {
        $submissionFields = $request->all();

        foreach ($submissionFields as $fieldName => $field) {
            if (! empty($field)) {
                FormSubmissionData::where('submission_id', $id)
                    ->where('data_name', $fieldName)
                    ->update(['data_value' => $field]);
            }
        }

        return FormSubmission::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function updateExistingIndividual(Request $request, $id, $IndividualId, $status)
    {
        $model = FormSubmission::find($id);
        $request->all();
        if (is_null($status)) {
            $status = 3;
        }

        $model->IndividualId = $IndividualId;
        $model->submission_status_id = $status;
        $model->save();

        return FormSubmission::find($id);
    }

    public function getFormIdByCustomUrl(Request $request)
    {
        $data = $request->validate([
            'affiliateNumber' => 'required|string',
            'customUrl' => 'required|string',
        ]);
        $urlData = UrlRedirect::where('affiliate_number', $data['affiliateNumber'])->where('custom_url', $data['customUrl'])->first();
        if ($urlData) {
            return $urlData->form_id;
        } else {
            return '';
        }
    }
}

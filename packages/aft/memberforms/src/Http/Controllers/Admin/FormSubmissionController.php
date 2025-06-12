<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\BillHighway\BillingTypes;
use Aft\BillHighway\Individual as BillhighwayIndividual;
use Aft\BillHighway\Models\AchInfo;
use Aft\BillHighway\Models\Address;
use Aft\BillHighway\Models\CardInfo;
use Aft\BillHighway\Models\Individual as BillHighwayIndividualModel;
use Aft\BillHighway\Payment;
use Aft\BillHighway\Payment as BillHighwayPayment;
use Aft\MemberForms\Http\Export\Excel;
use Aft\MemberForms\Http\Resources\FormSubmission as FormSubmissionResource;
use Aft\MemberForms\Models\AffiliateLogo;
use Aft\MemberForms\Models\DuesMapping;
use Aft\MemberForms\Models\EDuesEnrollment;
use Aft\MemberForms\Models\Form;
use Aft\MemberForms\Models\FormSubmission;
use Aft\MemberForms\Models\FormSubmissionData;
use Aft\MemberForms\Models\SubmissionStatus;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Country;
use App\Models\Individual;
use App\Models\IndividualAddress;
use App\Models\IndividualAffiliate;
use App\Models\IndividualCope;
use App\Models\StateTerritory;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\DB;

class FormSubmissionController extends Controller
{
    public function getSubmissionsFromSearch(Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
            'formId' => 'nullable|integer',
            'type' => 'required|string',
            'firstName' => 'nullable|string',
            'lastName' => 'nullable|string',
        ]);

        $submissionQuery = FormSubmission::join('memberforms_forms', 'memberforms_forms.id', '=', 'memberforms_submission.form_id')
            ->join('memberforms_submission_data', 'memberforms_submission_data.submission_id', '=', 'memberforms_submission.id')
            ->join('memberforms_submission_status', 'memberforms_submission_status.id', '=', 'memberforms_submission.submission_status_id')
            ->where('memberforms_forms.affiliate_id', $data['affiliateId'])
            ->where('memberforms_submission_status.status_name', 'like', $data['type'] == 'all' ? '%' : $data['type'])
            ->where(function ($query): void {
                $query->where('memberforms_submission_data.data_name', 'firstName');
                $query->orWhere('memberforms_submission_data.data_name', 'middleName');
                $query->orWhere('memberforms_submission_data.data_name', 'lastName');
            })
            ->whereNull('memberforms_forms.DeletedAt')
            ->whereNull('memberforms_submission.DeletedAt')
            ->orderByDesc('memberforms_submission.CreatedAt');

        if (! empty($data['formId'])) {
            $submissionQuery->where('memberforms_forms.id', $data['formId']);
        }

        //Pivot using SELECT / CASE / GROUP BY
        $submissionQuery->groupBy(['memberforms_submission.id', 'memberforms_submission.form_id', 'memberforms_submission.CreatedAt',
            'memberforms_submission.UpdatedAt', 'memberforms_submission.DeletedAt', 'memberforms_submission.IndividualId',
            'memberforms_submission.submission_status_id']);
        //Get relational dependencies
        //$submissionQuery->with(['Form', 'Form.Template', 'FormSubmissionData','SubmissionStatus']);
        $submissionQuery->with(['Form', 'Form.Template', 'SubmissionStatus']);
        //Pivot/flatten firstname lastname to columns
        $submissionQuery->selectRaw("
            laravel_memberforms_submission.id, laravel_memberforms_submission.form_id, laravel_memberforms_submission.CreatedAt,
            laravel_memberforms_submission.UpdatedAt, laravel_memberforms_submission.DeletedAt, laravel_memberforms_submission.IndividualId,
            laravel_memberforms_submission.submission_status_id,
            max(case when data_name = 'firstName' then data_value end) 'firstName',
            max(case when data_name = 'middleName' then data_value end) 'middleName',
	        max(case when data_name = 'lastName' then data_value end) 'lastName'
        ");

        $submissions = $submissionQuery->get();
        $result = $submissions;
        if (! empty($data['firstName'])) {
            $result = $result->filter(fn($submission): bool => str_contains(strtolower($submission->firstName), strtolower((string) $data['firstName'])))->values();
        }

        if (! empty($data['lastName'])) {
            $result = $result->filter(fn($submission): bool => str_contains(strtolower($submission->lastName), strtolower((string) $data['lastName'])))->values();
        }

        return $result;
    }

    /**
     * @return mixed[]
     */
    public function index(Request $request): array
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
            'formId' => 'nullable|integer',
            'type' => 'required|string',
            'firstName' => 'nullable|string',
            'lastName' => 'nullable|string',
        ]);
        $forms = Form::select('id')
            ->where('affiliate_id', '=', $data['affiliateId'])
            ->when($data['formId'] ?? false, function ($query) use ($data): void {
                $query->where('id', '=', $data['formId']);
            })
            ->pluck('id');
        if ($data['type'] == '' || $data['type'] == 'all') {
            $typesArray = ['new', 'Exists in connect', 'Created Individual', 'not a member'];
            $statusId = SubmissionStatus::whereIn('status_name', $typesArray)
                ->get('id')->toArray();
        } else {
            $statusId = SubmissionStatus::where('status_name', $data['type'])
                ->first('id')
                ->id;
        }

        $submissionsQuery = FormSubmission::whereIn('form_id', $forms);
        if (is_array($statusId)) {
            $submissionsQuery->WhereIn('submission_status_id', $statusId);
        } else {
            $submissionsQuery->Where('submission_status_id', $statusId);
        }
        $submissionsQuery->whereNull('DeletedAt');
        $submissionsQuery->with(['Form', 'Form.Template', 'FormSubmissionData', 'SubmissionStatus'])
            ->orderByDesc('CreatedAt');
        $submissions = $submissionsQuery->get();

        $result = [];

        foreach ($submissions as $submission) {
            $sub = $submission->toArray();
            unset($sub['form_submission_data']);
            foreach ($submission->FormSubmissionData as $item) {
                if ($item->data_name == 'firstName' || $item->data_name == 'lastName') {
                    if ($item->data_name == 'firstName') {
                        if (isset($data['firstName']) && $data['firstName'] != '') {
                            str_contains(strtolower($item->data_value), strtolower((string) $data['firstName'])) ? $sub['form_submission_data'][$item->data_name] = $item : '';
                        } else {
                            $sub['form_submission_data'][$item->data_name] = $item;
                        }
                    }
                    if ($item->data_name == 'lastName') {
                        if (isset($data['lastName']) && $data['lastName'] != '') {
                            str_contains(strtolower($item->data_value), strtolower((string) $data['lastName'])) ? $sub['form_submission_data'][$item->data_name] = $item : '';
                        } else {
                            $sub['form_submission_data'][$item->data_name] = $item;
                        }
                    }
                } else {
                    $sub['form_submission_data'][$item->data_name] = $item;
                }
            }

            if (isset($sub['form_submission_data']['firstName']) && isset($sub['form_submission_data']['lastName'])) {
                $result[] = $sub;
            }
        }

        return $result;
    }

    public function show($id)
    {
        $formSubmission = FormSubmission::where('id', '=', $id)
            ->with(['FormSubmissionData', 'Form', 'Form.affiliate'])
            ->first();

        return $formSubmission;
    }

    public function hasNewSubmissionForDues($affiliateId): array
    {
        $newSubmissionCount = Form::where('affiliate_id', $affiliateId)
            ->join('memberforms_submission', 'memberforms_submission.form_id', '=', 'memberforms_forms.id')
            ->where('memberforms_submission.submission_status_id', 1)
            ->whereIn('memberforms_forms.form_template_id', [4, 5, 7, 9])
            ->whereNull('memberforms_forms.DeletedAt')
            ->whereNull('memberforms_submission.DeletedAt')
            ->count();

        return [
            'hasNewSubmissionForDues' => $newSubmissionCount > 0,
        ];
    }

    public function showSimple($id, &$name)
    {

        $submissionDataArray = $this->getSubmissionData($id);

        $firstName = '';
        $lastName = '';
        $formSubmission = $submissionDataArray['formSubmission'];
        $submissionData = $submissionDataArray['submissionData'];
        $submittedBy = $submissionDataArray['submittedBy'];
        $submittedOn = $submissionDataArray['submittedOn'];

        foreach ($submissionData as $submissionItem) {
            if ($submissionItem && $submissionItem['data_name']) {
                switch ($submissionItem['data_name']) {
                    case 'firstName':
                        $firstName = $submissionItem['data_value'];
                        break;
                    case 'middleName':
                        $middleName = $submissionItem['data_value'];
                        break;
                    case 'lastName':
                        $lastName = $submissionItem['data_value'];
                        break;
                    case 'phoneHomeCountry':
                    case 'phoneWorkCountry':
                    case 'phoneMobileCountry':
                        $submissionItem['data_value'] = '+' . Country::where('CountryId', $submissionItem['data_value'])
                                ->first('CountryCallingCode')
                                ->CountryCallingCode;
                        break;
                }
                $name = $firstName.' '.$lastName;
            }
        }

        return view('memberforms::submission_simple', [
            'form' => $formSubmission->Form,
            'submissionData' => $submissionData,
            'submittedBy' => $submittedBy,
            'submittedOn' => $submittedOn,
            'aftLogo' => $this->getAFTLogo(),
            'localLogo' => $this->getLogo($formSubmission->Form->local_logo_path),
            'fedLogo' => $this->getLogo($formSubmission->Form->fed_logo_path),
        ]);
    }

    private function getAFTLogo(): ?string
    {
        $path = public_path().'/vendor/memberforms/images/aft-small.png';
        $type = pathinfo($path, PATHINFO_EXTENSION);
        if (is_file($path)) {
            $imageData = file_get_contents($path);

            return 'data:image/'.$type.';base64,'.base64_encode($imageData);
        } else {
            return null;
        }
    }

    private function getLogo($path): ?string
    {
        if (is_file($path)) {
            $type = pathinfo((string) $path, PATHINFO_EXTENSION);
            $imageData = file_get_contents($path);

            return 'data:image/'.$type.';base64,'.base64_encode($imageData);
        } else {
            return null;
        }
    }

    public function getSubmissionData($id): array
    {
        $formSubmission = FormSubmission::where('id', '=', $id)
            ->with(['FormSubmissionData', 'Form'])
            ->first();
        if ($formSubmission->form && $formSubmission->form->affiliate_id) {
            $affiliateLogo = AffiliateLogo::where('affiliate_id', $formSubmission->form->affiliate_id)->first();
            $formSubmission->Form->local_logo_url = $affiliateLogo && $affiliateLogo->local_logo ? Storage::url($affiliateLogo->local_logo) : null;
            $formSubmission->Form->fed_logo_url = $affiliateLogo && $affiliateLogo->fed_logo ? Storage::url($affiliateLogo->fed_logo) : null;
            $formSubmission->Form->local_logo_path = isset($affiliateLogo->local_logo) ? public_path().'/storage/'.$affiliateLogo->local_logo : null;
            $formSubmission->Form->fed_logo_path = isset($affiliateLogo->fed_logo) ? public_path().'/storage/'.$affiliateLogo->fed_logo : null;
        }

        $firstName = '';
        $middleName = '';
        $lastName = '';
        $removeList = ['LocalDuesCategory', 'workLocation', 'workLocationName', 'workStructure', 'workStructureName', 'employer', 'chapter', 'unit', 'localJobClass', 'jobTitle', 'BillingTypeId', 'BillingTypeName'];
        $phoneHomeFields = ['phoneHomeCountry', 'phoneHome', 'phoneHomeExt', 'phoneHomePreferred'];
        $phoneMobileFields = ['phoneMobileCountry', 'phoneMobile', 'phoneMobileExt', 'phoneMobilePreferred', 'agree'];
        $phoneWorkFields = ['phoneWorkCountry', 'phoneWork', 'phoneWorkExt', 'phoneWorkPreferred'];
        $emailWorkFields = ['emailWork', 'emailWorkPreferred'];
        $emailPersonalFields = ['email', 'emailPersonalPreferred'];
        $addressFields = ['addressLine1', 'addressLine2', 'city', 'state', 'zip', 'addressHomePreferred'];
        $billingAddressFields = ['billingSameAsHome', 'billingAddressLine1', 'billingAddressLine2', 'billingCity', 'billingState', 'billingZip', 'addressBillingPreferred'];
        $childAffiliateFields = ['childAffiliateId', 'childAffiliateName', 'childAffiliateNumber'];
        $submissionData = new Collection();
        $workLocationLevels = new Collection();
        $workLocationIndex = 0;
        $workStructureLevels = new Collection();
        $workStructureIndex = 0;
        $phoneCollection = new Collection();
        $phoneHomeCollection = new Collection();
        $phoneMobileCollection = new Collection();
        $phoneWorkCollection = new Collection();
        $phoneIndex = 0;
        $emailCollection = new Collection();
        $emailPersonalCollection = new Collection();
        $emailWorkCollection = new Collection();
        $emailIndex = 0;
        $addressCollection = new Collection();
        $billingAddressCollection = new Collection();
        $addressIndex = 0;
        $childAffiliateCollection = new Collection();
        $childAffiliateIndex = 0;
        $removeList = array_merge($removeList, $phoneHomeFields, $phoneMobileFields, $phoneWorkFields, $emailWorkFields, $emailPersonalFields, $addressFields, $billingAddressFields, $childAffiliateFields);
        $index = 0;
        foreach ($formSubmission->FormSubmissionData as $key => $submissionItem) {
            $dataValue = $submissionItem->data_value;
            switch ($submissionItem->data_name) {
                case 'state':
                    $dataValue = StateTerritory::where('stateterritoryid', $submissionItem->data_value)
                        ->first('StateTerritoryName')
                        ->StateTerritoryName;
                    break;
                case 'billingState':
                    $dataValue = StateTerritory::where('stateterritoryid', $submissionItem->data_value)
                        ->first('StateTerritoryName')
                        ->StateTerritoryName;
                    break;
                case 'workLocationName':
                    $workLocationLevels->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                    if ($workLocationIndex == 0) {
                        $workLocationIndex = $index;
                    }
                    break;
                case 'workStructureName':
                    $workStructureLevels->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                    if ($workStructureIndex == 0) {
                        $workStructureIndex = $index;
                    }
                    break;
                case 'LocalDuesCategory':
                    // if payment processing dues templates
                    if ($formSubmission->form->form_template_id == '4' || $formSubmission->form->form_template_id == '5' || $formSubmission->form->form_template_id == '9') {
                        /*
                        //Retrieve BHBillingTypeId from mapping
                        $billHighwayBillingTypeId = DuesMapping::where('dues_category_id', $submissionItem->data_value)
                            ->where('affiliate_id', $formSubmission->form->affiliate_id)
                            ->whereNull('DeletedAt')
                            ->get('bill_highway_type_id')
                            ->first()
                            ->bill_highway_type_id;


                        //Retrieve LocalDuesCategory Form field
                        $formLocalDuesCategoryField = array_filter($formSubmission->form->fields, function ($field) {
                            return $field['type'] == 'LocalDuesCategory';
                        });

                        //Retrieve BH Billing Type info from Form's LocalDuesCategory source
                        $firstKey = array_key_first($formLocalDuesCategoryField);
                        $formBHDuesCategoryField = array_filter($formLocalDuesCategoryField[$firstKey]['source'], function ($field) use ($billHighwayBillingTypeId) {
                            return $field['LocalDuesCategoryId'] == $billHighwayBillingTypeId;
                        });
                        */
                    }
                    break;
                case 'LocalDuesCategoryName':
                    // if payment processing dues templates
                    if ($formSubmission->form->form_template_id == '4' || $formSubmission->form->form_template_id == '5' || $formSubmission->form->form_template_id == '7' || $formSubmission->form->form_template_id == '9') {
                        /*
                        $dataValue = array_filter($formLocalDuesCategoryField[$firstKey]['source'], function ($field) use ($billHighwayBillingTypeId) {
                                return $field['LocalDuesCategoryId'] == $billHighwayBillingTypeId;
                            });
                        }
                        */
                        $billingTypeName = $formSubmission->FormSubmissionData->firstWhere('data_name', 'BillingTypeName');
                        $dataValue = $billingTypeName ? $billingTypeName->data_value : '';
                    }
                    break;
                case 'LocalDuesCategoryPrice':
                    // if payment processing dues templates
                    if ($formSubmission->form->form_template_id == '4' || $formSubmission->form->form_template_id == '5' || $formSubmission->form->form_template_id == '9') {
                        /*
                        if($formBHDuesCategoryField) {
                            $firstKey = array_key_first($formBHDuesCategoryField);
                            $dataValue = $formBHDuesCategoryField[$firstKey]['LocalDuesAmount'];
                        }
                        */
                    }
                    break;
                case 'phoneHomeCountry':
                case 'phoneWorkCountry':
                case 'phoneMobileCountry':
                    $dataValue = '+' . Country::where('CountryId', $submissionItem->data_value)
                        ->first('CountryCallingCode')
                        ->CountryCallingCode;
                    break;
                case 'firstName':
                    $firstName = $submissionItem->data_value;
                    break;
                case 'middleName':
                    $middleName = $submissionItem->data_value;
                    break;
                case 'lastName':
                    $lastName = $submissionItem->data_value;
                    break;
            }
            if (in_array($submissionItem->data_name, $phoneHomeFields)) {
                $phoneHomeCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($phoneIndex == 0) {
                    $phoneIndex = $index;
                }
            }
            if (in_array($submissionItem->data_name, $phoneMobileFields)) {
                $phoneMobileCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($phoneIndex == 0) {
                    $phoneIndex = $index;
                }
            }
            if (in_array($submissionItem->data_name, $phoneWorkFields)) {
                $phoneWorkCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($phoneIndex == 0) {
                    $phoneIndex = $index;
                }
            }
            if (in_array($submissionItem->data_name, $emailWorkFields)) {
                $emailWorkCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($emailIndex == 0) {
                    $emailIndex = $index;
                }
            }
            if (in_array($submissionItem->data_name, $emailPersonalFields)) {
                $emailPersonalCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($emailIndex == 0) {
                    $emailIndex = $index;
                }
            }
            if (in_array($submissionItem->data_name, $addressFields)) {
                $addressCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($addressIndex == 0) {
                    $addressIndex = $index;
                }
            }
            if (in_array($submissionItem->data_name, $billingAddressFields)) {
                $billingAddressCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                if ($addressIndex == 0) {
                    $addressIndex = $index;
                }
            }
            $name = $firstName.' '.$lastName;
            if (! in_array($submissionItem->data_name, $removeList)) {
                $submissionData->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                $index++;
            }
            if (in_array($submissionItem->data_name, $childAffiliateFields)) {
                if ($submissionItem->data_name != 'childAffiliateId') {
                    $childAffiliateCollection->add(['data_type' => $submissionItem->data_type, 'data_label' => $submissionItem->data_label, 'data_name' => $submissionItem->data_name, 'data_value' => $dataValue]);
                }
                if ($childAffiliateIndex == 0) {
                    $childAffiliateIndex = $index;
                }
            }
        }
        if ($phoneHomeCollection->count() > 0) {
            $phoneHome = $phoneHomeCollection->first();
            $phoneCollection->add(['data_label' => $phoneHome['data_label'], 'data_value' => $phoneHomeCollection]);
        }
        if ($phoneMobileCollection->count() > 0) {
            $phoneMobile = $phoneMobileCollection->first();
            $phoneCollection->add(['data_label' => $phoneMobile['data_label'], 'data_value' => $phoneMobileCollection]);
        }
        if ($phoneWorkCollection->count() > 0) {
            $phoneWork = $phoneWorkCollection->first();
            $phoneCollection->add(['data_label' => $phoneWork['data_label'], 'data_value' => $phoneWorkCollection]);
        }
        if ($phoneCollection->count() > 0) {
            $submissionData->splice($phoneIndex, 0, [['data_type' => 'phone', 'data_label' => 'Phones', 'data_name' => 'phone', 'data_value' => $phoneCollection]]);
        }

        if ($emailWorkCollection->count() > 0) {
            $emailWork = $emailWorkCollection->first();
            $emailCollection->add(['data_label' => $emailWork['data_label'], 'data_value' => $emailWorkCollection]);
        }
        if ($emailPersonalCollection->count() > 0) {
            $emailPersonal = $emailPersonalCollection->first();
            $emailCollection->add(['data_label' => $emailPersonal['data_label'], 'data_value' => $emailPersonalCollection]);
        }
        if ($emailCollection->count() > 0) {
            $submissionData->splice($emailIndex, 0, [['data_type' => 'email', 'data_label' => 'Emails', 'data_name' => 'email', 'data_value' => $emailCollection]]);
        }

        if ($billingAddressCollection->count() > 0) {
            $submissionData->splice($addressIndex, 0, [['data_type' => 'address', 'data_label' => 'Billing Address', 'data_name' => 'billingAddress', 'data_value' => $billingAddressCollection]]);
        }

        if ($addressCollection->count() > 0) {
            $submissionData->splice($addressIndex, 0, [['data_type' => 'address', 'data_label' => 'Home Address', 'data_name' => 'address', 'data_value' => $addressCollection]]);
        }

        if ($workLocationLevels->count() > 0) {
            $submissionData->splice($workLocationIndex + 1, 0, [['data_type' => 'workLocation', 'data_label' => 'Work Location', 'data_name' => 'workLocation', 'data_value' => $workLocationLevels]]);
        }
        if ($workStructureLevels->count() > 0) {
            $submissionData->splice($workStructureIndex + 1, 0, [['data_type' => 'workStructure', 'data_label' => 'Work Structure', 'data_name' => 'workStructure', 'data_value' => $workStructureLevels]]);
        }
        if ($childAffiliateCollection->count() > 0) {
            $submissionData->splice($childAffiliateIndex + 1, 0, [['data_type' => 'childAffiliate', 'data_label' => 'Local', 'data_name' => 'childAffiliateName', 'data_value' => $childAffiliateCollection]]);
        }

        return [
            'formSubmission' => $formSubmission,
            'submissionData' => $submissionData,
            'submittedBy' => $firstName.' '.$middleName.' '.$lastName,
            'submittedOn' => date('m/d/Y', strtotime($formSubmission->CreatedAt)),
        ];
    }

    public function download(string $id): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $fileName = storage_path('app/private/submission-pdf/MFPSubmission-'.$id.'.pdf');

        // Generate the file, if does not exist
        if (! file_exists($fileName)) {
            $fc = new \Aft\MemberForms\Http\Controllers\FormController();
            $pdfOutput = $fc->generatePDF($id);
            $fc->saveFormSubmissionPDF($id, $pdfOutput);
        }

        $modelSubmissionData = FormSubmissionData::where('submission_id', $id)
            ->whereIn('data_name', ['firstName', 'lastName'])
            ->get(['data_name', 'data_value']);
        $userFileName = $modelSubmissionData[0]->data_value.' '.$modelSubmissionData[1]->data_value.'.pdf';

        return new StreamedResponse(
            function () use ($fileName): void {
                if ($file = fopen($fileName, 'rb')) {
                    while (! feof($file) and (connection_status() == 0)) {
                        echo fread($file, 1024 * 8);
                        flush();
                    }
                    fclose($file);
                }
            },
            200,
            [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="'.$userFileName.'"',
            ]
        );
    }

    public function downloadCsv(Request $request, string $format, string $type)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
            'formId' => 'nullable|integer',
            'type' => 'required|string',
            'firstName' => 'nullable|string',
            'lastName' => 'nullable|string',
        ]);
        ini_set('max_execution_time', (int) getenv('DOWNLOAD_EXECUTION_TIME'));
        $submissionsQuery = FormSubmission::where('form_id', $data['formId']);
        $submissionsQuery->with(['Individual', 'Form'])
            ->orderByDesc('CreatedAt');
        $submission = $submissionsQuery->first();

        $formTemplateId = $submission->Form->form_template_id;

        if ($submission) {
            $submissionsDataQuery = FormSubmissionData::where('form_id', $data['formId']);
            $submissionsDataQuery->select('data_name', 'data_label', DB::raw('min(CreatedAt) as occurrence'))->distinct()
            ->groupBy('data_name', 'data_label')
            ->orderBy('occurrence', 'asc');
            $submissionData = $submissionsDataQuery->get();

            $submissionStatusQuery = FormSubmission::where('form_id', $data['formId'])->where('submission_status_id', '!=', 1);
            $submissionStatusQuery->select(DB::raw('count(id) as submissionCount'));
            $submissionStatusCount = $submissionStatusQuery->first();
            $submissionStatusCount = $submissionStatusCount->submissionCount;

            $addressKey = $submissionData->search(fn($item, $key): bool => $item->data_name == 'addressLine1');
            $billingAddressKey = $submissionData->search(fn($item, $key): bool => $item->data_name == 'billingAddressLine1');
            if ($addressKey) {
                $address = [];
                $address['data_type'] = 'text';
                $address['data_name'] = 'address';
                $address['data_label'] = 'Home Address';
                $address['data_value'] = '';

                $submissionData->splice($addressKey, 0, [$address]);
            }
            if ($billingAddressKey) {
                  $address = [];
                  $address['data_type'] = 'text';
                  $address['data_name'] = 'billingAddress';
                  $address['data_label'] = 'Billing Address';
                  $address['data_value'] = '';

                if ($addressKey) {
                    $submissionData->splice($billingAddressKey+1, 0, [$address]);
                } else {
                    $submissionData->splice($billingAddressKey, 0, [$address]);
                }
            }

            $formFieldsData = [];
            foreach ($submissionData as $field) {
                 $data_name = $field['data_name'];
                 $formFieldsData[$data_name] = $field;
            }

            $export = new Excel($request, $this, $type, $formFieldsData, $submissionStatusCount, $formTemplateId);
            $fileName = str_replace(["/", "\\", ":", "*", "?", "«", "<", ">", "|"], "-", $submission->Form['display_name'].'-'.Carbon::now()->format('m-d-Y').'.'.$format);
            if ($format === 'csv') {
                return $this->streamDownload($export, $data, $fileName);
            }

            return $export->download($fileName);
        } else {
            return false;
        }
    }

    private function streamDownloadChunk($context): void
    {
        $collection = $this->createResourceCollection($context->records);

        foreach ($collection as $item) {
            $row = $context->export->map($item);
            fputcsv($context->output, $row);
        }
        fflush($context->output);
        ob_flush();
        flush();
    }

    private function streamDownloadAll($context): void
    {
        ini_set('output_buffering', 'off');
        $context->output = fopen('php://output', 'wb');
        $headers = $context->export->headings();
        fputcsv($context->output, $headers);
        $context->query->chunk($context->chunk, function ($records) use ($context): void {
            $context->records = $records;
            $this->streamDownloadChunk($context);
        });
        fflush($context->output);
        fclose($context->output);
    }

    protected function streamDownload($export, $data, ?string $filename = null): \Symfony\Component\HttpFoundation\StreamedResponse
    {
        $query = $this->prepareExportData($data, true);
        $count = $query->count();
        $context = (object) [
            'query' => $query,
            'count' => $count,
            'chunk' => 15,
            'export' => $export,
            'output' => false,
            'records' => [],
        ];
        $response = new StreamedResponse();
        $disposition = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $filename);
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', $disposition);
        $response->headers->set('Content-Record-Count', $count);
        $response->headers->set('Content-Record-Chunk', $context->chunk);
        $response->setCallback(fn() => $this->streamDownloadAll($context));

        return $response;
    }

    /**
     * @param  bool  $returnQuery
     * @return AnonymousResourceCollection|QueryBuilder
     *
     * @throws ReflectionException
     */
    public function prepareExportData($data, $returnQuery = false)
    {

        $forms = Form::select('id')
            ->where('affiliate_id', '=', $data['affiliateId'])
            ->when($data['formId'] ?? false, function ($query) use ($data): void {
                $query->where('id', '=', $data['formId']);
            })
            ->pluck('id');
        if ($data['type'] == '' || $data['type'] == 'all') {
            //$typesArray = array('new','duplicate','cope','processed');
            $typesArray = ['new', 'Exists in connect', 'Created Individual', 'not a member'];
            $statusId = SubmissionStatus::whereIn('status_name', $typesArray)
                ->get('id')->toArray();
        } else {
            $statusId = SubmissionStatus::where('status_name', $data['type'])
                ->first('id')
                ->id;
        }

        $submissionsQuery = FormSubmission::whereIn('form_id', $forms)->whereNull('DeletedAt');
        if (is_array($statusId)) {
            $submissionsQuery->WhereIn('submission_status_id', $statusId);
        } else {
            $submissionsQuery->Where('submission_status_id', $statusId);
        }
        $submissionsQuery->with(['Form', 'Form.Template', 'Form.Affiliate', 'FormSubmissionData', 'SubmissionStatus', 'Individual'])
            ->orderByDesc('CreatedAt');

        return $submissionsQuery;
    }

    protected function createResourceCollection($resource): AnonymousResourceCollection
    {
        return FormSubmissionResource::collection($resource);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function updateIndividual(Request $request, $id)
    {
        $model = FormSubmission::find($id);
        $data = $request->all();
        $IndividualId = $data['IndividualId'];
        if (array_key_exists('status', $data)) {
            $status = $data['status'];
        } else {
            $status = 2;
        }

        $model->IndividualId = $IndividualId;
        $model->submission_status_id = $status;
        $model->save();

        return FormSubmission::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function createIndividualCope(Request $request, $id)
    {
        $model = FormSubmission::find($id);
        $data = $request->all();
        $IndividualId = $data['IndividualId'];
        $affiliateId = $data['affiliateId'];
        if (array_key_exists('status', $data)) {
            $status = $data['status'];
        } else {
            $status = 2;
        }

        $model->IndividualId = $IndividualId;
        $model->submission_status_id = $status;
        $model->save();

        $copeAmount = 0;

        $modelSubmissionData = FormSubmissionData::where('submission_id', $id)
            ->whereIn('data_name', ['copeAmount'])
            ->get(['data_name', 'data_value']);

        if (count($modelSubmissionData) > 0) {
            $copeAmount = $modelSubmissionData[0]->data_value;
            $copeAmount = str_replace('$', '', $copeAmount);
        }

        $individualCope = IndividualCope::where('IndividualId', '=', $IndividualId)
            ->where('AffiliateId', '=', $affiliateId)
            ->first();

        if (! $individualCope) {
            $individualCope = new IndividualCope();
        }

        $individualCope->AffiliateId = $affiliateId;
        $individualCope->IndividualId = $IndividualId;
        $individualCope->CopeAmount = $copeAmount;

        $individualCope->save();

        return FormSubmission::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function markAsDuplicate(Request $request, $id)
    {
        $model = FormSubmission::find($id);
        $model->submission_status_id = 3;
        $model->save();

        return FormSubmission::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function markAsCope(Request $request, $id)
    {
        $model = FormSubmission::find($id);
        $model->submission_status_id = 4;
        $model->save();

        return FormSubmission::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function markAsNotAMember(Request $request, $id)
    {
        $model = FormSubmission::find($id);
        $model->submission_status_id = 4;
        $model->save();

        return FormSubmission::find($id);
    }

    public function markAsNew(Request $request, $id)
    {
        $model = FormSubmission::find($id);
        $model->submission_status_id = 1;
        $model->save();

        return FormSubmission::find($id);
    }

    public function delete($id): array
    {
        $user = Auth::user();
        $model = FormSubmission::find($id);
        if ($model->submission_status_id == '1') {
            $model->UpdatedBy = $user->id;
            $model->UpdatedAt = now();
            $model->DeletedAt = now();
            $model->save();
        }

        return ['success'];
    }

    public function updateDataFormSubmission(Request $request): array
    {
        $user = Auth::user();
        $modelSubmission = FormSubmission::find($request->get('id'));
        if (isset($modelSubmission) && $modelSubmission->Form->form_template_id == 7) {
            $modelSubmission->CreatedBy = $modelSubmission->UpdatedBy = $user->id;
            $modelSubmission->save();

            FormSubmissionData::where('submission_id', $request->get('id'))
                ->update(['CreatedBy' => $user->id, 'UpdatedBy' => $user->id]);
        }

        return ['success'];
    }

    public function getEdues(Request $request)
    {
        $data = $request->validate([
            'childAffiliateIds' => 'required|string',
            'affiliateId' => 'required',
            'FirstName' => 'nullable',
            'LastName' => 'nullable',
            'SubmissionStartDate' => 'nullable',
            'SubmissionEndDate' => 'nullable',
            'TemplateId' => 'nullable',
            'SortBy' => 'required',
            'SortOrder' => 'required',
            'CopeOnly' => 'nullable',
        ]);

        $parentBillHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $data['affiliateId'])
            ->value('BillHighwayGroupId');

        $childAffiliates = explode(',', (string) $data['childAffiliateIds']);
        $whereClause = [];
        $copeNoClause = [];

        if (!empty($data['FirstName'])) {
            $whereClause[] = ['Individual.FirstName', 'like', '%'.$data['FirstName'].'%'];
        }
        if (!empty($data['LastName'])) {
            $whereClause[] = ['Individual.LastName', 'like', '%'.$data['LastName'].'%'];
        }
        if (!empty($data['CopeOnly'])) {
            if ($data['CopeOnly'] === 'Yes') {
                $whereClause[] = ['e.TemplateId', '=', 6];
            } else {
                $copeNoClause[] = ['e.TemplateId', '!=', 6];
                $copeNoClause[] = ['e.TemplateId', '=', null];
            }
        }

        // Fetch paginated results
        $results = $this->getEduesIndividuals($childAffiliates, $whereClause, $copeNoClause, $data, false, $request->query('pageSize'));

        // Extract items from the paginator
        $resultsArray = $results->items();

        // Process results with getBillHighwayData
        $resultsArray = $this->getBillHighwayData($resultsArray, $parentBillHighwayGroupId, false);

        // Rebuild paginator
        $results = new \Illuminate\Pagination\LengthAwarePaginator(
            $resultsArray,
            $results->total(),
            $results->perPage(),
            $results->currentPage(),
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $stateFedTemplateResults = $this->getEduesIndividuals($childAffiliates, $whereClause, $copeNoClause, $data, true);

        // Convert and process state/fed template results
        $stateFedTemplateResultsArray = $stateFedTemplateResults->items();
        $stateFedTemplateResultsArray = $this->getBillHighwayData($stateFedTemplateResultsArray, $parentBillHighwayGroupId, true);

        // Merge both paginated results
        $mergedResults = array_merge($results->items(), $stateFedTemplateResultsArray);

        // Final response
        return [
            'current_page' => $results->currentPage(),
            'total' => $results->total(),
            'last_page' => $results->lastPage(),
            'results' => $mergedResults,
        ];
    }

    private function getEduesIndividuals($childAffiliates, array $whereClause, array $copeNoClause, $data, bool $isStateFedTemplate, $pageSize = 10)
    {
        $query = Individual::select(
            'Individual.IndividualId',
            'IndividualGuid',
            'BillHighwayGroupId',
            'e.SubmissionDate',
            'Individual.FirstName',
            'Individual.MiddleName',
            'Individual.LastName',
            'Individual.CreatedAt',
            'e.AffiliateId',
            'e.DeletedAt',
            'e.TemplateId',
            'e.BHIndividualId',
            'e.SubmissionId'
        )->join('IndividualAffiliate', 'IndividualAffiliate.IndividualId', '=', 'Individual.IndividualId')
            ->join('Affiliate', 'Affiliate.AffiliateId', '=', 'IndividualAffiliate.AffiliateId')
            ->whereNull('e.DeletedAt')
            ->whereNull('Affiliate.DeletedAt')
            ->whereNull('Individual.DeletedAt');
        if ($isStateFedTemplate) {
            $query->leftJoin('laravel_memberforms_eDues_enrollment as e', 'e.IndividualId', '=', 'Individual.IndividualId');
            $query->whereIn('e.AffiliateId', $childAffiliates);
            $query->where('e.TemplateId', 8);
        } else {
            $query->leftJoin('laravel_memberforms_eDues_enrollment as e', function($join) {
                $join->on('e.IndividualId', '=', 'Individual.IndividualId');
                $join->on('e.AffiliateId', '=', 'Affiliate.AffiliateId');
            });
            $query->where('e.AffiliateId', $data['affiliateId']);
            $query->where('e.TemplateId', '!=', 8);
        }
        if (count($whereClause) > 0) {
            $query->where($whereClause);
        }

        if (count($copeNoClause) > 0) {
            $query->where(function ($query): void {
                $query->where('e.TemplateId', 6)
                    ->orWhere('e.TemplateId', null);
            });
        }

        if ((isset($data['TemplateId']) && $data['TemplateId'])) {
            $query = $query->where('e.TemplateId', $data['TemplateId']);
        }

        if ((isset($data['SubmissionStartDate']) && $data['SubmissionStartDate'])) {
            $fromDate = date($data['SubmissionStartDate'].' 00:00');
            $query = $query->where('e.SubmissionDate', '>', $fromDate);
        }

        if ((isset($data['SubmissionEndDate']) && $data['SubmissionEndDate'])) {
            $toDate = date($data['SubmissionEndDate'].' 23:59');
            $query = $query->where('e.SubmissionDate', '<', $toDate);
        }

        if (isset($data['SortBy']) && isset($data['SortOrder'])) {
            if ($data['SortBy'] == 'last_name') {
                $query = $data['SortOrder'] == 'desc' ? $query->orderByDesc('Individual.LastName') : $query->orderBy('Individual.LastName', 'asc');
            } else {
                $query = $data['SortOrder'] == 'desc' ? $query->orderByDesc('e.SubmissionDate') : $query->orderBy('e.SubmissionDate', 'asc');
            }
        }

        $results = $query->groupBy('Individual.IndividualId', 'IndividualGuid', 'BillHighwayGroupId', 'e.SubmissionDate', 'Individual.FirstName', 'Individual.MiddleName', 'Individual.LastName', 'Individual.CreatedAt', 'e.AffiliateId', 'e.DeletedAt', 'e.TemplateId', 'e.BHIndividualId', 'e.SubmissionId')
            ->paginate($pageSize);

        return $results;
    }

    private function getBillHighwayData(array $results, $parentBillHighwayGroupId, bool $isStateFedTemplate): array
    {
        if (count($results) > 0) {
            foreach ($results as $key => $result) {
                //Condition for affiliate number
                $affillateNumber = FormSubmissionData::where('submission_id', $result->SubmissionId)->where('data_name', 'childAffiliateNumber')->first();
                $results[$key]['affillateNumber'] = $affillateNumber ? $affillateNumber->data_value : null;
                //condition to check active member in connect
                $isMemberQuery = IndividualAffiliate::where('IndividualId', $result->IndividualId)->whereNull('EndDate')->where('UnionRelationshipTypeId', 2)->count();
                if ($isMemberQuery > 0) {
                    $results[$key]['is_member'] = 1;
                } else {
                    $results[$key]['is_member'] = 0;
                }
                $isRetiredMemberQuery = IndividualAffiliate::where('IndividualId', $result->IndividualId)->whereNull('EndDate')->where('UnionRelationshipTypeId', 5)->count();
                if ($isRetiredMemberQuery > 0) {
                    $results[$key]['is_retired_member'] = 1;
                } else {
                    $results[$key]['is_retired_member'] = 0;
                }
                if ($isStateFedTemplate) {
                    if ($result->BillhighwayGroupId) {
                        $apiData = BillhighwayIndividual::GetBillHighwayStatus($result->BillHighwayGroupId, $result->IndividualGuid);
                        $billingTypes = BillingTypes::GetRecurringBillingTypes($result->BillHighwayGroupId);
                    } else {
                        $apiData = BillhighwayIndividual::GetBillHighwayStatus($parentBillHighwayGroupId, $result->IndividualGuid);
                        $billingTypes = BillingTypes::GetRecurringBillingTypes($parentBillHighwayGroupId);
                    }
                } else {
                    $apiData = BillhighwayIndividual::GetBillHighwayStatus($result->BillHighwayGroupId, $result->IndividualGuid);
                    $billingTypes = BillingTypes::GetRecurringBillingTypes($result->BillHighwayGroupId);
                }
                $BillingTypeID = $apiData->BillingTypeId;
                if ($billingTypes && property_exists($billingTypes, 'Results') && $billingTypes->Results) {
                    $activeBillingTypes = array_filter($billingTypes->Results, fn($billingType): bool => $billingType->BillingTypeID === $BillingTypeID);
                    if (count($activeBillingTypes) > 0) {
                        $activeBillingType = array_pop($activeBillingTypes);
                        $apiData->BillingTypeName = $activeBillingType->BillingTypeName;
                    } else {
                        $billingTypes = isset($result->BillHighwayGroupId) ? BillingTypes::GetBillingTypes($result->BillHighwayGroupId)
                            : BillingTypes::GetBillingTypes($parentBillHighwayGroupId);

                        if ($billingTypes && $billingTypes->Results) {
                            $activeBillingTypes = array_filter($billingTypes->Results, fn($billingType): bool => $billingType->BillingTypeID === $BillingTypeID);
                            if (count($activeBillingTypes) > 0) {
                                $activeBillingType = array_pop($activeBillingTypes);
                                $apiData->BillingTypeName = $activeBillingType->BillingTypeName;
                            }
                        }
                    }
                }
                $results[$key]['api_data'] = $apiData;
            }
        }

        return $results;
    }

    public function getChildAffiliates(Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
        ]);

        $affiliates = Affiliate::select(
            'AffiliateId'
        );

        $affiliates->where('ParentAffiliateId', '=', $data['affiliateId']);
        $affiliateIds = $affiliates->pluck('AffiliateId');
        $affiliateIds[] = (int) $data['affiliateId'];

        return $affiliateIds;
    }

    public function getEduesDetails($individualId, $affiliateId): array
    {
        $individualDetails = Individual::where('Individual.IndividualId', '=', $individualId)
            ->select(
                'Individual.IndividualId',
                'IndividualGuid',
                'Individual.FirstName',
                'Individual.LastName',
                'fs.SubmissionDate',
                'fs.TemplateId',
                'fs.BHIndividualId',
                'fs.Source'
            )->join('IndividualAffiliate', 'IndividualAffiliate.IndividualId', '=', 'Individual.IndividualId')
            ->leftJoin('laravel_memberforms_eDues_enrollment as fs', 'fs.IndividualId', '=', 'Individual.IndividualId')
            ->first();

        $BillHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->get('BillHighwayGroupId')
            ->first()->BillHighwayGroupId;

        $apiData = BillhighwayIndividual::GetBillHighwayStatus($BillHighwayGroupId, $individualDetails->IndividualGuid);
        $BillingTypeID = $apiData->BillingTypeId;
        $billingTypes = BillingTypes::GetRecurringBillingTypes($BillHighwayGroupId);
        if ($billingTypes && $billingTypes->Results) {
            $activeBillingTypes = array_filter($billingTypes->Results, fn($billingType): bool => $billingType->BillingTypeID === $BillingTypeID);
            if (count($activeBillingTypes) > 0) {
                $activeBillingType = array_pop($activeBillingTypes);
                $apiData->BillingTypeName = $activeBillingType->BillingTypeName;
            } else {
                $billingTypes = BillingTypes::GetBillingTypes($BillHighwayGroupId);
                if ($billingTypes && $billingTypes->Results) {
                    $activeBillingTypes = array_filter($billingTypes->Results, fn($billingType): bool => $billingType->BillingTypeID === $BillingTypeID);
                    if (count($activeBillingTypes) > 0) {
                        $activeBillingType = array_pop($activeBillingTypes);
                        $apiData->BillingTypeName = $activeBillingType->BillingTypeName;
                    }
                }
            }
        }

        $individualEmail = null;
        $individualPhone = null;
        try {
            $individualApiData = BillhighwayIndividual::GetIndividual($BillHighwayGroupId, $individualDetails->IndividualGuid);
            if ($individualApiData && $individualApiData->Member && $individualApiData->Member->PersonInfo) {
                $contactInfo = $individualApiData->Member->PersonInfo->ContactInfo;
                if ($contactInfo && $contactInfo->EmailAddresses) {
                    $individualEmail = $this->getPrimaryContact($contactInfo->EmailAddresses);
                }
                if ($contactInfo && $contactInfo->PhoneNumbers) {
                    $individualPhone = $this->getPrimaryContact($contactInfo->PhoneNumbers);
                }
            }
        } catch (Exception $e) {
            $error = $e;
        }
        $individualData = [];
        $individualData['individualId'] = $individualId;
        $individualData['FirstName'] = $individualDetails->FirstName;
        $individualData['LastName'] = $individualDetails->LastName;
        $individualData['IndividualGuid'] = $individualDetails->IndividualGuid;
        $individualData['BillHighwayGroupId'] = $BillHighwayGroupId;
        $individualData['IndividualEmails'] = $individualEmail;
        $individualData['IndividualPhones'] = $individualPhone;
        $individualData['SubmittedDate'] = $individualDetails->SubmissionDate;
        $individualData['TemplateId'] = $individualDetails->TemplateId;
        $individualData['BHIndividualId'] = $individualDetails->BHIndividualId;
        $individualData['Source'] = $individualDetails->Source;

        $individualCopeModel = IndividualCope::where('IndividualId', $individualId)
            ->where('AffiliateId', $affiliateId)
            ->whereNull('DeletedAt')
            ->get()
            ->first();
        $individualData['CopeAmount'] = 0;
        if (isset($individualCopeModel) && isset($individualCopeModel->CopeAmount)) {
            $individualData['CopeAmount'] = $individualCopeModel->CopeAmount;
        }

        $response = [];
        $response['status'] = 'success';
        $response['individualData'] = $individualData;
        $response['billHighWayData'] = $apiData;

        return $response;
    }

    private function getPrimaryContact($list)
    {
        if (is_array($list)) {
            foreach ($list as $contact) {
                if ($contact->Type == 'Primary') {
                    return $contact;
                }
            }
        }

        return null;
    }

    public function updatePayment($individualId, Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
            'PaymentMethodSelected' => 'required|string',
            'CreditCardInformation' => 'nullable',
            'BankDraftInformation' => 'nullable',
        ]);

        $affiliate_id = (int) $data['affiliateId'];

        $tokenResponse = null;
        if (isset($data['PaymentMethodSelected'])) {
            try {
                $tokenResponse = $this->getTokenForPaymentInformation($individualId, $data, $affiliate_id);
            } catch (Exception) {
                throw ValidationException::withMessages([
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

        if (isset($tokenResponse) && $tokenResponse->Token) {
            $response = $this->setupBillHighwayProfile($individualId, $affiliate_id, $tokenResponse);
        } else {
            $response['status'] = 'failure';
        }

        return $response;
    }

    private function getTokenForPaymentInformation($individualId, array $paymentInfo, int $affiliate_id)
    {
        $tokenResponse = null;
        $BillHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $affiliate_id)
            ->get('BillHighwayGroupId')
            ->first()->BillHighwayGroupId;

        if ($paymentInfo['PaymentMethodSelected'] == 'Credit Card') {
            $billingAddressObj = IndividualAddress::where('IndividualId', $individualId)
                ->whereNull('DeletedAt')
                ->where('IndividualAddressTypeId', 3)
                ->where('ContactStatusId', 4)
                ->orderBy('VerifiedDate', 'desc')
                ->orderBy('UpdatedAt', 'desc')
                ->get(['AddressLine1', 'AddressLine2', 'City', 'StateTerritoryId', 'PostalCode'])
                ->first();

            $billingAddress = null;
            if ($billingAddressObj) {
                $billingAddress = new Address();
                $billingAddress->AddressLine1 = $billingAddressObj->AddressLine1;
                $billingAddress->AddressLine2 = $billingAddressObj->AddressLine2 ?: '';
                $billingAddress->City = $billingAddressObj->City;
                $stateCode = StateTerritory::find($billingAddressObj->StateTerritoryId)
                    ->get('StateTerritoryCode')
                    ->first()
                    ->StateTerritoryCode;
                $billingAddress->State = $stateCode;
                $billingAddress->Zip = $billingAddressObj->PostalCode;
            }

            $cardInfoFromRequest = $paymentInfo['CreditCardInformation'];
            $cardInfo = new CardInfo();
            $cardInfo->NameOnCard = $cardInfoFromRequest['cardHolderName'];
            $cardInfo->CardNumber = $cardInfoFromRequest['cardNumber'];
            $cardInfo->Cvv = $cardInfoFromRequest['cvv'];
            $cardInfo->ExpMonth = explode('-', (string) $cardInfoFromRequest['exp'])[0];
            $cardInfo->ExpYear = explode('-', (string) $cardInfoFromRequest['exp'])[1];
            if ($billingAddress) {
                $cardInfo->Address = $billingAddress;
            }

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

    private function setupBillHighwayProfile($individualId, int $affiliateId, $tokenResponse)
    {

        // $source = 'Connect';

        $returnResponse = json_decode('{"setupBillHighwayProfile": {"BillHighwayMapPaymentTokenToIndividual": "", "SaveEDuesEnrollment": ""}}');
        $individualGuid = Individual::withoutGlobalScopes()
            ->where('IndividualId', $individualId)
            ->get('IndividualGuid')
            ->first()
            ->IndividualGuid;

        $billHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->get('BillHighwayGroupId')
            ->first()
            ->BillHighwayGroupId;

        $user = Auth::user();
        $modelEDues = EDuesEnrollment::where('IndividualId', $individualId)
            ->where('AffiliateId', $affiliateId)->first();

        $paymentInformation = $tokenResponse;

        try {
            //Map Payment Token to Individual in BillHighway System
            $loggingParams = $this->getParametersForLogging($modelEDues->EDuesEnrollmentId, $user->id, 'Connect/setupBillHighwayProfile/MapPaymentTokenToIndividual');
            $bhResponseMapToken = BillHighwayPayment::MapPaymentTokenToIndividual($billHighwayGroupId, $individualGuid, $paymentInformation->Token, $loggingParams);
            $returnResponse->setupBillHighwayProfile->BillHighwayMapPaymentTokenToIndividual = 'Success';
            if (isset($bhResponseMapToken->Messages[0]->Type) && $bhResponseMapToken->Messages[0]->Type == 'Error') {
                //Log Exception
                $returnResponse->setupBillHighwayProfile->BillHighwayMapPaymentTokenToIndividual = 'Error: '.$bhResponseMapToken->Messages[0]->Code.' - '.$bhResponseMapToken->Messages[0]->Message;
                //return 'Error: setupBillHighwayProfile - Map Token - ' . $bhResponseMapToken->Messages[0]->Code . ' - ' . $bhResponseMapToken->Messages[0]->Message;
            }
        } catch (Exception $ex) {
            //Log any other exception
            $returnResponse->setupBillHighwayProfile->BillHighwayMapPaymentTokenToIndividual = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
            //return 'Error: setupBillHighwayProfile - Map Token - ' . $ex->getCode() . ' - ' . $ex->getMessage();
        }

        try {
            // Save Individual in AftDB/EduesEnrollment table
            $currentDateTime = now();

            $modelEDues->PaymentMethod = isset($paymentInformation->CardDetails)
                ? 'Credit Card' : 'Bank Draft';
            $modelEDues->AccountType = isset($paymentInformation->CardDetails)
                ? $paymentInformation->CardDetails->CardType : $paymentInformation->AchDetails->AccountType;
            $modelEDues->AccountNumberLastFour = isset($paymentInformation->CardDetails)
                ? $paymentInformation->CardDetails->Last4 : $paymentInformation->AchDetails->AccountNumberLast4;
            $modelEDues->PaymentToken = $paymentInformation->Token;
            $modelEDues->ReferenceNo = null;
            // $modelEDues->Source = $source;
            $modelEDues->UpdatedBy = $user->id;
            $modelEDues->UpdatedAt = $currentDateTime;
            $modelEDues->save();
            $returnResponse->setupBillHighwayProfile->SaveEDuesEnrollment = 'Success';
        } catch (Exception $ex) {
            //Log any other exception
            $returnResponse->setupBillHighwayProfile->SaveEDuesEnrollment = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
        }

        return json_encode($returnResponse);
    }

    public function updateMemberStatus(Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
            'individualId' => 'required|integer',
            'status' => 'required|string',
        ]);

        $affiliateId = (int) $data['affiliateId'];
        $individualId = (int) $data['individualId'];

        $individualGuid = Individual::withoutGlobalScopes()
            ->where('IndividualId', $individualId)
            ->get('IndividualGuid')
            ->first()
        ->IndividualGuid;

        // Billhighway individual
        $bhIndividualModel = new BillHighwayIndividualModel();
        $bhIndividualModel->MemberStatus = $data['status'];
        $bhIndividualModel->AftIndividualGuid = $individualGuid;

        $billHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->get('BillHighwayGroupId')
            ->first()
            ->BillHighwayGroupId;

        $returnResponse = json_decode('{"updateBillHighwayProfile": {"BillHighwayUpdateIndividual": ""}}');
        $bhIndividualId = null;
        try {
            // Save Individual in BillHighway System
            $user = Auth::user();
            $modelEDues = EDuesEnrollment::where('IndividualId', $individualId)
                ->where('AffiliateId', $affiliateId)->get()->first();
            $loggingParams = $this->getParametersForLogging($modelEDues->EDuesEnrollmentId, $user->id, 'Connect/eDues/UpdateMemberStatus');
            $bhResponseSaveIndividual = BillHighwayIndividual::updateMemberStatus($billHighwayGroupId, $bhIndividualModel, $loggingParams);
            if (! $bhResponseSaveIndividual->IsError) {
                $bhIndividualId = $bhResponseSaveIndividual->MemberReply[0]->BillhighwayuserId;
                $returnResponse->updateBillHighwayProfile->BillHighwayUpdateIndividual = 'Success';
            } else {
                //Log Exception
                $returnResponse->updateBillHighwayProfile->BillHighwayUpdateIndividual = 'Error: '.$bhResponseSaveIndividual->MemberReply[0]->ErrorCode.' - '.$bhResponseSaveIndividual->MemberReply[0]->ErrorMessage;
                //return 'Error: updateBillHighwayProfile - Save Individual - ' . $bhResponseSaveIndividual->MemberReply[0]->ErrorCode . ' - ' . $bhResponseSaveIndividual->MemberReply[0]->ErrorMessage;
            }
        } catch (Exception $ex) {
            //Log any other exception
            $returnResponse->updateBillHighwayProfile->BillHighwayUpdateIndividual = 'Error: '.$ex->getCode().' - '.$ex->getMessage();
            //return 'Error: updateBillHighwayProfile - Save Individual - ' . $ex->getCode() . ' - ' . $ex->getMessage();
        }

        return json_encode($returnResponse);
    }

    public function getIndividualEduesStatus($individualId): array
    {
        $response = [];
        $response['status'] = 'success';
        $response['eduesStatus'] = false;
        $modelEDues = EDuesEnrollment::where('IndividualId', $individualId)
            ->whereNull('DeletedAt')
            ->where('BHIndividualId', '!=', -1)
            ->get()->first();
        if ($modelEDues) {
            $response['eduesStatus'] = true;
        }

        return $response;
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

<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\MemberForms\Models\Form;
use Aft\MemberForms\Models\FormSubmission;
use Aft\MemberForms\Models\Template;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FormController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
        ]);

        return Form::join('memberforms_templates as ft', 'memberforms_forms.form_template_id', '=', 'ft.id')
            ->leftjoin('memberforms_submission as fs', function ($join): void {
                $join->on('memberforms_forms.id', '=', 'fs.form_id');
                $join->on(DB::raw('isNull(laravel_fs.[DeletedAt],0)'), '=', DB::raw('0'));
            })
            ->leftjoin('memberforms_url_redirects as fur', 'memberforms_forms.id', '=', 'fur.form_id')
            ->join('users as uc', 'memberforms_forms.CreatedBy', '=', 'uc.id')
            ->join('users as uu', 'memberforms_forms.UpdatedBy', '=', 'uu.id')
            ->where('affiliate_id', '=', $data['affiliateId'])
            ->whereNull('memberforms_forms.DeletedAt')
            ->groupBy(
                'memberforms_forms.id',
                'memberforms_forms.system_name',
                'memberforms_forms.display_name',
                'fs.form_id',
                'fur.id',
                'fur.custom_url',
                'ft.display_name',
                'memberforms_forms.form_template_id',
                'memberforms_forms.CreatedAt',
                'memberforms_forms.UpdatedAt',
                'uc.name',
                'uu.name',
                'memberforms_forms.archived'
            )
            ->orderBy('memberforms_forms.UpdatedAt', 'desc')
            ->get([
                'memberforms_forms.id',
                'memberforms_forms.system_name',
                'memberforms_forms.display_name',
                DB::raw('COUNT(laravel_fs.id) AS form_submissions_count'),
                DB::raw('count(laravel_fur.id) as form_url_redirect_count'),
                'ft.display_name as form_template_display_name',
                'fur.custom_url as url_redirect',
                'memberforms_forms.archived',
                'memberforms_forms.form_template_id',
                'memberforms_forms.CreatedAt',
                'memberforms_forms.UpdatedAt',
                'uc.name as CreatedBy',
                'uu.name as UpdatedBy',
            ]);
    }

    public function show($id)
    {
        $form = Form::where('id', $id)->first();
        $form->fields = Arr::sort($form->fields, fn($field) => $field['order']);

        return $form;
    }

    public function getFieldSource($fields, $sources)
    {
        foreach ($fields as &$field) {
            if ($field['type'] == 'group') {
                $field['fields'] = $this->getFieldSource($field['fields'], $sources);
            } elseif ($field['type'] != 'LocalDuesCategory' && $field['type'] != 'employmentInformation' && $field['type'] != 'workLocation' && $field['type'] != 'workStructure' && $field['type'] != 'jobTitle') {
                if (($field['source'] ?? false) && ($sources[$field['source']] ?? false)) {
                    $field['source'] = FormSourcesController::toDefault($sources[$field['source']], $sources);
                }
            }
        }

        return $fields;
    }

    public function filterFieldAttributes($fields)
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

    public function showForm($id)
    {
        $form = Form::where('id', $id)
            ->select('id', 'display_name', 'description', 'sources', 'fields', 'thankyou_fields', 'show_aft_logo')
            ->whereNull('deletedAt')
            ->where('archived', true)
            ->first();
        if ($form) {
            $form->fields = Arr::sort($form->fields, fn($field) => $field['order']);
            $form->fields = $this->getFieldSource($form->fields, $form->sources);
            $form->fields = $this->filterFieldAttributes($form->fields);

            return $form;
        }

        return null;
    }

    public function cloneToDataForm(Request $request)
    {
        $parentFormId = $request->get('id');
        $form = Form::where('id', $parentFormId)
            ->whereNull('deletedAt')
            ->where('archived', false)
            ->whereIn('form_template_id', [4, 5])
            ->first();

        $dataForm = null;
        if (isset($form)) {
            $user = Auth::user();
            $dataForm = $form->replicate();
            $dataForm->form_template_id = 7;
            $dataForm->fields = $this->reviseFieldsForDataForm($dataForm->fields);
            $dataForm->UpdatedBy = $dataForm->CreatedBy = $user->id;
            $dataForm->UpdatedAt = $dataForm->CreatedAt = now();

            $emailFields = $dataForm->confirmation_email_fields;
            $emailFields['fields']['sendConfirmationEmail']['value'] = false;
            $dataForm->confirmation_email_fields = $emailFields;

            $sources = $dataForm->sources;
            $sources['ParentFormId'] = $parentFormId;
            $dataForm->sources = $sources;

            $dataForm->save();
        }

        return $dataForm;
    }

    private function reviseFieldsForDataForm(array $fields)
    {
        // -- Remove Cope Signature -----
        $customCopeKey = array_search('customCope', array_column($fields, 'fieldName'));
        if ($customCopeKey > 0) {
            $fields[$customCopeKey]['value']['showSignature'] = false;
        }

        // -- Remove fields ------
        $paymentKey = array_search('payment', array_column($fields, 'fieldName'));
        $signatureKey = array_search('signature', array_column($fields, 'fieldName'));
        $signatureOtherKey = array_search('signatureOther', array_column($fields, 'fieldName'));
        $signatureOtherKey = $signatureOtherKey ?: -1;
        unset($fields[$paymentKey], $fields[$signatureKey], $fields[$signatureOtherKey]);

        // -- Add fields -----
        $jsonPaymentAmount = '{
            "order": 9,
			"fixed": true,
			"required": true,
			"type": "group",
			"label": "Payment Amount",
			"fieldsAsRows": "true",
			"fields": {
            "paymentAmount": {
                "order": 1,
					"required": true,
					"type": "amount",
					"label": "Payment Amount",
					"maxlength": 9
				}
			},
			"fieldName": "paymentAmountGroup",
			"id": "paymentAmountGroup",
			"value": ""
		}';
        $jsonNotes = '{
			"order": 10,
			"fixed": true,
			"required": true,
			"type": "group",
			"label": "Notes",
			"fieldsAsRows": "true",
			"fields": {
				"notes": {
					"order": 1,
					"required": true,
					"type": "text",
					"label": "Notes",
					"maxlength": 250
				}
			},
			"fieldName": "notesGroup",
			"id": "notesGroup",
			"value": ""
		}';
        $fields[] = json_decode($jsonPaymentAmount);
        $fields[] = json_decode($jsonNotes);

        return array_values($fields);
    }

    public function store(Request $request)
    {
        $validationArray = [
            'templateId' => 'integer|required',
            'formName' => 'string|required',
            'formTitle' => 'string|required',
            'formShowAftLogo' => 'boolean|nullable',
            'formShowLocalLogo' => 'boolean|nullable',
            'formShowFedLogo' => 'boolean|nullable',
            'affiliateId' => 'integer|required',
            'chapterId' => 'integer|nullable',
            'employerId' => 'array|nullable',
            'localId' => 'array|nullable',
            'unitId' => 'integer|nullable',
            'localJobClassId' => 'integer|nullable',
            'jobTitleId' => 'integer|nullable',
            'formShowInDirectory' => 'boolean|nullable',
            'form' => 'array|required',
            'action' => 'string|required',
        ];
        if ($request->has('formDescription')) {
            $validationArray['formDescription'] = 'string|nullable';
        }
        if ($request->input('templateId') != 3 && $request->input('templateId') != 6 && $request->input('templateId') != 8) {
            $validationArray['duesCategories'] = 'array|required';
        }
        if (str_starts_with((string) $request->input('action'), 'edit')) {
            $validationArray['formId'] = 'integer|required';
        }
        $data = $request->validate($validationArray);

        $user = Auth::user();
        $template = Template::find($data['templateId']);

        // check if all fixed fields exist
        $formFields = collect($data['form']['fields']);

        foreach ($template->fields as $templateFieldName => $templateField) {
            if (($templateField['fixed'] ?? false) && ! $formFields->contains('fieldName', $templateFieldName)) {
                return response()->json(['error' => 'Field '.$templateFieldName.' is required'], 422);
            }
        }
        $sourceArray = [];
        $sourceArray['affiliateId'] = null;
        $sourceArray['chapterId'] = null;
        $sourceArray['employerId'] = null;
        $sourceArray['unitId'] = null;
        $sourceArray['localJobClassId'] = null;
        $sourceArray['jobTitleId'] = null;
        $fieldCount = count($formFields);
        foreach ($formFields as $key => $field) {
            // $field['order'] = $order++;
            if (isset($field['fieldName']) && $field['fieldName'] == 'childAffiliate') {
                $field['localId'] = $data['localId'] ?? null;
                $field['source'] = [
                    'affiliateId' => $data['affiliateId'] ?? null,
                    'localId' => $data['localId'] ?? null,
                ];
                $formFields[$key] = $field;
            }
            if (isset($field['dataSource']) && $field['dataSource'] == 'employmentInformation') {
                $field['source'] = [
                    'affiliateId' => $data['affiliateId'] ?? null,
                    'chapterId' => $data['chapterId'] ?? null,
                    'employerId' => $data['employerId'] ?? null,
                    'unitId' => $data['unitId'] ?? null,
                    'localJobClassId' => $data['localJobClassId'] ?? null,
                    'jobTitleId' => $data['jobTitleId'] ?? null,
                ];
                $field['type'] = 'employmentInformation';
                $formFields[$key] = $field;
            }
            if (isset($field['orderAbove']) && $field['orderAbove'] == true && ($key-1)>=0) {
                $field['orderAbove'] = false;
                $previousField = $formFields[$key-1];
                $formFields[$key-1] = $field;
                $formFields[$key] = $previousField;
            } elseif (isset($field['orderBelow']) && $field['orderBelow'] == true && ($key+1)<=$fieldCount) {
                $field['orderBelow'] = false;
                $nextField = $formFields[$key+1];
                $formFields[$key+1] = $field;
                $formFields[$key] = $nextField;
            } else {
                $formFields[$key] = $field;
            }
        }

        foreach ($formFields as $key => $field) {
            if (isset($field['dataSource']) && ($field['dataSource'] == 'workLocation' || $field['dataSource'] == 'workStructure' || $field['dataSource'] == 'jobTitle')) {
                $field['source'] = $sourceArray;
                $formFields[$key] = $field;
            }
        }

        $employmentInformationFields = [];
        $employmentInformationFields['chapterId'] = $data['chapterId'] ?? null;
        $employmentInformationFields['employerId'] = $data['employerId'] ?? null;
        $employmentInformationFields['unitId'] = $data['unitId'] ?? null;
        $employmentInformationFields['localJobClassId'] = $data['localJobClassId'] ?? null;
        $employmentInformationFields['jobTitleId'] = $data['jobTitleId'] ?? null;

        $finalFormFields = [
            'affiliate_id' => $data['affiliateId'],
            'form_template_id' => $data['templateId'],
            'system_name' => $data['formName'],
            'display_name' => $data['formTitle'],
            'description' => $data['formDescription'] ?? null,
            'show_in_directory' => $data['formShowInDirectory'] ?? false,
            'sources' => $data['form']['sources'] ?? [],
            'destinations' => [],
            'fields' => $formFields,
            'thankyou_fields' => $data['form']['thankyou_fields'],
            'show_aft_logo' => $data['formShowAftLogo'] ?? true,
            'show_local_logo' => $data['formShowLocalLogo'] ?? false,
            'show_fed_logo' => $data['formShowFedLogo'] ?? false,
            'employment_information_fields' => $employmentInformationFields,
            // 'work_structure_fields' => $workStructureFields,
            'confirmation_email_fields' => $data['form']['confirmation_email_fields'],
            'order' => 1,
        ];

        if ($data['action'] == 'create' || $data['action'] == 'clone') {
            $finalFormFields['CreatedBy'] = $user->id;
            $finalFormFields['CreatedAt'] = now();
            $finalFormFields['UpdatedBy'] = $user->id;
            $finalFormFields['UpdatedAt'] = now();

            $form = new Form($finalFormFields);
            $form->save();
        } elseif ($data['action'] == 'edit') {
            // Safety check: update only if form has no submissions
            $submissionCount = FormSubmission::where('form_Id', $data['formId'])->count();
            if ($submissionCount == 0) {
                $finalFormFields['UpdatedBy'] = $user->id;
                $finalFormFields['UpdatedAt'] = now();

                $form = Form::find($data['formId']);
                $form->update($finalFormFields);
            }
        } elseif ($data['action'] == 'editConfirmation') {
            $finalFormFields = [];
            $finalFormFields['thankyou_fields'] = $data['form']['thankyou_fields'];
            $finalFormFields['confirmation_email_fields'] = $data['form']['confirmation_email_fields'];
            $finalFormFields['UpdatedBy'] = $user->id;
            $finalFormFields['UpdatedAt'] = now();

            $form = Form::find($data['formId']);
            $form->update($finalFormFields);
        }

        return ['success'];
    }

    public function delete($id): array
    {
        $submissionCount = FormSubmission::where('form_Id', $id)->count();
        if ($submissionCount == 0) {
            $user = Auth::user();

            $form = Form::find($id);
            $form->UpdatedBy = $user->id;
            $form->UpdatedAt = now();
            $form->DeletedAt = now();
            $form->save();
        }

        return ['success'];
    }

    public function archive(Request $request): array
    {
        $data = $request->validate(['id' => 'integer|required']);
        if ($data && isset($data['id'])) {
            $user = Auth::user();

            $form = Form::find($data['id']);
            $form->UpdatedBy = $user->id;
            $form->UpdatedAt = now();
            $form->archived = true;
            $form->save();
        }

        return ['success'];
    }

    public function unarchive(Request $request): array
    {
        $data = $request->validate(['id' => 'integer|required']);
        if ($data && isset($data['id'])) {
            $user = Auth::user();

            $form = Form::find($data['id']);
            $form->UpdatedBy = $user->id;
            $form->UpdatedAt = now();
            $form->archived = false;
            $form->save();
        }

        return ['success'];
    }
}

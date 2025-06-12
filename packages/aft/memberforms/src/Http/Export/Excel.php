<?php

namespace Aft\MemberForms\Http\Export;

use Aft\MemberForms\Http\Controllers\Admin\FormSubmissionController;
use App\Http\Controllers\Filter\ParsesQuery;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use ReflectionException;
use Spatie\QueryBuilder\QueryBuilder;

class Excel implements FromCollection, WithHeadings, WithMapping
{
    use Exportable;
    use ParsesQuery;

    protected $fieldList = ['fullName', 'firstName', 'middleName', 'lastName', 'preferredName', 'dateOfBirth', 'email', 'emailPersonalPreferred', 'emailWork', 'emailWorkPreferred', 'phoneWork', 'phoneWorkPreferred', 'phoneMobile', 'phoneMobilePreferred', 'phoneHome', 'phoneHomePreferred', 'address', 'addressLine1', 'addressLine2', 'city', 'state', 'zip', 'addressHomePreferred', 'billingAddress', 'billingAddressLine1', 'billingAddressLine2', 'billingCity', 'billingState', 'billingZip', 'addressBillingPreferred', 'employeeID', 'employerHireDate', 'localJobClassName', 'LocalDuesCategoryName', 'LocalDuesCategoryPrice', 'copeAmount', 'BillingTypeName', 'ChapterName', 'EmployerName', 'UnitName', 'workLocationName', 'customField1', 'customField2', 'customField3', 'customUserField1', 'customTextField-1', 'customTextField-2', 'customTextField-3', 'markupTextField-1', 'markupTextField-2', 'markupTextField-3', 'customSelectionField-1', 'customSelectionField-2', 'customSelectionField-3', 'paymentMethod'];

    /**
     * AbstractCrudController constructor.
     *
     * @param  AbstractCrudController  $controller
     * @param mixed[] $form_fields
     * @param int $submissionStatusCount
     * @param int $formTemplateId
     */
    public function __construct(protected \Illuminate\Http\Request $request, protected \Aft\MemberForms\Http\Controllers\Admin\FormSubmissionController $controller, protected string $type, protected $form_fields, protected $submissionStatusCount = 0, protected $formTemplateId = 0)
    {
    }

    /**
     * @return AnonymousResourceCollection|QueryBuilder
     *
     * @throws ReflectionException
     */
    public function collection()
    {
        return $this->controller->prepareExportData();
    }

    protected $exportTableConfiguration = null;

    protected function getExportTableConfiguration()
    {
        $row = ['Form Name', 'Form Title', 'Submission Type', 'Date Submitted'];
        if ($this->submissionStatusCount > 0) {
            $row[] = 'Individual Guid';
        }
        if ($this->formTemplateId == 4 || $this->formTemplateId == 5) {
            $row[] = 'Billhighway Individual Id';
        }
        $formFields = array_keys($this->form_fields);
        foreach ($this->fieldList as $field) {
            if (in_array($field, $formFields)) {
                $row[] = $field;
            }
        }
        $this->exportTableConfiguration['fields'] = $row;

        return $this->exportTableConfiguration;
    }

    public function headings(): array
    {
        $row = ['Form Name', 'Form Title', 'Submission Type', 'Date Submitted'];
        if ($this->submissionStatusCount > 0) {
            $row[] = 'Individual Guid';
        }
        if ($this->formTemplateId == 4 || $this->formTemplateId == 5) {
            $row[] = 'Billhighway Individual Id';
        }
        $config = $this->getExportTableConfiguration();
        $formFields = array_keys($this->form_fields);
        foreach ($this->fieldList as $field) {
            if (in_array($field, $formFields)) {
                $fieldObj = $this->form_fields[$field];
                if ($fieldObj['data_name'] == 'preferredName') {
                    $row[] = 'Prefered Name';
                } elseif ($fieldObj['data_name'] == 'emailPersonalPreferred') {
                    $row[] = 'Preferred Email (Personal)';
                } elseif ($fieldObj['data_name'] == 'emailWorkPreferred') {
                    $row[] = 'Preferred Email (Work)';
                } elseif ($fieldObj['data_name'] == 'phoneHomePreferred') {
                    $row[] = 'Preferred Phone (Home)';
                } elseif ($fieldObj['data_name'] == 'phoneWorkPreferred') {
                    $row[] = 'Preferred Phone (Work)';
                } elseif ($fieldObj['data_name'] == 'phoneMobilePreferred') {
                    $row[] = 'Preferred Phone (Mobile)';
                } elseif ($fieldObj['data_name'] == 'addressLine1') {
                    $row[] = 'Home Address Line 1';
                } elseif ($fieldObj['data_name'] == 'addressLine2') {
                    $row[] = 'Home Address Line 2';
                } elseif ($fieldObj['data_name'] == 'city') {
                    $row[] = 'Home City';
                } elseif ($fieldObj['data_name'] == 'state') {
                    $row[] = 'Home State';
                } elseif ($fieldObj['data_name'] == 'zip') {
                    $row[] = 'Home Zip';
                } elseif ($fieldObj['data_name'] == 'addressHomePreferred') {
                    $row[] = 'Preferred Address (Home)';
                } elseif ($fieldObj['data_name'] == 'billingAddressLine1') {
                    $row[] = 'Billing Address Line 1';
                } elseif ($fieldObj['data_name'] == 'billingAddressLine2') {
                    $row[] = 'Billing Address Line 2';
                } elseif ($fieldObj['data_name'] == 'billingCity') {
                    $row[] = 'Billing City';
                } elseif ($fieldObj['data_name'] == 'billingState') {
                    $row[] = 'Billing State';
                } elseif ($fieldObj['data_name'] == 'billingZip') {
                    $row[] = 'Billing Zip';
                } elseif ($fieldObj['data_name'] == 'addressBillingPreferred') {
                    $row[] = 'Preferred Address (Billing)';
                } else {
                    $row[] = $fieldObj['data_label'];
                }
            }
        }

        return $row;
    }

    public function map($dataModel): array
    {
        return $dataModel->exportResource($this->getExportTableConfiguration(), $this->type);
    }
}

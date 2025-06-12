<?php

namespace Aft\SSRS;

use Illuminate\Support\Str;

class Report
{
    private array $opts;

    private readonly \SSRS\Report $ssrs;

    private string $ssrsSessionId = '';

    private array $ssrsReportParameters = [];

    public function __construct($source = null)
    {
        if ($source == 'mfp') {
            $this->opts = config('ssrs.mfp_connection');
        } else {
            $this->opts = config('ssrs.connection');
        }

        $this->ssrs = new \SSRS\Report($this->opts['endpoint'], $this->opts);
    }

    protected function validatePath(string $path)
    {
        return Str::start($path, '/');
    }

    protected function mapParameterType($parameter): string
    {
        // 'Integer', 'String', 'Float', 'Boolean', 'DateTime'
        switch ($parameter->getType()) {
            case 'Boolean':
                return 'boolean';
            case 'Integer':
                return 'number';
            case 'Float':
                return 'number';
            case 'String':
                if ($parameter->isSelect()) {
                    if ($parameter->isMultiValue()) {
                        return 'multiselect';
                    } else {
                        return 'select';
                    }
                } else {
                    return 'text';
                }
            case 'DateTime':
                return 'datetime';
            default:
                return 'unknown';
        }
    }

    public function listChildren(string $path, bool $recursive = false): Catalog
    {
        $path = $this->validatePath($path);
        $params = [
            'ItemPath' => $path,
            'Recursive' => false,
        ];
        $result = $this->ssrs->getSoapService()->ListChildren($params);
        $catalog = new Catalog($result);
        if ($recursive) {
            foreach ($catalog as $key => $catalogItem) {
                if ($catalogItem->TypeName === 'Folder') {
                    $catalogItem->Children = $this->listChildren($catalogItem->Path, $recursive);
                    $catalog[$key] = $catalogItem;
                }
            }
        }

        return $catalog;
    }

    /**
     * @return array{name: mixed, type: mixed, label: mixed, value: mixed, default: mixed, missingValues: mixed, missingDependencies: mixed, required: bool, values: list<array{value: mixed, label: mixed}>, hidden: bool}[]
     */
    protected function getParameters(): array
    {
        $parameters = [];
        foreach ($this->ssrsReportParameters as $reportParameter) {
            // Remove non user parameters
            $paramData = $reportParameter->data;
            $ssrsValidValues = $reportParameter->getValidValues();
            $validValues = [];
            foreach ($ssrsValidValues as $ssrsValidValue) {
                $validValues[] = [
                    'value' => $ssrsValidValue->Value,
                    'label' => $ssrsValidValue->Label,
                ];
            }
            $hidden = ! $paramData['PromptUser'] || empty($paramData['Prompt']);
            $parameter = [
                'name' => $paramData['Name'],
                'type' => $this->mapParameterType($reportParameter),
                'label' => $hidden ? ('Hidden Parameter '.$paramData['Name']) : $paramData['Prompt'],
                'value' => $reportParameter->value,
                'default' => $reportParameter->getDefaultValue(),
                // input must be defined before parameters can be loaded
                'missingValues' => $reportParameter->hasMissingValidValue(),
                // input is required but can be described later?
                'missingDependencies' => $reportParameter->hasOutstandingDependencies(),
                'required' => ! $paramData['Nullable'],
                'values' => $validValues,
                'hidden' => $hidden,
            ];
            $parameters[] = $parameter;
        }

        return $parameters;
    }

    public function getReportParameters(string $path)
    {
        if (empty($this->ssrsSessionId)) {
            $path = $this->validatePath($path);
            $report = $this->ssrs->loadReport($path);
            $this->ssrsSessionId = $report->executionInfo->ExecutionID;
            $this->ssrs->setSessionId($this->ssrsSessionId);
            $this->ssrsReportParameters = $report->executionInfo->getReportParameters();
            $parameters = $this->getParameters();
        } else {
            $this->ssrs->setSessionId($this->ssrsSessionId);
            $executionInfo = $this->ssrs->getExecutionInfo();
            $this->ssrsReportParameters = $executionInfo->getReportParameters();
            $parameters = $this->getParameters();
        }

        return $parameters;
    }

    public function setParameters($parameters)
    {
        return $this->ssrs->setExecutionParameters($parameters);
    }

    public function getExportTypes()
    {
        return $this->ssrs->listRenderingExtensions();
    }

    public function render()
    {
        $deviceInfo = [
            'HTMLFragment' => true,
            // 'PrefixId' => true,
            // 'StyleStream' => true,
            // 'ExpandContent' => true,
            // 'Toolbar' => true,
            'Section' => 1,
            'ReplacementRoot' => 'example.com',
            // 'OutlookCompat' => true,
        ];
        // PDF | XML | CSV

        return $this->ssrs->render('HTML5', $deviceInfo);
    }

    public function download()
    {
        $deviceInfo = [
            // 'HTMLFragment' => true,
            // 'PrefixId' => true,
            // 'StyleStream' => true,
            // 'ExpandContent' => true,
            // 'Toolbar' => true,
            'Section' => 0,
            // 'ReplacementRoot' => 'example.com',
            // 'OutlookCompat' => true,
        ];
        // PDF | XML | CSV

        return $this->ssrs->render('EXCELOPENXML', $deviceInfo);
    }
}

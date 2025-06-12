<?php

namespace Aft\SSRS\Http\Controllers;

use Aft\SSRS\Http\Resources\CatalogResource;
use Aft\SSRS\Report;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct()
    {
        //
    }

    public function index(Request $request): array
    {
        $source = $request->get('source');
        $path = config('ssrs.connection.base');
        $ssrs = new Report($source);

        $catalog = $ssrs->listChildren($path, true);
        $items = [];
        foreach ($catalog as $catalogItem) {
            $resource = new CatalogResource($catalogItem);
            $items[] = $resource;
        }

        return [
            'report' => '',
            'items' => $items,
        ];
    }

    public function options(string $path, Request $request): array
    {
        $affiliateId = $request->user()->selectedAffiliateId;
        $predefinedParams = [
            'AffiliateId' => $affiliateId,
        ];
        $ssrs = new Report();
        $params = $ssrs->getReportParameters($path);
        $ssrsParameters = [];
        foreach ($params as $param) {
            if ($param['missingValues'] || $param['missingDependencies']) {
                if (array_key_exists($param['name'], $predefinedParams)) {
                    $ssrsParameters[$param['name']] = $predefinedParams[$param['name']];
                }
            }
        }

        if (! empty($ssrsParameters)) {
            $execParameters = new \SSRS\Object\ExecutionParameters($ssrsParameters);
            $ssrs->setParameters($execParameters);
            $params = $ssrs->getReportParameters($path);
        }

        $params = array_filter($params, fn($parameter): bool => ! $parameter['hidden']);

        return [
            'parameters' => $params,
            'exports' => $ssrs->getExportTypes(),
        ];
    }

    public function show(string $path, Request $request): string
    {
        $affiliateId = $request->user()->selectedAffiliateId;
        $predefinedParams = [
            'AffiliateId' => $affiliateId,
        ];
        $requestParams = $request->get('parameters');
        $ssrs = new Report();
        $params = $ssrs->getReportParameters($path);
        $ssrsParameters = [];
        foreach ($params as $param) {
            if ($param['missingValues'] || $param['missingDependencies']) {
                if (array_key_exists($param['name'], $predefinedParams)) {
                    $ssrsParameters[$param['name']] = $predefinedParams[$param['name']];
                } else {
                    $ssrsParameters[$param['name']] = null;
                }
            }
        }
        foreach ($ssrsParameters as $key => $value) {
            if ($value === null) {
                if (array_key_exists($key, $requestParams)) {
                    $ssrsParameters[$key] = $requestParams[$key];
                }
            }
        }
        if (! empty($ssrsParameters)) {
            $execParameters = new \SSRS\Object\ExecutionParameters($ssrsParameters);
            $ssrs->setParameters($execParameters);
            $params = $ssrs->getReportParameters($path);
        }

        return $ssrs->render();
    }

    public function download(string $path, Request $request)
    {
        $affiliateId = $request->user()->selectedAffiliateId;
        $predefinedParams = [
            'AffiliateId' => $affiliateId,
        ];
        $requestParams = $request->all();
        $ssrs = new Report();
        $params = $ssrs->getReportParameters($path);
        $ssrsParameters = [];
        foreach ($params as $param) {
            if ($param['missingValues'] || $param['missingDependencies']) {
                if (array_key_exists($param['name'], $predefinedParams)) {
                    $ssrsParameters[$param['name']] = $predefinedParams[$param['name']];
                } else {
                    $ssrsParameters[$param['name']] = null;
                }
            }
        }
        foreach ($ssrsParameters as $key => $value) {
            if ($value === null) {
                if (array_key_exists($key, $requestParams)) {
                    $ssrsParameters[$key] = $requestParams[$key];
                }
            }
        }
        if (! empty($ssrsParameters)) {
            $execParameters = new \SSRS\Object\ExecutionParameters($ssrsParameters);
            $ssrs->setParameters($execParameters);
            $params = $ssrs->getReportParameters($path);
        }

        return response()->streamDownload(function () use ($ssrs): void {
            $file = fopen('php://output', 'w+');
            fwrite($file, (string) $ssrs->download());
            fclose($file);
        }, 'Report-Download-'.date('Y-m-d').'.xlsx');
    }
}

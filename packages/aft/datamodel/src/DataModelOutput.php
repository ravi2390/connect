<?php

namespace Aft\DataModel;

use Exception;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class DataModelOutput
{
    private ?\Twig\Loader\FilesystemLoader $twigLoader = null;

    private ?\Twig\Environment $twig = null;

    /**
     * @var DataModel
     */
    private $dataModel;

    /**
     * @var array
     */
    private $dag;

    private array $affiliateAwareModels = [
        'Individual',
        'Affiliate',
        'Employer',
        'IndividualAffiliate',
        'Chapter',
        'Unit',
        'WorkLocation',
        'WorkStructure',
        'LocalDuesCategory',
        'AffiliateCommittee',
        'LocalJobClass',
        'AffiliateOfficerRole',
        'AffiliateStaff',
        'CommitteeMemberType',
        'AffiliateGroupType',
        'AffiliateGroup',
        'Subject',
    ];

    private function cleanDirectory($directoryPath): void
    {
        $files = glob(rtrim((string) $directoryPath, '/').'/*.php');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }

    public function cleanDirectories(): void
    {
        $modelBasePath = config('datamodel.output.models_path');
        $requestsBasePath = config('datamodel.output.requests_path');
        $controllerBasePath = config('datamodel.output.controllers_path');
        $routeBasePath = config('datamodel.output.route_path');
        $novaBasePath = config('datamodel.output.nova_path');

        $this->cleanDirectory($modelBasePath);
        $this->cleanDirectory($requestsBasePath);
        $this->cleanDirectory($controllerBasePath);
        $this->cleanDirectory($routeBasePath);
        $this->cleanDirectory($novaBasePath);
    }

    /**
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     * @throws \Exception
     */
    private function createFileFromTemplate(string $templateName, string $destPath, &$table): void
    {
        $outputData = $this->twig->render($templateName.'.twig', ['table' => &$table]);
        if (file_put_contents($destPath, $outputData) === false) {
            throw new Exception("Could not write file: '$destPath'");
        }
    }

    /**
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     * @throws \Exception
     */
    private function createFileFromDAG(string $templateName, string $destPath, &$dag): void
    {
        $outputData = $this->twig->render($templateName.'.twig', ['data' => &$dag]);
        if (file_put_contents($destPath, $outputData) === false) {
            throw new Exception("Could not write file: '$destPath'");
        }
    }

    /**
     * @throws \Exception
     */
    private function createTemplateFiles(): void
    {

        $traitBasePath = config('datamodel.traits_path');
        $modelBasePath = config('datamodel.output.models_path');
        $requestsBasePath = config('datamodel.output.requests_path');
        $controllerBasePath = config('datamodel.output.controllers_path');
        $routeBasePath = config('datamodel.output.route_path');
        $resourcesBasePath = config('datamodel.resources_path');
        $novaBasePath = config('datamodel.output.nova_path');

        $this->cleanDirectories();

        foreach ($this->dag as $order => $tableName) {
            $table = &$this->dataModel->getTable($tableName);

            $traitPath = $traitBasePath.'/'.$tableName.'.php';
            $resourcesPath = $resourcesBasePath.'/'.$tableName.'.php';
            $modelPath = $modelBasePath.'/'.$tableName.'.php';
            $requestPath = $requestsBasePath.'/'.$tableName.'Request.php';
            $controllerPath = $controllerBasePath.'/'.$tableName.'Controller.php';
            $novaPath = $novaBasePath.'/'.$tableName.'.php';

            if (file_exists($traitPath)) {
                $table->meta['hasTrait'] = true;
            }
            if (file_exists($resourcesPath)) {
                $table->meta['hasResource'] = true;
            }

            $this->prepareModel($table);

            $this->createFileFromTemplate('Model', $modelPath, $table);
            $this->createFileFromTemplate('Request', $requestPath, $table);
            $this->createFileFromTemplate('Controller', $controllerPath, $table);
            // $this->createFileFromTemplate('Nova', $novaPath, $table); TODO: skip for now as nova isn't used yet
        }
        $this->createFileFromDAG('api_routes', $routeBasePath.'/api_routes.php', $this->dag);
    }

    /**
     * @throws \Exception
     */
    public function output($dataModel, $dag): void
    {
        $this->twigLoader = new FilesystemLoader(config('datamodel.templates.path'));
        $this->twig = new Environment($this->twigLoader);
        $this->dataModel = $dataModel;
        $this->dag = $dag;
        $this->createTemplateFiles();
    }

    private function prepareModel($table): void
    {
        $table->meta['interfaces'] = [];
        if (in_array($table->name, $this->affiliateAwareModels)) {
            $table->meta['interfaces'][] = 'AffiliateAware';
        }
    }
}

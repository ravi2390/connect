<?php

namespace Aft\AFTDB;

use Exception;
use Illuminate\Console\Command;

class SchemaSanitizer
{
    private $command;

    private $filter;

    /**
     * SchemaValidator constructor.
     */
    public function __construct(private readonly DataModel $dataModel, ?Command $command = null)
    {
        if (! $command) {
            $command = new class
            {
                public function info(string $msg): void
                {
                    echo $msg.PHP_EOL;
                }

                public function warn(string $msg): void
                {
                    echo $msg.PHP_EOL;
                }

                public function error(string $msg): void
                {
                    echo $msg.PHP_EOL;
                }
            };
        }
        $this->command = $command;
        $this->filter = new StringFilter();
    }

    private function sanitizeFinalize(): void
    {
        $cellRules = config('aftdb.filters.finalize');
        $this->dataModel->filterAllCells(function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, string $tableName) use ($cellRules): void {
            try {
                $cell = $this->filter->filter($cell, $cellRules);
            } catch (Exception $e) {
                throw new Exception('In table '.$tableName.': '.$e->getMessage());
            }
        });
    }

    private function sanitizeByColumn(): void
    {
        $columnRules = config('aftdb.filters.columns');
        foreach ($columnRules as $columnID => $rules) {
            $this->dataModel->filterAllColumnsByID($columnID, function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, string $tableName) use ($rules): void {
                try {
                    $cell = $this->filter->filter($cell, $rules);
                } catch (Exception $e) {
                    throw new Exception('In table '.$tableName.': '.$e->getMessage());
                }
            });
            $this->dataModel->removeAllRowsByEmptyColumnID('name');
        }
    }

    private function sanitizeHeaders(): void
    {
        $headerRules = config('aftdb.filters.headers');
        $this->dataModel->filterAllHeaders(function (&$header, &$table) use ($headerRules): void {
            if (! empty($table->meta['data_for'])) {
                return;
            }
            try {
                $header = $this->filter->filter($header, $headerRules);
            } catch (Exception $e) {
                throw new Exception('In table '.$table->name.': '.$e->getMessage());
            }
        });
        $this->dataModel->removeAllColumnsByEmptyHeader();
        $this->dataModel->setAllTableHeadersToAssoc();
    }

    private function sanitizeCells(): void
    {
        $cellRules = config('aftdb.filters.cells');
        $this->dataModel->filterAllHeaders(function (&$header, &$table) use ($cellRules): void {
            try {
                $header = $this->filter->filter($header, $cellRules);
            } catch (Exception $e) {
                throw new Exception('In table '. $table->name.': '.$e->getMessage());
            }
        });
        $this->dataModel->filterAllCells(function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, string $tableName) use ($cellRules): void {
            try {
                $cell = $this->filter->filter($cell, $cellRules);
            } catch (Exception $e) {
                throw new Exception('In table '.$table->name.': '.$e->getMessage());
            }
        });
    }

    private function removeDataTables(): void
    {
        $this->dataModel->filterAllTables(function (&$table, string $tableName): void {
            if ($tableName == 'table_metadata') {
                $this->command->info('Removing table '.$tableName);
                $this->dataModel->tableRemove($tableName);
            }
            if (preg_match('/^(.*)_data$/i', $tableName, $matches)) {
                $this->command->info('Removing data table '.$tableName);
                $forTable = $this->dataModel->tableGet($matches[1]);
                if (empty($forTable)) {
                    throw new Exception('Data provided for non existent table '.$matches[1]);
                }
                $this->dataModel->tableRemove($tableName);
            }
        });
    }

    private function appendSystemColumns(): void
    {
        $systemColumnsTable = $this->dataModel->tableGet('System_Columns');
        $this->command->info('Removing table '.$systemColumnsTable->name);
        $this->dataModel->tableRemove('System_Columns');
        $this->command->info('Appending System_Columns...');
        $this->dataModel->filterAllTables(function (&$table, $tableName): void {
            //$this->dataModel->appendTableToTable($table, $systemColumnsTable);
        });
    }

    private function process(): \Aft\AFTDB\DataModel
    {
        $this->removeDataTables();
        $this->sanitizeCells();
        $this->sanitizeHeaders();
        $this->appendSystemColumns();
        $this->sanitizeByColumn();
        $this->sanitizeFinalize();

        return $this->dataModel;
    }

    public static function clean(): void
    {
        //
    }

    public static function sanitize(DataModel $datamodel, ?Command $command = null): \Aft\AFTDB\DataModel
    {
        $sanitizer = new SchemaSanitizer($datamodel, $command);

        return $sanitizer->process();
    }
}

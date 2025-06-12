<?php

namespace Aft\DataModel;

use Exception;
use PhpOffice\PhpSpreadsheet\IOFactory;

class DataModelLoader
{
    public $postLoadSheetFn;

    public $postLoadFileFn;

    public $globPattern = '*.csv';

    public $sheetNamePattern = ['pattern' => '/^(\d+\.)?(.*)/', 'replacement' => '$2'];

    public $files;

    /**
     * @var array{}
     */
    public $sheets;

    public function postLoadSheet(&$sheet, &$sheets): void
    {
        if ($this->postLoadSheetFn) {
            $fn = $this->postLoadSheetFn;
            $fn($sheet, $sheets);
        }
    }

    public function postLoadFile(&$path, &$fileSheets, &$sheet)
    {
        if ($this->postLoadFileFn) {
            $fn = $this->postLoadFileFn;

            return $fn($path, $fileSheets, $sheet);
        }
    }

    public function __construct()
    {
        $this->files = [];
        $this->sheets = [];
    }

    /**
     * @param  string  $cachePath
     * @return \Aft\DataModel\DataModel
     *
     * @throws \Exception
     */
    public function load($sheetDirectory, $cachePath = '.')
    {
        $this->files = [];
        $this->sheets = [];

        $cachePath = rtrim($cachePath, '/').'/dmcache.json';

        if (! file_exists($cachePath)) {
            // After an entire file is loaded then if the system columns exist
            // associate it with all file sheets (except raw data sheets)
            $this->postLoadFileFn = function (/* @noinspection PhpUnusedParameterInspection */ &$path, &$files, &$sheet) {

                if ($sheet->name == 'table_metadata') {
                    return false;
                }

                if (preg_match('/^(\d+\.)?system_columns/i', $sheet->name)) {
                    $sheet->name = 'System_Columns@'.$sheet->path;
                }
                if (preg_match('/^(.*)_data$/i', $sheet->name, $matches)) {
                    if (empty($files[$matches[1]])) {
                        throw new Exception('Data provided for non existent table '.$matches[1]);
                    }
                    $files[$matches[1]]->meta['data'] = $matches[1];
                    $sheet->meta['data_for'] = $matches[1];
                }
                $sheetName = $path;
                $systemColumnsName = false;
                if (preg_match('/^System_Columns@/', $sheet->name)) {
                    $systemColumnsName = $sheetName;
                }
                if (empty($systemColumnsName)) {
                    return;
                }
                if (($sheetName != $systemColumnsName) && empty($sheet->meta['data_for'])) {
                    $sheet->meta['system_columns'] = $systemColumnsName;
                }
            };

            $this->addDirectorySheets($sheetDirectory);
            $tables = $this->convertSheetsToTables();
            $dataModel = new DataModel($tables);
            $dataModel->trimAllTables();
            $dataModel->removeAllRowsByEmptyColumnID(0);
            $dmcache = fopen($cachePath, 'w');
            fwrite($dmcache, $dataModel->tablesToJSON());
            fclose($dmcache);
        } else {
            $dmcache = fopen($cachePath, 'r');
            $json = fread($dmcache, filesize($cachePath));
            fclose($dmcache);
            $dataModel = new DataModel(json_decode($json, true));
        }

        return $dataModel;
    }

    /**
     * @param  bool  $force
     *
     * @throws \Exception
     */
    public function addDirectorySheets($path, $force = false): void
    {
        $files = glob(rtrim((string) $path, '/').'/'.$this->globPattern);
        $fileCount = count($files);
        $fileIndex = 0;
        foreach ($files as $file) {
            $fileIndex++;
            echo "Loading file $fileIndex/$fileCount : '$file'...".PHP_EOL;
            $this->addFileSheets($file, $force);
        }
    }

    /**
     * @param  bool  $force
     *
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Reader\Exception
     * @throws \Exception
     */
    public function addFileSheets($path, $force = false): void
    {

        $fileName = explode('/', (string) $path);
        $fileName = $fileName[count($fileName) - 1];
        $fileName = explode('.', $fileName);
        $fileName = $fileName[0];
        $sheetRealName = $fileName;
        $sheetRealName = trim($sheetRealName);
        $sheetName = preg_replace($this->sheetNamePattern['pattern'], (string) $this->sheetNamePattern['replacement'], $sheetRealName);

        if (! $force && in_array($sheetName, $this->files)) {
            return;
        }

        $type = IOFactory::identify(realpath($path));
        /* @var \PhpOffice\PhpSpreadsheet\Reader\Csv $reader */
        $reader = IOFactory::createReader($type);
        $reader->setSheetIndex(0);
        $reader->setReadDataOnly(true);
        $reader->setReadEmptyCells(false);
        $spreadsheet = $reader->load($path);
        $workSheet = $spreadsheet->getsheet(0);

        $sheet = (object) [
            'name' => $sheetName,
            'path' => $path,
            'object' => $workSheet,
            'meta' => [],
        ];

        if ($this->postLoadFile($path, $this->files, $sheet) === false) {
            return;
        }

        $this->files[$sheet->name] = (object) [
            'path' => $path,
            'data' => $sheet,
        ];
    }

    /**
     * @return array
     */
    public function convertSheetsToTables(): array
    {
        $tables = [];
        foreach ($this->files as $sheetName => &$sheet) {
            if (in_array($sheetName, $tables)) {
                continue;
            }
            $tables[$sheetName] = $this->convertSheetToTable($sheet->data);
        }

        return $tables;
    }

    /**
     * @return object
     */
    public function convertSheetToTable(&$sheet)
    {
        $columns = $this->getSheetHeaders($sheet);
        $rows = $this->getSheetRows($sheet, count($columns));

        return (object) [
            'name' => $sheet->name,
            'columns' => $columns,
            'rows' => $rows,
            'meta' => $sheet->meta,
        ];
    }

    /**
     * @return array
     */
    private function getSheetHeaders(&$sheet): array
    {
        $headers = [];
        /* @var \PhpOffice\PhpSpreadsheet\Worksheet\Row $row */
        $row = $sheet->object->getRowIterator(1, 1)->current();
        $cellIterator = $row->getCellIterator();
        foreach ($cellIterator as $cell) {
            $value = $cell->getValue();
            if (empty($value)) {
                break;
            }
            $headers[] = $value;
        }

        return $headers;
    }

    /**
     * @param  bool  $ignoreHeaders
     * @return mixed
     */
    private function getSheetRows(&$sheet, int $columnCount, $ignoreHeaders = true)
    {
        $rowsCount = $sheet->object->getHighestDataRow();
        $rangeStart = $ignoreHeaders ? 'A2' : 'A1';
        $rangeEnd = $sheet->object->getCellByColumnAndRow($columnCount, $rowsCount)->getCoordinate();

        return $sheet->object->rangeToArray($rangeStart.':'.$rangeEnd, null, false, false, false);
    }
}

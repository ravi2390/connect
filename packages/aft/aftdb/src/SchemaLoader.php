<?php

namespace Aft\AFTDB;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\Exception as PhpOfficeException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Reader\Csv;
use PhpOffice\PhpSpreadsheet\Reader\Exception as PhpOfficeReaderException;
use PhpOffice\PhpSpreadsheet\Worksheet\Row;

class SchemaLoader
{
    private $command;

    private $files = [];

    private array $sheets = [];

    /**
     * SchemaLoader constructor.
     */
    public function __construct(?Command $command = null)
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
    }

    /**
     * @param  bool  $headers
     * @return mixed
     */
    private function getSheetRows($sheet, int $columnCount, $headers = true)
    {
        $rowsCount = $sheet->object->getHighestDataRow();
        $rangeStart = $headers ? 'A2' : 'A1';
        $rangeEnd = $sheet->object->getCellByColumnAndRow($columnCount, $rowsCount)->getCoordinate();

        return $sheet->object->rangeToArray($rangeStart.':'.$rangeEnd, null, false, false, false);
    }

    /**
     * @return array
     */
    private function getSheetHeaders($sheet): array
    {
        $headers = [];
        /* @var Row $row */
        $row = $sheet->object->getRowIterator(1, 1)->current();
        $cellIterator = $row->getCellIterator();
        foreach ($cellIterator as $cell) {
            $value = $cell->getValue();
            $headers[] = $value;
        }

        return $headers;
    }

    /**
     * @param  bool  $headers
     * @return object
     */
    private function convertSheetToTable($sheet, $headers = true)
    {
        if ($headers) {
            $columnIDs = $this->getSheetHeaders($sheet);
            $count = count($columnIDs);
        } else {
            $count = (ord($sheet->object->getHighestDataColumn()) - ord('A')) + 1;
            $columnIDs = range(0, $count);
        }
        $rows = $this->getSheetRows($sheet, $count, $headers);

        return (object) [
            'name' => $sheet->name,
            'columnIDs' => $columnIDs,
            'rows' => $rows,
            'meta' => $sheet->meta,
        ];
    }

    /**
     * @return array
     */
    private function convertSheetsToTables($headers): array
    {
        $tables = [];
        foreach ($this->sheets as $name => &$sheet) {
            if (in_array($name, $tables)) {
                continue;
            }
            $tables[$name] = $this->convertSheetToTable($sheet->data, $headers);
        }

        return $tables;
    }

    /**
     * @throws PhpOfficeException
     * @throws PhpOfficeReaderException
     */
    private function addSheetFromFile(string $path, ?callable $callback = null): void
    {
        $name = pathinfo($path, PATHINFO_FILENAME);
        $path = Storage::disk('aftdb')->path($path);
        $type = IOFactory::identify($path);
        /* @var Csv $reader */
        $reader = IOFactory::createReader($type);
        $reader->setSheetIndex(0);
        $reader->setReadDataOnly(true);
        $reader->setReadEmptyCells(false);
        $spreadsheet = $reader->load($path);
        $workSheet = $spreadsheet->getsheet(0);

        $sheet = (object) [
            'name' => $name,
            'path' => $path,
            'object' => $workSheet,
            'meta' => [],
        ];

        if ($callback) {
            $result = $callback($path, $sheet);
            if ($result === false) {
                return;
            }
        }

        $this->sheets[$sheet->name] = (object) [
            'path' => $path,
            'data' => $sheet,
        ];
    }

    /**
     * @param  string|null  $path
     */
    private function updateFiles($path = null): void
    {
        $path = Str::finish($path ?? config('aftdb.schema.path', '.'), '/');
        $pattern = config('datamodel.schema.filepattern', '*.*');
        $this->files = [];
        $this->sheets = [];
        $this->files = Storage::disk('aftdb')->files($path);
        foreach ($this->files as $key => $file) {
            if (! preg_match($pattern, (string) $file)) {
                unset($this->files[$key]);
            }
        }
    }

    /**
     * @param  string|null  $path
     *
     * @throws PhpOfficeReaderException
     * @throws PhpOfficeException
     */
    private function loadFiles($path = null): void
    {
        $this->updateFiles($path);
        $count = count($this->files);
        $index = 0;
        foreach ($this->files as $file) {
            $index++;
            $this->command->info("Loading file $index/$count : '$file'...");
            $this->addSheetFromFile($file);
        }
    }

    /**
     * @param  string|null  $fromPath
     * @return DataModel|null
     *
     * @throws PhpOfficeException
     * @throws Exception
     */
    private function loadDirectory($fromPath = null)
    {
        $cachePathRaw = config('aftdb.cache.raw');
        if (Storage::disk('aftdb')->exists($cachePathRaw)) {
            $cacheRaw = Storage::disk('aftdb')->get($cachePathRaw);
            $dataModel = new DataModel(json_decode((string) $cacheRaw, true));
        } else {
            $headers = config('aftdb.schema.headers');
            $this->loadFiles($fromPath);
            $tables = $this->convertSheetsToTables($headers);
            $dataModel = new DataModel($tables);
            $dataModel->trimAllTables();
            $dataModel->removeAllRowsByEmptyColumnID(0);
            Storage::disk('aftdb')->put($cachePathRaw, $dataModel->tablesToJSON(), 'private');
        }

        return $dataModel;
    }

    public static function clean(): void
    {
        Storage::disk('aftdb')->delete(config('aftdb.cache.raw'));
    }

    /**
     * @param  string|null  $fromPath
     * @param  Command|null  $output
     * @return DataModel|null
     *
     * @throws PhpOfficeException
     */
    public static function createFrom($fromPath = null, $output = null)
    {
        $jsonPath = $fromPath ?? config('aftdb.cache.json');
        if (Storage::disk('aftdb')->exists($jsonPath)) {
            $json = Storage::disk('aftdb')->get($jsonPath);

            return new DataModel(json_decode((string) $json, true));
        } else {
            $self = new SchemaLoader($output);

            return $self->loadDirectory($fromPath);
        }
    }

    /**
     * @param  string|null  $fromPath
     * @return DataModel|null
     */
    public static function load($fromPath = null): ?\Aft\AFTDB\DataModel
    {
        $jsonPath = $fromPath ?? config('aftdb.cache.json');
        if (Storage::disk('aftdb')->exists($jsonPath)) {
            $json = Storage::disk('aftdb')->get($jsonPath);

            return new DataModel(json_decode((string) $json, true));
        }

        return null;
    }
}

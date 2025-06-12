<?php

namespace Aft\DataModel;

use Exception;

class DataModel
{
    /**
     * @var array
     */
    public $tables;

    /**
     * DataModel constructor.
     */
    public function __construct($tables)
    {
        $this->tables = [];
        foreach ($tables as $tableName => &$table) {
            $this->addTable($tableName, $table);
        }
    }

    public function trimAllTables(): void
    {
        foreach ($this->tables as $tableName => &$table) {
            foreach ($table->columns as &$column) {
                $column = trim($column);
            }
            foreach ($table->rows as $rowID => &$row) {
                foreach ($row as $columnID => &$cell) {
                    $cell = trim($cell);
                }
            }
        }
    }

    public function removeAllRowsByEmptyColumnID($columnID): void
    {
        foreach ($this->tables as $tableName => &$table) {
            $rows = [];
            foreach ($table->rows as $rowID => &$row) {
                if (! empty($row[$columnID])) {
                    $rows[] = $row;
                }
            }
            $table->rows = $rows;
        }
    }

    /**
     * @return bool|mixed
     *
     * @throws \Exception
     */
    public function &getTable(string $tableName)
    {
        $table = $this->tables[$tableName] ?? false;
        if (empty($table)) {
            foreach ($this->tables as $tn => $notUsed) {
                if (strtolower($tn) == strtolower((string) $tableName)) {
                    throw new Exception('Table case missmatch! '.$tableName.' != '.$tn);
                }
            }
            throw new Exception('Table not found! '.$tableName);
        }

        return $table;
    }

    public function removeTable($tableName): void
    {
        unset($this->tables[$tableName]);
    }

    public function addTable($tableName, $table): void
    {
        $this->tables[$tableName] = (object) $table;
    }

    /**
     * @throws \Exception
     */
    public function appendTable(string $appendToTableName, string $fromTableName): void
    {
        $toTable = &$this->getTable($appendToTableName);
        $fromTable = &$this->getTable($fromTableName);
        foreach ($fromTable->rows as $row) {
            $toTable->rows[] = $row;
        }
    }

    public function appendColumnAll($columnName, $callback): void
    {
        $this->filterTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName) use ($columnName, $callback): void {
            $this->appendColumn($tableName, $columnName, $callback);
        });
    }

    public function appendColumn(string $appendToTableName, $columnName, $callback): void
    {
        $toTable = &$this->getTable($appendToTableName);
        $toTable->columns[] = $columnName;
        foreach ($toTable->rows as $rowID => &$row) {
            $row[$columnName] = null;
            $callback($rowID, $row, $columnName);
        }
    }

    public function appendRow(string $appendToTableName, $rowData): void
    {
        $table = &$this->getTable($appendToTableName);
        $row = array_merge(
            array_fill_keys($table->columns, null),
            $rowData
        );
        $table->rows[] = $row;
    }

    /**
     * @return void|mixed
     */
    public function filterTables($callback)
    {
        foreach ($this->tables as $tableName => &$table) {
            $continue = $callback($table, $tableName);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterAllHeaders($callback)
    {
        foreach ($this->tables as $tableName => $notUsed) {
            $continue = $this->filterHeaders($tableName, $callback);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterHeaders(string $tableName, $callback)
    {
        $table = &$this->getTable($tableName);
        foreach ($table->columns as &$header) {
            $continue = $callback($header, $table);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterAllCells($callback)
    {
        foreach ($this->tables as $tableName => $notUsed) {
            $continue = $this->filterCells($tableName, $callback);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterCells(string $tableName, $callback)
    {
        $table = &$this->getTable($tableName);
        foreach ($table->rows as $rowID => $notUsed) {
            $continue = $this->filterRowCells($tableName, $rowID, $callback);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterRowCells(string $tableName, $rowID, $callback)
    {
        $table = &$this->getTable($tableName);
        $row = &$table->rows[$rowID];
        foreach ($row as $columnID => &$cell) {
            $continue = $callback($cell, $columnID, $row, $rowID, $table, $tableName);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterAllColumnID($columnID, $callback)
    {
        foreach ($this->tables as $tableName => $notUsed) {
            $continue = $this->filterColumnID($tableName, $columnID, $callback);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return void|mixed
     *
     * @throws \Exception
     */
    public function filterColumnID(string $tableName, $columnID, $callback)
    {
        $table = &$this->getTable($tableName);
        foreach ($table->rows as $rowID => &$row) {
            $continue = $callback($row[$columnID], $columnID, $row, $rowID, $table, $tableName);
            if ($continue === false) {
                return $continue;
            }
        }
    }

    /**
     * @return array
     *
     * @throws \Exception
     */
    public function copyColumnID(string $tableName, $columnID): array
    {
        $columnData = [];
        $this->filterColumnID($tableName, $columnID, function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, $tableName) use (&$columnData): void {
            $columnData[$rowID] = $cell;
        });

        return $columnData;
    }

    /**
     * @return mixed
     *
     * @throws \Exception
     */
    public function copyCell(string $tableName, $rowID, $columnID)
    {
        $table = &$this->getTable($tableName);
        $row = &$table->rows[$rowID];

        return $row[$columnID];
    }

    /**
     * @return object
     *
     * @throws \Exception
     */
    public function getRowByValue(string $tableName, string $columnID, string $rowValue)
    {
        $table = &$this->getTable($tableName);
        foreach ($table->rows as $rowID => &$row) {
            if ($row[$columnID] == $rowValue) {
                return (object) [
                    'tableName' => $table->name,
                    'columnID' => $columnID,
                    'rowID' => $rowID,
                    'row' => &$row,
                ];
            }
        }
        // try again and ignore case (still throw)
        foreach ($table->rows as $rowID => &$row) {
            if (strtolower((string) $row[$columnID]) == strtolower((string) $rowValue)) {
                throw new Exception('Column case missmatch! '.$row[$columnID].' != '.$rowValue);
            }
        }
        throw new Exception('Column not found! '.$columnID);
    }

    public function headersToAssoc(): void
    {
        foreach ($this->tables as $tableName => &$table) {
            foreach ($table->rows as $rowID => &$row) {
                $row = array_combine($table->columns, $row);
            }
        }
    }

    /**
     * @return false|string
     */
    public function tablesToJSON()
    {
        return json_encode($this->tables);
    }
}

<?php

namespace Aft\AFTDB;

use Exception;

class DataModel
{
    private array $tables;

    /**
     * DataModel constructor.
     */
    public function __construct($tables)
    {
        $this->tables = [];
        if (is_string($tables)) {
            $tables = json_decode($tables);
        }
        foreach ($tables as $tableName => &$table) {
            $this->tableAdd($tableName, $table);
        }
    }

    /*********************************
     * Table Manipulation
     *********************************/

    /**
     * @return object
     *
     * @throws Exception
     */
    public function &tableGet(string $tableName)
    {
        $table = $this->tables[$tableName] ?? false;
        if (empty($table)) {
            foreach ($this->tables as $name => $notUsed) {
                if (strtolower($name) == strtolower($tableName)) {
                    throw new Exception('Table case missmatch! '.$tableName.' != '.$name);
                }
            }
            throw new Exception('Table not found! '.$tableName);
        }

        return $table;
    }

    /**
     * @param  string|object  $identifier
     * @return object
     *
     * @throws Exception
     */
    public function &tableResolve(string &$identifier)
    {
        return match (gettype($identifier)) {
            'string' => $this->tableGet($identifier),
            'object' => $identifier,
            default => throw new Exception('$identifier must be string or object'),
        };
    }

    /**
     * @throws Exception
     */
    public function tableRemove(string $tableName): void
    {
        unset($this->tables[$tableName]);
    }

    /**
     * @param  array|object  $table
     */
    public function tableAdd(string $tableName, $table): void
    {
        $table = (object) $table;
        $table->name = $tableName;
        $this->tables[$tableName] = $table;
    }

    /*********************************
     * Table Modifiers
     *********************************/

    public function setAllTableHeadersToAssoc(): void
    {
        foreach ($this->tables as &$table) {
            foreach ($table->rows as &$row) {
                try {
                    $row = array_combine($table->columnIDs, $row);
                } catch (Exception $e) {
                    throw new Exception($e);
                }
            }
        }
    }

    /**
     * @param  string|object  $tableIdentifier
     *
     * @throws Exception
     */
    public function trimTableColumnIDs(string &$tableIdentifier): void
    {
        $table = $this->tableResolve($tableIdentifier);
        foreach ($table->columnIDs as &$columnID) {
            $columnID = trim($columnID);
        }
    }

    /**
     * @param  string|object  $tableIdentifier
     *
     * @throws Exception
     */
    public function trimTableCells(string &$tableIdentifier): void
    {
        $table = $this->tableResolve($tableIdentifier);
        foreach ($table->rows as &$row) {
            foreach ($row as &$cell) {
                $cell = trim($cell);
            }
        }
    }

    /**
     * @throws Exception
     */
    public function trimAllTables(): void
    {
        foreach ($this->tables as &$table) {
            $this->trimTablecolumnIDs($table);
            $this->trimTableCells($table);
        }
    }

    public function removeAllRowsByEmptyColumnID($columnID): void
    {
        foreach ($this->tables as &$table) {
            $rows = [];
            foreach ($table->rows as &$row) {
                if (! empty($row[$columnID])) {
                    $rows[] = $row;
                }
            }
            $table->rows = $rows;
        }
    }

    public function removeAllColumnsByEmptyHeader(): void
    {
        foreach ($this->tables as &$table) {
            foreach ($table->columnIDs as $key => $value) {
                if (! empty($value)) {
                    continue;
                }
                unset($table->columnIDs[$key]);
                foreach ($table->rows as &$row) {
                    unset($row[$key]);
                }
            }
        }
    }

    /**
     * @param  string|object  $toTableIdentifier
     * @param  string|object  $fromTableIdentifier
     *
     * @throws Exception
     */
    public function appendTableToTable(string &$toTableIdentifier, string &$fromTableIdentifier): void
    {
        $toTable = $this->tableResolve($toTableIdentifier);
        $fromTable = $this->tableResolve($fromTableIdentifier);
        foreach ($fromTable->rows as $row) {
            $toTable->rows[] = $row;
        }
    }

    /**
     * @param  string|object  $toTableIdentifier
     *
     * @throws Exception
     */
    public function appendTableColumn(string &$toTableIdentifier, $columnID, callable $callback): void
    {
        $toTable = $this->tableResolve($toTableIdentifier);
        $toTable->columnIDs[] = $columnID;
        foreach ($toTable->rows as $rowID => &$row) {
            $row[$columnID] = null;
            $callback($rowID, $row, $columnID);
        }
    }

    public function appendAllTablesColumn($columnID, callable $callback): void
    {
        $this->filterAllTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName) use ($columnID, $callback): void {
            $this->appendTableColumn($tableName, $columnID, $callback);
        });
    }

    /**
     * @param  string|object  $toTableIdentifier
     *
     * @throws Exception
     */
    public function appendTableRow(string &$toTableIdentifier, array $rowData): void
    {
        $table = $this->tableResolve($toTableIdentifier);
        $row = array_merge(
            array_fill_keys($table->columnIDs, null),
            $rowData
        );
        $table->rows[] = $row;
    }

    /*********************************
     * Generic Table Operations
     *********************************/

    /**
     * @return bool
     */
    public function filterAllTables(callable $callback)
    {
        foreach ($this->tables as $tableName => &$table) {
            $continue = $callback($table, $tableName);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @return bool
     *
     * @throws Exception
     */
    public function filterAllHeaders(callable $callback)
    {
        foreach ($this->tables as $table) {
            $continue = $this->filterTableHeaders($table, $callback);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @param  string|object  $tableIdentifier
     * @return bool
     *
     * @throws Exception
     */
    public function filterTableHeaders(string &$tableIdentifier, callable $callback)
    {
        $table = $this->tableResolve($tableIdentifier);
        foreach ($table->columnIDs as &$header) {
            $continue = $callback($header, $table);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @return bool
     *
     * @throws Exception
     */
    public function filterAllCells(callable $callback)
    {
        foreach ($this->tables as &$table) {
            $continue = $this->filterTableCells($table, $callback);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @param  string|object  $tableIdentifier
     * @return bool
     *
     * @throws Exception
     */
    public function filterTableCells(string &$tableIdentifier, callable $callback)
    {
        $table = &$this->tableResolve($tableIdentifier);
        foreach ($table->rows as $rowID => $notUsed) {
            $continue = $this->filterTableRowCells($tableIdentifier, $rowID, $callback);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @param  string|object  $tableIdentifier
     * @return bool
     *
     * @throws Exception
     */
    public function filterTableRowCells(string &$tableIdentifier, int $rowID, callable $callback)
    {
        $table = &$this->tableResolve($tableIdentifier);
        $row = &$table->rows[$rowID];
        foreach ($row as $columnID => &$cell) {
            $continue = $callback($cell, $columnID, $row, $rowID, $table, $table->name);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @param  string|int  $columnID
     * @return bool
     *
     * @throws Exception
     */
    public function filterAllColumnsByID($columnID, callable $callback)
    {
        foreach ($this->tables as &$table) {
            $continue = $this->filterTableColumnByID($table, $columnID, $callback);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /**
     * @param  string|object  $tableIdentifier
     * @param  string|int  $columnID
     * @return bool
     *
     * @throws Exception
     */
    public function filterTableColumnByID(string &$tableIdentifier, $columnID, callable $callback)
    {
        $table = &$this->tableResolve($tableIdentifier);
        foreach ($table->rows as $rowID => &$row) {
            $continue = $callback($row[$columnID], $columnID, $row, $rowID, $table, $table->name);
            if ($continue === false) {
                return $continue;
            }
        }

        return true;
    }

    /*********************************
     * Get Table Data
     *********************************/

    /**
     * @return mixed
     *
     * @throws Exception
     */
    public function &getTableRowByID(string &$tableIdentifier, $rowID)
    {
        $table = $this->tableResolve($tableIdentifier);

        return $table->rows[$rowID];
    }

    /**
     * @param  string|object  $tableIdentifier
     * @param  string|int  $columnID
     * @return array
     *
     * @throws Exception
     */
    public function getTableColumnByID(string &$tableIdentifier, $columnID): array
    {
        $columnData = [];
        $this->filterTableColumnByID(
            $tableIdentifier,
            $columnID,
            function (
                /* @noinspection PhpUnusedParameterInspection */
                &$cell,
                $columnID,
                array &$row,
                int $rowID,
                object &$table,
                string $tableName
            ) use (&$columnData): void {
                $columnData[$rowID] = $cell;
            }
        );

        return $columnData;
    }

    /**
     * @param  string|object  $tableIdentifier
     * @param  string|int  $columnID
     * @return mixed
     *
     * @throws Exception
     */
    public function getTableCell(string &$tableIdentifier, int $rowID, $columnID)
    {
        $table = &$this->tableResolve($tableIdentifier);
        $row = $table->rows[$rowID];

        return $row[$columnID];
    }

    /**
     * @param  string|object  $tableIdentifier
     * @param  string|int  $columnID
     * @return object
     *
     * @throws Exception
     */
    public function getTableRowByValue(string &$tableIdentifier, $columnID, string $rowValue)
    {
        $table = &$this->tableResolve($tableIdentifier);
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
        foreach ($table->rows as &$row) {
            if (strtolower((string) $row[$columnID]) == strtolower((string) $rowValue)) {
                throw new Exception('Column case missmatch! '.$row[$columnID].' != '.$rowValue);
            }
        }
        throw new Exception('Column not found! '.$columnID);
    }

    /**
     * @return false|string
     */
    public function tablesToJSON()
    {
        return json_encode($this->tables);
    }
}

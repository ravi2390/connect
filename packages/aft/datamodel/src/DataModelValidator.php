<?php

namespace Aft\DataModel;

use Exception;
use Illuminate\Support\Str;

class DataModelValidator
{
    /**
     * @var DataModel
     */
    private $dataModel;

    /**
     * @var array
     */
    public $dag;

    /**
     * @throws \Exception
     */
    private function cleanHeaders(): void
    {
        // check for unknown column headers and rename to something easier to work with
        $this->dataModel->filterAllHeaders(function (&$header, &$table): void {
            if (! empty($table->meta['data_for'])) {
                return;
            }
            $header = preg_replace('/[\[\]]/', '', $header);
            $header = strtolower($header);
            switch ($header) {
                case 'field name':
                    $header = 'name';
                    break;
                case 'data type + length':
                    $header = 'type';
                    break;
                case 'allow null value':
                    $header = 'nullable';
                    break;
                case 'is_primary_key':
                    $header = 'primary';
                    break;
                case 'is_unique_key':
                    $header = 'unique';
                    break;
                case 'reference table for foreign key':
                    $header = 'relationship';
                    break;
                case 'default value':
                    $header = 'default';
                    break;
                case 'sample values (if applicable)':
                    $header = 'ignore';
                    break;
                case 'business rule(s)':
                    $header = 'ignore';
                    break;
                case 'definitions (data dictionary)':
                case 'definition (data dictionary)   connect2.0':
                case 'definition (data dictionary) connect2.0':
                    $header = 'ignore';
                case 'manageable from the ui':
                    $header = 'ui';
                    break;
                case 'sanitized function':
                    $header = 'sanitize';
                    break;
                case 'is editable':
                    $header = 'editable';
                    break;
                case 'display group':
                    $header = 'display_group';
                    break;
                case 'display name':
                    $header = 'display_name';
                    break;
                case 'relationship type':
                    $header = 'relationship_type';
                    break;
                default:
                    throw new Exception('Unrecognized column header: '.$header);
            }
        });
        $this->dataModel->headersToAssoc();
    }

    private function cleanDataTables(): void
    {
        $this->dataModel->filterTables(function (&$dataTable, $dataTableName): void {
            if (! empty($dataTable->meta['data_for'])) {
                $this->dataModel->removeTable($dataTableName);
                $dataTable->name = substr_replace($dataTableName, '', -5);
                $table = &$this->dataModel->getTable($dataTable->meta['data_for']);

                $table->meta['data'] = $dataTable;
            }
        });
    }

    /**
     * @throws \Exception
     */
    private function cleanNames(): void
    {
        // remove brackets for all 'name' cells unless they contain a space (for SQL)
        $this->dataModel->filterAllColumnID('name', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, &$row, &$table): void {
            preg_replace('/\s+/', ' ', $cell, -1, $count);
            if ($count != 0) {
                return;
            }
            $cell = preg_replace('/[\[\]]/', '', $cell);
        });

        // check for known 'name' values and handle
        $rowsChanged = false;
        $this->dataModel->filterAllColumnID('name', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, $tableName) use (&$rowsChanged): void {
            switch (strtolower($cell)) {
                case 'metadata':
                    if (! preg_match('/type:\s*(\w+)/', (string) $row['type'], $matches)) {
                        throw new Exception('Unknown metadata: '.$row['type'].' in '.$table->name);
                    }
                    $table->meta['type'] = match (strtolower($matches[1])) {
                        'lookup' => 'lookup',
                        'mapping' => 'mapping',
                        'entity' => 'entity',
                        default => throw new Exception('Unknown metadata type: '.$matches[1].' in '.$table->name),
                    };
                    $cell = null;
                    $rowsChanged = true;
                    break;
                case 'conditions':
                case 'drupal module':
                case 'questions/issues':
                case 'archived sql':
                case 'revisionid':
                case 'system_columns':
                    $cell = null;
                    $rowsChanged = true;
                    break;
                case 'pre sql':
                    if (! empty($row['type'])) {
                        $table->meta['pre_sql'] = $row['type'];
                    }
                    $cell = null;
                    $rowsChanged = true;
                    break;
                case 'sql':
                    if (! empty($row['type'])) {
                        $table->meta['sql'] = $row['type'];
                    }
                    $cell = null;
                    $rowsChanged = true;
                    break;
            }
        });
        if ($rowsChanged) {
            $this->dataModel->removeAllRowsByEmptyColumnID('name');
        }
    }

    /**
     * @throws \Exception
     */
    private function cleanTypes(): void
    {
        // check for known data types
        $this->dataModel->filterAllColumnID('type', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, array &$row, string $rowID, &$table, string $tableName) use (&$rowsChanged): void {

            $cell = strtolower($cell);

            if (! preg_match('/([^(\s]+)\s*(\(\d+\))?/', $cell, $matches)) {
                throw new Exception('Invalid type: "'.$cell.'" in '.$tableName.':'.$rowID);
            }
            $name = preg_replace('/[\[\]]/', '', $matches[1]);
            $length = preg_replace('/[()]/', '', $matches[2] ?? 'default');

            switch ($name) {
                case 'bit':
                    $cell = 'boolean:'.$length;
                    break;
                case 'char':
                    $cell = 'char:'.$length;
                    break;
                case 'tinyint':
                    $cell = 'tinyInteger:'.$length;
                    break;
                case 'int':
                case 'integer':
                    $cell = 'integer:'.$length;
                    break;
                case 'decimal':
                    $cell = 'decimal:'.$length;
                    break;
                case 'varchar':
                case 'nvarchar':
                case 'text':
                    $cell = 'string:'.$length;
                    break;
                case 'real':
                case 'money':
                case 'numeric':
                    $cell = 'float:'.$length;
                    break;
                case 'time':
                case 'datetime':
                case 'datetime2':
                case 'smalldatetime':
                    $cell = 'dateTime:'.$length;
                    break;
                case 'uniqueidentifier':
                    $cell = 'uuid:'.$length;
                    $row['unique'] = true;
                    break;
                default:
                    throw new Exception('Unknown type name: '.$name.' in '.$table->name);
            }
        });
    }

    /**
     * @throws \Exception
     */
    private function cleanDefaults(): void
    {
        // check for default values and fix up
        $this->dataModel->filterAllColumnID('default', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, $tableName) use (&$rowsChanged): void {
            $cell = strtolower($cell);
            switch ($cell) {
                case '':
                case 'suser_name()':
                case 'newid()':
                case 'null':
                    $cell = null;
                    break;
                case 'identity(1,1)':
                case 'identity(1,1,)':
                case 'identity (1,1)':
                case 'identity (1, 1)':
                    $cell = 'autoinc';
                    break;
                case 'getdate()':
                    $cell = 'now';
                    break;
                case '=true()':
                    $cell = 'true';
                    break;
                case '=false()':
                    $cell = 'false';
                    break;
                case '\'aft\'':
                    $cell = 'AFT';
                    break;
                default:
                    if (is_numeric($cell)) {
                        break;
                    }
                    throw new Exception('Unknown default value: '.$cell.' in '.$table->name);
            }
        });
    }

    /**
     * @throws \Exception
     */
    private function cleanBooleans(): void
    {
        // change all yes/no values to TRUE/FALSE
        $this->dataModel->filterAllCells(function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, $tableName): void {
            if (gettype($cell) == 'string') {
                switch (strtolower($cell)) {
                    case 'yes':
                        $cell = true;
                        break;
                    case 'no':
                        $cell = false;
                        break;
                }
            }
        });
    }

    /**
     * @throws \Exception
     */
    private function cleanRelationships(): void
    {
        // reformat all relationships
        $this->dataModel->filterAllColumnID('relationship', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, string $rowID, &$table, string $tableName): void {
            if (empty($cell)) {
                $cell = null;

                return;
            }
            if (! preg_match('/([^(\s]+)\s*\((\w+)\)/', $cell, $matches)) {
                throw new Exception('Malformed relationship: '.$cell.' in '.$table->name);
            }
            if (empty($matches[2])) {
                throw new Exception('No relationship column given: '.$cell.' in '.$table->name);
            }
            // TODO: laravel specific fixup:
            if ($matches[1] == 'User' && $matches[2] == 'uid') {
                $cell = null;

                return;
            }
            $cell = $matches[1].':'.$matches[2];
            $row['nameNice'] = preg_replace('/Id$/', '', (string) $row['name']);
            if (empty($row['relationship_type'])) {
                throw new Exception('Table '.$tableName.' does not have a relationship type for '.$cell.' (row '.$rowID.')'.PHP_EOL);
            }
        });
        $this->dataModel->filterAllColumnID('relationship_type', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, string $rowID, &$table, string $tableName): void {
            if (empty($cell)) {
                $cell = null;

                return;
            }
            $table->meta['parents'] ??= [];
            $table->meta['children'] ??= [];
            $relType = explode(':', $cell);
            switch ($relType[0]) {
                case 'ignore':
                    unset($row['relationship']);
                    unset($row['relationship_type']);
                    break;
                case 'remove':
                    unset($table->rows[$rowID]);
                    break;
                case 'hasOne':
                    if (empty($relType[1])) {
                        break;
                    }
                    if ($relType[1] == 'reference') {
                        $table->meta['children'][] = $row['relationship'];
                        break;
                    }
                    if ($relType[1] != 'child') {
                        throw new Exception('Unknown hasOne subtype: '.$relType[1]);
                    }
                    /* no break */
                case 'hasMany':
                    if (! ($row['skip_parent_relationship'] ?? false)) {
                        $rel = $this->relationshipToObject($row['relationship']);
                        $childTable = $this->dataModel->getTable($rel->tableName);
                        $childTable->meta['parents'][] = [
                            'row' => $row,
                            'relationship' => $tableName.':'.$row['name'],
                        ];
                        $table->meta['children'][] = $row['relationship'];
                    }
                    break;
                case 'belongsTo':
                    if (! empty($table->meta['belongsTo'])) {
                        throw new Exception('Table '.$tableName.' has more than one belongsTo relationship type!');
                    }
                    $table->meta['parents'][] = [
                        'row' => $row,
                        'relationship' => $row['relationship'],
                    ];
                    $table->meta['belongsTo'] = $row['relationship'];
                    $rel = $this->relationshipToObject($row['relationship']);
                    $parentTable = $this->dataModel->getTable($rel->tableName);
                    $parentTable->meta['children'][] = $tableName.':'.$this->getTablePrimaryKeyName($tableName);
                    $self_reference = $tableName == $rel->tableName;
                    if ($self_reference) {
                        $row['self_reference'] = $self_reference;
                    }
                    $newRow = [
                        'name' => Str::plural($tableName),
                        'type' => $row['type'],
                        'relationship' => $tableName.':'.$row['name'],
                        'display_name' => Str::plural($tableName),
                        'relationship_type' => 'hasMany',
                        'dag_ignore' => true,
                        'self_reference' => $self_reference,
                        'skip_parent_relationship' => true,
                    ];
                    $this->dataModel->appendRow($rel->tableName, $newRow);
                    break;
                default:
                    throw new Exception('Unknown relationship type '.$cell.' on row '.$rowID.' table '.$tableName);
            }
        });
        $this->dataModel->filterTables(function (&$table, string $tableName): void {
            if (! empty($table->meta['parents']) && count($table->meta['parents']) > 1) {
                throw new Exception('Table '.$tableName.' has multiple parents! '.print_r($table->meta['parents'], true));
            }
        });
    }

    /**
     * @throws \Exception
     */
    private function cleanDisplayNames(): void
    {
        $this->dataModel->filterAllColumnID('display_group', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, array &$row, $rowID, &$table, $tableName): void {
            if (empty($cell)) {
                return;
            }
            $options = explode(',', $cell);
            $table->meta['display'] ??= [];
            foreach ($options as $option) {
                $option = explode(':', $option);
                switch ($option[0]) {
                    case 'label':
                        $table->meta['label'] = $option[1];
                        break;
                    case 'tiny':
                    case 'small':
                    case 'default':
                    case 'long':
                    case 'full':
                        $table->meta['display'][$option[0]][$option[1]] = $row['name'];
                        break;
                    default:
                        throw new Exception('Unknown display group: '.$option[0]);
                }
            }
        });
        $this->dataModel->filterTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName): void {
            if (! empty($table->meta['display'])) {
                foreach ($table->meta['display'] as &$sources) {
                    ksort($sources);
                }
            }
        });
    }

    /**
     * @throws \Exception
     */
    private function cleanDataModel(): void
    {
        $this->cleanHeaders();
        $this->cleanDataTables();
        $this->cleanNames();
        $this->cleanTypes();
        $this->cleanDefaults();
        $this->cleanBooleans();
        $this->cleanRelationships();
        $this->cleanDisplayNames();
    }

    private function appendSystemColumns(): void
    {
        $this->dataModel->filterTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName): void {
            if (str_starts_with($tableName, 'System_Columns@')) {
                $this->dataModel->appendColumn($tableName, 'system_column', function ($rowID, array &$row, $columnName): void {
                    $row[$columnName] = true;
                });
            }
        });
        $this->dataModel->filterTables(function (&$table, $tableName): void {
            if (str_starts_with($tableName, 'System_Columns@')) {
                return;
            }
            if (empty($table->meta['system_columns'])) {
                return;
            }
            $this->dataModel->appendTable($tableName, $table->meta['system_columns']);
        });
        $this->dataModel->filterTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName): void {
            if (str_starts_with($tableName, 'System_Columns@')) {
                $this->dataModel->removeTable($tableName);
            }
        });
    }

    /**
     * @return mixed
     *
     * @throws Exception
     */
    public function getTablePrimaryKeyName(string $tableName)
    {
        $primaryColumn = $this->dataModel->copyColumnID($tableName, 'primary');
        $primaryRow = array_search(true, $primaryColumn);

        return $this->dataModel->copyCell($tableName, $primaryRow, 'name');
    }

    private function findPrimaryKeys(): void
    {
        $this->dataModel->filterTables(function (&$table, string $tableName): void {
            if (! empty($table->meta['data_for'])) {
                return;
            }
            $primaryColumn = $this->dataModel->copyColumnID($tableName, 'primary');
            $primaryRow = array_search(true, $primaryColumn);
            $primaryKey = $this->dataModel->copyCell($tableName, $primaryRow, 'name');
            $primaryType = explode(':', (string) $this->dataModel->copyCell($tableName, $primaryRow, 'type'))[0];
            if ($primaryRow === false || empty($primaryKey)) {
                throw new Exception('Table '.$tableName.' has no primary key!');
            }
            $table->meta['primary_key_row'] = $primaryRow;
            $table->meta['primary_key_name'] = $primaryKey;
            $table->meta['primary_key_type'] = $primaryType;
        });
    }

    /**
     * @return object
     *
     * @throws \Exception
     */
    private function relationshipToObject(string $relationshipString)
    {
        $relationship = explode(':', (string) $relationshipString);
        if (empty($relationship[0]) || empty($relationship[1])) {
            throw new Exception('Invalid relationship! '.$relationshipString);
        }

        return (object) [
            'tableName' => $relationship[0],
            'rowValue' => $relationship[1],
        ];
    }

    /**
     * @return array
     *
     * @throws \Exception
     */
    private function gatherDAGRelationships(string $tableName): array
    {
        $relationships = [];
        $this->dataModel->filterColumnID($tableName, 'relationship', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, string $tableName) use (&$relationships): void {
            if (empty($cell)) {
                $cell = null;

                return;
            }
            if (! empty($row['dag_ignore'])) {
                return;
            }
            $rel = $this->relationshipToObject($cell);
            try {
                $found = $this->dataModel->getRowByValue($rel->tableName, 'name', $rel->rowValue);
            } catch (Exception) {
                throw new Exception('Relationship at table '.$tableName.':'.$row['name'].' not found (relationship is '.$cell.')');
            }

            if ($row['type'] !== $found->row['type']) {
                throw new Exception('Relationship type missmatch! In '.$tableName.':'.$row['name'].':'.$row['type'].' does not match '.$rel->tableName.':'.$found->row['name'].':'.$found->row['type']);
            }

            $relationships[] = $rel;
        });

        return $relationships;
    }

    /**
     * @param  array  $dag
     *
     * @throws \Exception
     */
    private function visitDependencyGraph(&$table, &$dag = []): void
    {
        if (isset($table->meta['mark'])) {
            if ($table->meta['mark'] == 'visited') {
                return;
            }
            if ($table->meta['mark'] == 'visiting') {
                print_r($dag);
                throw new Exception('Dependency graph is not acyclic! Visiting '.$table->name);
            }
        }
        $table->meta['mark'] = 'visiting';
        $rels = $this->gatherDAGRelationships($table->name);
        foreach ($rels as $relationship) {
            if ($relationship->tableName != $table->name) {
                $relatedTable = &$this->dataModel->getTable($relationship->tableName);
                $this->visitDependencyGraph($relatedTable, $dag);
            }
        }
        $table->meta['mark'] = 'visited';
        $dag[] = $table->name;
    }

    /**
     * @return array
     *
     * @throws \Exception
     */
    private function createDependencyGraph(): array
    {
        $dag = [];
        do {
            $unmarkedTable = false;
            $this->dataModel->filterTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName) use (&$unmarkedTable): bool {
                if (empty($table->meta['mark'])) {
                    $unmarkedTable = $table;

                    return false;
                }

                return true;
            });
            if (! empty($unmarkedTable)) {
                $this->visitDependencyGraph($unmarkedTable, $dag);
            }
        } while (! empty($unmarkedTable));
        $this->dataModel->filterTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName): void {
            unset($table->meta['mark']);
        });

        return $dag;
    }

    /**
     * @throws \Exception
     */
    private function gatherConstraints(): void
    {
        $this->dataModel->appendColumnAll('rules', function ($rowID, array &$row, $columnName): void {
            $row[$columnName] = '';
        });
        $this->dataModel->filterAllCells(function (&$cell, string $columnID, &$row, $rowID, &$table, $tableName): void {
            $constraint = '';
            switch ($columnID) {
                case 'name':
                    break;
                case 'nameNice':
                    break;
                case 'type':
                    $type = explode(':', $cell);
                    match ($type[0]) {
                        'boolean' => $constraint .= '|boolean',
                        'char', 'string' => $constraint .= '|string',
                        'tinyInteger', 'integer' => $constraint .= '|integer',
                        'decimal', 'float' => $constraint .= '|numeric',
                        'dateTime' => $constraint .= '|date',
                        'uuid' => $constraint .= '|uuid',
                        default => throw new Exception('Unknown type name: '.$type[0].' in '.$table->name),
                    };
                    if (! empty($type[1]) && $type[1] !== 'default') {
                        $constraint .= '|max:'.$type[1];
                    }
                    if (isset($row['nullable']) && $row['nullable']) {
                        $constraint .= '|nullable';
                    }
                    break;
                case 'nullable':
                    break;
                case 'primary':
                    break;
                case 'unique':
                    break;
                case 'is_foreign_key':
                    break;
                case 'default':
                    break;
                case 'relationship':
                    break;
                case 'relationship_type':
                    break;
                case 'sanitize':
                    break;
                case 'editable':
                    break;
                case 'ui':
                    break;
                case 'display_group':
                    break;
                case 'display_name':
                    break;
                case 'rules':
                    break;
                case 'system_column':
                    break;
                case 'dag_ignore':
                    break;
                case 'self_reference':
                    break;
                case 'skip_parent_relationship':
                    break;
                case 'ignore':
                    break;
                default:
                    throw new Exception('Unknown column: '.$columnID);
            }
            $row['rules'] .= ltrim($constraint, '|');
        });
    }

    /**
     * @return \Aft\DataModel\DataModel
     *
     * @throws \Exception
     */
    public function validate($dataModel)
    {
        $this->dataModel = $dataModel;
        $this->cleanDataModel();
        $this->appendSystemColumns();
        $this->findPrimaryKeys();
        $this->gatherConstraints();
        $this->dag = $this->createDependencyGraph();

        return $this->dataModel;
    }
}

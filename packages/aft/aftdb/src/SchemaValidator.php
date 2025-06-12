<?php

namespace Aft\AFTDB;

use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SchemaValidator
{
    private $command;

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
    }

    private function validateRelationships(): void
    {
        $this->dataModel->filterAllColumnsByID('relationship', function (/* @noinspection PhpUnusedParameterInspection */ ?string &$cell, $columnID, &$row, string $rowID, &$table, string $tableName): void {
            if (empty($cell)) {
                return;
            }
            $relatedNames = explode('.', $cell);
            $relatedTableName = $relatedNames[0] ?? null;
            $relatedRowName = $relatedNames[1] ?? null;
            if (empty($relatedNames) || empty($relatedTableName) || empty($relatedRowName)) {
                throw new Exception('Table '.$tableName.' relationship '.$cell.' not found');
            }
            $relatedRowReference = $this->dataModel->getTableRowByValue($relatedTableName, 'name', $relatedRowName);
            if (empty($relatedRowReference)) {
                throw new Exception('Table '.$tableName.' relationship '.$cell.' cannot find '.$cell);
            }
            if ($row['type'] !== $relatedRowReference->row['type']) {
                throw new Exception('Table '.$tableName.' relationship '.$cell.' type missmatch '.$relatedRowReference->row['type']);
            }
            if (empty($row['relationship_type'])) {
                $this->command->warn('WARNING: Table '.$tableName.' does not have a relationship type for '.$cell.' (row '.$rowID.'). Defaulting to hasOne (which is probably wrong)...');
                throw new \Exception('nope');
                //$row['relationship_type'] = 'hasOne';
            }
            $row['nameNice'] = preg_replace('/Id$/', '', (string) $row['name']);
            $table->meta['parents'] ??= [];
            $table->meta['soft_parents'] ??= [];
            $table->meta['children'] ??= [];
        });

        $this->dataModel->filterAllColumnsByID('relationship', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, array &$row, $rowID, &$table, string $tableName): void {
            if (empty($cell)) {
                return;
            }

            $related = $cell;
            $relatedNames = explode('.', $related);
            $relatedTableName = $relatedNames[0] ?? null;
            $relatedRowName = $relatedNames[1] ?? null;
            $relatedTable = $this->dataModel->tableGet($relatedTableName);
            $relatedRowReference = $this->dataModel->getTableRowByValue($relatedTableName, 'name', $relatedRowName);
            $relatedRow = $relatedRowReference->row;

            $relation = $row['relationship_type'];
            $relationNames = explode(':', $relation);
            $relationSpecifier = $relationNames[0] ?? '';
            $relationAttribute = $relationNames[1] ?? null;

            switch ($relationSpecifier) {
                case 'ignore':
                    break;
                case 'remove':
                    $this->command->error('Table '.$tableName.' relationship must be removed: '.$row['name']);
                    break;
                case 'hasOne':
                    switch ($relationAttribute) {
                        case null:
                        case 'child':
                            $relatedTable->meta['parents'][] = [
                                'relationship' => $tableName.':belongsTo',
                                'thisRow' => $row,
                                'otherRow' => $relatedRow,
                            ];
                            break;
                        case 'reference':
                            //$table->meta['children'][] = $relatedTableName . ':' . $relatedRowName;
                            $relatedTable->meta['soft_parents'][] = $tableName.':belongsTo';
                            break;
                        default:
                            throw new Exception('Table '.$tableName.' unhandled relationship attribute '.$relation);
                            break;
                    }
                    break;
                case 'hasMany':
                    $relatedTable->meta['parents'][] = match ($relationAttribute) {
                        //$table->meta['children'][] = $relatedTableName . ':' . $relatedRowName;
                        null => [
                            'relationship' => $tableName.':belongsTo',
                            'thisRow' => $row,
                            'otherRow' => $relatedRow,
                        ],
                        default => throw new Exception('Table '.$tableName.' unhandled relationship attribute '.$relation),
                    };
                    break;
                case 'belongsTo':
                    switch ($relationAttribute) {
                        case null:
                            $row['self_reference'] = $tableName === $relatedTableName;
                            $relatedTable->meta['children'][] = [
                                'name' => Str::plural($tableName),
                                'type' => $relatedRow['type'],
                                'relationship' => $tableName.'.'.$relatedRowName,
                                'display_name' => Str::plural($tableName),
                                'relationship_type' => 'hasMany',
                            ];
                            $table->meta['parents'][] = [
                                'relationship' => $relatedTableName.':belongsTo',
                                'thisRow' => $relatedRow,
                                'otherRow' => $row,
                            ];
                            break;
                        case 'oneToOne':
                            //$relatedTable->meta['children'][] = $tableName . ':' . $row['name'];
                            $row['self_reference'] = $tableName === $relatedTableName;
                            $relatedTable->meta['children'][] = [
                                'name' => Str::plural($tableName),
                                'type' => $relatedRow['type'],
                                'relationship' => $tableName.'.'.$relatedRowName,
                                'display_name' => Str::plural($tableName),
                                'relationship_type' => 'hasOne',
                            ];
                            $table->meta['parents'][] = [
                                'relationship' => $relatedTableName.':belongsTo',
                                'thisRow' => $relatedRow,
                                'otherRow' => $row,
                            ];
                            break;
                        default:
                            throw new Exception('Table '.$tableName.' unhandled relationship attribute '.$relation);
                            break;
                    }
                    break;
                default:
                    throw new Exception('Table '.$tableName.' unknown relationship type '.$relation);
            }
        });
        $this->dataModel->filterAllTables(function (&$table, string $tableName): void {
            if (empty($table->meta['parents'])) {
                $this->command->warn('Table '.$tableName.' has no parents!');
            }
            if (! empty($table->meta['parents']) && count($table->meta['parents']) > 1) {
                throw new Exception('Table '.$tableName.' has multiple parents: '.print_r($table->meta['parents'], true));
            }
        });
    }

    private function validatePrimaryKeys(): void
    {
        $this->dataModel->filterAllTables(function (&$table, string $tableName): void {
            $column = $this->dataModel->getTableColumnByID($table, 'primary');
            foreach ($column as $rowID => $cell) {
                if ($cell === 'true') {
                    if (! empty($table->meta['primary_key'])) {
                        throw new Exception('Table has multiple primary keys: '.$tableName);
                    }
                    $table->meta['primary_key'] = $this->dataModel->getTableRowByID($table, $rowID);
                }
            }
        });
        $this->dataModel->filterAllTables(function (&$table, string $tableName): void {
            if (empty($table->meta['primary_key'])) {
                throw new Exception('Table has no primary key: '.$tableName);
            }
        });
    }

    private function validateDisplayNames(): void
    {
        $this->dataModel->filterAllColumnsByID('display_group', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, array &$row, $rowID, &$table, $tableName): void {
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
        $this->dataModel->filterAllTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName): void {
            if (! empty($table->meta['display'])) {
                foreach ($table->meta['display'] as &$sources) {
                    ksort($sources);
                }
            }
        });
    }

    private function validateDependencies()
    {
        $dag = [];
        do {
            $unmarkedTable = false;
            $this->dataModel->filterAllTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName) use (&$unmarkedTable): bool {
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
        $this->dataModel->filterAllTables(function (/* @noinspection PhpUnusedParameterInspection */ &$table, $tableName): void {
            unset($table->meta['mark']);
        });

        return $dag;
    }

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
                $relatedTable = &$this->dataModel->tableGet($relationship->tableName);
                $this->visitDependencyGraph($relatedTable, $dag);
            }
        }
        $table->meta['mark'] = 'visited';
        $dag[] = $table->name;
    }

    /**
     * @return mixed[]
     */
    private function gatherDAGRelationships(string $tableName): array
    {
        $relationships = [];
        $this->dataModel->filterTableColumnByID($tableName, 'relationship', function (/* @noinspection PhpUnusedParameterInspection */ &$cell, $columnID, &$row, $rowID, &$table, string $tableName) use (&$relationships): void {
            if (empty($cell)) {
                $cell = null;

                return;
            }
            if (! empty($row['dag_ignore'])) {
                return;
            }
            $rel = $this->relationshipToObject($cell);
            try {
                $found = $this->dataModel->getTableRowByValue($rel->tableName, 'name', $rel->rowValue);
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

    private function relationshipToObject(string $relationshipString)
    {
        $relationship = explode('.', (string) $relationshipString);
        if (empty($relationship[0]) || empty($relationship[1])) {
            throw new Exception('Invalid relationship! '.$relationshipString);
        }

        return (object) [
            'tableName' => $relationship[0],
            'rowValue' => $relationship[1],
        ];
    }

    public static function clean(): void
    {
        //
    }

    public static function validate(DataModel $datamodel, ?Command $command = null): \Aft\AFTDB\DataModel
    {
        $validator = new SchemaValidator($datamodel, $command);
        $validator->validatePrimaryKeys();
        $validator->validateRelationships();
        $validator->validateDisplayNames();
        $validator->validateDependencies();

        return $validator->dataModel;
    }
}

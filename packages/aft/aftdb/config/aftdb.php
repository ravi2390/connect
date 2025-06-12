<?php

return [
    'base' => dirname(__DIR__),
    'debug' => false,
    'cache' => [
        'raw' => 'cache/aftdbraw.json',
        'json' => 'cache/aftdb.json',
    ],
    'schema' => [
        'path' => 'schema',
        'filepattern' => '*.csv',
        'headers' => true,
        'primary_key' => ['column' => 'primary', 'value' => true],
    ],
    'filters' => [
        'cells' => [
            ['replace' => [
                ['/^\s+$/' => ''],  // clear just spaces
                ['/\s\s+/' => ' '], // collapse multiple spaces
            ]],
            ['map' => [
                '__IGNORE_CASE__',
                'y' => 'true',
                'n' => 'false',
                'yes' => 'true',
                'no' => 'false',
                'true' => 'true',
                'false' => 'false',
            ]],
        ],
        'headers' => [
            ['map' => [
                '__IGNORE_CASE__',
                'field name' => 'name',
                'data type + length' => 'type',
                'allow null value' => 'nullable',
                'is_primary_key' => 'primary',
                'is_unique_key' => 'unique',
                'reference table for foreign key' => 'relationship',
                'default value' => '',
                'sample values (if applicable)' => '',
                'business rule(s)' => '',
                '/definition.*/i' => '',
                'manageable from the ui' => '',
                'sanitized function' => '',
                'is editable' => '',
                'display group' => 'display_group',
                'display name' => 'display_name',
                'relationship type' => 'relationship_type',
                '__ERROR__' => 'Unrecognized header: %1', // fail everything else and empty string
            ]],
        ],
        'columns' => [
            'name' => [
                ['replace' => [
                    ['/[\[\]]/' => ''],
                    ['/^metadata$/i' => ''],
                    ['/^conditions$/i' => ''],
                    ['/^drupal module$/i' => ''],
                    ['/^questions\/issues$/i' => ''],
                    ['/^archived sql$/i' => ''],
                    ['/^revisionid$/i' => ''],
                    ['/^system_columns$/i' => ''],
                    ['/^pre sql$/i' => ''],
                    ['/^sql$/i' => ''],
                ]],
            ],
            'type' => [
                ['strToLower' => true],
                ['replace' => [
                    ['/\[?([^(\s\[\]]+)\]?\s*(\([^\)]*\))?/' => '$1'],
                ]],
                ['map' => [
                    'bit' => 'boolean',
                    'char' => 'char',
                    'varchar' => 'string',
                    'nvarchar' => 'string',
                    'tinyint' => 'tinyInteger',
                    'int' => 'integer',
                    'decimal' => 'decimal',
                    'numeric' => 'decimal',
                    'money' => 'decimal',
                    'time' => 'datetime',
                    'datetime' => 'datetime',
                    'datetime2' => 'datetime',
                    'uniqueidentifier' => 'uuid',
                    '__ERROR__' => 'Unrecognized type: %1',
                ]],
            ],
            'relationship' => [
                ['replace' => [
                    ['/([^(\s]+)\s*\((\w+)\)/' => '$1.$2'],
                    ['//' => ''],
                    ['__ERROR__' => 'Unrecognized relationship format: %1'],
                ]],
            ],
            'relationship_type' => [
                ['replace' => [
                    ['/([a-zA-Z]+)(:[a-zA-Z]+?)/' => '$1$2'],
                    ['//' => ''],
                    ['__ERROR__' => 'Unrecognized relationship type: %1'],
                ]],
            ],
        ],
        'finalize' => [
            ['emptyStrToNull' => true],
        ],
    ],
];

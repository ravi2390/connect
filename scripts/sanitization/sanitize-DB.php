<?php

/**
 * @file
 * Script to create a sanitized version of the legacy (AFT_CDB) database.
 *
 * The argument (e.g. 'legacy') passed to the script is used to read a file
 * named, e.g., 'legacy_table_list.php', listing tables to be sanitized and
 * any string columns in those tables which do not require sanitization. It
 * generates random strings of the same length as the source strings for columns
 * being sanitized.
 *
 * Command-line options:
 *  --from-scratch: Begins the sanitization process from the beginning (by
 *    default, this script will resume an interrupted process).
 */
$batchSize = 25;

// Provide plenty of memory.
ini_set('memory_limit', '1G');

// Connect to the source and destination databases. "config.php" must be created
// in the local environment - see example.config.php.
$full_config = require_once 'config.php';
$data_set = $argv[1] ?? null;
if (empty($data_set) || empty($config = $full_config[$data_set] ?? null)) {
    exit('First argument must be one of '.implode(',', array_keys($full_config)).PHP_EOL);
}

$fromConn = _aft_connection($config['from']);
$toConn = _aft_connection($config['to']);

// Table for keeping track of progress so we can resume on interruption.
$resumeTableName = '_sanitize_resume_'.$data_set;
$fromScratch = in_array('--from-scratch', $argv);
$tables = require_once $data_set.'_table_list.php';
$tableInsertCounts = _aft_setup_resume_table($resumeTableName, $toConn, $fromScratch, $tables);

// Remove FKs and disable constraints.
_aft_disable_constraints($toConn);

$failedTables = [];

// Copy/sanitize each table.
foreach ($tables as $tableName => $whiteListedColumns) {
    $tableName = strtolower((string) $tableName);
    // See if this table needs to be copied/sanitized. Keep going if it doesn't
    // exist.
    try {
        $batchInsertCountStmt = _aft_query($fromConn,
            "SELECT COUNT(*) AS row_count FROM [$tableName]");
    } catch (\Exception $e) {
        echo $e->getMessage().PHP_EOL;
        $failedTables[] = $tableName;

        continue;
    }
    $totalRows = sqlsrv_fetch_object($batchInsertCountStmt)->row_count;
    $totalInsertCount = $tableInsertCounts[$tableName];
    // Skip tables that are empty or have been completely imported.
    if ($totalRows == 0 || $totalRows == $totalInsertCount) {
        continue;
    }

    _aft_prep_table($tableName, $toConn, $fromScratch || ($totalInsertCount == 0));
    $columnsToSanitize = _aft_columns_to_sanitize($tableName, $fromConn, $whiteListedColumns);
    $computedColumns = _aft_computed_columns($tableName, $fromConn);
    $uniqueColumns = _aft_unique_columns($tableName, $fromConn);
    $uniqueValuesCache = [];
    $batchInsertCount = 0;
    $rowsToInsert = '';
    $tableStartTime = microtime(true);

    // Get the raw data, starting from where we left off.
    // Note that "ORDER BY 1" means order by the first column. As of this writing,
    // every table being imported has an IDENTITY column as the first column, so
    // this both guarantees a consistent order (necessary for the batching to work
    // correctly), and means that rerunning sanitization after the source CDB has
    // been updated with new rows should pick up those rows cleanly.
    // @todo: This doesn't work for the legacy DB, with GUIDs rather than identity
    // columns. How do we do resumability?
    $selectSql = "SELECT * FROM [$tableName] ORDER BY 1 OFFSET $totalInsertCount ROWS";
    $selectStmt = _aft_query($fromConn, $selectSql);
    while ($rawRow = sqlsrv_fetch_array($selectStmt, SQLSRV_FETCH_ASSOC)) {
        $row = [];
        foreach ($rawRow as $columnName => $value) {
            $columnName = strtolower($columnName);
            // Don't touch (or insert) computed columns.
            if (isset($computedColumns[$columnName])) {
                continue;
            }
            $row[$columnName] = $value;
        }

        $sanitizedRow = _aft_sanitize_row($row, $columnsToSanitize, $uniqueColumns,
            $computedColumns, $uniqueValuesCache);
        $rowsToInsert .= _aft_sql_value_string($sanitizedRow);
        // One more row in this batch, and one more going into the table.
        $batchInsertCount++;
        $totalInsertCount++;
        // Accumulate rows until we reach the batch size or the last available row
        // in the table.
        if ($batchInsertCount < $batchSize && $totalInsertCount < $totalRows) {
            continue;
        }

        // Use a transaction to make sure that the InsertCount accurately tracks
        // successful inserts.
        if (sqlsrv_begin_transaction($toConn) === false) {
            exit(print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true));
        }
        $rowsToInsert = rtrim($rowsToInsert, ",\n");
        $columnNames = implode(', ', array_keys($sanitizedRow));
        $insert_sql = "INSERT INTO [$tableName]($columnNames) VALUES $rowsToInsert";
        _aft_query($toConn, $insert_sql);
        _aft_query($toConn, "UPDATE [$resumeTableName] SET InsertCount = $totalInsertCount WHERE TableName = '$tableName'");
        sqlsrv_commit($toConn);

        if ($totalInsertCount % 10000 == 0) {
            _aft_report_stats($totalInsertCount, $totalRows, $tableStartTime, $tableName);
        }
        // Reset bulk insert variables.
        $rowsToInsert = '';
        $batchInsertCount = 0;
    }
    if ($row === false) {
        echo "Fetch failed at batchInsertCount $batchInsertCount: $selectSql\n";
        print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true);
    }
    // Set IDENTITY_INSERT OFF so the next table can turn it on.
    _aft_set_identity_insert($tableName, $toConn, false);

    // Restore all indexes.
    _aft_alter_indexes($tableName, $toConn, 'REBUILD');

    _aft_report_stats($totalInsertCount, $totalRows, $tableStartTime, $tableName);
    echo "Sanitized data generated for table name: $tableName".PHP_EOL;
}

echo "\n\nAll tables have been sanitized.\n";
if ($failedTables) {
    echo "Except:\n";
    print_r($failedTables);
}

/**
 * Connect to a SQL Server, returning the connection.
 *
 *
 * @return resource
 */
function _aft_connection(array $configuration)
{
    $serverName = $configuration['host'];
    unset($configuration['host']);
    $connection = sqlsrv_connect($serverName, $configuration);
    if ($connection) {
        echo "Connection to {$configuration['Database']} established.".PHP_EOL;

        return $connection;
    } else {
        echo "Connection to {$configuration['Database']} not established.".PHP_EOL;
        exit(print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true));
    }
}

/**
 * Set up progress tracking and resumption support.
 *
 * @param  string  $resumeTableName
 *                                   Table for tracking progress.
 * @param  $toConn
 *                 Connection to the source database.
 * @param  bool  $fromScratch
 *                             If TRUE, wipe the progress tracking. Otherwise, resume where left off.
 * @param  array  $tables
 *                         The list of CDB tables being imported.
 * @return array
 *               The tables to actually process (omitting those which have been done).
 */
function _aft_setup_resume_table(string $resumeTableName, $toConn, bool $fromScratch, array $tables): array
{
    $createResumeTable = <<<SQL
IF NOT EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID('[$resumeTableName]') AND type IN ('U'))
       CREATE TABLE [$resumeTableName] (
    TableOrder INT IDENTITY(1,1),
    TableName VARCHAR(100) NOT NULL PRIMARY KEY,
    InsertCount INT DEFAULT 0
  )
SQL;
    _aft_query($toConn, $createResumeTable);

    // Start over from scratch?
    if ($fromScratch) {
        _aft_query($toConn, "TRUNCATE TABLE $resumeTableName");
    }

    $insertSql = '';
    foreach ($tables as $tableName => $sql) {
        $tableName = strtolower($tableName);
        $insertSql .= "INSERT INTO [$resumeTableName](TableName) VALUES('$tableName')";
    }
    // Insert data to the resume table, ignore duplicate key errors.
    sqlsrv_query($toConn, $insertSql);

    $tableInsertCounts = [];
    $stmt = _aft_query($toConn, "SELECT * FROM [$resumeTableName] ORDER BY TableOrder ASC");
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        $tableInsertCounts[$row['TableName']] = $row['InsertCount'];
    }

    return $tableInsertCounts;
}

/**
 * Remove/disable all constraints on all tables in the database.
 *
 * @param  $connection
 *                     Connection to the destination database.
 */
function _aft_disable_constraints($connection): void
{
    // Remove all foreign key constraints, so we can truncate tables.
    // Since this database is not being used in any fashion other than input into
    // test migrations to 2.0, we don't need to restore the FKs.
    $drop_sql = <<<'SQL'
  WHILE(EXISTS(SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_TYPE = 'FOREIGN KEY'))
  BEGIN
      DECLARE @sql_alterTable_fk NVARCHAR(2000)

      SELECT  TOP 1 @sql_alterTable_fk = ('ALTER TABLE ' + TABLE_SCHEMA + '.[' + TABLE_NAME + '] DROP CONSTRAINT [' + CONSTRAINT_NAME + ']')
      FROM    INFORMATION_SCHEMA.TABLE_CONSTRAINTS
      WHERE   CONSTRAINT_TYPE = 'FOREIGN KEY'
      EXEC (@sql_alterTable_fk)
  END
SQL;
    _aft_query($connection, $drop_sql);

    // Disable all constraints to allow inserts on any table order.
    $sql = 'EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"';
    _aft_query($connection, $sql);
}

/**
 * Prepare the destination table for import.
 *
 * @param  string  $tableName
 *                             Name of the table.
 * @param  $toConn
 *                 Database connection for the table.
 * @param  bool  $truncate
 *                          If TRUE, truncate the table.
 */
function _aft_prep_table(string $tableName, $toConn, bool $truncate): void
{
    // Disable triggers - we want no side-effects.
    _aft_query($toConn, "ALTER TABLE [$tableName] DISABLE TRIGGER ALL");

    // Set IDENTITY_INSERT ON so we can insert explicit IDs.
    _aft_set_identity_insert($tableName, $toConn, true);

    // Clean table.
    if ($truncate) {
        _aft_query($toConn, "TRUNCATE TABLE [$tableName]");
    }

    // Disable all indexes.
    _aft_alter_indexes($tableName, $toConn, 'DISABLE');
}

/**
 * Disable or restore all indexes on the specified table.
 *
 * @param  string  $table
 *                         Name of the table.
 * @param  $toConn
 *                 Database connection for the table.
 * @param  string  $operation
 *                             'DISABLE' to disable indexes, 'REBUILD' to rebuild them.
 */
function _aft_alter_indexes(string $table, $toConn, string $operation): void
{
    $sql = <<<'SQL'
declare commands cursor for
SELECT 'ALTER INDEX ' + QUOTENAME(I.name) + ' ON ' +  QUOTENAME(SCHEMA_NAME(T.schema_id))+'.'+ QUOTENAME(T.name) + ' %s'
FROM sys.indexes I
INNER JOIN sys.tables T ON I.object_id = T.object_id
WHERE I.type_desc = 'NONCLUSTERED'
AND I.name IS NOT NULL
AND I.is_disabled = %s
AND T.name = '%s'

declare @cmd varchar(max)

open commands
fetch next from commands into @cmd
while @@FETCH_STATUS=0
begin
  exec(@cmd)
  fetch next from commands into @cmd
end

close commands
deallocate commands
SQL;

    $sql = sprintf($sql, $operation, (int) ($operation != 'DISABLE'), $table);
    $result = sqlsrv_query($toConn, $sql);
    if ($result === false) {
        echo "SQL statement failed:\n";
        echo "$sql\n";
        print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true);
    }
}

/**
 * Set the IDENTITY_INSERT option for the given table.
 *
 * @param  string  $tableName
 *                             Table we're inserting to.
 * @param  $toConn
 *                 Database connection.
 * @param  bool  $optionValue
 *                             TRUE to set IDENTITY_INSERT ON, FALSE to set it OFF.
 */
function _aft_set_identity_insert(string $tableName, $toConn, bool $optionValue): void
{
    $optionString = $optionValue ? 'ON' : 'OFF';
    $identityInsertSql = "IF (OBJECTPROPERTY(OBJECT_ID('$tableName'), 'TableHasIdentity') = 1) ";
    $identityInsertSql .= "BEGIN SET IDENTITY_INSERT [$tableName] $optionString END";
    $result = sqlsrv_query($toConn, $identityInsertSql);
    if (! $result) {
        echo "SQL statement failed:\n";
        echo "$identityInsertSql\n";
        print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true);
    }
}

/**
 * Determine which columns (char/text which are not whitelisted) to sanitize.
 *
 * @param  string  $tableName
 *                             Table to examine.
 * @param  $fromConn
 *                   Connection to the database.
 * @param  array  $whiteListedColumns
 *                                     Array of char/text columns not needing sanitization.
 */
function _aft_columns_to_sanitize(string $tableName, $fromConn, array $whiteListedColumns): array
{
    $whiteListedColumns = array_map('strtolower', $whiteListedColumns);
    $columnsToSanitize = [];
    $columnsStmt = _aft_query($fromConn, "EXEC sp_columns '$tableName'");
    while ($obj = sqlsrv_fetch_object($columnsStmt)) {
        if (in_array($obj->TYPE_NAME, ['varchar', 'char', 'nvarchar', 'text'])) {
            if (! in_array(strtolower($obj->COLUMN_NAME), $whiteListedColumns)) {
                $columnsToSanitize[] = strtolower($obj->COLUMN_NAME);
            }
        }
    }

    return $columnsToSanitize;
}

/**
 * List all columns with UNIQUE constraints in the specified table.
 *
 * @param  string  $tableName
 *                             Table to examine.
 * @param  $toConn
 *                 Connection to the database.
 * @return array
 *               List of column names with UNIQUE constraints.
 */
function _aft_unique_columns(string $tableName, $toConn): array
{
    // Get UNIQUE constraints for this table.
    $uniqueSql = <<<SQL
SELECT TC.CONSTRAINT_NAME, CC.COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS TC
INNER JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE CC ON TC.CONSTRAINT_NAME = CC.CONSTRAINT_NAME
WHERE TC.TABLE_NAME = '$tableName' AND TC.CONSTRAINT_TYPE = 'UNIQUE'
SQL;
    $uniqueStmt = _aft_query($toConn, $uniqueSql);
    $uniqueColumns = [];
    while ($obj = sqlsrv_fetch_object($uniqueStmt)) {
        $uniqueColumns[] = strtolower($obj->COLUMN_NAME);
    }

    return $uniqueColumns;
}

/**
 * List all computed columns in the specified table.
 *
 * @param  string  $tableName
 *                             Table to examine.
 * @param  $toConn
 *                 Connection to the database.
 * @return array
 *               List of column names which are computed.
 */
function _aft_computed_columns(string $tableName, $toConn): array
{
    // Get computed columns for this table.
    $computedSql = "SELECT name
  FROM sys.computed_columns
  WHERE object_id = OBJECT_ID('$tableName')";
    $computedStmt = _aft_query($toConn, $computedSql);
    $computedColumns = [];
    while ($obj = sqlsrv_fetch_object($computedStmt)) {
        $computedColumns[strtolower($obj->name)] = strtolower($obj->name);
    }
    // Treat "timestamp" columns like computed columns.
    $columnsStmt = _aft_query($toConn, "EXEC sp_columns '$tableName'");
    while ($obj = sqlsrv_fetch_object($columnsStmt)) {
        if ($obj->TYPE_NAME == 'timestamp') {
            $computedColumns[strtolower($obj->COLUMN_NAME)] = strtolower($obj->COLUMN_NAME);
        }
    }

    return $computedColumns;
}

/**
 * Copy a data row, sanitizing as necessary and removing computed columns.
 *
 * @param  array  $row
 *                      Raw data row from CDB.
 * @param  array  $columnsToSanitize
 *                                    Columns which should be sanitized.
 * @param  array  $uniqueColumns
 *                                Columns with unique constraints.
 * @param  array  $computedColumns
 *                                  Computed columns, to be removed from the row before insertion.
 * @param  array  $uniqueValuesCache
 *                                    Tracking of unique values for columns with unique constraints.
 * @return array
 *               A data row with santization applied and computed columns removed.
 */
function _aft_sanitize_row(array $row, array $columnsToSanitize, array $uniqueColumns, array $computedColumns, array &$uniqueValuesCache): array
{
    foreach ($columnsToSanitize as $columnName) {
        // Don't touch empty columns.
        if (! empty($row[$columnName])) {
            // Create the sanitized value, making sure it's unique if necessary.
            $sanitizedValue = _aft_sanitize_string($row[$columnName]);
            if (in_array($columnName, $uniqueColumns)) {
                while (isset($uniqueValuesCache[$columnName][strtolower($sanitizedValue)])) {
                    // This $sanitizedValue is already inserted, try generating another
                    // instead.
                    $sanitizedValue = _aft_sanitize_string($row[$columnName]);
                }
                $uniqueValuesCache[$columnName][strtolower($sanitizedValue)] = true;
            }
            // Special case - legacy retiree chapter names need to keep an indication
            // that they are retiree chapters.
            if (strtolower((string) $columnName) == 'chaptername') {
                if (preg_match('/(reti)|( ret$)|(^ret )|(^ret$)/i', (string) $row[$columnName])) {
                    $sanitizedValue = substr($sanitizedValue, 0, 46);
                    $sanitizedValue .= ' ret';
                }
            }
            $row[$columnName] = $sanitizedValue;
        }
    }

    return $row;
}

/**
 * Generates a sanitized string.
 */
function _aft_sanitize_string(string $source_string): string
{
    if (filter_var($source_string, FILTER_VALIDATE_EMAIL)) {
        // Generate a valid email.
        $new_str = _aft_random_string(random_int(4, 10)).'@example.org';
        // Make sure it doesn't end up too long
        if (mb_strlen($new_str) > mb_strlen($source_string)) {
            // Truncate the beginning.
            $new_str = substr($new_str, -mb_strlen($source_string));
        }
    } else {
        $new_str = _aft_random_string(mb_strlen(trim($source_string)));
    }

    return $new_str;
}

/**
 * Creates a SQL values clause for an INSERT statement.
 *
 * @param  array  $sanitizedRow
 *                               Data to be turned into SQL.
 */
function _aft_sql_value_string(array $sanitizedRow): string
{
    $sanitizedValues = '';
    foreach (array_values($sanitizedRow) as $value) {
        if (is_null($value)) {
            $sanitizedValues .= 'NULL,';
        } elseif (is_string($value)) {
            // Escape any single quotes.
            $value = str_replace("'", "''", $value);
            $sanitizedValues .= "'$value',";
        } else {
            $sanitizedValues .= "$value,";
        }
    }
    $sanitizedValues = rtrim($sanitizedValues, ',');

    return "($sanitizedValues),\n";
}

/**
 * Random string generator.
 */
function _aft_random_string($length = 10): string
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }

    return $randomString;
}

/**
 * Execute a sql query.
 */
function _aft_query($conn, $sql)
{
    $stmt = sqlsrv_query($conn, $sql);
    if ($stmt === false) {
        echo "SQL statement failed:\n$sql\n";
        exit(print_r(sqlsrv_errors(SQLSRV_ERR_ALL), true));
    }

    return $stmt;
}

/**
 * Report progress for a given table.
 *
 * @param  int  $rowsDone
 *                         Rows done for this table.
 * @param  int  $totalRows
 *                          Total rows in this table.
 * @param  float  $tableStartTime
 *                                 When we started on this table.
 * @param  string  $tableName
 *                             Name of the table.
 */
function _aft_report_stats(int $rowsDone, int $totalRows, float $tableStartTime, string $tableName): void
{
    $pct = round($rowsDone * 100 / $totalRows).'%';
    $elapsed = round(microtime(true) - $tableStartTime);
    echo "$rowsDone of $totalRows ($pct) in $elapsed seconds for $tableName\n";
}

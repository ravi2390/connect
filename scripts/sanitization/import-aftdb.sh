#!/usr/bin/env bash

# Import an AFTDB dumped via mssql-scripter --file-per-object into a specified
# database, honoring FK dependencies.
if [ $# != 6 ]; then
    echo "Usage: import-aftdb.sh host username password database table_metadata_path sql_directory"
    echo "Example: import.aftdb 127.0.0.1 sa aB0cD3 aftdb connect/packages/aft/datamodel/data/table_metadata.csv /tmp/AFTDB_sanitized"
    exit
fi

IFS=","
HOST="$1"
USER="$2"
PASS="$3"
DB="$4"
TABLE_METADATA_PATH="$5"
SQL_DIRECTORY="$6"
# The table metadata file lists tables in the order they need to be created to
# avoid errors on FK creation. The "i" variables absorb unused fields in the CSV.
while read -r TABLE_NAME i1 i2 i3 i4 i5
do
  SQLFILE="$SQL_DIRECTORY/dbo.$TABLE_NAME.Table.sql"
  if [ -e $SQLFILE ]; then
    echo "Importing $TABLE_NAME..."
    ARGS=("-S" "$HOST" "-U" "$USER" "-P" "$PASS" "-d" "$DB" "-i" "$SQLFILE")
    sqlcmd "${ARGS[@]}" </dev/null >/dev/null
    echo "...Done with $TABLE_NAME"
  fi
done <"$TABLE_METADATA_PATH"

# AFT connect

## Local Development

Local development is possible using `ddev`. See [ddev installation](https://ddev.readthedocs.io/en/stable/#installation) for specific instructions.


### Configure `ddev` and import a database backup

#### ⚠️ Warning: MSSQL is not compatible with Linux > 6.6. You might need to downgrade your Docker host image ⚠️
The `mssql` version (`mcr.microsoft.com/azure-sql-edge`) we use is not compatible with linux kernels past 6.6. This has been fixed in newer `mssql` images but these are _only_ available for `amd64`. Our current developer setup needs to work on `arm64` (Apple Silicon).

There are two available work arounds:
* If using Docker Desktop, downgrade to `4.32.x`, which uses host images with kernel 6.6.
* If using `lima` edit your configuration (`limactl edit default`) to use `ubuntu-22.04` images (see below for an older, compatible, docker template). You might need to recreate the VM.

See:
* Docker Desktop bug report: https://github.com/docker/for-mac/issues/7368#issuecomment-2275555064
* Lima `docker.yaml` template using `ubuntu-22.04`: https://github.com/lima-vm/lima/blob/2d50bf40150fa825df1d2b453353f0b2b88966ce/examples/docker.yaml

```shell
# Copy the default top-level `.env` file to set default environment variables
$ cp .env.example .env

# Start the `ddev` containers
$ ddev start

# Make sure a `.ddev/.env` file with proper MSSQL credentials exists
$ cat .ddev/.env
(...)
MSSQL_EXTERNAL_PORT=1433
MSSQL_SA_PASSWORD=Password12!
MSSQL_PID=Developer
MSSQL_DB_NAME=AFTDB_tag1
MSSQL_HOST=sqlsrv
(...)

# Restore the MSSQL DB backup (see [Database Import](#database-import) below)
$ ddev sqlsrv-copy-bak AFTDB_tag1_4_17.bak
$ ddev sqlsrv-restore-bak

# Create an empty database for Laravel
$ ddev sqlsrv-create-db laravel
```

### Project dependencies and build

Project dependecies and custom install/build scripts are managed through `composer` and `npm`, see `composer.json` and `package.json` for specific details.

```shell
# Install all PHP dependencies
# Note: This implicitly runs database migrations and clears caches
$ ddev composer install

# Install all JS dependencies
$ ddev npm clean-install

# Build JS modules and `mfp` (packages/aft/memberforms)
# Note: `dev-deploy-admin` and `dev-deploy-staff` break the full `dev-deploy` command
$ ddev npm run dev
$ ddev npm run dev-deploy-mfp
$ ddev npm run dev-deploy-admin
```

### Install and setup Laravel

```shell
## Create all Laravel tables
$ ddev artisan migrate

## Create user accounts
## See `database/seeds/data/users.csv` to edit the seeded accounts
## and passwords
$ ddev artisan db:seed

## Generate models
$ ddev artisan aftdb:create

## Enable authentication
$ ddev artisan passport:install

## Disable audits (necessary for authentication)
$ ddev artisan audit:status disable

## Generate a login link for one of the seeded user accounts,
## or login at https://connect.ddev.site/login
##
## See `database/seeds/data/users.csv`
$ ddev artisan user:generate-reset-link youremail@domain.com

## Seed mfp forms
$ ddev artisan mfp:data seed

## Link storage
$ ddev php artisan storage:link
```

#### Database Import

DB backups can be found in the [AFTDB Test Data](https://drive.google.com/drive/folders/1xTGtCy6YNMlA3GtLdzDfTk9CDsTC8BXk?usp=drive_link) shared folder.

As of 2024-06, the best available backup is [`AAFTDB_tag1_4_17.rar`](https://drive.google.com/file/d/1CD1dRYFgqMRKZQehG7lAPnKjEw7aXaUs/view?usp=drive_link). Uncompressing it results in a single file named `AAFTDB_tag1_4_17.bak`.

The DB can be imported/restored using GUI tools, or the included `ddev` commands.

Suggested connection details for DB tools:
- Server: 127.0.0.1
- User name: SA
- Password: Password12!
- Trust server certificate: True

##### Included `ddev` commands
The utility `sqlsrv-copy-bak` and `sqlsrv-restore-bak` custom commands are included in this project's ddev configuration to ease developer setup. These expect the backup files to have known names. See the full example in [Local Development](#local-development).

```shell
$ ddev sqlsrv-copy-bak AAFTDB_tag1_4_17.bak
$ ddev sqlsrv-restore-bak
```

##### Azure Data Studio

Use [Azure Data Studio](https://learn.microsoft.com/en-US/azure-data-studio/download-azure-data-studio) to connect to the server, create the Laravel database, and import a backup of AFTDB.

1. Copy a backup of the database to the sqlsrv container by running `ddev sqlsrv-copy-bak [filename.bak]`
1. Install and open Azure Datastudio and go to Settings and search for “unreleased” to enable preview features in Azure SQL Studio
    * Enable checkbox and restart SQL Studio
1. Right-click on Databases and select Restore Database (Preview)
    * Under Source, choose to Restore from a "Backup file"
    * For the Backup file path, scroll down to and select `aftdb.bak` which is in `/var/opt/mssql/data`
    * Click OK and then Restore to import the database
1. Create a database named `laravel`

#### DBeaver

[DBeaver Community Edition](https://dbeaver.io/download/) is free and can connect to SQL Server.

1. Copy a backup of the database to the sqlsrv container by running `ddev sqlsrv-copy-bak [filename.bak]`
1. Create a new Database Connection using the details above (use "SQL Server" driver in DBeaver)
1. Run the Restore Database command (below) to restore the backup to `AFTDB_tag` database.
    * Execute SQL Script (not Execute SQL Query)
1. Right-click on Databases to Create New Database named `laravel`
1. Press F5 to refresh the Database listing, if necessary

##### Raw Transact-SQL

It is also possible to use the `mssql` tools installed in the web container to restore the DB using Transact-SQL.

See `.ddev/commands/web/sqlsrv-restore-bak` for a full example.

### API Authentication

To access the API you will need a client ID and a corresponding secret. You can generate a new pair of credentials with:
```shell
$ ddev artisan passport:client --client
```

### Testing

#### Testing API access with cURL

API endpoints can be tested using `curl` or similar tools. The following example uses `curl` to get an Access Token, setup a headers file, and consume some example endpoints.

```shell
# Request an access token
$ curl --insecure --request POST https://connect.ddev.site/oauth/token \
   --data grant_type=client_credentials \
   --data client_id=CLIENT_ID \
   --data client_secret=CLIENT_SECRET

# Save the access token to a `headers.curl` file:
$ cat headers.curl
Authorization: Bearer ACCESS_TOKEN
Content-Type: application/json

# Request the getAffiliateIDsData resource
curl --insecure --request POST https://connect.ddev.site/api/v2/muse/getAffiliateIDsData \
     --header @headers.curl \
     --data '{ "AffiliateNumber": "NNECT" }'

# Request the getLookupLists resource
curl --insecure --request POST https://connect.ddev.site/api/v2/muse/getLookupLists \
     --header @headers.curl \
     --data '{ "returnScope": ["prefix", "suffix", "gender", "stateTerritory", "unionRelationshipType", "country"] }'
```

#### Automated testing

A test suite is available under [`tests/`](./tests/). Tests mimic the directory structure of the code being covered.
A valid AFTDB instance is expected.

```shell
$ ddev artisan test
```

New tests can be added by copying and adapting the existing tests.

### URL routing

Connect manages two routing "tables" where URLs are configured to specific Vue Components or Laravel Controllers. This more-or-less follows a typical backend/frontend divide.

#### Laravel Controllers routing

Most API-related routing is configured through Laravel's PHP routing:
* [`routes/`](./routes/) -- Routes can be protected and configured for specific methods, authentication, etc. using Laravel facilities.
* [`packages/aft/`](./packages/aft/) -- Packages _might_ offer routing additions or utility functions like `Aft\FileUploader\FileUploader::routes()`

It is recommended to follow the `Package::routes()` pattern when possible, and relevant. Simpler routes can of course be configured directly in `routes/`.

#### Vue Components routing

User-facing URLs are mostly built as Vue Components that can be routed in [`resources/js/router/`](./resources/js/router/).

Keep in mind that [`routes/web.php`](./routes/web.php) has a default wrapper for most Vue Components, minus some special paths. Adding or changing routes in Vue might require adjusting the Laravel wrapper there.

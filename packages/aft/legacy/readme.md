# Legacy migration package

The legacy package supports migration from legacy data (AFT_CDB) to Connect 2.0 (AFTDB). It defines the Artisan `legacy:migrate` command for performing migrations.

## Usage

The legacy migration process should be run after the 1.0 migration process (see the aftconnect repo). The advantages of running 1.0 first are:

1. It populates most entries of the lookup tables - in particular, some which are defined in CSV files rather than migrated from a database table.
1. It's faster for the same amount of data - by migrating a table at a time, far fewer queries are executed (e.g., one query of individual addresses, as opposed to one query for each distinct individual being migrated).
1. For overlapping items, it has the more recent data, because 1.0 data is backsynced to legacy once a month. Therefore, migration from legacy can be skipped for those items, whereas if we did it in the opposite order a given item would be migrated first from legacy, then updated from 1.0 when that is more recent.

The form of the command is:

```
php artisan legacy:migrate [options] [--] [<AffiliateNumber>]
```

If run without an `AffiliateNumber` argument, it will start from the National affiliate and migrate it and all its active descendents with an `AffiliateType` of 'L', 'M', 'S', or 'G'. With `AffiliateNumber`, only that affiliate and its descendents will be migrated.

### Command options

* `--parent-id` - If specified, the passed Connect 2.0 integer ID to be set as the migrated affiliate's parent. Primarily for use when queuing affiliates (see below) - you will not usually use this explicitly on the command line.

* `--new-affiliates-only` - If specified, only data belonging to affiliates not already in AFTDB will be migrated. If not specified, even if the affiliate exists in AFTDB its members and other associated data will be processed to see if anything needs to be migrated. 

* `--officers-only` - If specified, only members who are officers of the current affiliate will be migrated. The intention is to use --new-affiliates-only and --officers-only to quickly migrate a minimal data set for Convention.

* `--progress-bar` - If specified, a progress bar of members being migrated for the current affiliate will be displayed.

* `--max-affiliates-checked`, `--max-affiliates-created`, `--max-members-checked`, `--max-members-created` - These options are intended for debugging and performance testing - if one of these is specified with an integer value, the migration process will exit after that many affiliates or members have been checked or created.

* `--use-queue` - Intended for use when migrating the entire set of legacy data, this will queue each affiliate as a separate job. By running multiple queue workers, you can thus migrate multiple affiliates in parallel to improve the elapsed time to migrate everything. It is strongly recommended that you use redis for queue management (the database driver has proven to be unreliable) - make sure this is set in your `.env` file:

```QUEUE_CONNECTION=redis```

The main queue workers should be invoked thusly:

```
php artisan queue:work --queue=legacy-migration --timeout=360000 --tries=3
```

Also start a queue worker for the "high-priority" queue (primarily for the large 00002 affiliate - note the larger timeout):

```
php artisan queue:work --queue=legacy-migration-high --timeout=1000000 --tries=3
```

The optimal total number of workers has not been definitively determined, but experience suggests around 6. They may be invoked in a single terminal (with `&` to run in the background), or run in separate terminals (when in separate terminals, add `--progress-bar`  to the `legacy_migrate` command to keep a closer eye on what they're doing).

* `--clear-queue` - In conjunction with `--use-queue` to clear all queued affiliate jobs so they may all be requeued from scratch.

* `--refresh-cached-mappings` - The mapping table correspondences between legacy and 2.0 are cached in a JSON file. Use this to regenerate that JSON cache when you are starting legacy migration from a fresh 1.0 migration, or if the AFT_CDB data source you're using has been updated.

* `--refresh-updated-dates` - The list of members (with basic data, in particular updated dates for each component of the member record) to migrate for a given affiliate is loaded into the `_legacy_mdates` table from the `Individual_mdate` view. Use this option to reload the table when either the view has been changed or you have fresh AFT_CDB data.

* `--clear-highwater` - For each affiliate, we store in Redis the highest member LastUpdatedAt date we have migrated, so the next migration of that affiliate can skip right to those records with changes. Use this option to clear the recorded dates to cause all legacy affiliate migrations to check all members from the beginning regardless of when they were updated. Most useful when you are starting a fresh legacy migration from the beginning, on top of a fresh 1.0 migration.

# # Dialect

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | The name of the dialect | [optional] [readonly]
**label** | **string** | The human-readable label of the connection | [optional] [readonly]
**supports_cost_estimate** | **bool** | Whether the dialect supports query cost estimates | [optional] [readonly]
**cost_estimate_style** | **string** | How the dialect handles cost estimation | [optional] [readonly]
**persistent_table_indexes** | **string** | PDT index columns | [optional] [readonly]
**persistent_table_sortkeys** | **string** | PDT sortkey columns | [optional] [readonly]
**persistent_table_distkey** | **string** | PDT distkey column | [optional] [readonly]
**supports_streaming** | **bool** | Supports streaming results | [optional] [readonly]
**automatically_run_sql_runner_snippets** | **bool** | Should SQL Runner snippets automatically be run | [optional] [readonly]
**connection_tests** | **string[]** | Array of names of the tests that can be run on a connection using this dialect | [optional] [readonly]
**supports_inducer** | **bool** | Is supported with the inducer (i.e. generate from sql) | [optional] [readonly]
**supports_multiple_databases** | **bool** | Can multiple databases be accessed from a connection using this dialect | [optional] [readonly]
**supports_persistent_derived_tables** | **bool** | Whether the dialect supports allowing Looker to build persistent derived tables | [optional] [readonly]
**has_ssl_support** | **bool** | Does the database have client SSL support settable through the JDBC string explicitly? | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

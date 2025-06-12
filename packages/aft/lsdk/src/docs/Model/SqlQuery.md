# # SqlQuery

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**slug** | **string** | The identifier of the SQL query | [optional] [readonly]
**last_runtime** | **float** | Number of seconds this query took to run the most recent time it was run | [optional] [readonly]
**run_count** | **int** | Number of times this query has been run | [optional] [readonly]
**browser_limit** | **int** | Maximum number of rows this query will display on the SQL Runner page | [optional] [readonly]
**sql** | **string** | SQL query text | [optional] [readonly]
**last_run_at** | **string** | The most recent time this query was run | [optional] [readonly]
**connection** | [**\OpenAPI\Client\Model\DBConnectionBase**](DBConnectionBase.md) |  | [optional]
**model_name** | **string** | Model name this query uses | [optional] [readonly]
**creator** | [**\OpenAPI\Client\Model\UserPublic**](UserPublic.md) |  | [optional]
**explore_url** | **string** | Explore page URL for this SQL query | [optional] [readonly]
**plaintext** | **bool** | Should this query be rendered as plain text | [optional] [readonly]
**vis_config** | [**array<string,Any>**](Any.md) | Visualization configuration properties. These properties are typically opaque and differ based on the type of visualization used. There is no specified set of allowed keys. The values can be any type supported by JSON. A \&quot;type\&quot; key with a string value is often present, and is used by Looker to determine which visualization to present. Visualizations ignore unknown vis_config properties. | [optional]
**result_maker_id** | **string** | ID of the ResultMakerLookup entry. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

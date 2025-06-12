# # RunningQueries

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**user** | [**\OpenAPI\Client\Model\UserPublic**](UserPublic.md) |  | [optional]
**query** | [**\OpenAPI\Client\Model\Query**](Query.md) |  | [optional]
**sql_query** | [**\OpenAPI\Client\Model\SqlQuery**](SqlQuery.md) |  | [optional]
**look** | [**\OpenAPI\Client\Model\LookBasic**](LookBasic.md) |  | [optional]
**created_at** | **string** | Date/Time Query was initiated | [optional] [readonly]
**completed_at** | **string** | Date/Time Query was completed | [optional] [readonly]
**query_id** | **string** | Query Id | [optional] [readonly]
**source** | **string** | Source (look, dashboard, queryrunner, explore, etc.) | [optional] [readonly]
**node_id** | **string** | Node Id | [optional] [readonly]
**slug** | **string** | Slug | [optional] [readonly]
**query_task_id** | **string** | ID of a Query Task | [optional] [readonly]
**cache_key** | **string** | Cache Key | [optional] [readonly]
**connection_name** | **string** | Connection | [optional] [readonly]
**dialect** | **string** | Dialect | [optional] [readonly]
**connection_id** | **string** | Connection ID | [optional] [readonly]
**message** | **string** | Additional Information(Error message or verbose status) | [optional] [readonly]
**status** | **string** | Status description | [optional] [readonly]
**runtime** | **float** | Number of seconds elapsed running the Query | [optional] [readonly]
**sql** | **string** | SQL text of the query as run | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

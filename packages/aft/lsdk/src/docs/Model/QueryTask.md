# # QueryTask

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**query_id** | **string** | Id of query | [optional]
**query** | [**\OpenAPI\Client\Model\Query**](Query.md) |  | [optional]
**generate_links** | **bool** | whether or not to generate links in the query response. | [optional]
**force_production** | **bool** | Use production models to run query (even is user is in dev mode). | [optional]
**path_prefix** | **string** | Prefix to use for drill links. | [optional]
**cache** | **bool** | Whether or not to use the cache | [optional]
**server_table_calcs** | **bool** | Whether or not to run table calculations on the server | [optional]
**cache_only** | **bool** | Retrieve any results from cache even if the results have expired. | [optional]
**cache_key** | **string** | cache key used to cache query. | [optional] [readonly]
**status** | **string** | Status of query task. | [optional]
**source** | **string** | Source of query task. | [optional]
**runtime** | **float** | Runtime of prior queries. | [optional] [readonly]
**rebuild_pdts** | **bool** | Rebuild PDTS used in query. | [optional]
**result_source** | **string** | Source of the results of the query. | [optional] [readonly]
**look_id** | **string** | Id of look associated with query. | [optional]
**dashboard_id** | **string** | Id of dashboard associated with query. | [optional]
**result_format** | **string** | The data format of the query results. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

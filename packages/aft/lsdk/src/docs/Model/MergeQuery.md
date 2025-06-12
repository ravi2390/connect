# # MergeQuery

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**column_limit** | **string** | Column Limit | [optional]
**dynamic_fields** | **string** | Dynamic Fields | [optional]
**id** | **string** | Unique Id | [optional] [readonly]
**pivots** | **string[]** | Pivots | [optional]
**result_maker_id** | **string** | Unique to get results | [optional] [readonly]
**sorts** | **string[]** | Sorts | [optional]
**source_queries** | [**\OpenAPI\Client\Model\MergeQuerySourceQuery[]**](MergeQuerySourceQuery.md) | Source Queries defining the results to be merged. | [optional]
**total** | **bool** | Total | [optional]
**vis_config** | **array<string,string>** | Visualization Config | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # ResultMakerWithIdVisConfigAndDynamicFields

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Unique Id. | [optional] [readonly]
**dynamic_fields** | **string** | JSON string of dynamic field information. | [optional] [readonly]
**filterables** | [**\OpenAPI\Client\Model\ResultMakerFilterables[]**](ResultMakerFilterables.md) | array of items that can be filtered and information about them. | [optional] [readonly]
**sorts** | **string[]** | Sorts of the constituent Look, Query, or Merge Query | [optional] [readonly]
**merge_result_id** | **string** | ID of merge result if this is a merge_result. | [optional] [readonly]
**total** | **bool** | Total of the constituent Look, Query, or Merge Query | [optional] [readonly]
**query_id** | **string** | ID of query if this is a query. | [optional] [readonly]
**sql_query_id** | **string** | ID of SQL Query if this is a SQL Runner Query | [optional] [readonly]
**query** | [**\OpenAPI\Client\Model\Query**](Query.md) |  | [optional]
**vis_config** | [**array<string,Any>**](Any.md) | Vis config of the constituent Query, or Merge Query. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

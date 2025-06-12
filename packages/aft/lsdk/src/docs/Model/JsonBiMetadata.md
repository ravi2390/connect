# # JsonBiMetadata

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**big_query_metadata** | [**\OpenAPI\Client\Model\JsonBiBigQueryMetadata**](JsonBiBigQueryMetadata.md) |  |
**fields** | [**\OpenAPI\Client\Model\JsonBiFields**](JsonBiFields.md) |  |
**pivots** | [**\OpenAPI\Client\Model\JsonBiPivots[]**](JsonBiPivots.md) | Pivots | [readonly]
**has_subtotals** | **bool** | If the query has subtotals | [readonly]
**has_totals** | **bool** | If the query has totals | [readonly]
**columns_truncated** | **string** | If the query results hit the maximum column limit and additional columns were truncated | [readonly]
**filter_expression** | **string** | Filter expression applied to the query results | [readonly]
**filters** | **array<string,string>** | Filters applied to the query results | [readonly]
**sql** | **string** | Raw sql query. Null if user does not have permission to view sql | [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

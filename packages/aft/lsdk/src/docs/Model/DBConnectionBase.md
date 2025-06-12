# # DBConnectionBase

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**name** | **string** | Name of the connection. Also used as the unique identifier | [optional] [readonly]
**dialect** | [**\OpenAPI\Client\Model\Dialect**](Dialect.md) |  | [optional]
**snippets** | [**\OpenAPI\Client\Model\Snippet[]**](Snippet.md) | SQL Runner snippets for this connection | [optional] [readonly]
**pdts_enabled** | **bool** | True if PDTs are enabled on this connection | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

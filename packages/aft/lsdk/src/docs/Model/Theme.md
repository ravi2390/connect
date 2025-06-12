# # Theme

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**begin_at** | **\DateTime** | Timestamp for when this theme becomes active. Null&#x3D;always | [optional]
**end_at** | **\DateTime** | Timestamp for when this theme expires. Null&#x3D;never | [optional]
**id** | **string** | Unique Id | [optional] [readonly]
**name** | **string** | Name of theme. Can only be alphanumeric and underscores. | [optional]
**settings** | [**\OpenAPI\Client\Model\ThemeSettings**](ThemeSettings.md) |  | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

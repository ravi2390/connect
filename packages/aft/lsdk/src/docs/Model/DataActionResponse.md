# # DataActionResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**webhook_id** | **string** | ID of the webhook event that sent this data action. In some error conditions, this may be null. | [optional] [readonly]
**success** | **bool** | Whether the data action was successful. | [optional] [readonly]
**refresh_query** | **bool** | When true, indicates that the client should refresh (rerun) the source query because the data may have been changed by the action. | [optional] [readonly]
**validation_errors** | [**\OpenAPI\Client\Model\ValidationError**](ValidationError.md) |  | [optional]
**message** | **string** | Optional message returned by the data action server describing the state of the action that took place. This can be used to implement custom failure messages. If a failure is related to a particular form field, the server should send back a validation error instead. The Looker web UI does not currently display any message if the action indicates &#39;success&#39;, but may do so in the future. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

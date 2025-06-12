# # ProjectError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **string** | A stable token that uniquely identifies this class of error, ignoring parameter values. Error message text may vary due to parameters or localization, but error codes do not. For example, a \&quot;File not found\&quot; error will have the same error code regardless of the filename in question or the user&#39;s display language | [optional] [readonly]
**severity** | **string** | Severity: fatal, error, warning, info, success | [optional] [readonly]
**kind** | **string** | Error classification: syntax, deprecation, model_configuration, etc | [optional] [readonly]
**message** | **string** | Error message which may contain information such as dashboard or model names that may be considered sensitive in some use cases. Avoid storing or sending this message outside of Looker | [optional] [readonly]
**field_name** | **string** | The field associated with this error | [optional] [readonly]
**file_path** | **string** | Name of the file containing this error | [optional] [readonly]
**line_number** | **int** | Line number in the file of this error | [optional] [readonly]
**model_id** | **string** | The model associated with this error | [optional] [readonly]
**explore** | **string** | The explore associated with this error | [optional] [readonly]
**help_url** | **string** | A link to Looker documentation about this error | [optional] [readonly]
**params** | [**array<string,Any>**](Any.md) | Error parameters | [optional] [readonly]
**sanitized_message** | **string** | A version of the error message that does not contain potentially sensitive information. Suitable for situations in which messages are stored or sent to consumers outside of Looker, such as external logs. Sanitized messages will display \&quot;(?)\&quot; where sensitive information would appear in the corresponding non-sanitized message | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

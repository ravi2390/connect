# # Datagroup

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**created_at** | **int** | UNIX timestamp at which this entry was created. | [optional] [readonly]
**id** | **string** | Unique ID of the datagroup | [optional] [readonly]
**model_name** | **string** | Name of the model containing the datagroup. Unique when combined with name. | [optional] [readonly]
**name** | **string** | Name of the datagroup. Unique when combined with model_name. | [optional] [readonly]
**stale_before** | **int** | UNIX timestamp before which cache entries are considered stale. Cannot be in the future. | [optional]
**trigger_check_at** | **int** | UNIX timestamp at which this entry trigger was last checked. | [optional] [readonly]
**trigger_error** | **string** | The message returned with the error of the last trigger check. | [optional] [readonly]
**trigger_value** | **string** | The value of the trigger when last checked. | [optional] [readonly]
**triggered_at** | **int** | UNIX timestamp at which this entry became triggered. Cannot be in the future. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

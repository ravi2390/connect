# # AlertNotifications

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**notification_id** | **string** | ID of the notification | [optional] [readonly]
**alert_condition_id** | **string** | ID of the alert | [optional] [readonly]
**user_id** | **string** | ID of the user | [optional] [readonly]
**is_read** | **bool** | Read state of the notification | [optional]
**field_value** | **float** | The value of the field on which the alert condition is set | [optional] [readonly]
**threshold_value** | **float** | The value of the threshold which triggers the alert notification | [optional] [readonly]
**ran_at** | **string** | The time at which the alert query ran | [optional] [readonly]
**alert** | [**\OpenAPI\Client\Model\MobilePayload**](MobilePayload.md) |  | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

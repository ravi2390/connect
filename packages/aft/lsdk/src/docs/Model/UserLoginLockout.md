# # UserLoginLockout

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**key** | **string** | Hash of user&#39;s client id | [optional] [readonly]
**auth_type** | **string** | Authentication method for login failures | [optional] [readonly]
**ip** | **string** | IP address of most recent failed attempt | [optional] [readonly]
**user_id** | **string** | User ID | [optional] [readonly]
**remote_id** | **string** | Remote ID of user if using LDAP | [optional] [readonly]
**full_name** | **string** | User&#39;s name | [optional] [readonly]
**email** | **string** | Email address associated with the user&#39;s account | [optional] [readonly]
**fail_count** | **int** | Number of failures that triggered the lockout | [optional] [readonly]
**lockout_at** | **\DateTime** | Time when lockout was triggered | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

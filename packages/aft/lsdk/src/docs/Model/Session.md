# # Session

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**ip_address** | **string** | IP address of user when this session was initiated | [optional] [readonly]
**browser** | **string** | User&#39;s browser type | [optional] [readonly]
**operating_system** | **string** | User&#39;s Operating System | [optional] [readonly]
**city** | **string** | City component of user location (derived from IP address) | [optional] [readonly]
**state** | **string** | State component of user location (derived from IP address) | [optional] [readonly]
**country** | **string** | Country component of user location (derived from IP address) | [optional] [readonly]
**credentials_type** | **string** | Type of credentials used for logging in this session | [optional] [readonly]
**extended_at** | **string** | Time when this session was last extended by the user | [optional] [readonly]
**extended_count** | **int** | Number of times this session was extended | [optional] [readonly]
**sudo_user_id** | **string** | Actual user in the case when this session represents one user sudo&#39;ing as another | [optional] [readonly]
**created_at** | **string** | Time when this session was initiated | [optional] [readonly]
**expires_at** | **string** | Time when this session will expire | [optional] [readonly]
**url** | **string** | Link to get this item | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # CreateQueryTask

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**query_id** | **string** | Id of query to run |
**result_format** | **string** | Desired async query result format. Valid values are: \&quot;inline_json\&quot;, \&quot;json\&quot;, \&quot;json_detail\&quot;, \&quot;json_fe\&quot;, \&quot;json_bi\&quot;, \&quot;csv\&quot;, \&quot;html\&quot;, \&quot;md\&quot;, \&quot;txt\&quot;, \&quot;xlsx\&quot;, \&quot;gsxml\&quot;, \&quot;sql\&quot;. |
**source** | **string** | Source of query task | [optional]
**deferred** | **bool** | Create the task but defer execution | [optional]
**look_id** | **string** | Id of look associated with query. | [optional]
**dashboard_id** | **string** | Id of dashboard associated with query. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

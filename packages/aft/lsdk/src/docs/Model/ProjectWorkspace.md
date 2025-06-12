# # ProjectWorkspace

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**project_id** | **string** | The id of the project | [optional] [readonly]
**workspace_id** | **string** | The id of the local workspace containing the project files | [optional] [readonly]
**git_status** | **string** | The status of the local git directory | [optional] [readonly]
**git_head** | **string** | Git head revision name | [optional] [readonly]
**dependency_status** | **string** | Status of the dependencies in your project. Valid values are: \&quot;lock_optional\&quot;, \&quot;lock_required\&quot;, \&quot;lock_error\&quot;, \&quot;install_none\&quot;. | [optional] [readonly]
**git_branch** | [**\OpenAPI\Client\Model\GitBranch**](GitBranch.md) |  | [optional]
**lookml_type** | **string** | The lookml syntax used by all files in this project | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

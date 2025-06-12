# # RepositoryCredential

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**root_project_id** | **string** | Root project Id | [optional] [readonly]
**remote_url** | **string** | Git remote repository url | [optional] [readonly]
**git_username** | **string** | Git username for HTTPS authentication. | [optional]
**git_password** | **string** | (Write-Only) Git password for HTTPS authentication. | [optional]
**ssh_public_key** | **string** | Public deploy key for SSH authentication. | [optional]
**is_configured** | **bool** | Whether the credentials have been configured for the Git Repository. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

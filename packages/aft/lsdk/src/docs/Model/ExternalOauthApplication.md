# # ExternalOauthApplication

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | ID of this OAuth Application | [optional] [readonly]
**name** | **string** | The name of this application.  For Snowflake connections, this should be the name of the host database. | [optional]
**client_id** | **string** | The OAuth Client ID for this application | [optional]
**client_secret** | **string** | (Write-Only) The OAuth Client Secret for this application | [optional]
**tenant_id** | **string** | The OAuth Tenant ID for this application | [optional]
**dialect_name** | **string** | The database dialect for this application. | [optional]
**created_at** | **\DateTime** | Creation time for this application | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

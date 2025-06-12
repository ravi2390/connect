# # LDAPConfigTestResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**details** | **string** | Additional details for error cases | [optional] [readonly]
**issues** | [**\OpenAPI\Client\Model\LDAPConfigTestIssue[]**](LDAPConfigTestIssue.md) | Array of issues/considerations about the result | [optional] [readonly]
**message** | **string** | Short human readable test about the result | [optional] [readonly]
**status** | **string** | Test status code: always &#39;success&#39; or &#39;error&#39; | [optional] [readonly]
**trace** | **string** | A more detailed trace of incremental results during auth tests | [optional] [readonly]
**user** | [**\OpenAPI\Client\Model\LDAPUser**](LDAPUser.md) |  | [optional]
**url** | **string** | Link to ldap config | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # EmbedSecret

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**algorithm** | **string** | Signing algorithm to use with this secret. Either &#x60;hmac/sha-256&#x60;(default) or &#x60;hmac/sha-1&#x60; | [optional]
**created_at** | **string** | When secret was created | [optional] [readonly]
**enabled** | **bool** | Is this secret currently enabled | [optional]
**id** | **string** | Unique Id | [optional] [readonly]
**secret** | **string** | Secret for use with SSO embedding | [optional] [readonly]
**user_id** | **string** | Id of user who created this secret | [optional] [readonly]
**secret_type** | **string** | Field to distinguish between SSO secrets and JWT secrets Valid values are: \&quot;SSO\&quot;, \&quot;JWT\&quot;. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

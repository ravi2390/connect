# # EmbedCookielessSessionAcquireResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**authentication_token** | **string** | One time token used to create or to attach to an embedded session in the Looker application server. | [optional]
**authentication_token_ttl** | **int** | Authentication token time to live in seconds. | [optional]
**navigation_token** | **string** | Token used to load and navigate between Looker pages. | [optional]
**navigation_token_ttl** | **int** | Navigation token time to live in seconds. | [optional]
**api_token** | **string** | Token to used to call Looker APIs. | [optional]
**api_token_ttl** | **int** | Api token time to live in seconds. | [optional]
**session_reference_token** | **string** | Token referencing the actual embed session. It is used to generate new api, navigation and authentication tokens. api and navigation tokens are short lived and must be refreshed regularly. A new authentication token must be acquired for each IFRAME that is created. The session_reference_token should be kept secure, ideally in the embed hosts application server. | [optional]
**session_reference_token_ttl** | **int** | Session reference token time to live in seconds. Note that this is the same as actual embed session. The session is expired when the value is set to zero. It is important to note that the generate token endpoint does NOT return an error when the embed session has expired. If an embedding application needs to monitor expiration of embed sessions, check this property for a value of zero. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

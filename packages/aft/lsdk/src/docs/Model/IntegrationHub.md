# # IntegrationHub

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | ID of the hub. | [optional] [readonly]
**url** | **string** | URL of the hub. | [optional]
**label** | **string** | Label of the hub. | [optional] [readonly]
**official** | **bool** | Whether this hub is a first-party integration hub operated by Looker. | [optional] [readonly]
**fetch_error_message** | **string** | An error message, present if the integration hub metadata could not be fetched. If this is present, the integration hub is unusable. | [optional] [readonly]
**authorization_token** | **string** | (Write-Only) An authorization key that will be sent to the integration hub on every request. | [optional]
**has_authorization_token** | **bool** | Whether the authorization_token is set for the hub. | [optional] [readonly]
**legal_agreement_signed** | **bool** | Whether the legal agreement message has been signed by the user. This only matters if legal_agreement_required is true. | [optional] [readonly]
**legal_agreement_required** | **bool** | Whether the legal terms for the integration hub are required before use. | [optional] [readonly]
**legal_agreement_text** | **string** | The legal agreement text for this integration hub. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

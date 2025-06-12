# # Setting

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**extension_framework_enabled** | **bool** | Toggle extension framework on or off | [optional]
**extension_load_url_enabled** | **bool** | (DEPRECATED) Toggle extension load url on or off. Do not use. This is temporary setting that will eventually become a noop and subsequently deleted. | [optional]
**marketplace_auto_install_enabled** | **bool** | (DEPRECATED) Toggle marketplace auto install on or off. Deprecated - do not use. Auto install can now be enabled via marketplace automation settings | [optional]
**marketplace_automation** | [**\OpenAPI\Client\Model\MarketplaceAutomation**](MarketplaceAutomation.md) |  | [optional]
**marketplace_enabled** | **bool** | Toggle marketplace on or off | [optional]
**marketplace_site** | **string** | Location of Looker marketplace CDN | [optional] [readonly]
**marketplace_terms_accepted** | **bool** | Accept marketplace terms by setting this value to true, or get the current status. Marketplace terms CANNOT be declined once accepted. Accepting marketplace terms automatically enables the marketplace. The marketplace can still be disabled after it has been enabled. | [optional]
**privatelabel_configuration** | [**\OpenAPI\Client\Model\PrivatelabelConfiguration**](PrivatelabelConfiguration.md) |  | [optional]
**custom_welcome_email** | [**\OpenAPI\Client\Model\CustomWelcomeEmail**](CustomWelcomeEmail.md) |  | [optional]
**onboarding_enabled** | **bool** | Toggle onboarding on or off | [optional]
**timezone** | **string** | Change instance-wide default timezone | [optional]
**allow_user_timezones** | **bool** | Toggle user-specific timezones on or off | [optional]
**data_connector_default_enabled** | **bool** | Toggle default future connectors on or off | [optional]
**host_url** | **string** | Change the base portion of your Looker instance URL setting | [optional]
**override_warnings** | **bool** | (Write-Only) If warnings are preventing a host URL change, this parameter allows for overriding warnings to force update the setting. Does not directly change any Looker settings. | [optional]
**email_domain_allowlist** | **string[]** | An array of Email Domain Allowlist of type string for Scheduled Content | [optional]
**embed_cookieless_v2** | **bool** | (DEPRECATED) Use embed_config.embed_cookieless_v2 instead. If embed_config.embed_cookieless_v2 is specified, it overrides this value. | [optional]
**embed_enabled** | **bool** | True if embedding is enabled https://cloud.google.com/looker/docs/r/looker-core-feature-embed, false otherwise | [optional] [readonly]
**embed_config** | [**\OpenAPI\Client\Model\EmbedConfig**](EmbedConfig.md) |  | [optional]
**login_notification_enabled** | **bool** | Login notification enabled | [optional] [readonly]
**login_notification_text** | **string** | Login notification text | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # EmbedConfig

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**domain_allowlist** | **string[]** | List of domains to allow for embedding | [optional]
**alert_url_allowlist** | **string[]** | List of base urls to allow for alert/schedule | [optional]
**alert_url_param_owner** | **string** | Owner of who defines the alert/schedule params on the base url | [optional]
**alert_url_label** | **string** | Label for the alert/schedule url | [optional]
**sso_auth_enabled** | **bool** | Is SSO embedding enabled for this Looker | [optional]
**embed_cookieless_v2** | **bool** | Is Cookieless embedding enabled for this Looker | [optional]
**embed_content_navigation** | **bool** | Is embed content navigation enabled for this looker | [optional]
**embed_content_management** | **bool** | Is embed content management enabled for this Looker | [optional]
**strict_sameorigin_for_login** | **bool** | When true, prohibits the use of Looker login pages in non-Looker iframes. When false, Looker login pages may be used in non-Looker hosted iframes. | [optional]
**look_filters** | **bool** | When true, filters are enabled on embedded Looks | [optional]
**hide_look_navigation** | **bool** | When true, removes navigation to Looks from embedded dashboards and explores. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

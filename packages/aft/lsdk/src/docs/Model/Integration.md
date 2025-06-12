# # Integration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | ID of the integration. | [optional] [readonly]
**integration_hub_id** | **string** | ID of the integration hub. | [optional] [readonly]
**label** | **string** | Label for the integration. | [optional] [readonly]
**description** | **string** | Description of the integration. | [optional] [readonly]
**enabled** | **bool** | Whether the integration is available to users. | [optional]
**params** | [**\OpenAPI\Client\Model\IntegrationParam[]**](IntegrationParam.md) | Array of params for the integration. | [optional]
**supported_formats** | **string[]** | A list of data formats the integration supports. If unspecified, the default is all data formats. Valid values are: \&quot;txt\&quot;, \&quot;csv\&quot;, \&quot;inline_json\&quot;, \&quot;json\&quot;, \&quot;json_label\&quot;, \&quot;json_detail\&quot;, \&quot;json_detail_lite_stream\&quot;, \&quot;json_bi\&quot;, \&quot;xlsx\&quot;, \&quot;html\&quot;, \&quot;wysiwyg_pdf\&quot;, \&quot;assembled_pdf\&quot;, \&quot;wysiwyg_png\&quot;, \&quot;csv_zip\&quot;. | [optional] [readonly]
**supported_action_types** | **string[]** | A list of action types the integration supports. Valid values are: \&quot;cell\&quot;, \&quot;query\&quot;, \&quot;dashboard\&quot;, \&quot;none\&quot;. | [optional] [readonly]
**supported_formattings** | **string[]** | A list of formatting options the integration supports. If unspecified, defaults to all formats. Valid values are: \&quot;formatted\&quot;, \&quot;unformatted\&quot;. | [optional] [readonly]
**supported_visualization_formattings** | **string[]** | A list of visualization formatting options the integration supports. If unspecified, defaults to all formats. Valid values are: \&quot;apply\&quot;, \&quot;noapply\&quot;. | [optional] [readonly]
**supported_download_settings** | **string[]** | A list of all the download mechanisms the integration supports. The order of values is not significant: Looker will select the most appropriate supported download mechanism for a given query. The integration must ensure it can handle any of the mechanisms it claims to support. If unspecified, this defaults to all download setting values. Valid values are: \&quot;push\&quot;, \&quot;url\&quot;. | [optional] [readonly]
**icon_url** | **string** | URL to an icon for the integration. | [optional] [readonly]
**uses_oauth** | **bool** | Whether the integration uses oauth. | [optional] [readonly]
**required_fields** | [**\OpenAPI\Client\Model\IntegrationRequiredField[]**](IntegrationRequiredField.md) | A list of descriptions of required fields that this integration is compatible with. If there are multiple entries in this list, the integration requires more than one field. If unspecified, no fields will be required. | [optional] [readonly]
**privacy_link** | **string** | Link to privacy policy for destination | [optional] [readonly]
**delegate_oauth** | **bool** | Whether the integration uses delegate oauth, which allows federation between an integration installation scope specific entity (like org, group, and team, etc.) and Looker. | [optional] [readonly]
**installed_delegate_oauth_targets** | **string[]** | Whether the integration is available to users. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

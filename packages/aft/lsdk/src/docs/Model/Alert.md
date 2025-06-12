# # Alert

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**applied_dashboard_filters** | [**\OpenAPI\Client\Model\AlertAppliedDashboardFilter[]**](AlertAppliedDashboardFilter.md) | Filters coming from the dashboard that are applied. Example &#x60;[{ \&quot;filter_title\&quot;: \&quot;Name\&quot;, \&quot;field_name\&quot;: \&quot;distribution_centers.name\&quot;, \&quot;filter_value\&quot;: \&quot;Los Angeles CA\&quot; }]&#x60; | [optional]
**comparison_type** | **string** | This property informs the check what kind of comparison we are performing. Only certain condition types are valid for time series alerts. For details, refer to [Setting Alert Conditions](https://cloud.google.com/looker/docs/sharing-and-publishing/creating-alerts#setting_alert_conditions) Valid values are: \&quot;EQUAL_TO\&quot;, \&quot;GREATER_THAN\&quot;, \&quot;GREATER_THAN_OR_EQUAL_TO\&quot;, \&quot;LESS_THAN\&quot;, \&quot;LESS_THAN_OR_EQUAL_TO\&quot;, \&quot;INCREASES_BY\&quot;, \&quot;DECREASES_BY\&quot;, \&quot;CHANGES_BY\&quot;. |
**cron** | **string** | Vixie-Style crontab specification when to run. At minimum, it has to be longer than 15 minute intervals |
**custom_url_base** | **string** | Domain for the custom url selected by the alert creator from the admin defined domain allowlist | [optional]
**custom_url_params** | **string** | Parameters and path for the custom url defined by the alert creator | [optional]
**custom_url_label** | **string** | Label for the custom url defined by the alert creator | [optional]
**show_custom_url** | **bool** | Boolean to determine if the custom url should be used | [optional]
**custom_title** | **string** | An optional, user-defined title for the alert | [optional]
**dashboard_element_id** | **string** | ID of the dashboard element associated with the alert. Refer to [dashboard_element()](#!/Dashboard/DashboardElement) | [optional]
**description** | **string** | An optional description for the alert. This supplements the title | [optional]
**destinations** | [**\OpenAPI\Client\Model\AlertDestination[]**](AlertDestination.md) | Array of destinations to send alerts to. Must be the same type of destination. Example &#x60;[{ \&quot;destination_type\&quot;: \&quot;EMAIL\&quot;, \&quot;email_address\&quot;: \&quot;test@test.com\&quot; }]&#x60; |
**field** | [**\OpenAPI\Client\Model\AlertField**](AlertField.md) |  |
**followed** | **bool** | Whether or not the user follows this alert. | [optional] [readonly]
**followable** | **bool** | Whether or not the alert is followable | [optional] [readonly]
**id** | **string** | ID of the alert | [optional] [readonly]
**is_disabled** | **bool** | Whether or not the alert is disabled | [optional]
**disabled_reason** | **string** | Reason for disabling alert | [optional]
**is_public** | **bool** | Whether or not the alert is public | [optional]
**investigative_content_type** | **string** | The type of the investigative content Valid values are: \&quot;dashboard\&quot;. | [optional]
**investigative_content_id** | **string** | The ID of the investigative content. For dashboards, this will be the dashboard ID | [optional]
**investigative_content_title** | **string** | The title of the investigative content. | [optional] [readonly]
**lookml_dashboard_id** | **string** | ID of the LookML dashboard associated with the alert | [optional]
**lookml_link_id** | **string** | ID of the LookML dashboard element associated with the alert | [optional]
**owner_id** | **string** | User id of alert owner |
**owner_display_name** | **string** | Alert owner&#39;s display name | [optional] [readonly]
**threshold** | **float** | Value of the alert threshold |
**time_series_condition_state** | [**\OpenAPI\Client\Model\AlertConditionState**](AlertConditionState.md) |  | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

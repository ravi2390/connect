# # DashboardElement

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**body_text** | **string** | Text tile body text | [optional]
**body_text_as_html** | **string** | Text tile body text as Html | [optional] [readonly]
**dashboard_id** | **string** | Id of Dashboard | [optional]
**edit_uri** | **string** | Relative path of URI of LookML file to edit the dashboard element (LookML dashboard only). | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**look** | [**\OpenAPI\Client\Model\LookWithQuery**](LookWithQuery.md) |  | [optional]
**look_id** | **string** | Id Of Look | [optional]
**lookml_link_id** | **string** | LookML link ID | [optional] [readonly]
**merge_result_id** | **string** | ID of merge result | [optional]
**note_display** | **string** | Note Display | [optional]
**note_state** | **string** | Note State | [optional]
**note_text** | **string** | Note Text | [optional]
**note_text_as_html** | **string** | Note Text as Html | [optional] [readonly]
**query** | [**\OpenAPI\Client\Model\Query**](Query.md) |  | [optional]
**query_id** | **string** | Id Of Query | [optional]
**refresh_interval** | **string** | Refresh Interval | [optional]
**refresh_interval_to_i** | **int** | Refresh Interval as integer | [optional] [readonly]
**result_maker** | [**\OpenAPI\Client\Model\ResultMakerWithIdVisConfigAndDynamicFields**](ResultMakerWithIdVisConfigAndDynamicFields.md) |  | [optional]
**result_maker_id** | **string** | ID of the ResultMakerLookup entry. | [optional]
**subtitle_text** | **string** | Text tile subtitle text | [optional]
**title** | **string** | Title of dashboard element | [optional]
**title_hidden** | **bool** | Whether title is hidden | [optional]
**title_text** | **string** | Text tile title | [optional]
**type** | **string** | Type | [optional]
**alert_count** | **int** | Count of Alerts associated to a dashboard element | [optional] [readonly]
**rich_content_json** | **string** | JSON with all the properties required for rich editor and buttons elements | [optional]
**title_text_as_html** | **string** | Text tile title text as Html | [optional] [readonly]
**subtitle_text_as_html** | **string** | Text tile subtitle text as Html | [optional] [readonly]
**extension_id** | **string** | Extension ID | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # DashboardBase

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**content_favorite_id** | **string** | Content Favorite Id | [optional] [readonly]
**content_metadata_id** | **string** | Id of content metadata | [optional] [readonly]
**description** | **string** | Description | [optional] [readonly]
**hidden** | **bool** | Is Hidden | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**model** | [**\OpenAPI\Client\Model\LookModel**](LookModel.md) |  | [optional]
**query_timezone** | **string** | Timezone in which the Dashboard will run by default. | [optional] [readonly]
**readonly** | **bool** | Is Read-only | [optional] [readonly]
**refresh_interval** | **string** | Refresh Interval, as a time duration phrase like \&quot;2 hours 30 minutes\&quot;. A number with no time units will be interpreted as whole seconds. | [optional] [readonly]
**refresh_interval_to_i** | **int** | Refresh Interval in milliseconds | [optional] [readonly]
**folder** | [**\OpenAPI\Client\Model\FolderBase**](FolderBase.md) |  | [optional]
**title** | **string** | Dashboard Title | [optional] [readonly]
**user_id** | **string** | Id of User | [optional] [readonly]
**slug** | **string** | Content Metadata Slug | [optional] [readonly]
**preferred_viewer** | **string** | The preferred route for viewing this dashboard (ie: dashboards or dashboards-next) | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # Look

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**content_metadata_id** | **string** | Id of content metadata | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**title** | **string** | Look Title | [optional]
**user_id** | **string** | User Id | [optional]
**content_favorite_id** | **string** | Content Favorite Id | [optional] [readonly]
**created_at** | **\DateTime** | Time that the Look was created. | [optional] [readonly]
**deleted** | **bool** | Whether or not a look is &#39;soft&#39; deleted. | [optional]
**deleted_at** | **\DateTime** | Time that the Look was deleted. | [optional] [readonly]
**deleter_id** | **string** | Id of User that deleted the look. | [optional] [readonly]
**description** | **string** | Description | [optional]
**embed_url** | **string** | Embed Url | [optional] [readonly]
**excel_file_url** | **string** | Excel File Url | [optional] [readonly]
**favorite_count** | **int** | Number of times favorited | [optional] [readonly]
**google_spreadsheet_formula** | **string** | Google Spreadsheet Formula | [optional] [readonly]
**image_embed_url** | **string** | Image Embed Url | [optional] [readonly]
**is_run_on_load** | **bool** | auto-run query when Look viewed | [optional]
**last_accessed_at** | **\DateTime** | Time that the Look was last accessed by any user | [optional] [readonly]
**last_updater_id** | **string** | Id of User that last updated the look. | [optional] [readonly]
**last_viewed_at** | **\DateTime** | Time last viewed in the Looker web UI | [optional] [readonly]
**model** | [**\OpenAPI\Client\Model\LookModel**](LookModel.md) |  | [optional]
**public** | **bool** | Is Public | [optional]
**public_slug** | **string** | Public Slug | [optional] [readonly]
**public_url** | **string** | Public Url | [optional] [readonly]
**query_id** | **string** | Query Id | [optional]
**short_url** | **string** | Short Url | [optional] [readonly]
**folder** | [**\OpenAPI\Client\Model\FolderBase**](FolderBase.md) |  | [optional]
**folder_id** | **string** | Folder Id | [optional]
**updated_at** | **\DateTime** | Time that the Look was updated. | [optional] [readonly]
**view_count** | **int** | Number of times viewed in the Looker web UI | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

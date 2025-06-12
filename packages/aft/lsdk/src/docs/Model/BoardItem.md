# # BoardItem

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**content_created_by** | **string** | Name of user who created the content this item is based on | [optional] [readonly]
**content_favorite_id** | **string** | Content favorite id associated with the item this content is based on | [optional] [readonly]
**content_metadata_id** | **string** | Content metadata id associated with the item this content is based on | [optional] [readonly]
**content_updated_at** | **string** | Last time the content that this item is based on was updated | [optional] [readonly]
**custom_description** | **string** | Custom description entered by the user, if present | [optional]
**custom_title** | **string** | Custom title entered by the user, if present | [optional]
**custom_url** | **string** | Custom url entered by the user, if present | [optional]
**dashboard_id** | **string** | Dashboard to base this item on | [optional]
**description** | **string** | The actual description for display | [optional] [readonly]
**favorite_count** | **int** | Number of times content has been favorited, if present | [optional] [readonly]
**board_section_id** | **string** | Associated Board Section | [optional]
**id** | **string** | Unique Id | [optional] [readonly]
**image_url** | **string** | The actual image_url for display | [optional] [readonly]
**location** | **string** | The container folder name of the content | [optional] [readonly]
**look_id** | **string** | Look to base this item on | [optional]
**lookml_dashboard_id** | **string** | LookML Dashboard to base this item on | [optional]
**order** | **int** | An arbitrary integer representing the sort order within the section | [optional]
**title** | **string** | The actual title for display | [optional] [readonly]
**url** | **string** | Relative url for the associated content | [optional] [readonly]
**use_custom_description** | **bool** | Whether the custom description should be used instead of the content description, if the item is associated with content | [optional]
**use_custom_title** | **bool** | Whether the custom title should be used instead of the content title, if the item is associated with content | [optional]
**use_custom_url** | **bool** | Whether the custom url should be used instead of the content url, if the item is associated with content | [optional]
**view_count** | **int** | Number of times content has been viewed, if present | [optional] [readonly]
**custom_image_data_base64** | **string** | (Write-Only) base64 encoded image data | [optional]
**custom_image_url** | **string** | Custom image_url entered by the user, if present | [optional] [readonly]
**use_custom_image** | **bool** | Whether the custom image should be used instead of the content image, if the item is associated with content | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

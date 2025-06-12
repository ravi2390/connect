# # Board

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**content_metadata_id** | **string** | Id of associated content_metadata record | [optional] [readonly]
**created_at** | **\DateTime** | Date of board creation | [optional] [readonly]
**deleted_at** | **\DateTime** | Date of board deletion | [optional]
**description** | **string** | Description of the board | [optional]
**board_sections** | [**\OpenAPI\Client\Model\BoardSection[]**](BoardSection.md) | Sections of the board | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**section_order** | **string[]** | ids of the board sections in the order they should be displayed | [optional]
**title** | **string** | Title of the board | [optional]
**updated_at** | **\DateTime** | Date of last board update | [optional] [readonly]
**user_id** | **string** | User id of board creator | [optional] [readonly]
**primary_homepage** | **bool** | Whether the board is the primary homepage or not | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

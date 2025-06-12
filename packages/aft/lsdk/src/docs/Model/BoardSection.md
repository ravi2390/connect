# # BoardSection

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**created_at** | **\DateTime** | Time at which this section was created. | [optional] [readonly]
**deleted_at** | **\DateTime** | Time at which this section was deleted. | [optional]
**description** | **string** | Description of the content found in this section. | [optional]
**board_id** | **string** | Id reference to parent board | [optional]
**board_items** | [**\OpenAPI\Client\Model\BoardItem[]**](BoardItem.md) | Items in the board section | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**item_order** | **string[]** | ids of the board items in the order they should be displayed | [optional]
**visible_item_order** | **string[]** | ids of the homepage items the user can see in the order they should be displayed | [optional] [readonly]
**title** | **string** | Name of row | [optional]
**updated_at** | **\DateTime** | Time at which this section was last updated. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

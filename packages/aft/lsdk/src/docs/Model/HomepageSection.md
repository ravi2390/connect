# # HomepageSection

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**created_at** | **\DateTime** | Time at which this section was created. | [optional] [readonly]
**deleted_at** | **\DateTime** | Time at which this section was deleted. | [optional]
**detail_url** | **string** | A URL pointing to a page showing further information about the content in the section. | [optional] [readonly]
**homepage_id** | **string** | Id reference to parent homepage | [optional]
**homepage_items** | [**\OpenAPI\Client\Model\HomepageItem[]**](HomepageItem.md) | Items in the homepage section | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**is_header** | **bool** | Is this a header section (has no items) | [optional] [readonly]
**item_order** | **string[]** | ids of the homepage items in the order they should be displayed | [optional]
**title** | **string** | Name of row | [optional]
**updated_at** | **\DateTime** | Time at which this section was last updated. | [optional] [readonly]
**description** | **string** | Description of the content found in this section. | [optional]
**visible_item_order** | **string[]** | ids of the homepage items the user can see in the order they should be displayed | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

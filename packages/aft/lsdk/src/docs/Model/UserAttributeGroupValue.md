# # UserAttributeGroupValue

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id of this group-attribute relation | [optional] [readonly]
**group_id** | **string** | Id of group | [optional] [readonly]
**user_attribute_id** | **string** | Id of user attribute | [optional] [readonly]
**value_is_hidden** | **bool** | If true, the \&quot;value\&quot; field will be null, because the attribute settings block access to this value | [optional] [readonly]
**rank** | **int** | Precedence for resolving value for user | [optional] [readonly]
**value** | **string** | Value of user attribute for group | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

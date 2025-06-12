# # UserAttributeWithValue

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**name** | **string** | Name of user attribute | [optional] [readonly]
**label** | **string** | Human-friendly label for user attribute | [optional] [readonly]
**rank** | **int** | Precedence for setting value on user (lowest wins) | [optional] [readonly]
**value** | **string** | Value of attribute for user | [optional]
**user_id** | **string** | Id of User | [optional] [readonly]
**user_can_edit** | **bool** | Can the user set this value | [optional] [readonly]
**value_is_hidden** | **bool** | If true, the \&quot;value\&quot; field will be null, because the attribute settings block access to this value | [optional] [readonly]
**user_attribute_id** | **string** | Id of User Attribute | [optional] [readonly]
**source** | **string** | How user got this value for this attribute | [optional] [readonly]
**hidden_value_domain_whitelist** | **string** | If this user attribute is hidden, allowed list of destinations to which it may be sent. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

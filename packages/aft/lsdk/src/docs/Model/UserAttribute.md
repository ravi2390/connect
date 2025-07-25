# # UserAttribute

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**name** | **string** | Name of user attribute |
**label** | **string** | Human-friendly label for user attribute |
**type** | **string** | Type of user attribute (\&quot;string\&quot;, \&quot;number\&quot;, \&quot;datetime\&quot;, \&quot;yesno\&quot;, \&quot;zipcode\&quot;, \&quot;advanced_filter_string\&quot;, \&quot;advanced_filter_number\&quot;) |
**default_value** | **string** | Default value for when no value is set on the user | [optional]
**is_system** | **bool** | Attribute is a system default | [optional] [readonly]
**is_permanent** | **bool** | Attribute is permanent and cannot be deleted | [optional] [readonly]
**value_is_hidden** | **bool** | If true, users will not be able to view values of this attribute | [optional]
**user_can_view** | **bool** | Non-admin users can see the values of their attributes and use them in filters | [optional]
**user_can_edit** | **bool** | Users can change the value of this attribute for themselves | [optional]
**hidden_value_domain_whitelist** | **string** | Destinations to which a hidden attribute may be sent. Once set, cannot be edited. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

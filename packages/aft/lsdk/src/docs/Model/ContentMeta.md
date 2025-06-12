# # ContentMeta

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**name** | **string** | Name or title of underlying content | [optional] [readonly]
**parent_id** | **string** | Id of Parent Content | [optional] [readonly]
**dashboard_id** | **string** | Id of associated dashboard when content_type is \&quot;dashboard\&quot; | [optional] [readonly]
**look_id** | **string** | Id of associated look when content_type is \&quot;look\&quot; | [optional] [readonly]
**folder_id** | **string** | Id of associated folder when content_type is \&quot;space\&quot; | [optional] [readonly]
**content_type** | **string** | Content Type (\&quot;dashboard\&quot;, \&quot;look\&quot;, or \&quot;folder\&quot;) | [optional] [readonly]
**inherits** | **bool** | Whether content inherits its access levels from parent | [optional]
**inheriting_id** | **string** | Id of Inherited Content | [optional] [readonly]
**slug** | **string** | Content Slug | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

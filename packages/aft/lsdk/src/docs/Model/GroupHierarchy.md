# # GroupHierarchy

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**can_add_to_content_metadata** | **bool** | Group can be used in content access controls | [optional]
**contains_current_user** | **bool** | Currently logged in user is group member | [optional] [readonly]
**external_group_id** | **string** | External Id group if embed group | [optional] [readonly]
**externally_managed** | **bool** | Group membership controlled outside of Looker | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**include_by_default** | **bool** | New users are added to this group by default | [optional] [readonly]
**name** | **string** | Name of group | [optional]
**user_count** | **int** | Number of users included in this group | [optional] [readonly]
**parent_group_ids** | **string[]** | IDs of parents of this group | [optional] [readonly]
**role_ids** | **string[]** | Role IDs assigned to group | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

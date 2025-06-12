# # GitBranch

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**name** | **string** | The short name on the local. Updating &#x60;name&#x60; results in &#x60;git checkout &lt;new_name&gt;&#x60; | [optional]
**remote** | **string** | The name of the remote | [optional] [readonly]
**remote_name** | **string** | The short name on the remote | [optional] [readonly]
**error** | **string** | Name of error | [optional] [readonly]
**message** | **string** | Message describing an error if present | [optional] [readonly]
**owner_name** | **string** | Name of the owner of a personal branch | [optional] [readonly]
**readonly** | **bool** | Whether or not this branch is readonly | [optional] [readonly]
**personal** | **bool** | Whether or not this branch is a personal branch - readonly for all developers except the owner | [optional] [readonly]
**is_local** | **bool** | Whether or not a local ref exists for the branch | [optional] [readonly]
**is_remote** | **bool** | Whether or not a remote ref exists for the branch | [optional] [readonly]
**is_production** | **bool** | Whether or not this is the production branch | [optional] [readonly]
**ahead_count** | **int** | Number of commits the local branch is ahead of the remote | [optional] [readonly]
**behind_count** | **int** | Number of commits the local branch is behind the remote | [optional] [readonly]
**commit_at** | **int** | UNIX timestamp at which this branch was last committed. | [optional] [readonly]
**ref** | **string** | The resolved ref of this branch. Updating &#x60;ref&#x60; results in &#x60;git reset --hard &lt;new_ref&gt;&#x60;&#x60;. | [optional]
**remote_ref** | **string** | The resolved ref of this branch remote. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

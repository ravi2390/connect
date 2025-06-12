# # ProjectFile

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | An opaque token uniquely identifying a file within a project. Avoid parsing or decomposing the text of this token. This token is stable within a Looker release but may change between Looker releases | [optional] [readonly]
**path** | **string** | Path, file name, and extension of the file relative to the project root directory | [optional] [readonly]
**title** | **string** | Display name | [optional] [readonly]
**type** | **string** | File type: model, view, etc | [optional] [readonly]
**extension** | **string** | The extension of the file: .view.lkml, .model.lkml, etc | [optional] [readonly]
**mime_type** | **string** | File mime type | [optional] [readonly]
**editable** | **bool** | State of editability for the file. | [optional] [readonly]
**git_status** | [**\OpenAPI\Client\Model\GitStatus**](GitStatus.md) |  | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # Artifact

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **string** | Key of value to store. Namespace + Key must be unique. |
**value** | **string** | Value to store. |
**content_type** | **string** | MIME type of content. This can only be used to override content that is detected as text/plain. Needed to set application/json content types, which are analyzed as plain text. | [optional]
**version** | **int** | Version number of the stored value. The version must be provided for any updates to an existing artifact. | [optional] [readonly]
**namespace** | **string** | Artifact storage namespace. | [readonly]
**created_at** | **\DateTime** | Timestamp when this artifact was created. | [readonly]
**updated_at** | **\DateTime** | Timestamp when this artifact was updated. | [readonly]
**value_size** | **int** | Size (in bytes) of the stored value. | [readonly]
**created_by_userid** | **string** | User id of the artifact creator. | [readonly]
**updated_by_userid** | **string** | User id of the artifact updater. | [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

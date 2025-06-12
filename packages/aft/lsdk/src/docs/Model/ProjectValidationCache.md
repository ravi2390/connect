# # ProjectValidationCache

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**errors** | [**\OpenAPI\Client\Model\ProjectError[]**](ProjectError.md) | A list of project errors | [optional] [readonly]
**project_digest** | **string** | A hash value computed from the project&#39;s current state | [optional] [readonly]
**models_not_validated** | [**\OpenAPI\Client\Model\ModelsNotValidated[]**](ModelsNotValidated.md) | A list of models which were not fully validated | [optional] [readonly]
**computation_time** | **float** | Duration of project validation in seconds | [optional] [readonly]
**stale** | **bool** | If true, the cached project validation results are no longer accurate because the project has changed since the cached results were calculated | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

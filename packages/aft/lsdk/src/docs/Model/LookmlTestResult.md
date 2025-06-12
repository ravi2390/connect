# # LookmlTestResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**model_name** | **string** | Name of model containing this test. | [optional] [readonly]
**test_name** | **string** | Name of this test. | [optional] [readonly]
**assertions_count** | **int** | Number of assertions in this test | [optional] [readonly]
**assertions_failed** | **int** | Number of assertions passed in this test | [optional] [readonly]
**errors** | [**\OpenAPI\Client\Model\ProjectError[]**](ProjectError.md) | A list of any errors encountered by the test. | [optional] [readonly]
**warnings** | [**\OpenAPI\Client\Model\ProjectError[]**](ProjectError.md) | A list of any warnings encountered by the test. | [optional] [readonly]
**success** | **bool** | True if this test passsed without errors. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

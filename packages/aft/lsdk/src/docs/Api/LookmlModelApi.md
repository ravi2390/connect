# OpenAPI\Client\LookmlModelApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allLookmlModels()**](LookmlModelApi.md#allLookmlModels) | **GET** /lookml_models | Get All LookML Models |
| [**createLookmlModel()**](LookmlModelApi.md#createLookmlModel) | **POST** /lookml_models | Create LookML Model |
| [**deleteLookmlModel()**](LookmlModelApi.md#deleteLookmlModel) | **DELETE** /lookml_models/{lookml_model_name} | Delete LookML Model |
| [**lookmlModel()**](LookmlModelApi.md#lookmlModel) | **GET** /lookml_models/{lookml_model_name} | Get LookML Model |
| [**lookmlModelExplore()**](LookmlModelApi.md#lookmlModelExplore) | **GET** /lookml_models/{lookml_model_name}/explores/{explore_name} | Get LookML Model Explore |
| [**updateLookmlModel()**](LookmlModelApi.md#updateLookmlModel) | **PATCH** /lookml_models/{lookml_model_name} | Update LookML Model |


## `allLookmlModels()`

```php
allLookmlModels($fields, $limit, $offset): \OpenAPI\Client\Model\LookmlModel[]
```

Get All LookML Models

### Get information about all lookml models.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\LookmlModelApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return. (can be used with offset)
$offset = 56; // int | Number of results to skip before returning any. (Defaults to 0 if not set when limit is used)

try {
    $result = $apiInstance->allLookmlModels($fields, $limit, $offset);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling LookmlModelApi->allLookmlModels: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return. (can be used with offset) | [optional] |
| **offset** | **int**| Number of results to skip before returning any. (Defaults to 0 if not set when limit is used) | [optional] |

### Return type

[**\OpenAPI\Client\Model\LookmlModel[]**](../Model/LookmlModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createLookmlModel()`

```php
createLookmlModel($lookml_model): \OpenAPI\Client\Model\LookmlModel
```

Create LookML Model

### Create a lookml model using the specified configuration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\LookmlModelApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_model = new \OpenAPI\Client\Model\LookmlModel(); // \OpenAPI\Client\Model\LookmlModel | LookML Model

try {
    $result = $apiInstance->createLookmlModel($lookml_model);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling LookmlModelApi->createLookmlModel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_model** | [**\OpenAPI\Client\Model\LookmlModel**](../Model/LookmlModel.md)| LookML Model | |

### Return type

[**\OpenAPI\Client\Model\LookmlModel**](../Model/LookmlModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteLookmlModel()`

```php
deleteLookmlModel($lookml_model_name): string
```

Delete LookML Model

### Delete a lookml model.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\LookmlModelApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_model_name = 'lookml_model_name_example'; // string | Name of lookml model.

try {
    $result = $apiInstance->deleteLookmlModel($lookml_model_name);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling LookmlModelApi->deleteLookmlModel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_model_name** | **string**| Name of lookml model. | |

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `lookmlModel()`

```php
lookmlModel($lookml_model_name, $fields): \OpenAPI\Client\Model\LookmlModel
```

Get LookML Model

### Get information about a lookml model.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\LookmlModelApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_model_name = 'lookml_model_name_example'; // string | Name of lookml model.
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->lookmlModel($lookml_model_name, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling LookmlModelApi->lookmlModel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_model_name** | **string**| Name of lookml model. | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\LookmlModel**](../Model/LookmlModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `lookmlModelExplore()`

```php
lookmlModelExplore($lookml_model_name, $explore_name, $fields, $add_drills_metadata): \OpenAPI\Client\Model\LookmlModelExplore
```

Get LookML Model Explore

### Get information about a lookml model explore.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\LookmlModelApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_model_name = 'lookml_model_name_example'; // string | Name of lookml model.
$explore_name = 'explore_name_example'; // string | Name of explore.
$fields = 'fields_example'; // string | Requested fields.
$add_drills_metadata = True; // bool | Whether response should include drill field metadata.

try {
    $result = $apiInstance->lookmlModelExplore($lookml_model_name, $explore_name, $fields, $add_drills_metadata);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling LookmlModelApi->lookmlModelExplore: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_model_name** | **string**| Name of lookml model. | |
| **explore_name** | **string**| Name of explore. | |
| **fields** | **string**| Requested fields. | [optional] |
| **add_drills_metadata** | **bool**| Whether response should include drill field metadata. | [optional] |

### Return type

[**\OpenAPI\Client\Model\LookmlModelExplore**](../Model/LookmlModelExplore.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateLookmlModel()`

```php
updateLookmlModel($lookml_model_name, $lookml_model): \OpenAPI\Client\Model\LookmlModel
```

Update LookML Model

### Update a lookml model using the specified configuration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\LookmlModelApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_model_name = 'lookml_model_name_example'; // string | Name of lookml model.
$lookml_model = new \OpenAPI\Client\Model\LookmlModel(); // \OpenAPI\Client\Model\LookmlModel | LookML Model

try {
    $result = $apiInstance->updateLookmlModel($lookml_model_name, $lookml_model);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling LookmlModelApi->updateLookmlModel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_model_name** | **string**| Name of lookml model. | |
| **lookml_model** | [**\OpenAPI\Client\Model\LookmlModel**](../Model/LookmlModel.md)| LookML Model | |

### Return type

[**\OpenAPI\Client\Model\LookmlModel**](../Model/LookmlModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

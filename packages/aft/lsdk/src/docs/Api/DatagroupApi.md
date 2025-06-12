# OpenAPI\Client\DatagroupApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allDatagroups()**](DatagroupApi.md#allDatagroups) | **GET** /datagroups | Get All Datagroups |
| [**datagroup()**](DatagroupApi.md#datagroup) | **GET** /datagroups/{datagroup_id} | Get Datagroup |
| [**updateDatagroup()**](DatagroupApi.md#updateDatagroup) | **PATCH** /datagroups/{datagroup_id} | Update Datagroup |


## `allDatagroups()`

```php
allDatagroups(): \OpenAPI\Client\Model\Datagroup[]
```

Get All Datagroups

### Get information about all datagroups.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DatagroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->allDatagroups();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DatagroupApi->allDatagroups: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\Datagroup[]**](../Model/Datagroup.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `datagroup()`

```php
datagroup($datagroup_id): \OpenAPI\Client\Model\Datagroup
```

Get Datagroup

### Get information about a datagroup.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DatagroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$datagroup_id = 'datagroup_id_example'; // string | ID of datagroup.

try {
    $result = $apiInstance->datagroup($datagroup_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DatagroupApi->datagroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **datagroup_id** | **string**| ID of datagroup. | |

### Return type

[**\OpenAPI\Client\Model\Datagroup**](../Model/Datagroup.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDatagroup()`

```php
updateDatagroup($datagroup_id, $datagroup): \OpenAPI\Client\Model\Datagroup
```

Update Datagroup

### Update a datagroup using the specified params.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DatagroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$datagroup_id = 'datagroup_id_example'; // string | ID of datagroup.
$datagroup = new \OpenAPI\Client\Model\Datagroup(); // \OpenAPI\Client\Model\Datagroup | Datagroup

try {
    $result = $apiInstance->updateDatagroup($datagroup_id, $datagroup);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DatagroupApi->updateDatagroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **datagroup_id** | **string**| ID of datagroup. | |
| **datagroup** | [**\OpenAPI\Client\Model\Datagroup**](../Model/Datagroup.md)| Datagroup | |

### Return type

[**\OpenAPI\Client\Model\Datagroup**](../Model/Datagroup.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

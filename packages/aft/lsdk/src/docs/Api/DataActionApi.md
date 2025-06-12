# OpenAPI\Client\DataActionApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**fetchRemoteDataActionForm()**](DataActionApi.md#fetchRemoteDataActionForm) | **POST** /data_actions/form | Fetch Remote Data Action Form |
| [**performDataAction()**](DataActionApi.md#performDataAction) | **POST** /data_actions | Send a Data Action |


## `fetchRemoteDataActionForm()`

```php
fetchRemoteDataActionForm($request_body): \OpenAPI\Client\Model\DataActionForm
```

Fetch Remote Data Action Form

For some data actions, the remote server may supply a form requesting further user input. This endpoint takes a data action, asks the remote server to generate a form for it, and returns that form to you for presentation to the user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DataActionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$request_body = array('key' => 'request_body_example'); // array<string,string> | Data Action Request

try {
    $result = $apiInstance->fetchRemoteDataActionForm($request_body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DataActionApi->fetchRemoteDataActionForm: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **request_body** | [**array<string,string>**](../Model/string.md)| Data Action Request | |

### Return type

[**\OpenAPI\Client\Model\DataActionForm**](../Model/DataActionForm.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `performDataAction()`

```php
performDataAction($data_action_request): \OpenAPI\Client\Model\DataActionResponse
```

Send a Data Action

Perform a data action. The data action object can be obtained from query results, and used to perform an arbitrary action.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DataActionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$data_action_request = new \OpenAPI\Client\Model\DataActionRequest(); // \OpenAPI\Client\Model\DataActionRequest | Data Action Request

try {
    $result = $apiInstance->performDataAction($data_action_request);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DataActionApi->performDataAction: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **data_action_request** | [**\OpenAPI\Client\Model\DataActionRequest**](../Model/DataActionRequest.md)| Data Action Request | |

### Return type

[**\OpenAPI\Client\Model\DataActionResponse**](../Model/DataActionResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

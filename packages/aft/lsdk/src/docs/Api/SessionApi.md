# OpenAPI\Client\SessionApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**session()**](SessionApi.md#session) | **GET** /session | Get Auth |
| [**updateSession()**](SessionApi.md#updateSession) | **PATCH** /session | Update Auth |


## `session()`

```php
session(): \OpenAPI\Client\Model\ApiSession
```

Get Auth

### Get API Session  Returns information about the current API session, such as which workspace is selected for the session.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\SessionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->session();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SessionApi->session: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\ApiSession**](../Model/ApiSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateSession()`

```php
updateSession($api_session): \OpenAPI\Client\Model\ApiSession
```

Update Auth

### Update API Session  #### API Session Workspace  You can use this endpoint to change the active workspace for the current API session.  Only one workspace can be active in a session. The active workspace can be changed any number of times in a session.  The default workspace for API sessions is the \"production\" workspace.  All Looker APIs that use projects or lookml models (such as running queries) will use the version of project and model files defined by this workspace for the lifetime of the current API session or until the session workspace is changed again.  An API session has the same lifetime as the access_token used to authenticate API requests. Each successful API login generates a new access_token and a new API session.  If your Looker API client application needs to work in a dev workspace across multiple API sessions, be sure to select the dev workspace after each login.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\SessionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$api_session = new \OpenAPI\Client\Model\ApiSession(); // \OpenAPI\Client\Model\ApiSession | Auth

try {
    $result = $apiInstance->updateSession($api_session);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SessionApi->updateSession: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **api_session** | [**\OpenAPI\Client\Model\ApiSession**](../Model/ApiSession.md)| Auth | |

### Return type

[**\OpenAPI\Client\Model\ApiSession**](../Model/ApiSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

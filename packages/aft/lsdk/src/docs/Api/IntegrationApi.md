# OpenAPI\Client\IntegrationApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**acceptIntegrationHubLegalAgreement()**](IntegrationApi.md#acceptIntegrationHubLegalAgreement) | **POST** /integration_hubs/{integration_hub_id}/accept_legal_agreement | Accept Integration Hub Legal Agreement |
| [**allIntegrationHubs()**](IntegrationApi.md#allIntegrationHubs) | **GET** /integration_hubs | Get All Integration Hubs |
| [**allIntegrations()**](IntegrationApi.md#allIntegrations) | **GET** /integrations | Get All Integrations |
| [**createIntegrationHub()**](IntegrationApi.md#createIntegrationHub) | **POST** /integration_hubs | Create Integration Hub |
| [**deleteIntegrationHub()**](IntegrationApi.md#deleteIntegrationHub) | **DELETE** /integration_hubs/{integration_hub_id} | Delete Integration Hub |
| [**fetchIntegrationForm()**](IntegrationApi.md#fetchIntegrationForm) | **POST** /integrations/{integration_id}/form | Fetch Remote Integration Form |
| [**integration()**](IntegrationApi.md#integration) | **GET** /integrations/{integration_id} | Get Integration |
| [**integrationHub()**](IntegrationApi.md#integrationHub) | **GET** /integration_hubs/{integration_hub_id} | Get Integration Hub |
| [**testIntegration()**](IntegrationApi.md#testIntegration) | **POST** /integrations/{integration_id}/test | Test integration |
| [**updateIntegration()**](IntegrationApi.md#updateIntegration) | **PATCH** /integrations/{integration_id} | Update Integration |
| [**updateIntegrationHub()**](IntegrationApi.md#updateIntegrationHub) | **PATCH** /integration_hubs/{integration_hub_id} | Update Integration Hub |


## `acceptIntegrationHubLegalAgreement()`

```php
acceptIntegrationHubLegalAgreement($integration_hub_id): \OpenAPI\Client\Model\IntegrationHub
```

Accept Integration Hub Legal Agreement

Accepts the legal agreement for a given integration hub. This only works for integration hubs that have legal_agreement_required set to true and legal_agreement_signed set to false.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_hub_id = 'integration_hub_id_example'; // string | Id of integration_hub

try {
    $result = $apiInstance->acceptIntegrationHubLegalAgreement($integration_hub_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->acceptIntegrationHubLegalAgreement: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_hub_id** | **string**| Id of integration_hub | |

### Return type

[**\OpenAPI\Client\Model\IntegrationHub**](../Model/IntegrationHub.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allIntegrationHubs()`

```php
allIntegrationHubs($fields): \OpenAPI\Client\Model\IntegrationHub[]
```

Get All Integration Hubs

### Get information about all Integration Hubs.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allIntegrationHubs($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->allIntegrationHubs: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\IntegrationHub[]**](../Model/IntegrationHub.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allIntegrations()`

```php
allIntegrations($fields, $integration_hub_id): \OpenAPI\Client\Model\Integration[]
```

Get All Integrations

### Get information about all Integrations.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$integration_hub_id = 'integration_hub_id_example'; // string | Filter to a specific provider

try {
    $result = $apiInstance->allIntegrations($fields, $integration_hub_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->allIntegrations: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **integration_hub_id** | **string**| Filter to a specific provider | [optional] |

### Return type

[**\OpenAPI\Client\Model\Integration[]**](../Model/Integration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createIntegrationHub()`

```php
createIntegrationHub($integration_hub, $fields): \OpenAPI\Client\Model\IntegrationHub
```

Create Integration Hub

### Create a new Integration Hub.  This API is rate limited to prevent it from being used for SSRF attacks

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_hub = new \OpenAPI\Client\Model\IntegrationHub(); // \OpenAPI\Client\Model\IntegrationHub | Integration Hub
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createIntegrationHub($integration_hub, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->createIntegrationHub: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_hub** | [**\OpenAPI\Client\Model\IntegrationHub**](../Model/IntegrationHub.md)| Integration Hub | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\IntegrationHub**](../Model/IntegrationHub.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteIntegrationHub()`

```php
deleteIntegrationHub($integration_hub_id): string
```

Delete Integration Hub

### Delete a Integration Hub.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_hub_id = 'integration_hub_id_example'; // string | Id of integration_hub

try {
    $result = $apiInstance->deleteIntegrationHub($integration_hub_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->deleteIntegrationHub: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_hub_id** | **string**| Id of integration_hub | |

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

## `fetchIntegrationForm()`

```php
fetchIntegrationForm($integration_id, $request_body): \OpenAPI\Client\Model\DataActionForm
```

Fetch Remote Integration Form

Returns the Integration form for presentation to the user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_id = 'integration_id_example'; // string | Id of integration
$request_body = array('key' => 'request_body_example'); // array<string,string> | Integration Form Request

try {
    $result = $apiInstance->fetchIntegrationForm($integration_id, $request_body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->fetchIntegrationForm: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_id** | **string**| Id of integration | |
| **request_body** | [**array<string,string>**](../Model/string.md)| Integration Form Request | [optional] |

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

## `integration()`

```php
integration($integration_id, $fields): \OpenAPI\Client\Model\Integration
```

Get Integration

### Get information about a Integration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_id = 'integration_id_example'; // string | Id of integration
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->integration($integration_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->integration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_id** | **string**| Id of integration | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Integration**](../Model/Integration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `integrationHub()`

```php
integrationHub($integration_hub_id, $fields): \OpenAPI\Client\Model\IntegrationHub
```

Get Integration Hub

### Get information about a Integration Hub.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_hub_id = 'integration_hub_id_example'; // string | Id of integration_hub
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->integrationHub($integration_hub_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->integrationHub: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_hub_id** | **string**| Id of integration_hub | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\IntegrationHub**](../Model/IntegrationHub.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testIntegration()`

```php
testIntegration($integration_id): \OpenAPI\Client\Model\IntegrationTestResult
```

Test integration

Tests the integration to make sure all the settings are working.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_id = 'integration_id_example'; // string | Id of integration

try {
    $result = $apiInstance->testIntegration($integration_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->testIntegration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_id** | **string**| Id of integration | |

### Return type

[**\OpenAPI\Client\Model\IntegrationTestResult**](../Model/IntegrationTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateIntegration()`

```php
updateIntegration($integration_id, $integration, $fields): \OpenAPI\Client\Model\Integration
```

Update Integration

### Update parameters on a Integration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_id = 'integration_id_example'; // string | Id of integration
$integration = new \OpenAPI\Client\Model\Integration(); // \OpenAPI\Client\Model\Integration | Integration
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateIntegration($integration_id, $integration, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->updateIntegration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_id** | **string**| Id of integration | |
| **integration** | [**\OpenAPI\Client\Model\Integration**](../Model/Integration.md)| Integration | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Integration**](../Model/Integration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateIntegrationHub()`

```php
updateIntegrationHub($integration_hub_id, $integration_hub, $fields): \OpenAPI\Client\Model\IntegrationHub
```

Update Integration Hub

### Update a Integration Hub definition.  This API is rate limited to prevent it from being used for SSRF attacks

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\IntegrationApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$integration_hub_id = 'integration_hub_id_example'; // string | Id of integration_hub
$integration_hub = new \OpenAPI\Client\Model\IntegrationHub(); // \OpenAPI\Client\Model\IntegrationHub | Integration Hub
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateIntegrationHub($integration_hub_id, $integration_hub, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling IntegrationApi->updateIntegrationHub: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **integration_hub_id** | **string**| Id of integration_hub | |
| **integration_hub** | [**\OpenAPI\Client\Model\IntegrationHub**](../Model/IntegrationHub.md)| Integration Hub | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\IntegrationHub**](../Model/IntegrationHub.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

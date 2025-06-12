# OpenAPI\Client\HomepageApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allPrimaryHomepageSections()**](HomepageApi.md#allPrimaryHomepageSections) | **GET** /primary_homepage_sections | Get All Primary homepage sections |


## `allPrimaryHomepageSections()`

```php
allPrimaryHomepageSections($fields): \OpenAPI\Client\Model\HomepageSection[]
```

Get All Primary homepage sections

### Get information about the primary homepage's sections.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\HomepageApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allPrimaryHomepageSections($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling HomepageApi->allPrimaryHomepageSections: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\HomepageSection[]**](../Model/HomepageSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

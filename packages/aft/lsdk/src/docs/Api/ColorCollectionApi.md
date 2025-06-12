# OpenAPI\Client\ColorCollectionApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allColorCollections()**](ColorCollectionApi.md#allColorCollections) | **GET** /color_collections | Get all Color Collections |
| [**colorCollection()**](ColorCollectionApi.md#colorCollection) | **GET** /color_collections/{collection_id} | Get Color Collection by ID |
| [**colorCollectionsCustom()**](ColorCollectionApi.md#colorCollectionsCustom) | **GET** /color_collections/custom | Get all Custom Color Collections |
| [**colorCollectionsStandard()**](ColorCollectionApi.md#colorCollectionsStandard) | **GET** /color_collections/standard | Get all Standard Color Collections |
| [**createColorCollection()**](ColorCollectionApi.md#createColorCollection) | **POST** /color_collections | Create ColorCollection |
| [**defaultColorCollection()**](ColorCollectionApi.md#defaultColorCollection) | **GET** /color_collections/default | Get Default Color Collection |
| [**deleteColorCollection()**](ColorCollectionApi.md#deleteColorCollection) | **DELETE** /color_collections/{collection_id} | Delete ColorCollection |
| [**setDefaultColorCollection()**](ColorCollectionApi.md#setDefaultColorCollection) | **PUT** /color_collections/default | Set Default Color Collection |
| [**updateColorCollection()**](ColorCollectionApi.md#updateColorCollection) | **PATCH** /color_collections/{collection_id} | Update Custom Color collection |


## `allColorCollections()`

```php
allColorCollections($fields): \OpenAPI\Client\Model\ColorCollection[]
```

Get all Color Collections

### Get an array of all existing Color Collections Get a **single** color collection by id with [ColorCollection](#!/ColorCollection/color_collection)  Get all **standard** color collections with [ColorCollection](#!/ColorCollection/color_collections_standard)  Get all **custom** color collections with [ColorCollection](#!/ColorCollection/color_collections_custom)  **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allColorCollections($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->allColorCollections: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ColorCollection[]**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `colorCollection()`

```php
colorCollection($collection_id, $fields): \OpenAPI\Client\Model\ColorCollection
```

Get Color Collection by ID

### Get a Color Collection by ID  Use this to retrieve a specific Color Collection. Get a **single** color collection by id with [ColorCollection](#!/ColorCollection/color_collection)  Get all **standard** color collections with [ColorCollection](#!/ColorCollection/color_collections_standard)  Get all **custom** color collections with [ColorCollection](#!/ColorCollection/color_collections_custom)  **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$collection_id = 'collection_id_example'; // string | Id of Color Collection
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->colorCollection($collection_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->colorCollection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **collection_id** | **string**| Id of Color Collection | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `colorCollectionsCustom()`

```php
colorCollectionsCustom($fields): \OpenAPI\Client\Model\ColorCollection[]
```

Get all Custom Color Collections

### Get an array of all existing **Custom** Color Collections Get a **single** color collection by id with [ColorCollection](#!/ColorCollection/color_collection)  Get all **standard** color collections with [ColorCollection](#!/ColorCollection/color_collections_standard)  **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->colorCollectionsCustom($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->colorCollectionsCustom: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ColorCollection[]**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `colorCollectionsStandard()`

```php
colorCollectionsStandard($fields): \OpenAPI\Client\Model\ColorCollection[]
```

Get all Standard Color Collections

### Get an array of all existing **Standard** Color Collections Get a **single** color collection by id with [ColorCollection](#!/ColorCollection/color_collection)  Get all **custom** color collections with [ColorCollection](#!/ColorCollection/color_collections_custom)  **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->colorCollectionsStandard($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->colorCollectionsStandard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ColorCollection[]**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createColorCollection()`

```php
createColorCollection($color_collection): \OpenAPI\Client\Model\ColorCollection
```

Create ColorCollection

### Create a custom color collection with the specified information  Creates a new custom color collection object, returning the details, including the created id.  **Update** an existing color collection with [Update Color Collection](#!/ColorCollection/update_color_collection)  **Permanently delete** an existing custom color collection with [Delete Color Collection](#!/ColorCollection/delete_color_collection)  **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$color_collection = new \OpenAPI\Client\Model\ColorCollection(); // \OpenAPI\Client\Model\ColorCollection | ColorCollection

try {
    $result = $apiInstance->createColorCollection($color_collection);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->createColorCollection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **color_collection** | [**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)| ColorCollection | |

### Return type

[**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `defaultColorCollection()`

```php
defaultColorCollection(): \OpenAPI\Client\Model\ColorCollection
```

Get Default Color Collection

### Get the default color collection  Use this to retrieve the default Color Collection.  Set the default color collection with [ColorCollection](#!/ColorCollection/set_default_color_collection)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->defaultColorCollection();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->defaultColorCollection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteColorCollection()`

```php
deleteColorCollection($collection_id)
```

Delete ColorCollection

### Delete a custom color collection by id  This operation permanently deletes the identified **Custom** color collection.  **Standard** color collections cannot be deleted  Because multiple color collections can have the same label, they must be deleted by ID, not name. **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$collection_id = 'collection_id_example'; // string | Id of Color Collection

try {
    $apiInstance->deleteColorCollection($collection_id);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->deleteColorCollection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **collection_id** | **string**| Id of Color Collection | |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setDefaultColorCollection()`

```php
setDefaultColorCollection($collection_id): \OpenAPI\Client\Model\ColorCollection
```

Set Default Color Collection

### Set the global default Color Collection by ID  Returns the new specified default Color Collection object. **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$collection_id = 'collection_id_example'; // string | ID of color collection to set as default

try {
    $result = $apiInstance->setDefaultColorCollection($collection_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->setDefaultColorCollection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **collection_id** | **string**| ID of color collection to set as default | |

### Return type

[**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateColorCollection()`

```php
updateColorCollection($collection_id, $color_collection): \OpenAPI\Client\Model\ColorCollection
```

Update Custom Color collection

### Update a custom color collection by id. **Note**: Only an API user with the Admin role can call this endpoint. Unauthorized requests will return `Not Found` (404) errors.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ColorCollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$collection_id = 'collection_id_example'; // string | Id of Custom Color Collection
$color_collection = new \OpenAPI\Client\Model\ColorCollection(); // \OpenAPI\Client\Model\ColorCollection | ColorCollection

try {
    $result = $apiInstance->updateColorCollection($collection_id, $color_collection);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ColorCollectionApi->updateColorCollection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **collection_id** | **string**| Id of Custom Color Collection | |
| **color_collection** | [**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)| ColorCollection | |

### Return type

[**\OpenAPI\Client\Model\ColorCollection**](../Model/ColorCollection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

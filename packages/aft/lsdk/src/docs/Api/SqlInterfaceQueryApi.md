# OpenAPI\Client\SqlInterfaceQueryApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**createSqlInterfaceQuery()**](SqlInterfaceQueryApi.md#createSqlInterfaceQuery) | **POST** /sql_interface_queries | Create SQL Interface Query |
| [**runSqlInterfaceQuery()**](SqlInterfaceQueryApi.md#runSqlInterfaceQuery) | **GET** /sql_interface_queries/{query_id}/run/{result_format} | Run SQL Interface Query |
| [**sqlInterfaceMetadata()**](SqlInterfaceQueryApi.md#sqlInterfaceMetadata) | **GET** /sql_interface_queries/metadata | Get SQL Interface Query Metadata |


## `createSqlInterfaceQuery()`

```php
createSqlInterfaceQuery($sql_interface_query_create): \OpenAPI\Client\Model\SqlInterfaceQuery
```

Create SQL Interface Query

### Create a SQL interface query.  This allows you to create a new SQL interface query that you can later run. Looker queries are immutable once created and are not deleted. If you create a query that is exactly like an existing query then the existing query will be returned and no new query will be created. Whether a new query is created or not, you can use the 'id' in the returned query with the 'run' method.  The query parameters are passed as json in the body of the request.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\SqlInterfaceQueryApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$sql_interface_query_create = new \OpenAPI\Client\Model\SqlInterfaceQueryCreate(); // \OpenAPI\Client\Model\SqlInterfaceQueryCreate | SQL Interface Query Create

try {
    $result = $apiInstance->createSqlInterfaceQuery($sql_interface_query_create);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SqlInterfaceQueryApi->createSqlInterfaceQuery: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **sql_interface_query_create** | [**\OpenAPI\Client\Model\SqlInterfaceQueryCreate**](../Model/SqlInterfaceQueryCreate.md)| SQL Interface Query Create | |

### Return type

[**\OpenAPI\Client\Model\SqlInterfaceQuery**](../Model/SqlInterfaceQuery.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `runSqlInterfaceQuery()`

```php
runSqlInterfaceQuery($query_id, $result_format): \OpenAPI\Client\Model\QueryFormats
```

Run SQL Interface Query

### Run a saved SQL interface query.  This runs a previously created SQL interface query.  The 'result_format' parameter specifies the desired structure and format of the response.  Supported formats:  | result_format | Description | :-----------: | :--- | | json | Plain json | json_bi | (*RECOMMENDED*) Row data plus metadata describing the fields, pivots, table calcs, and other aspects of the query | json_detail | (*LEGACY*) Row data plus metadata describing the fields, pivots, table calcs, and other aspects of the query | csv | Comma separated values with a header | txt | Tab separated values with a header | html | Simple html | md | Simple markdown | xlsx | MS Excel spreadsheet | sql | Returns the generated SQL rather than running the query

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\SqlInterfaceQueryApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$query_id = 56; // int | Integer id of query
$result_format = 'result_format_example'; // string | Format of result, options are: [\"json_bi\"]

try {
    $result = $apiInstance->runSqlInterfaceQuery($query_id, $result_format);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SqlInterfaceQueryApi->runSqlInterfaceQuery: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **query_id** | **int**| Integer id of query | |
| **result_format** | **string**| Format of result, options are: [\&quot;json_bi\&quot;] | |

### Return type

[**\OpenAPI\Client\Model\QueryFormats**](../Model/QueryFormats.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text`, `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `sqlInterfaceMetadata()`

```php
sqlInterfaceMetadata($avatica_request): \OpenAPI\Client\Model\SqlInterfaceQueryMetadata
```

Get SQL Interface Query Metadata

### Handles Avatica RPC metadata requests for SQL Interface queries

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\SqlInterfaceQueryApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$avatica_request = 'avatica_request_example'; // string | Avatica RPC request

try {
    $result = $apiInstance->sqlInterfaceMetadata($avatica_request);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling SqlInterfaceQueryApi->sqlInterfaceMetadata: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **avatica_request** | **string**| Avatica RPC request | [optional] |

### Return type

[**\OpenAPI\Client\Model\SqlInterfaceQueryMetadata**](../Model/SqlInterfaceQueryMetadata.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

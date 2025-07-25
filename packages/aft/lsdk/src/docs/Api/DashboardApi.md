# OpenAPI\Client\DashboardApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allDashboards()**](DashboardApi.md#allDashboards) | **GET** /dashboards | Get All Dashboards |
| [**copyDashboard()**](DashboardApi.md#copyDashboard) | **POST** /dashboards/{dashboard_id}/copy | Copy Dashboard |
| [**createDashboard()**](DashboardApi.md#createDashboard) | **POST** /dashboards | Create Dashboard |
| [**createDashboardElement()**](DashboardApi.md#createDashboardElement) | **POST** /dashboard_elements | Create DashboardElement |
| [**createDashboardFilter()**](DashboardApi.md#createDashboardFilter) | **POST** /dashboard_filters | Create Dashboard Filter |
| [**createDashboardFromLookml()**](DashboardApi.md#createDashboardFromLookml) | **POST** /dashboards/from_lookml | Create Dashboard from LookML |
| [**createDashboardLayout()**](DashboardApi.md#createDashboardLayout) | **POST** /dashboard_layouts | Create DashboardLayout |
| [**dashboard()**](DashboardApi.md#dashboard) | **GET** /dashboards/{dashboard_id} | Get Dashboard |
| [**dashboardAggregateTableLookml()**](DashboardApi.md#dashboardAggregateTableLookml) | **GET** /dashboards/aggregate_table_lookml/{dashboard_id} | Get Aggregate Table LookML for a dashboard |
| [**dashboardDashboardElements()**](DashboardApi.md#dashboardDashboardElements) | **GET** /dashboards/{dashboard_id}/dashboard_elements | Get All DashboardElements |
| [**dashboardDashboardFilters()**](DashboardApi.md#dashboardDashboardFilters) | **GET** /dashboards/{dashboard_id}/dashboard_filters | Get All Dashboard Filters |
| [**dashboardDashboardLayouts()**](DashboardApi.md#dashboardDashboardLayouts) | **GET** /dashboards/{dashboard_id}/dashboard_layouts | Get All DashboardLayouts |
| [**dashboardElement()**](DashboardApi.md#dashboardElement) | **GET** /dashboard_elements/{dashboard_element_id} | Get DashboardElement |
| [**dashboardFilter()**](DashboardApi.md#dashboardFilter) | **GET** /dashboard_filters/{dashboard_filter_id} | Get Dashboard Filter |
| [**dashboardLayout()**](DashboardApi.md#dashboardLayout) | **GET** /dashboard_layouts/{dashboard_layout_id} | Get DashboardLayout |
| [**dashboardLayoutComponent()**](DashboardApi.md#dashboardLayoutComponent) | **GET** /dashboard_layout_components/{dashboard_layout_component_id} | Get DashboardLayoutComponent |
| [**dashboardLayoutDashboardLayoutComponents()**](DashboardApi.md#dashboardLayoutDashboardLayoutComponents) | **GET** /dashboard_layouts/{dashboard_layout_id}/dashboard_layout_components | Get All DashboardLayoutComponents |
| [**dashboardLookml()**](DashboardApi.md#dashboardLookml) | **GET** /dashboards/lookml/{dashboard_id} | Get lookml of a UDD |
| [**deleteDashboard()**](DashboardApi.md#deleteDashboard) | **DELETE** /dashboards/{dashboard_id} | Delete Dashboard |
| [**deleteDashboardElement()**](DashboardApi.md#deleteDashboardElement) | **DELETE** /dashboard_elements/{dashboard_element_id} | Delete DashboardElement |
| [**deleteDashboardFilter()**](DashboardApi.md#deleteDashboardFilter) | **DELETE** /dashboard_filters/{dashboard_filter_id} | Delete Dashboard Filter |
| [**deleteDashboardLayout()**](DashboardApi.md#deleteDashboardLayout) | **DELETE** /dashboard_layouts/{dashboard_layout_id} | Delete DashboardLayout |
| [**importDashboardFromLookml()**](DashboardApi.md#importDashboardFromLookml) | **POST** /dashboards/lookml | Import Dashboard from LookML |
| [**importLookmlDashboard()**](DashboardApi.md#importLookmlDashboard) | **POST** /dashboards/{lookml_dashboard_id}/import/{space_id} | Import LookML Dashboard |
| [**moveDashboard()**](DashboardApi.md#moveDashboard) | **PATCH** /dashboards/{dashboard_id}/move | Move Dashboard |
| [**searchDashboardElements()**](DashboardApi.md#searchDashboardElements) | **GET** /dashboard_elements/search | Search Dashboard Elements |
| [**searchDashboards()**](DashboardApi.md#searchDashboards) | **GET** /dashboards/search | Search Dashboards |
| [**syncLookmlDashboard()**](DashboardApi.md#syncLookmlDashboard) | **PATCH** /dashboards/{lookml_dashboard_id}/sync | Sync LookML Dashboard |
| [**updateDashboard()**](DashboardApi.md#updateDashboard) | **PATCH** /dashboards/{dashboard_id} | Update Dashboard |
| [**updateDashboardElement()**](DashboardApi.md#updateDashboardElement) | **PATCH** /dashboard_elements/{dashboard_element_id} | Update DashboardElement |
| [**updateDashboardFilter()**](DashboardApi.md#updateDashboardFilter) | **PATCH** /dashboard_filters/{dashboard_filter_id} | Update Dashboard Filter |
| [**updateDashboardLayout()**](DashboardApi.md#updateDashboardLayout) | **PATCH** /dashboard_layouts/{dashboard_layout_id} | Update DashboardLayout |
| [**updateDashboardLayoutComponent()**](DashboardApi.md#updateDashboardLayoutComponent) | **PATCH** /dashboard_layout_components/{dashboard_layout_component_id} | Update DashboardLayoutComponent |


## `allDashboards()`

```php
allDashboards($fields): \OpenAPI\Client\Model\DashboardBase[]
```

Get All Dashboards

### Get information about all active dashboards.  Returns an array of **abbreviated dashboard objects**. Dashboards marked as deleted are excluded from this list.  Get the **full details** of a specific dashboard by id with [dashboard()](#!/Dashboard/dashboard)  Find **deleted dashboards** with [search_dashboards()](#!/Dashboard/search_dashboards)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allDashboards($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->allDashboards: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardBase[]**](../Model/DashboardBase.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `copyDashboard()`

```php
copyDashboard($dashboard_id, $folder_id): \OpenAPI\Client\Model\Dashboard
```

Copy Dashboard

### Copy an existing dashboard  Creates a copy of an existing dashboard, in a specified folder, and returns the copied dashboard.  `dashboard_id` is required, `dashboard_id` and `folder_id` must already exist if specified. `folder_id` will default to the existing folder.  If a dashboard with the same title already exists in the target folder, the copy will have '(copy)'   or '(copy <# of copies>)' appended.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Dashboard id to copy.
$folder_id = 'folder_id_example'; // string | Folder id to copy to.

try {
    $result = $apiInstance->copyDashboard($dashboard_id, $folder_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->copyDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Dashboard id to copy. | |
| **folder_id** | **string**| Folder id to copy to. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createDashboard()`

```php
createDashboard($dashboard): \OpenAPI\Client\Model\Dashboard
```

Create Dashboard

### Create a new dashboard  Creates a new dashboard object and returns the details of the newly created dashboard.  `Title` and `space_id` are required fields. `Space_id` must contain the id of an existing space. A dashboard's `title` must be unique within the space in which it resides.  If you receive a 422 error response when creating a dashboard, be sure to look at the response body for information about exactly which fields are missing or contain invalid data.  You can **update** an existing dashboard with [update_dashboard()](#!/Dashboard/update_dashboard)  You can **permanently delete** an existing dashboard with [delete_dashboard()](#!/Dashboard/delete_dashboard)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard = new \OpenAPI\Client\Model\Dashboard(); // \OpenAPI\Client\Model\Dashboard | Dashboard

try {
    $result = $apiInstance->createDashboard($dashboard);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->createDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard** | [**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)| Dashboard | |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createDashboardElement()`

```php
createDashboardElement($dashboard_element, $fields, $apply_filters): \OpenAPI\Client\Model\DashboardElement
```

Create DashboardElement

### Create a dashboard element on the dashboard with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_element = new \OpenAPI\Client\Model\DashboardElement(); // \OpenAPI\Client\Model\DashboardElement | DashboardElement
$fields = 'fields_example'; // string | Requested fields.
$apply_filters = True; // bool | Apply relevant filters on dashboard to this tile

try {
    $result = $apiInstance->createDashboardElement($dashboard_element, $fields, $apply_filters);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->createDashboardElement: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_element** | [**\OpenAPI\Client\Model\DashboardElement**](../Model/DashboardElement.md)| DashboardElement | |
| **fields** | **string**| Requested fields. | [optional] |
| **apply_filters** | **bool**| Apply relevant filters on dashboard to this tile | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardElement**](../Model/DashboardElement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createDashboardFilter()`

```php
createDashboardFilter($create_dashboard_filter, $fields): \OpenAPI\Client\Model\DashboardFilter
```

Create Dashboard Filter

### Create a dashboard filter on the dashboard with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$create_dashboard_filter = new \OpenAPI\Client\Model\CreateDashboardFilter(); // \OpenAPI\Client\Model\CreateDashboardFilter | Dashboard Filter
$fields = 'fields_example'; // string | Requested fields

try {
    $result = $apiInstance->createDashboardFilter($create_dashboard_filter, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->createDashboardFilter: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_dashboard_filter** | [**\OpenAPI\Client\Model\CreateDashboardFilter**](../Model/CreateDashboardFilter.md)| Dashboard Filter | |
| **fields** | **string**| Requested fields | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardFilter**](../Model/DashboardFilter.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createDashboardFromLookml()`

```php
createDashboardFromLookml($dashboard_lookml): \OpenAPI\Client\Model\Dashboard
```

Create Dashboard from LookML

# DEPRECATED:  Use [import_dashboard_from_lookml()](#!/Dashboard/import_dashboard_from_lookml)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_lookml = new \OpenAPI\Client\Model\DashboardLookml(); // \OpenAPI\Client\Model\DashboardLookml | DashboardLookML

try {
    $result = $apiInstance->createDashboardFromLookml($dashboard_lookml);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->createDashboardFromLookml: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_lookml** | [**\OpenAPI\Client\Model\DashboardLookml**](../Model/DashboardLookml.md)| DashboardLookML | |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createDashboardLayout()`

```php
createDashboardLayout($dashboard_layout, $fields): \OpenAPI\Client\Model\DashboardLayout
```

Create DashboardLayout

### Create a dashboard layout on the dashboard with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout = new \OpenAPI\Client\Model\DashboardLayout(); // \OpenAPI\Client\Model\DashboardLayout | DashboardLayout
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createDashboardLayout($dashboard_layout, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->createDashboardLayout: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout** | [**\OpenAPI\Client\Model\DashboardLayout**](../Model/DashboardLayout.md)| DashboardLayout | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayout**](../Model/DashboardLayout.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboard()`

```php
dashboard($dashboard_id, $fields): \OpenAPI\Client\Model\Dashboard
```

Get Dashboard

### Get information about a dashboard  Returns the full details of the identified dashboard object  Get a **summary list** of all active dashboards with [all_dashboards()](#!/Dashboard/all_dashboards)  You can **Search** for dashboards with [search_dashboards()](#!/Dashboard/search_dashboards)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboard($dashboard_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardAggregateTableLookml()`

```php
dashboardAggregateTableLookml($dashboard_id): \OpenAPI\Client\Model\DashboardAggregateTableLookml
```

Get Aggregate Table LookML for a dashboard

### Get Aggregate Table LookML for Each Query on a Dashboard  Returns a JSON object that contains the dashboard id and Aggregate Table lookml

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard

try {
    $result = $apiInstance->dashboardAggregateTableLookml($dashboard_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardAggregateTableLookml: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |

### Return type

[**\OpenAPI\Client\Model\DashboardAggregateTableLookml**](../Model/DashboardAggregateTableLookml.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardDashboardElements()`

```php
dashboardDashboardElements($dashboard_id, $fields): \OpenAPI\Client\Model\DashboardElement[]
```

Get All DashboardElements

### Get information about all the dashboard elements on a dashboard with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardDashboardElements($dashboard_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardDashboardElements: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardElement[]**](../Model/DashboardElement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardDashboardFilters()`

```php
dashboardDashboardFilters($dashboard_id, $fields): \OpenAPI\Client\Model\DashboardFilter[]
```

Get All Dashboard Filters

### Get information about all the dashboard filters on a dashboard with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardDashboardFilters($dashboard_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardDashboardFilters: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardFilter[]**](../Model/DashboardFilter.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardDashboardLayouts()`

```php
dashboardDashboardLayouts($dashboard_id, $fields): \OpenAPI\Client\Model\DashboardLayout[]
```

Get All DashboardLayouts

### Get information about all the dashboard elements on a dashboard with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardDashboardLayouts($dashboard_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardDashboardLayouts: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayout[]**](../Model/DashboardLayout.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardElement()`

```php
dashboardElement($dashboard_element_id, $fields): \OpenAPI\Client\Model\DashboardElement
```

Get DashboardElement

### Get information about the dashboard element with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_element_id = 'dashboard_element_id_example'; // string | Id of dashboard element
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardElement($dashboard_element_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardElement: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_element_id** | **string**| Id of dashboard element | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardElement**](../Model/DashboardElement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardFilter()`

```php
dashboardFilter($dashboard_filter_id, $fields): \OpenAPI\Client\Model\DashboardFilter
```

Get Dashboard Filter

### Get information about the dashboard filters with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_filter_id = 'dashboard_filter_id_example'; // string | Id of dashboard filters
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardFilter($dashboard_filter_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardFilter: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_filter_id** | **string**| Id of dashboard filters | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardFilter**](../Model/DashboardFilter.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardLayout()`

```php
dashboardLayout($dashboard_layout_id, $fields): \OpenAPI\Client\Model\DashboardLayout
```

Get DashboardLayout

### Get information about the dashboard layouts with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout_id = 'dashboard_layout_id_example'; // string | Id of dashboard layouts
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardLayout($dashboard_layout_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardLayout: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout_id** | **string**| Id of dashboard layouts | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayout**](../Model/DashboardLayout.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardLayoutComponent()`

```php
dashboardLayoutComponent($dashboard_layout_component_id, $fields): \OpenAPI\Client\Model\DashboardLayoutComponent
```

Get DashboardLayoutComponent

### Get information about the dashboard elements with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout_component_id = 'dashboard_layout_component_id_example'; // string | Id of dashboard layout component
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardLayoutComponent($dashboard_layout_component_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardLayoutComponent: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout_component_id** | **string**| Id of dashboard layout component | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayoutComponent**](../Model/DashboardLayoutComponent.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardLayoutDashboardLayoutComponents()`

```php
dashboardLayoutDashboardLayoutComponents($dashboard_layout_id, $fields): \OpenAPI\Client\Model\DashboardLayoutComponent[]
```

Get All DashboardLayoutComponents

### Get information about all the dashboard layout components for a dashboard layout with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout_id = 'dashboard_layout_id_example'; // string | Id of dashboard layout component
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->dashboardLayoutDashboardLayoutComponents($dashboard_layout_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardLayoutDashboardLayoutComponents: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout_id** | **string**| Id of dashboard layout component | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayoutComponent[]**](../Model/DashboardLayoutComponent.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `dashboardLookml()`

```php
dashboardLookml($dashboard_id): \OpenAPI\Client\Model\DashboardLookml
```

Get lookml of a UDD

### Get lookml of a UDD  Returns a JSON object that contains the dashboard id and the full lookml

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard

try {
    $result = $apiInstance->dashboardLookml($dashboard_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->dashboardLookml: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |

### Return type

[**\OpenAPI\Client\Model\DashboardLookml**](../Model/DashboardLookml.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteDashboard()`

```php
deleteDashboard($dashboard_id): string
```

Delete Dashboard

### Delete the dashboard with the specified id  Permanently **deletes** a dashboard. (The dashboard cannot be recovered after this operation.)  \"Soft\" delete or hide a dashboard by setting its `deleted` status to `True` with [update_dashboard()](#!/Dashboard/update_dashboard).  Note: When a dashboard is deleted in the UI, it is soft deleted. Use this API call to permanently remove it, if desired.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard

try {
    $result = $apiInstance->deleteDashboard($dashboard_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->deleteDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |

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

## `deleteDashboardElement()`

```php
deleteDashboardElement($dashboard_element_id): string
```

Delete DashboardElement

### Delete a dashboard element with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_element_id = 'dashboard_element_id_example'; // string | Id of dashboard element

try {
    $result = $apiInstance->deleteDashboardElement($dashboard_element_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->deleteDashboardElement: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_element_id** | **string**| Id of dashboard element | |

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

## `deleteDashboardFilter()`

```php
deleteDashboardFilter($dashboard_filter_id): string
```

Delete Dashboard Filter

### Delete a dashboard filter with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_filter_id = 'dashboard_filter_id_example'; // string | Id of dashboard filter

try {
    $result = $apiInstance->deleteDashboardFilter($dashboard_filter_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->deleteDashboardFilter: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_filter_id** | **string**| Id of dashboard filter | |

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

## `deleteDashboardLayout()`

```php
deleteDashboardLayout($dashboard_layout_id): string
```

Delete DashboardLayout

### Delete a dashboard layout with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout_id = 'dashboard_layout_id_example'; // string | Id of dashboard layout

try {
    $result = $apiInstance->deleteDashboardLayout($dashboard_layout_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->deleteDashboardLayout: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout_id** | **string**| Id of dashboard layout | |

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

## `importDashboardFromLookml()`

```php
importDashboardFromLookml($dashboard_lookml): \OpenAPI\Client\Model\Dashboard
```

Import Dashboard from LookML

### Creates a dashboard object based on LookML Dashboard YAML, and returns the details of the newly created dashboard.  If a dashboard exists with the YAML-defined \"preferred_slug\", the new dashboard will overwrite it. Otherwise, a new dashboard will be created. Note that when a dashboard is overwritten, alerts will not be maintained.  If a folder_id is specified: new dashboards will be placed in that folder, and overwritten dashboards will be moved to it If the folder_id isn't specified: new dashboards will be placed in the caller's personal folder, and overwritten dashboards will remain where they were  LookML must contain valid LookML YAML code. It's recommended to use the LookML format returned from [dashboard_lookml()](#!/Dashboard/dashboard_lookml) as the input LookML (newlines replaced with  ).  Note that the created dashboard is not linked to any LookML Dashboard, i.e. [sync_lookml_dashboard()](#!/Dashboard/sync_lookml_dashboard) will not update dashboards created by this method.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_lookml = new \OpenAPI\Client\Model\DashboardLookml(); // \OpenAPI\Client\Model\DashboardLookml | DashboardLookML

try {
    $result = $apiInstance->importDashboardFromLookml($dashboard_lookml);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->importDashboardFromLookml: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_lookml** | [**\OpenAPI\Client\Model\DashboardLookml**](../Model/DashboardLookml.md)| DashboardLookML | |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `importLookmlDashboard()`

```php
importLookmlDashboard($lookml_dashboard_id, $space_id, $raw_locale, $dashboard): \OpenAPI\Client\Model\Dashboard
```

Import LookML Dashboard

### Import a LookML dashboard to a space as a UDD Creates a UDD (a dashboard which exists in the Looker database rather than as a LookML file) from the LookML dashboard and places it in the space specified. The created UDD will have a lookml_link_id which links to the original LookML dashboard.  To give the imported dashboard specify a (e.g. title: \"my title\") in the body of your request, otherwise the imported dashboard will have the same title as the original LookML dashboard.  For this operation to succeed the user must have permission to see the LookML dashboard in question, and have permission to create content in the space the dashboard is being imported to.  **Sync** a linked UDD with [sync_lookml_dashboard()](#!/Dashboard/sync_lookml_dashboard) **Unlink** a linked UDD by setting lookml_link_id to null with [update_dashboard()](#!/Dashboard/update_dashboard)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_dashboard_id = 'lookml_dashboard_id_example'; // string | Id of LookML dashboard
$space_id = 'space_id_example'; // string | Id of space to import the dashboard to
$raw_locale = True; // bool | If true, and this dashboard is localized, export it with the raw keys, not localized.
$dashboard = new \OpenAPI\Client\Model\Dashboard(); // \OpenAPI\Client\Model\Dashboard | Dashboard

try {
    $result = $apiInstance->importLookmlDashboard($lookml_dashboard_id, $space_id, $raw_locale, $dashboard);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->importLookmlDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_dashboard_id** | **string**| Id of LookML dashboard | |
| **space_id** | **string**| Id of space to import the dashboard to | |
| **raw_locale** | **bool**| If true, and this dashboard is localized, export it with the raw keys, not localized. | [optional] |
| **dashboard** | [**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)| Dashboard | [optional] |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `moveDashboard()`

```php
moveDashboard($dashboard_id, $folder_id): \OpenAPI\Client\Model\Dashboard
```

Move Dashboard

### Move an existing dashboard  Moves a dashboard to a specified folder, and returns the moved dashboard.  `dashboard_id` and `folder_id` are required. `dashboard_id` and `folder_id` must already exist, and `folder_id` must be different from the current `folder_id` of the dashboard.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Dashboard id to move.
$folder_id = 'folder_id_example'; // string | Folder id to move to.

try {
    $result = $apiInstance->moveDashboard($dashboard_id, $folder_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->moveDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Dashboard id to move. | |
| **folder_id** | **string**| Folder id to move to. | |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchDashboardElements()`

```php
searchDashboardElements($dashboard_id, $look_id, $title, $deleted, $fields, $filter_or, $sorts): \OpenAPI\Client\Model\DashboardElement[]
```

Search Dashboard Elements

### Search Dashboard Elements  Returns an **array of DashboardElement objects** that match the specified search criteria.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Select elements that refer to a given dashboard id
$look_id = 'look_id_example'; // string | Select elements that refer to a given look id
$title = 'title_example'; // string | Match the title of element
$deleted = True; // bool | Select soft-deleted dashboard elements
$fields = 'fields_example'; // string | Requested fields.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$sorts = 'sorts_example'; // string | Fields to sort by. Sortable fields: [:look_id, :dashboard_id, :deleted, :title]

try {
    $result = $apiInstance->searchDashboardElements($dashboard_id, $look_id, $title, $deleted, $fields, $filter_or, $sorts);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->searchDashboardElements: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Select elements that refer to a given dashboard id | [optional] |
| **look_id** | **string**| Select elements that refer to a given look id | [optional] |
| **title** | **string**| Match the title of element | [optional] |
| **deleted** | **bool**| Select soft-deleted dashboard elements | [optional] |
| **fields** | **string**| Requested fields. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **sorts** | **string**| Fields to sort by. Sortable fields: [:look_id, :dashboard_id, :deleted, :title] | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardElement[]**](../Model/DashboardElement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchDashboards()`

```php
searchDashboards($id, $slug, $title, $description, $content_favorite_id, $folder_id, $deleted, $user_id, $view_count, $content_metadata_id, $curate, $last_viewed_at, $fields, $page, $per_page, $limit, $offset, $sorts, $filter_or, $not_owned_by): \OpenAPI\Client\Model\Dashboard[]
```

Search Dashboards

### Search Dashboards  Returns an array of **user-defined dashboard** objects that match the specified search criteria. Note, [search_dashboards()](#!/Dashboard/search_dashboards) does not return LookML dashboard objects.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.   The parameters `limit`, and `offset` are recommended for fetching results in page-size chunks.  Get a **single dashboard** by id with [dashboard()](#!/Dashboard/dashboard)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$id = 'id_example'; // string | Match dashboard id.
$slug = 'slug_example'; // string | Match dashboard slug.
$title = 'title_example'; // string | Match Dashboard title.
$description = 'description_example'; // string | Match Dashboard description.
$content_favorite_id = 'content_favorite_id_example'; // string | Filter on a content favorite id.
$folder_id = 'folder_id_example'; // string | Filter on a particular folder.
$deleted = 'deleted_example'; // string | Filter on dashboards deleted status.
$user_id = 'user_id_example'; // string | Filter on dashboards created by a particular user.
$view_count = 'view_count_example'; // string | Filter on a particular value of view_count
$content_metadata_id = 'content_metadata_id_example'; // string | Filter on a content favorite id.
$curate = True; // bool | Exclude items that exist only in personal spaces other than the users
$last_viewed_at = 'last_viewed_at_example'; // string | Select dashboards based on when they were last viewed
$fields = 'fields_example'; // string | Requested fields.
$page = 56; // int | DEPRECATED. Use limit and offset instead. Return only page N of paginated results
$per_page = 56; // int | DEPRECATED. Use limit and offset instead. Return N rows of data per page
$limit = 56; // int | Number of results to return. (used with offset and takes priority over page and per_page)
$offset = 56; // int | Number of results to skip before returning any. (used with limit and takes priority over page and per_page)
$sorts = 'sorts_example'; // string | One or more fields to sort by. Sortable fields: [:title, :user_id, :id, :created_at, :space_id, :folder_id, :description, :view_count, :favorite_count, :slug, :content_favorite_id, :content_metadata_id, :deleted, :deleted_at, :last_viewed_at, :last_accessed_at]
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$not_owned_by = True; // bool | Filter out the dashboards owned by the user passed at the :user_id params

try {
    $result = $apiInstance->searchDashboards($id, $slug, $title, $description, $content_favorite_id, $folder_id, $deleted, $user_id, $view_count, $content_metadata_id, $curate, $last_viewed_at, $fields, $page, $per_page, $limit, $offset, $sorts, $filter_or, $not_owned_by);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->searchDashboards: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **id** | **string**| Match dashboard id. | [optional] |
| **slug** | **string**| Match dashboard slug. | [optional] |
| **title** | **string**| Match Dashboard title. | [optional] |
| **description** | **string**| Match Dashboard description. | [optional] |
| **content_favorite_id** | **string**| Filter on a content favorite id. | [optional] |
| **folder_id** | **string**| Filter on a particular folder. | [optional] |
| **deleted** | **string**| Filter on dashboards deleted status. | [optional] |
| **user_id** | **string**| Filter on dashboards created by a particular user. | [optional] |
| **view_count** | **string**| Filter on a particular value of view_count | [optional] |
| **content_metadata_id** | **string**| Filter on a content favorite id. | [optional] |
| **curate** | **bool**| Exclude items that exist only in personal spaces other than the users | [optional] |
| **last_viewed_at** | **string**| Select dashboards based on when they were last viewed | [optional] |
| **fields** | **string**| Requested fields. | [optional] |
| **page** | **int**| DEPRECATED. Use limit and offset instead. Return only page N of paginated results | [optional] |
| **per_page** | **int**| DEPRECATED. Use limit and offset instead. Return N rows of data per page | [optional] |
| **limit** | **int**| Number of results to return. (used with offset and takes priority over page and per_page) | [optional] |
| **offset** | **int**| Number of results to skip before returning any. (used with limit and takes priority over page and per_page) | [optional] |
| **sorts** | **string**| One or more fields to sort by. Sortable fields: [:title, :user_id, :id, :created_at, :space_id, :folder_id, :description, :view_count, :favorite_count, :slug, :content_favorite_id, :content_metadata_id, :deleted, :deleted_at, :last_viewed_at, :last_accessed_at] | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **not_owned_by** | **bool**| Filter out the dashboards owned by the user passed at the :user_id params | [optional] |

### Return type

[**\OpenAPI\Client\Model\Dashboard[]**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `syncLookmlDashboard()`

```php
syncLookmlDashboard($lookml_dashboard_id, $dashboard, $raw_locale): int[]
```

Sync LookML Dashboard

### Update all linked dashboards to match the specified LookML dashboard.  Any UDD (a dashboard which exists in the Looker database rather than as a LookML file) which has a `lookml_link_id` property value referring to a LookML dashboard's id (model::dashboardname) will be updated so that it matches the current state of the LookML dashboard.  For this operation to succeed the user must have permission to view the LookML dashboard, and only linked dashboards that the user has permission to update will be synced.  To **link** or **unlink** a UDD set the `lookml_link_id` property with [update_dashboard()](#!/Dashboard/update_dashboard)

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$lookml_dashboard_id = 'lookml_dashboard_id_example'; // string | Id of LookML dashboard, in the form 'model::dashboardname'
$dashboard = new \OpenAPI\Client\Model\Dashboard(); // \OpenAPI\Client\Model\Dashboard | Dashboard
$raw_locale = True; // bool | If true, and this dashboard is localized, export it with the raw keys, not localized.

try {
    $result = $apiInstance->syncLookmlDashboard($lookml_dashboard_id, $dashboard, $raw_locale);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->syncLookmlDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **lookml_dashboard_id** | **string**| Id of LookML dashboard, in the form &#39;model::dashboardname&#39; | |
| **dashboard** | [**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)| Dashboard | |
| **raw_locale** | **bool**| If true, and this dashboard is localized, export it with the raw keys, not localized. | [optional] |

### Return type

**int[]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDashboard()`

```php
updateDashboard($dashboard_id, $dashboard): \OpenAPI\Client\Model\Dashboard
```

Update Dashboard

### Update a dashboard  You can use this function to change the string and integer properties of a dashboard. Nested objects such as filters, dashboard elements, or dashboard layout components cannot be modified by this function - use the update functions for the respective nested object types (like [update_dashboard_filter()](#!/Dashboard/update_dashboard_filter) to change a filter) to modify nested objects referenced by a dashboard.  If you receive a 422 error response when updating a dashboard, be sure to look at the response body for information about exactly which fields are missing or contain invalid data.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_id = 'dashboard_id_example'; // string | Id of dashboard
$dashboard = new \OpenAPI\Client\Model\Dashboard(); // \OpenAPI\Client\Model\Dashboard | Dashboard

try {
    $result = $apiInstance->updateDashboard($dashboard_id, $dashboard);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->updateDashboard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_id** | **string**| Id of dashboard | |
| **dashboard** | [**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)| Dashboard | |

### Return type

[**\OpenAPI\Client\Model\Dashboard**](../Model/Dashboard.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDashboardElement()`

```php
updateDashboardElement($dashboard_element_id, $dashboard_element, $fields): \OpenAPI\Client\Model\DashboardElement
```

Update DashboardElement

### Update the dashboard element with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_element_id = 'dashboard_element_id_example'; // string | Id of dashboard element
$dashboard_element = new \OpenAPI\Client\Model\DashboardElement(); // \OpenAPI\Client\Model\DashboardElement | DashboardElement
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateDashboardElement($dashboard_element_id, $dashboard_element, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->updateDashboardElement: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_element_id** | **string**| Id of dashboard element | |
| **dashboard_element** | [**\OpenAPI\Client\Model\DashboardElement**](../Model/DashboardElement.md)| DashboardElement | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardElement**](../Model/DashboardElement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDashboardFilter()`

```php
updateDashboardFilter($dashboard_filter_id, $dashboard_filter, $fields): \OpenAPI\Client\Model\DashboardFilter
```

Update Dashboard Filter

### Update the dashboard filter with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_filter_id = 'dashboard_filter_id_example'; // string | Id of dashboard filter
$dashboard_filter = new \OpenAPI\Client\Model\DashboardFilter(); // \OpenAPI\Client\Model\DashboardFilter | Dashboard Filter
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateDashboardFilter($dashboard_filter_id, $dashboard_filter, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->updateDashboardFilter: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_filter_id** | **string**| Id of dashboard filter | |
| **dashboard_filter** | [**\OpenAPI\Client\Model\DashboardFilter**](../Model/DashboardFilter.md)| Dashboard Filter | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardFilter**](../Model/DashboardFilter.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDashboardLayout()`

```php
updateDashboardLayout($dashboard_layout_id, $dashboard_layout, $fields): \OpenAPI\Client\Model\DashboardLayout
```

Update DashboardLayout

### Update the dashboard layout with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout_id = 'dashboard_layout_id_example'; // string | Id of dashboard layout
$dashboard_layout = new \OpenAPI\Client\Model\DashboardLayout(); // \OpenAPI\Client\Model\DashboardLayout | DashboardLayout
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateDashboardLayout($dashboard_layout_id, $dashboard_layout, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->updateDashboardLayout: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout_id** | **string**| Id of dashboard layout | |
| **dashboard_layout** | [**\OpenAPI\Client\Model\DashboardLayout**](../Model/DashboardLayout.md)| DashboardLayout | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayout**](../Model/DashboardLayout.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDashboardLayoutComponent()`

```php
updateDashboardLayoutComponent($dashboard_layout_component_id, $dashboard_layout_component, $fields): \OpenAPI\Client\Model\DashboardLayoutComponent
```

Update DashboardLayoutComponent

### Update the dashboard element with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\DashboardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$dashboard_layout_component_id = 'dashboard_layout_component_id_example'; // string | Id of dashboard layout component
$dashboard_layout_component = new \OpenAPI\Client\Model\DashboardLayoutComponent(); // \OpenAPI\Client\Model\DashboardLayoutComponent | DashboardLayoutComponent
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateDashboardLayoutComponent($dashboard_layout_component_id, $dashboard_layout_component, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DashboardApi->updateDashboardLayoutComponent: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **dashboard_layout_component_id** | **string**| Id of dashboard layout component | |
| **dashboard_layout_component** | [**\OpenAPI\Client\Model\DashboardLayoutComponent**](../Model/DashboardLayoutComponent.md)| DashboardLayoutComponent | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DashboardLayoutComponent**](../Model/DashboardLayoutComponent.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

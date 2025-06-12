# OpenAPI\Client\RoleApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allModelSets()**](RoleApi.md#allModelSets) | **GET** /model_sets | Get All Model Sets |
| [**allPermissionSets()**](RoleApi.md#allPermissionSets) | **GET** /permission_sets | Get All Permission Sets |
| [**allPermissions()**](RoleApi.md#allPermissions) | **GET** /permissions | Get All Permissions |
| [**allRoles()**](RoleApi.md#allRoles) | **GET** /roles | Get All Roles |
| [**createModelSet()**](RoleApi.md#createModelSet) | **POST** /model_sets | Create Model Set |
| [**createPermissionSet()**](RoleApi.md#createPermissionSet) | **POST** /permission_sets | Create Permission Set |
| [**createRole()**](RoleApi.md#createRole) | **POST** /roles | Create Role |
| [**deleteModelSet()**](RoleApi.md#deleteModelSet) | **DELETE** /model_sets/{model_set_id} | Delete Model Set |
| [**deletePermissionSet()**](RoleApi.md#deletePermissionSet) | **DELETE** /permission_sets/{permission_set_id} | Delete Permission Set |
| [**deleteRole()**](RoleApi.md#deleteRole) | **DELETE** /roles/{role_id} | Delete Role |
| [**modelSet()**](RoleApi.md#modelSet) | **GET** /model_sets/{model_set_id} | Get Model Set |
| [**permissionSet()**](RoleApi.md#permissionSet) | **GET** /permission_sets/{permission_set_id} | Get Permission Set |
| [**role()**](RoleApi.md#role) | **GET** /roles/{role_id} | Get Role |
| [**roleGroups()**](RoleApi.md#roleGroups) | **GET** /roles/{role_id}/groups | Get Role Groups |
| [**roleUsers()**](RoleApi.md#roleUsers) | **GET** /roles/{role_id}/users | Get Role Users |
| [**searchModelSets()**](RoleApi.md#searchModelSets) | **GET** /model_sets/search | Search Model Sets |
| [**searchPermissionSets()**](RoleApi.md#searchPermissionSets) | **GET** /permission_sets/search | Search Permission Sets |
| [**searchRoles()**](RoleApi.md#searchRoles) | **GET** /roles/search | Search Roles |
| [**searchRolesWithUserCount()**](RoleApi.md#searchRolesWithUserCount) | **GET** /roles/search/with_user_count | Search Roles with User Count |
| [**setRoleGroups()**](RoleApi.md#setRoleGroups) | **PUT** /roles/{role_id}/groups | Update Role Groups |
| [**setRoleUsers()**](RoleApi.md#setRoleUsers) | **PUT** /roles/{role_id}/users | Update Role Users |
| [**updateModelSet()**](RoleApi.md#updateModelSet) | **PATCH** /model_sets/{model_set_id} | Update Model Set |
| [**updatePermissionSet()**](RoleApi.md#updatePermissionSet) | **PATCH** /permission_sets/{permission_set_id} | Update Permission Set |
| [**updateRole()**](RoleApi.md#updateRole) | **PATCH** /roles/{role_id} | Update Role |


## `allModelSets()`

```php
allModelSets($fields): \OpenAPI\Client\Model\ModelSet[]
```

Get All Model Sets

### Get information about all model sets.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allModelSets($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->allModelSets: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ModelSet[]**](../Model/ModelSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allPermissionSets()`

```php
allPermissionSets($fields): \OpenAPI\Client\Model\PermissionSet[]
```

Get All Permission Sets

### Get information about all permission sets.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allPermissionSets($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->allPermissionSets: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\PermissionSet[]**](../Model/PermissionSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allPermissions()`

```php
allPermissions(): \OpenAPI\Client\Model\Permission[]
```

Get All Permissions

### Get all supported permissions.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->allPermissions();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->allPermissions: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\Permission[]**](../Model/Permission.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allRoles()`

```php
allRoles($fields, $ids): \OpenAPI\Client\Model\Role[]
```

Get All Roles

### Get information about all roles.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$ids = array('ids_example'); // string[] | Optional list of ids to get specific roles.

try {
    $result = $apiInstance->allRoles($fields, $ids);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->allRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **ids** | [**string[]**](../Model/string.md)| Optional list of ids to get specific roles. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Role[]**](../Model/Role.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createModelSet()`

```php
createModelSet($model_set): \OpenAPI\Client\Model\ModelSet
```

Create Model Set

### Create a model set with the specified information. Model sets are used by Roles.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$model_set = new \OpenAPI\Client\Model\ModelSet(); // \OpenAPI\Client\Model\ModelSet | ModelSet

try {
    $result = $apiInstance->createModelSet($model_set);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->createModelSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **model_set** | [**\OpenAPI\Client\Model\ModelSet**](../Model/ModelSet.md)| ModelSet | |

### Return type

[**\OpenAPI\Client\Model\ModelSet**](../Model/ModelSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createPermissionSet()`

```php
createPermissionSet($permission_set): \OpenAPI\Client\Model\PermissionSet
```

Create Permission Set

### Create a permission set with the specified information. Permission sets are used by Roles. Providing save_content permission alone will also provide you the abilities of save_looks and save_dashboards.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$permission_set = new \OpenAPI\Client\Model\PermissionSet(); // \OpenAPI\Client\Model\PermissionSet | Permission Set

try {
    $result = $apiInstance->createPermissionSet($permission_set);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->createPermissionSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **permission_set** | [**\OpenAPI\Client\Model\PermissionSet**](../Model/PermissionSet.md)| Permission Set | |

### Return type

[**\OpenAPI\Client\Model\PermissionSet**](../Model/PermissionSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createRole()`

```php
createRole($role): \OpenAPI\Client\Model\Role
```

Create Role

### Create a role with the specified information.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role = new \OpenAPI\Client\Model\Role(); // \OpenAPI\Client\Model\Role | Role

try {
    $result = $apiInstance->createRole($role);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->createRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role** | [**\OpenAPI\Client\Model\Role**](../Model/Role.md)| Role | |

### Return type

[**\OpenAPI\Client\Model\Role**](../Model/Role.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteModelSet()`

```php
deleteModelSet($model_set_id): string
```

Delete Model Set

### Delete the model set with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$model_set_id = 'model_set_id_example'; // string | id of model set

try {
    $result = $apiInstance->deleteModelSet($model_set_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->deleteModelSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **model_set_id** | **string**| id of model set | |

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

## `deletePermissionSet()`

```php
deletePermissionSet($permission_set_id): string
```

Delete Permission Set

### Delete the permission set with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$permission_set_id = 'permission_set_id_example'; // string | Id of permission set

try {
    $result = $apiInstance->deletePermissionSet($permission_set_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->deletePermissionSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **permission_set_id** | **string**| Id of permission set | |

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

## `deleteRole()`

```php
deleteRole($role_id): string
```

Delete Role

### Delete the role with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role

try {
    $result = $apiInstance->deleteRole($role_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->deleteRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |

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

## `modelSet()`

```php
modelSet($model_set_id, $fields): \OpenAPI\Client\Model\ModelSet
```

Get Model Set

### Get information about the model set with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$model_set_id = 'model_set_id_example'; // string | Id of model set
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->modelSet($model_set_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->modelSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **model_set_id** | **string**| Id of model set | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ModelSet**](../Model/ModelSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `permissionSet()`

```php
permissionSet($permission_set_id, $fields): \OpenAPI\Client\Model\PermissionSet
```

Get Permission Set

### Get information about the permission set with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$permission_set_id = 'permission_set_id_example'; // string | Id of permission set
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->permissionSet($permission_set_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->permissionSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **permission_set_id** | **string**| Id of permission set | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\PermissionSet**](../Model/PermissionSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `role()`

```php
role($role_id): \OpenAPI\Client\Model\Role
```

Get Role

### Get information about the role with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role

try {
    $result = $apiInstance->role($role_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->role: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |

### Return type

[**\OpenAPI\Client\Model\Role**](../Model/Role.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `roleGroups()`

```php
roleGroups($role_id, $fields): \OpenAPI\Client\Model\Group[]
```

Get Role Groups

### Get information about all the groups with the role that has a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->roleGroups($role_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->roleGroups: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Group[]**](../Model/Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `roleUsers()`

```php
roleUsers($role_id, $fields, $direct_association_only): \OpenAPI\Client\Model\User[]
```

Get Role Users

### Get information about all the users with the role that has a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role
$fields = 'fields_example'; // string | Requested fields.
$direct_association_only = True; // bool | Get only users associated directly with the role: exclude those only associated through groups.

try {
    $result = $apiInstance->roleUsers($role_id, $fields, $direct_association_only);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->roleUsers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |
| **fields** | **string**| Requested fields. | [optional] |
| **direct_association_only** | **bool**| Get only users associated directly with the role: exclude those only associated through groups. | [optional] |

### Return type

[**\OpenAPI\Client\Model\User[]**](../Model/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchModelSets()`

```php
searchModelSets($fields, $limit, $offset, $sorts, $id, $name, $all_access, $built_in, $filter_or): \OpenAPI\Client\Model\ModelSet[]
```

Search Model Sets

### Search model sets Returns all model set records that match the given search criteria. If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$id = 'id_example'; // string | Match model set id.
$name = 'name_example'; // string | Match model set name.
$all_access = True; // bool | Match model sets by all_access status.
$built_in = True; // bool | Match model sets by built_in status.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression.

try {
    $result = $apiInstance->searchModelSets($fields, $limit, $offset, $sorts, $id, $name, $all_access, $built_in, $filter_or);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->searchModelSets: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **id** | **string**| Match model set id. | [optional] |
| **name** | **string**| Match model set name. | [optional] |
| **all_access** | **bool**| Match model sets by all_access status. | [optional] |
| **built_in** | **bool**| Match model sets by built_in status. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ModelSet[]**](../Model/ModelSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchPermissionSets()`

```php
searchPermissionSets($fields, $limit, $offset, $sorts, $id, $name, $all_access, $built_in, $filter_or): \OpenAPI\Client\Model\PermissionSet[]
```

Search Permission Sets

### Search permission sets Returns all permission set records that match the given search criteria. If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$id = 'id_example'; // string | Match permission set id.
$name = 'name_example'; // string | Match permission set name.
$all_access = True; // bool | Match permission sets by all_access status.
$built_in = True; // bool | Match permission sets by built_in status.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression.

try {
    $result = $apiInstance->searchPermissionSets($fields, $limit, $offset, $sorts, $id, $name, $all_access, $built_in, $filter_or);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->searchPermissionSets: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **id** | **string**| Match permission set id. | [optional] |
| **name** | **string**| Match permission set name. | [optional] |
| **all_access** | **bool**| Match permission sets by all_access status. | [optional] |
| **built_in** | **bool**| Match permission sets by built_in status. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression. | [optional] |

### Return type

[**\OpenAPI\Client\Model\PermissionSet[]**](../Model/PermissionSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchRoles()`

```php
searchRoles($fields, $limit, $offset, $sorts, $id, $name, $built_in, $filter_or): \OpenAPI\Client\Model\Role[]
```

Search Roles

### Search roles  Returns all role records that match the given search criteria.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$id = 'id_example'; // string | Match role id.
$name = 'name_example'; // string | Match role name.
$built_in = True; // bool | Match roles by built_in status.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression.

try {
    $result = $apiInstance->searchRoles($fields, $limit, $offset, $sorts, $id, $name, $built_in, $filter_or);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->searchRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **id** | **string**| Match role id. | [optional] |
| **name** | **string**| Match role name. | [optional] |
| **built_in** | **bool**| Match roles by built_in status. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Role[]**](../Model/Role.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchRolesWithUserCount()`

```php
searchRolesWithUserCount($fields, $limit, $offset, $sorts, $id, $name, $built_in, $filter_or): \OpenAPI\Client\Model\RoleSearch[]
```

Search Roles with User Count

### Search roles include user count  Returns all role records that match the given search criteria, and attaches associated user counts.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$id = 'id_example'; // string | Match role id.
$name = 'name_example'; // string | Match role name.
$built_in = True; // bool | Match roles by built_in status.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression.

try {
    $result = $apiInstance->searchRolesWithUserCount($fields, $limit, $offset, $sorts, $id, $name, $built_in, $filter_or);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->searchRolesWithUserCount: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **id** | **string**| Match role id. | [optional] |
| **name** | **string**| Match role name. | [optional] |
| **built_in** | **bool**| Match roles by built_in status. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression. | [optional] |

### Return type

[**\OpenAPI\Client\Model\RoleSearch[]**](../Model/RoleSearch.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setRoleGroups()`

```php
setRoleGroups($role_id, $request_body): \OpenAPI\Client\Model\Group[]
```

Update Role Groups

### Set all groups for a role, removing all existing group associations from that role.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role
$request_body = array('request_body_example'); // string[] | Array of Group Ids

try {
    $result = $apiInstance->setRoleGroups($role_id, $request_body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->setRoleGroups: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |
| **request_body** | [**string[]**](../Model/string.md)| Array of Group Ids | |

### Return type

[**\OpenAPI\Client\Model\Group[]**](../Model/Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setRoleUsers()`

```php
setRoleUsers($role_id, $request_body): \OpenAPI\Client\Model\User[]
```

Update Role Users

### Set all the users of the role with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role
$request_body = array('request_body_example'); // string[] | array of user ids for role

try {
    $result = $apiInstance->setRoleUsers($role_id, $request_body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->setRoleUsers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |
| **request_body** | [**string[]**](../Model/string.md)| array of user ids for role | |

### Return type

[**\OpenAPI\Client\Model\User[]**](../Model/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateModelSet()`

```php
updateModelSet($model_set_id, $model_set): \OpenAPI\Client\Model\ModelSet
```

Update Model Set

### Update information about the model set with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$model_set_id = 'model_set_id_example'; // string | id of model set
$model_set = new \OpenAPI\Client\Model\ModelSet(); // \OpenAPI\Client\Model\ModelSet | ModelSet

try {
    $result = $apiInstance->updateModelSet($model_set_id, $model_set);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->updateModelSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **model_set_id** | **string**| id of model set | |
| **model_set** | [**\OpenAPI\Client\Model\ModelSet**](../Model/ModelSet.md)| ModelSet | |

### Return type

[**\OpenAPI\Client\Model\ModelSet**](../Model/ModelSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updatePermissionSet()`

```php
updatePermissionSet($permission_set_id, $permission_set): \OpenAPI\Client\Model\PermissionSet
```

Update Permission Set

### Update information about the permission set with a specific id. Providing save_content permission alone will also provide you the abilities of save_looks and save_dashboards.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$permission_set_id = 'permission_set_id_example'; // string | Id of permission set
$permission_set = new \OpenAPI\Client\Model\PermissionSet(); // \OpenAPI\Client\Model\PermissionSet | Permission Set

try {
    $result = $apiInstance->updatePermissionSet($permission_set_id, $permission_set);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->updatePermissionSet: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **permission_set_id** | **string**| Id of permission set | |
| **permission_set** | [**\OpenAPI\Client\Model\PermissionSet**](../Model/PermissionSet.md)| Permission Set | |

### Return type

[**\OpenAPI\Client\Model\PermissionSet**](../Model/PermissionSet.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateRole()`

```php
updateRole($role_id, $role): \OpenAPI\Client\Model\Role
```

Update Role

### Update information about the role with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\RoleApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$role_id = 'role_id_example'; // string | id of role
$role = new \OpenAPI\Client\Model\Role(); // \OpenAPI\Client\Model\Role | Role

try {
    $result = $apiInstance->updateRole($role_id, $role);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling RoleApi->updateRole: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **role_id** | **string**| id of role | |
| **role** | [**\OpenAPI\Client\Model\Role**](../Model/Role.md)| Role | |

### Return type

[**\OpenAPI\Client\Model\Role**](../Model/Role.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

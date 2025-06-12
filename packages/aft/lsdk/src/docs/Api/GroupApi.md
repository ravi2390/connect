# OpenAPI\Client\GroupApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**addGroupGroup()**](GroupApi.md#addGroupGroup) | **POST** /groups/{group_id}/groups | Add a Group to Group |
| [**addGroupUser()**](GroupApi.md#addGroupUser) | **POST** /groups/{group_id}/users | Add a User to Group |
| [**allGroupGroups()**](GroupApi.md#allGroupGroups) | **GET** /groups/{group_id}/groups | Get All Groups in Group |
| [**allGroupUsers()**](GroupApi.md#allGroupUsers) | **GET** /groups/{group_id}/users | Get All Users in Group |
| [**allGroups()**](GroupApi.md#allGroups) | **GET** /groups | Get All Groups |
| [**createGroup()**](GroupApi.md#createGroup) | **POST** /groups | Create Group |
| [**deleteGroup()**](GroupApi.md#deleteGroup) | **DELETE** /groups/{group_id} | Delete Group |
| [**deleteGroupFromGroup()**](GroupApi.md#deleteGroupFromGroup) | **DELETE** /groups/{group_id}/groups/{deleting_group_id} | Deletes a Group from Group |
| [**deleteGroupUser()**](GroupApi.md#deleteGroupUser) | **DELETE** /groups/{group_id}/users/{user_id} | Remove a User from Group |
| [**deleteUserAttributeGroupValue()**](GroupApi.md#deleteUserAttributeGroupValue) | **DELETE** /groups/{group_id}/attribute_values/{user_attribute_id} | Delete User Attribute Group Value |
| [**group()**](GroupApi.md#group) | **GET** /groups/{group_id} | Get Group |
| [**searchGroups()**](GroupApi.md#searchGroups) | **GET** /groups/search | Search Groups |
| [**searchGroupsWithHierarchy()**](GroupApi.md#searchGroupsWithHierarchy) | **GET** /groups/search/with_hierarchy | Search Groups with Hierarchy |
| [**searchGroupsWithRoles()**](GroupApi.md#searchGroupsWithRoles) | **GET** /groups/search/with_roles | Search Groups with Roles |
| [**updateGroup()**](GroupApi.md#updateGroup) | **PATCH** /groups/{group_id} | Update Group |
| [**updateUserAttributeGroupValue()**](GroupApi.md#updateUserAttributeGroupValue) | **PATCH** /groups/{group_id}/attribute_values/{user_attribute_id} | Set User Attribute Group Value |


## `addGroupGroup()`

```php
addGroupGroup($group_id, $group_id_for_group_inclusion): \OpenAPI\Client\Model\Group
```

Add a Group to Group

### Adds a new group to a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$group_id_for_group_inclusion = new \OpenAPI\Client\Model\GroupIdForGroupInclusion(); // \OpenAPI\Client\Model\GroupIdForGroupInclusion | Group id to add

try {
    $result = $apiInstance->addGroupGroup($group_id, $group_id_for_group_inclusion);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->addGroupGroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **group_id_for_group_inclusion** | [**\OpenAPI\Client\Model\GroupIdForGroupInclusion**](../Model/GroupIdForGroupInclusion.md)| Group id to add | |

### Return type

[**\OpenAPI\Client\Model\Group**](../Model/Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `addGroupUser()`

```php
addGroupUser($group_id, $group_id_for_group_user_inclusion): \OpenAPI\Client\Model\User
```

Add a User to Group

### Adds a new user to a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$group_id_for_group_user_inclusion = new \OpenAPI\Client\Model\GroupIdForGroupUserInclusion(); // \OpenAPI\Client\Model\GroupIdForGroupUserInclusion | User id to add

try {
    $result = $apiInstance->addGroupUser($group_id, $group_id_for_group_user_inclusion);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->addGroupUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **group_id_for_group_user_inclusion** | [**\OpenAPI\Client\Model\GroupIdForGroupUserInclusion**](../Model/GroupIdForGroupUserInclusion.md)| User id to add | |

### Return type

[**\OpenAPI\Client\Model\User**](../Model/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allGroupGroups()`

```php
allGroupGroups($group_id, $fields): \OpenAPI\Client\Model\Group[]
```

Get All Groups in Group

### Get information about all the groups in a group

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allGroupGroups($group_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->allGroupGroups: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
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

## `allGroupUsers()`

```php
allGroupUsers($group_id, $fields, $page, $per_page, $limit, $offset, $sorts): \OpenAPI\Client\Model\User[]
```

Get All Users in Group

### Get information about all the users directly included in a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$fields = 'fields_example'; // string | Requested fields.
$page = 56; // int | DEPRECATED. Use limit and offset instead. Return only page N of paginated results
$per_page = 56; // int | DEPRECATED. Use limit and offset instead. Return N rows of data per page
$limit = 56; // int | Number of results to return. (used with offset and takes priority over page and per_page)
$offset = 56; // int | Number of results to skip before returning any. (used with limit and takes priority over page and per_page)
$sorts = 'sorts_example'; // string | Fields to sort by.

try {
    $result = $apiInstance->allGroupUsers($group_id, $fields, $page, $per_page, $limit, $offset, $sorts);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->allGroupUsers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **fields** | **string**| Requested fields. | [optional] |
| **page** | **int**| DEPRECATED. Use limit and offset instead. Return only page N of paginated results | [optional] |
| **per_page** | **int**| DEPRECATED. Use limit and offset instead. Return N rows of data per page | [optional] |
| **limit** | **int**| Number of results to return. (used with offset and takes priority over page and per_page) | [optional] |
| **offset** | **int**| Number of results to skip before returning any. (used with limit and takes priority over page and per_page) | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |

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

## `allGroups()`

```php
allGroups($fields, $page, $per_page, $limit, $offset, $sorts, $ids, $content_metadata_id, $can_add_to_content_metadata): \OpenAPI\Client\Model\Group[]
```

Get All Groups

### Get information about all groups.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$page = 56; // int | DEPRECATED. Use limit and offset instead. Return only page N of paginated results
$per_page = 56; // int | DEPRECATED. Use limit and offset instead. Return N rows of data per page
$limit = 56; // int | Number of results to return. (used with offset and takes priority over page and per_page)
$offset = 56; // int | Number of results to skip before returning any. (used with limit and takes priority over page and per_page)
$sorts = 'sorts_example'; // string | Fields to sort by.
$ids = array('ids_example'); // string[] | Optional of ids to get specific groups.
$content_metadata_id = 'content_metadata_id_example'; // string | Id of content metadata to which groups must have access.
$can_add_to_content_metadata = True; // bool | Select only groups that either can/cannot be given access to content.

try {
    $result = $apiInstance->allGroups($fields, $page, $per_page, $limit, $offset, $sorts, $ids, $content_metadata_id, $can_add_to_content_metadata);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->allGroups: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **page** | **int**| DEPRECATED. Use limit and offset instead. Return only page N of paginated results | [optional] |
| **per_page** | **int**| DEPRECATED. Use limit and offset instead. Return N rows of data per page | [optional] |
| **limit** | **int**| Number of results to return. (used with offset and takes priority over page and per_page) | [optional] |
| **offset** | **int**| Number of results to skip before returning any. (used with limit and takes priority over page and per_page) | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **ids** | [**string[]**](../Model/string.md)| Optional of ids to get specific groups. | [optional] |
| **content_metadata_id** | **string**| Id of content metadata to which groups must have access. | [optional] |
| **can_add_to_content_metadata** | **bool**| Select only groups that either can/cannot be given access to content. | [optional] |

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

## `createGroup()`

```php
createGroup($group, $fields): \OpenAPI\Client\Model\Group
```

Create Group

### Creates a new group (admin only).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group = new \OpenAPI\Client\Model\Group(); // \OpenAPI\Client\Model\Group | Group
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createGroup($group, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->createGroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group** | [**\OpenAPI\Client\Model\Group**](../Model/Group.md)| Group | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Group**](../Model/Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteGroup()`

```php
deleteGroup($group_id): string
```

Delete Group

### Deletes a group (admin only).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group

try {
    $result = $apiInstance->deleteGroup($group_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->deleteGroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |

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

## `deleteGroupFromGroup()`

```php
deleteGroupFromGroup($group_id, $deleting_group_id)
```

Deletes a Group from Group

### Removes a group from a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$deleting_group_id = 'deleting_group_id_example'; // string | Id of group to delete

try {
    $apiInstance->deleteGroupFromGroup($group_id, $deleting_group_id);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->deleteGroupFromGroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **deleting_group_id** | **string**| Id of group to delete | |

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

## `deleteGroupUser()`

```php
deleteGroupUser($group_id, $user_id)
```

Remove a User from Group

### Removes a user from a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$user_id = 'user_id_example'; // string | Id of user to remove from group

try {
    $apiInstance->deleteGroupUser($group_id, $user_id);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->deleteGroupUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **user_id** | **string**| Id of user to remove from group | |

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

## `deleteUserAttributeGroupValue()`

```php
deleteUserAttributeGroupValue($group_id, $user_attribute_id)
```

Delete User Attribute Group Value

### Remove a user attribute value from a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute

try {
    $apiInstance->deleteUserAttributeGroupValue($group_id, $user_attribute_id);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->deleteUserAttributeGroupValue: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **user_attribute_id** | **string**| Id of user attribute | |

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

## `group()`

```php
group($group_id, $fields): \OpenAPI\Client\Model\Group
```

Get Group

### Get information about a group.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->group($group_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->group: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Group**](../Model/Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchGroups()`

```php
searchGroups($fields, $limit, $offset, $sorts, $filter_or, $id, $name, $external_group_id, $externally_managed, $externally_orphaned): \OpenAPI\Client\Model\Group[]
```

Search Groups

### Search groups  Returns all group records that match the given search criteria.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$id = 'id_example'; // string | Match group id.
$name = 'name_example'; // string | Match group name.
$external_group_id = 'external_group_id_example'; // string | Match group external_group_id.
$externally_managed = True; // bool | Match group externally_managed.
$externally_orphaned = True; // bool | Match group externally_orphaned.

try {
    $result = $apiInstance->searchGroups($fields, $limit, $offset, $sorts, $filter_or, $id, $name, $external_group_id, $externally_managed, $externally_orphaned);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->searchGroups: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **id** | **string**| Match group id. | [optional] |
| **name** | **string**| Match group name. | [optional] |
| **external_group_id** | **string**| Match group external_group_id. | [optional] |
| **externally_managed** | **bool**| Match group externally_managed. | [optional] |
| **externally_orphaned** | **bool**| Match group externally_orphaned. | [optional] |

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

## `searchGroupsWithHierarchy()`

```php
searchGroupsWithHierarchy($fields, $limit, $offset, $sorts, $filter_or, $id, $name, $external_group_id, $externally_managed, $externally_orphaned): \OpenAPI\Client\Model\GroupHierarchy[]
```

Search Groups with Hierarchy

### Search groups include hierarchy  Returns all group records that match the given search criteria, and attaches associated role_ids and parent group_ids.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$id = 'id_example'; // string | Match group id.
$name = 'name_example'; // string | Match group name.
$external_group_id = 'external_group_id_example'; // string | Match group external_group_id.
$externally_managed = True; // bool | Match group externally_managed.
$externally_orphaned = True; // bool | Match group externally_orphaned.

try {
    $result = $apiInstance->searchGroupsWithHierarchy($fields, $limit, $offset, $sorts, $filter_or, $id, $name, $external_group_id, $externally_managed, $externally_orphaned);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->searchGroupsWithHierarchy: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **id** | **string**| Match group id. | [optional] |
| **name** | **string**| Match group name. | [optional] |
| **external_group_id** | **string**| Match group external_group_id. | [optional] |
| **externally_managed** | **bool**| Match group externally_managed. | [optional] |
| **externally_orphaned** | **bool**| Match group externally_orphaned. | [optional] |

### Return type

[**\OpenAPI\Client\Model\GroupHierarchy[]**](../Model/GroupHierarchy.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchGroupsWithRoles()`

```php
searchGroupsWithRoles($fields, $limit, $offset, $sorts, $filter_or, $id, $name, $external_group_id, $externally_managed, $externally_orphaned): \OpenAPI\Client\Model\GroupSearch[]
```

Search Groups with Roles

### Search groups include roles  Returns all group records that match the given search criteria, and attaches any associated roles.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$id = 'id_example'; // string | Match group id.
$name = 'name_example'; // string | Match group name.
$external_group_id = 'external_group_id_example'; // string | Match group external_group_id.
$externally_managed = True; // bool | Match group externally_managed.
$externally_orphaned = True; // bool | Match group externally_orphaned.

try {
    $result = $apiInstance->searchGroupsWithRoles($fields, $limit, $offset, $sorts, $filter_or, $id, $name, $external_group_id, $externally_managed, $externally_orphaned);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->searchGroupsWithRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **id** | **string**| Match group id. | [optional] |
| **name** | **string**| Match group name. | [optional] |
| **external_group_id** | **string**| Match group external_group_id. | [optional] |
| **externally_managed** | **bool**| Match group externally_managed. | [optional] |
| **externally_orphaned** | **bool**| Match group externally_orphaned. | [optional] |

### Return type

[**\OpenAPI\Client\Model\GroupSearch[]**](../Model/GroupSearch.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateGroup()`

```php
updateGroup($group_id, $group, $fields): \OpenAPI\Client\Model\Group
```

Update Group

### Updates the a group (admin only).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$group = new \OpenAPI\Client\Model\Group(); // \OpenAPI\Client\Model\Group | Group
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateGroup($group_id, $group, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->updateGroup: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **group** | [**\OpenAPI\Client\Model\Group**](../Model/Group.md)| Group | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Group**](../Model/Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateUserAttributeGroupValue()`

```php
updateUserAttributeGroupValue($group_id, $user_attribute_id, $user_attribute_group_value): \OpenAPI\Client\Model\UserAttributeGroupValue
```

Set User Attribute Group Value

### Set the value of a user attribute for a group.  For information about how user attribute values are calculated, see [Set User Attribute Group Values](#!/UserAttribute/set_user_attribute_group_values).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\GroupApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$group_id = 'group_id_example'; // string | Id of group
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute
$user_attribute_group_value = new \OpenAPI\Client\Model\UserAttributeGroupValue(); // \OpenAPI\Client\Model\UserAttributeGroupValue | New value for group.

try {
    $result = $apiInstance->updateUserAttributeGroupValue($group_id, $user_attribute_id, $user_attribute_group_value);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling GroupApi->updateUserAttributeGroupValue: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **group_id** | **string**| Id of group | |
| **user_attribute_id** | **string**| Id of user attribute | |
| **user_attribute_group_value** | [**\OpenAPI\Client\Model\UserAttributeGroupValue**](../Model/UserAttributeGroupValue.md)| New value for group. | |

### Return type

[**\OpenAPI\Client\Model\UserAttributeGroupValue**](../Model/UserAttributeGroupValue.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

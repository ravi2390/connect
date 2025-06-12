# OpenAPI\Client\UserAttributeApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allUserAttributeGroupValues()**](UserAttributeApi.md#allUserAttributeGroupValues) | **GET** /user_attributes/{user_attribute_id}/group_values | Get User Attribute Group Values |
| [**allUserAttributes()**](UserAttributeApi.md#allUserAttributes) | **GET** /user_attributes | Get All User Attributes |
| [**createUserAttribute()**](UserAttributeApi.md#createUserAttribute) | **POST** /user_attributes | Create User Attribute |
| [**deleteUserAttribute()**](UserAttributeApi.md#deleteUserAttribute) | **DELETE** /user_attributes/{user_attribute_id} | Delete User Attribute |
| [**setUserAttributeGroupValues()**](UserAttributeApi.md#setUserAttributeGroupValues) | **POST** /user_attributes/{user_attribute_id}/group_values | Set User Attribute Group Values |
| [**updateUserAttribute()**](UserAttributeApi.md#updateUserAttribute) | **PATCH** /user_attributes/{user_attribute_id} | Update User Attribute |
| [**userAttribute()**](UserAttributeApi.md#userAttribute) | **GET** /user_attributes/{user_attribute_id} | Get User Attribute |


## `allUserAttributeGroupValues()`

```php
allUserAttributeGroupValues($user_attribute_id, $fields): \OpenAPI\Client\Model\UserAttributeGroupValue[]
```

Get User Attribute Group Values

### Returns all values of a user attribute defined by user groups, in precedence order.  A user may be a member of multiple groups which define different values for a given user attribute. The order of group-values in the response determines precedence for selecting which group-value applies to a given user.  For more information, see [Set User Attribute Group Values](#!/UserAttribute/set_user_attribute_group_values).  Results will only include groups that the caller's user account has permission to see.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allUserAttributeGroupValues($user_attribute_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->allUserAttributeGroupValues: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_attribute_id** | **string**| Id of user attribute | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserAttributeGroupValue[]**](../Model/UserAttributeGroupValue.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allUserAttributes()`

```php
allUserAttributes($fields, $sorts): \OpenAPI\Client\Model\UserAttribute[]
```

Get All User Attributes

### Get information about all user attributes.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$sorts = 'sorts_example'; // string | Fields to order the results by. Sortable fields include: name, label

try {
    $result = $apiInstance->allUserAttributes($fields, $sorts);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->allUserAttributes: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **sorts** | **string**| Fields to order the results by. Sortable fields include: name, label | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserAttribute[]**](../Model/UserAttribute.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createUserAttribute()`

```php
createUserAttribute($user_attribute, $fields): \OpenAPI\Client\Model\UserAttribute
```

Create User Attribute

### Create a new user attribute  Permission information for a user attribute is conveyed through the `can` and `user_can_edit` fields. The `user_can_edit` field indicates whether an attribute is user-editable _anywhere_ in the application. The `can` field gives more granular access information, with the `set_value` child field indicating whether an attribute's value can be set by [Setting the User Attribute User Value](#!/User/set_user_attribute_user_value).  Note: `name` and `label` fields must be unique across all user attributes in the Looker instance. Attempting to create a new user attribute with a name or label that duplicates an existing user attribute will fail with a 422 error.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_attribute = new \OpenAPI\Client\Model\UserAttribute(); // \OpenAPI\Client\Model\UserAttribute | User Attribute
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createUserAttribute($user_attribute, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->createUserAttribute: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_attribute** | [**\OpenAPI\Client\Model\UserAttribute**](../Model/UserAttribute.md)| User Attribute | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserAttribute**](../Model/UserAttribute.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteUserAttribute()`

```php
deleteUserAttribute($user_attribute_id): string
```

Delete User Attribute

### Delete a user attribute (admin only).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute

try {
    $result = $apiInstance->deleteUserAttribute($user_attribute_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->deleteUserAttribute: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_attribute_id** | **string**| Id of user attribute | |

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

## `setUserAttributeGroupValues()`

```php
setUserAttributeGroupValues($user_attribute_id, $user_attribute_group_value): \OpenAPI\Client\Model\UserAttributeGroupValue[]
```

Set User Attribute Group Values

### Define values for a user attribute across a set of groups, in priority order.  This function defines all values for a user attribute defined by user groups. This is a global setting, potentially affecting all users in the system. This function replaces any existing group value definitions for the indicated user attribute.  The value of a user attribute for a given user is determined by searching the following locations, in this order:  1. the user's account settings 2. the groups that the user is a member of 3. the default value of the user attribute, if any  The user may be a member of multiple groups which define different values for that user attribute. The order of items in the group_values parameter determines which group takes priority for that user. Lowest array index wins.  An alternate method to indicate the selection precedence of group-values is to assign numbers to the 'rank' property of each group-value object in the array. Lowest 'rank' value wins. If you use this technique, you must assign a rank value to every group-value object in the array.    To set a user attribute value for a single user, see [Set User Attribute User Value](#!/User/set_user_attribute_user_value). To set a user attribute value for all members of a group, see [Set User Attribute Group Value](#!/Group/update_user_attribute_group_value).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute
$user_attribute_group_value = array(new \OpenAPI\Client\Model\UserAttributeGroupValue()); // \OpenAPI\Client\Model\UserAttributeGroupValue[] | Array of group values.

try {
    $result = $apiInstance->setUserAttributeGroupValues($user_attribute_id, $user_attribute_group_value);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->setUserAttributeGroupValues: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_attribute_id** | **string**| Id of user attribute | |
| **user_attribute_group_value** | [**\OpenAPI\Client\Model\UserAttributeGroupValue[]**](../Model/UserAttributeGroupValue.md)| Array of group values. | |

### Return type

[**\OpenAPI\Client\Model\UserAttributeGroupValue[]**](../Model/UserAttributeGroupValue.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateUserAttribute()`

```php
updateUserAttribute($user_attribute_id, $user_attribute, $fields): \OpenAPI\Client\Model\UserAttribute
```

Update User Attribute

### Update a user attribute definition.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute
$user_attribute = new \OpenAPI\Client\Model\UserAttribute(); // \OpenAPI\Client\Model\UserAttribute | User Attribute
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateUserAttribute($user_attribute_id, $user_attribute, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->updateUserAttribute: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_attribute_id** | **string**| Id of user attribute | |
| **user_attribute** | [**\OpenAPI\Client\Model\UserAttribute**](../Model/UserAttribute.md)| User Attribute | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserAttribute**](../Model/UserAttribute.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userAttribute()`

```php
userAttribute($user_attribute_id, $fields): \OpenAPI\Client\Model\UserAttribute
```

Get User Attribute

### Get information about a user attribute.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserAttributeApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userAttribute($user_attribute_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserAttributeApi->userAttribute: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_attribute_id** | **string**| Id of user attribute | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserAttribute**](../Model/UserAttribute.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

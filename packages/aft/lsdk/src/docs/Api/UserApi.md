# OpenAPI\Client\UserApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allUserCredentialsApi3s()**](UserApi.md#allUserCredentialsApi3s) | **GET** /users/{user_id}/credentials_api3 | Get All API Credentials |
| [**allUserCredentialsEmbeds()**](UserApi.md#allUserCredentialsEmbeds) | **GET** /users/{user_id}/credentials_embed | Get All Embedding Credentials |
| [**allUserSessions()**](UserApi.md#allUserSessions) | **GET** /users/{user_id}/sessions | Get All Web Login Sessions |
| [**allUsers()**](UserApi.md#allUsers) | **GET** /users | Get All Users |
| [**createEmbedUser()**](UserApi.md#createEmbedUser) | **POST** /users/embed_user | Create an embed user from an external user ID |
| [**createUser()**](UserApi.md#createUser) | **POST** /users | Create User |
| [**createUserCredentialsApi3()**](UserApi.md#createUserCredentialsApi3) | **POST** /users/{user_id}/credentials_api3 | Create API Credential |
| [**createUserCredentialsEmail()**](UserApi.md#createUserCredentialsEmail) | **POST** /users/{user_id}/credentials_email | Create Email/Password Credential |
| [**createUserCredentialsEmailPasswordReset()**](UserApi.md#createUserCredentialsEmailPasswordReset) | **POST** /users/{user_id}/credentials_email/password_reset | Create Password Reset Token |
| [**createUserCredentialsTotp()**](UserApi.md#createUserCredentialsTotp) | **POST** /users/{user_id}/credentials_totp | Create Two-Factor Credential |
| [**deleteUser()**](UserApi.md#deleteUser) | **DELETE** /users/{user_id} | Delete User |
| [**deleteUserAttributeUserValue()**](UserApi.md#deleteUserAttributeUserValue) | **DELETE** /users/{user_id}/attribute_values/{user_attribute_id} | Delete User Attribute User Value |
| [**deleteUserCredentialsApi3()**](UserApi.md#deleteUserCredentialsApi3) | **DELETE** /users/{user_id}/credentials_api3/{credentials_api3_id} | Delete API Credential |
| [**deleteUserCredentialsEmail()**](UserApi.md#deleteUserCredentialsEmail) | **DELETE** /users/{user_id}/credentials_email | Delete Email/Password Credential |
| [**deleteUserCredentialsEmbed()**](UserApi.md#deleteUserCredentialsEmbed) | **DELETE** /users/{user_id}/credentials_embed/{credentials_embed_id} | Delete Embedding Credential |
| [**deleteUserCredentialsGoogle()**](UserApi.md#deleteUserCredentialsGoogle) | **DELETE** /users/{user_id}/credentials_google | Delete Google Auth Credential |
| [**deleteUserCredentialsLdap()**](UserApi.md#deleteUserCredentialsLdap) | **DELETE** /users/{user_id}/credentials_ldap | Delete LDAP Credential |
| [**deleteUserCredentialsLookerOpenid()**](UserApi.md#deleteUserCredentialsLookerOpenid) | **DELETE** /users/{user_id}/credentials_looker_openid | Delete Looker OpenId Credential |
| [**deleteUserCredentialsOidc()**](UserApi.md#deleteUserCredentialsOidc) | **DELETE** /users/{user_id}/credentials_oidc | Delete OIDC Auth Credential |
| [**deleteUserCredentialsSaml()**](UserApi.md#deleteUserCredentialsSaml) | **DELETE** /users/{user_id}/credentials_saml | Delete Saml Auth Credential |
| [**deleteUserCredentialsTotp()**](UserApi.md#deleteUserCredentialsTotp) | **DELETE** /users/{user_id}/credentials_totp | Delete Two-Factor Credential |
| [**deleteUserSession()**](UserApi.md#deleteUserSession) | **DELETE** /users/{user_id}/sessions/{session_id} | Delete Web Login Session |
| [**me()**](UserApi.md#me) | **GET** /user | Get Current User |
| [**searchCredentialsEmail()**](UserApi.md#searchCredentialsEmail) | **GET** /credentials_email/search | Search CredentialsEmail |
| [**searchUsers()**](UserApi.md#searchUsers) | **GET** /users/search | Search Users |
| [**searchUsersNames()**](UserApi.md#searchUsersNames) | **GET** /users/search/names/{pattern} | Search User Names |
| [**sendUserCredentialsEmailPasswordReset()**](UserApi.md#sendUserCredentialsEmailPasswordReset) | **POST** /users/{user_id}/credentials_email/send_password_reset | Send Password Reset Token |
| [**setUserAttributeUserValue()**](UserApi.md#setUserAttributeUserValue) | **PATCH** /users/{user_id}/attribute_values/{user_attribute_id} | Set User Attribute User Value |
| [**setUserRoles()**](UserApi.md#setUserRoles) | **PUT** /users/{user_id}/roles | Set User Roles |
| [**updateUser()**](UserApi.md#updateUser) | **PATCH** /users/{user_id} | Update User |
| [**updateUserCredentialsEmail()**](UserApi.md#updateUserCredentialsEmail) | **PATCH** /users/{user_id}/credentials_email | Update Email/Password Credential |
| [**user()**](UserApi.md#user) | **GET** /users/{user_id} | Get User by Id |
| [**userAttributeUserValues()**](UserApi.md#userAttributeUserValues) | **GET** /users/{user_id}/attribute_values | Get User Attribute Values |
| [**userCredentialsApi3()**](UserApi.md#userCredentialsApi3) | **GET** /users/{user_id}/credentials_api3/{credentials_api3_id} | Get API Credential |
| [**userCredentialsEmail()**](UserApi.md#userCredentialsEmail) | **GET** /users/{user_id}/credentials_email | Get Email/Password Credential |
| [**userCredentialsEmbed()**](UserApi.md#userCredentialsEmbed) | **GET** /users/{user_id}/credentials_embed/{credentials_embed_id} | Get Embedding Credential |
| [**userCredentialsGoogle()**](UserApi.md#userCredentialsGoogle) | **GET** /users/{user_id}/credentials_google | Get Google Auth Credential |
| [**userCredentialsLdap()**](UserApi.md#userCredentialsLdap) | **GET** /users/{user_id}/credentials_ldap | Get LDAP Credential |
| [**userCredentialsLookerOpenid()**](UserApi.md#userCredentialsLookerOpenid) | **GET** /users/{user_id}/credentials_looker_openid | Get Looker OpenId Credential |
| [**userCredentialsOidc()**](UserApi.md#userCredentialsOidc) | **GET** /users/{user_id}/credentials_oidc | Get OIDC Auth Credential |
| [**userCredentialsSaml()**](UserApi.md#userCredentialsSaml) | **GET** /users/{user_id}/credentials_saml | Get Saml Auth Credential |
| [**userCredentialsTotp()**](UserApi.md#userCredentialsTotp) | **GET** /users/{user_id}/credentials_totp | Get Two-Factor Credential |
| [**userForCredential()**](UserApi.md#userForCredential) | **GET** /users/credential/{credential_type}/{credential_id} | Get User by Credential Id |
| [**userRoles()**](UserApi.md#userRoles) | **GET** /users/{user_id}/roles | Get User Roles |
| [**userSession()**](UserApi.md#userSession) | **GET** /users/{user_id}/sessions/{session_id} | Get Web Login Session |
| [**wipeoutUserEmails()**](UserApi.md#wipeoutUserEmails) | **POST** /users/{user_id}/update_emails | Wipeout User Emails |


## `allUserCredentialsApi3s()`

```php
allUserCredentialsApi3s($user_id, $fields): \OpenAPI\Client\Model\CredentialsApi3[]
```

Get All API Credentials

### API login information for the specified user. This is for the newer API keys that can be added for any user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allUserCredentialsApi3s($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->allUserCredentialsApi3s: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsApi3[]**](../Model/CredentialsApi3.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allUserCredentialsEmbeds()`

```php
allUserCredentialsEmbeds($user_id, $fields): \OpenAPI\Client\Model\CredentialsEmbed[]
```

Get All Embedding Credentials

### Embed login information for the specified user.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allUserCredentialsEmbeds($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->allUserCredentialsEmbeds: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmbed[]**](../Model/CredentialsEmbed.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allUserSessions()`

```php
allUserSessions($user_id, $fields): \OpenAPI\Client\Model\Session[]
```

Get All Web Login Sessions

### Web login session for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allUserSessions($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->allUserSessions: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Session[]**](../Model/Session.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allUsers()`

```php
allUsers($fields, $page, $per_page, $limit, $offset, $sorts, $ids): \OpenAPI\Client\Model\User[]
```

Get All Users

### Get information about all users.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
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
$ids = array('ids_example'); // string[] | Optional list of ids to get specific users.

try {
    $result = $apiInstance->allUsers($fields, $page, $per_page, $limit, $offset, $sorts, $ids);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->allUsers: ', $e->getMessage(), PHP_EOL;
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
| **ids** | [**string[]**](../Model/string.md)| Optional list of ids to get specific users. | [optional] |

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

## `createEmbedUser()`

```php
createEmbedUser($create_embed_user_request): \OpenAPI\Client\Model\UserPublic
```

Create an embed user from an external user ID

Create an embed user from an external user ID  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$create_embed_user_request = new \OpenAPI\Client\Model\CreateEmbedUserRequest(); // \OpenAPI\Client\Model\CreateEmbedUserRequest

try {
    $result = $apiInstance->createEmbedUser($create_embed_user_request);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->createEmbedUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_embed_user_request** | [**\OpenAPI\Client\Model\CreateEmbedUserRequest**](../Model/CreateEmbedUserRequest.md)|  | |

### Return type

[**\OpenAPI\Client\Model\UserPublic**](../Model/UserPublic.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createUser()`

```php
createUser($fields, $user): \OpenAPI\Client\Model\User
```

Create User

### Create a user with the specified information.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$user = new \OpenAPI\Client\Model\User(); // \OpenAPI\Client\Model\User | User

try {
    $result = $apiInstance->createUser($fields, $user);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->createUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **user** | [**\OpenAPI\Client\Model\User**](../Model/User.md)| User | [optional] |

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

## `createUserCredentialsApi3()`

```php
createUserCredentialsApi3($user_id, $fields): \OpenAPI\Client\Model\CreateCredentialsApi3
```

Create API Credential

### API login information for the specified user. This is for the newer API keys that can be added for any user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createUserCredentialsApi3($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->createUserCredentialsApi3: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CreateCredentialsApi3**](../Model/CreateCredentialsApi3.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createUserCredentialsEmail()`

```php
createUserCredentialsEmail($user_id, $credentials_email, $fields): \OpenAPI\Client\Model\CredentialsEmail
```

Create Email/Password Credential

### Email/password login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$credentials_email = new \OpenAPI\Client\Model\CredentialsEmail(); // \OpenAPI\Client\Model\CredentialsEmail | Email/Password Credential
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createUserCredentialsEmail($user_id, $credentials_email, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->createUserCredentialsEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **credentials_email** | [**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)| Email/Password Credential | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createUserCredentialsEmailPasswordReset()`

```php
createUserCredentialsEmailPasswordReset($user_id, $expires, $fields): \OpenAPI\Client\Model\CredentialsEmail
```

Create Password Reset Token

### Create a password reset token. This will create a cryptographically secure random password reset token for the user. If the user already has a password reset token then this invalidates the old token and creates a new one. The token is expressed as the 'password_reset_url' of the user's email/password credential object. This takes an optional 'expires' param to indicate if the new token should be an expiring token. Tokens that expire are typically used for self-service password resets for existing users. Invitation emails for new users typically are not set to expire. The expire period is always 60 minutes when expires is enabled. This method can be called with an empty body.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$expires = True; // bool | Expiring token.
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createUserCredentialsEmailPasswordReset($user_id, $expires, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->createUserCredentialsEmailPasswordReset: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **expires** | **bool**| Expiring token. | [optional] |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createUserCredentialsTotp()`

```php
createUserCredentialsTotp($user_id, $fields, $credentials_totp): \OpenAPI\Client\Model\CredentialsTotp
```

Create Two-Factor Credential

### Two-factor login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.
$credentials_totp = new \OpenAPI\Client\Model\CredentialsTotp(); // \OpenAPI\Client\Model\CredentialsTotp | Two-Factor Credential

try {
    $result = $apiInstance->createUserCredentialsTotp($user_id, $fields, $credentials_totp);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->createUserCredentialsTotp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |
| **credentials_totp** | [**\OpenAPI\Client\Model\CredentialsTotp**](../Model/CredentialsTotp.md)| Two-Factor Credential | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsTotp**](../Model/CredentialsTotp.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteUser()`

```php
deleteUser($user_id): string
```

Delete User

### Delete the user with a specific id.  **DANGER** this will delete the user and all looks and other information owned by the user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUser($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserAttributeUserValue()`

```php
deleteUserAttributeUserValue($user_id, $user_attribute_id)
```

Delete User Attribute User Value

### Delete a user attribute value from a user's account settings.  After the user attribute value is deleted from the user's account settings, subsequent requests for the user attribute value for this user will draw from the user's groups or the default value of the user attribute. See [Get User Attribute Values](#!/User/user_attribute_user_values) for more information about how user attribute values are resolved.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute

try {
    $apiInstance->deleteUserAttributeUserValue($user_id, $user_attribute_id);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserAttributeUserValue: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
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

## `deleteUserCredentialsApi3()`

```php
deleteUserCredentialsApi3($user_id, $credentials_api3_id): string
```

Delete API Credential

### API login information for the specified user. This is for the newer API keys that can be added for any user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$credentials_api3_id = 'credentials_api3_id_example'; // string | Id of API Credential

try {
    $result = $apiInstance->deleteUserCredentialsApi3($user_id, $credentials_api3_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsApi3: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **credentials_api3_id** | **string**| Id of API Credential | |

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

## `deleteUserCredentialsEmail()`

```php
deleteUserCredentialsEmail($user_id): string
```

Delete Email/Password Credential

### Email/password login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsEmail($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserCredentialsEmbed()`

```php
deleteUserCredentialsEmbed($user_id, $credentials_embed_id): string
```

Delete Embedding Credential

### Embed login information for the specified user.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$credentials_embed_id = 'credentials_embed_id_example'; // string | Id of Embedding Credential

try {
    $result = $apiInstance->deleteUserCredentialsEmbed($user_id, $credentials_embed_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsEmbed: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **credentials_embed_id** | **string**| Id of Embedding Credential | |

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

## `deleteUserCredentialsGoogle()`

```php
deleteUserCredentialsGoogle($user_id): string
```

Delete Google Auth Credential

### Google authentication login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsGoogle($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsGoogle: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserCredentialsLdap()`

```php
deleteUserCredentialsLdap($user_id): string
```

Delete LDAP Credential

### LDAP login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsLdap($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsLdap: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserCredentialsLookerOpenid()`

```php
deleteUserCredentialsLookerOpenid($user_id): string
```

Delete Looker OpenId Credential

### Looker Openid login information for the specified user. Used by Looker Analysts.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsLookerOpenid($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsLookerOpenid: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserCredentialsOidc()`

```php
deleteUserCredentialsOidc($user_id): string
```

Delete OIDC Auth Credential

### OpenID Connect (OIDC) authentication login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsOidc($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsOidc: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserCredentialsSaml()`

```php
deleteUserCredentialsSaml($user_id): string
```

Delete Saml Auth Credential

### Saml authentication login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsSaml($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsSaml: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserCredentialsTotp()`

```php
deleteUserCredentialsTotp($user_id): string
```

Delete Two-Factor Credential

### Two-factor login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user

try {
    $result = $apiInstance->deleteUserCredentialsTotp($user_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserCredentialsTotp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |

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

## `deleteUserSession()`

```php
deleteUserSession($user_id, $session_id): string
```

Delete Web Login Session

### Web login session for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$session_id = 'session_id_example'; // string | Id of Web Login Session

try {
    $result = $apiInstance->deleteUserSession($user_id, $session_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->deleteUserSession: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **session_id** | **string**| Id of Web Login Session | |

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

## `me()`

```php
me($fields): \OpenAPI\Client\Model\User
```

Get Current User

### Get information about the current user; i.e. the user account currently calling the API.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->me($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->me: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\User**](../Model/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchCredentialsEmail()`

```php
searchCredentialsEmail($fields, $limit, $offset, $sorts, $id, $email, $emails, $filter_or): \OpenAPI\Client\Model\CredentialsEmailSearch[]
```

Search CredentialsEmail

### Search email credentials  Returns all credentials_email records that match the given search criteria.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.   Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$limit = 56; // int | Number of results to return (used with `offset`).
$offset = 56; // int | Number of results to skip before returning any (used with `limit`).
$sorts = 'sorts_example'; // string | Fields to sort by.
$id = 'id_example'; // string | Match credentials_email id.
$email = 'email_example'; // string | Match credentials_email email.
$emails = 'emails_example'; // string | Find credentials_email that match given emails.
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression.

try {
    $result = $apiInstance->searchCredentialsEmail($fields, $limit, $offset, $sorts, $id, $email, $emails, $filter_or);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->searchCredentialsEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **limit** | **int**| Number of results to return (used with &#x60;offset&#x60;). | [optional] |
| **offset** | **int**| Number of results to skip before returning any (used with &#x60;limit&#x60;). | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **id** | **string**| Match credentials_email id. | [optional] |
| **email** | **string**| Match credentials_email email. | [optional] |
| **emails** | **string**| Find credentials_email that match given emails. | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmailSearch[]**](../Model/CredentialsEmailSearch.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchUsers()`

```php
searchUsers($fields, $page, $per_page, $limit, $offset, $sorts, $id, $first_name, $last_name, $verified_looker_employee, $embed_user, $email, $is_disabled, $filter_or, $content_metadata_id, $group_id): \OpenAPI\Client\Model\User[]
```

Search Users

### Search users  Returns all<sup>*</sup> user records that match the given search criteria.  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.   (<sup>*</sup>) Results are always filtered to the level of information the caller is permitted to view. Looker admins can see all user details; normal users in an open system can see names of other users but no details; normal users in a closed system can only see names of other users who are members of the same group as the user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Include only these fields in the response
$page = 56; // int | DEPRECATED. Use limit and offset instead. Return only page N of paginated results
$per_page = 56; // int | DEPRECATED. Use limit and offset instead. Return N rows of data per page
$limit = 56; // int | Number of results to return. (used with offset and takes priority over page and per_page)
$offset = 56; // int | Number of results to skip before returning any. (used with limit and takes priority over page and per_page)
$sorts = 'sorts_example'; // string | Fields to sort by.
$id = 'id_example'; // string | Match User Id.
$first_name = 'first_name_example'; // string | Match First name.
$last_name = 'last_name_example'; // string | Match Last name.
$verified_looker_employee = True; // bool | Search for user accounts associated with Looker employees
$embed_user = True; // bool | Search for only embed users
$email = 'email_example'; // string | Search for the user with this email address
$is_disabled = True; // bool | Search for disabled user accounts
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$content_metadata_id = 'content_metadata_id_example'; // string | Search for users who have access to this content_metadata item
$group_id = 'group_id_example'; // string | Search for users who are direct members of this group

try {
    $result = $apiInstance->searchUsers($fields, $page, $per_page, $limit, $offset, $sorts, $id, $first_name, $last_name, $verified_looker_employee, $embed_user, $email, $is_disabled, $filter_or, $content_metadata_id, $group_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->searchUsers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Include only these fields in the response | [optional] |
| **page** | **int**| DEPRECATED. Use limit and offset instead. Return only page N of paginated results | [optional] |
| **per_page** | **int**| DEPRECATED. Use limit and offset instead. Return N rows of data per page | [optional] |
| **limit** | **int**| Number of results to return. (used with offset and takes priority over page and per_page) | [optional] |
| **offset** | **int**| Number of results to skip before returning any. (used with limit and takes priority over page and per_page) | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **id** | **string**| Match User Id. | [optional] |
| **first_name** | **string**| Match First name. | [optional] |
| **last_name** | **string**| Match Last name. | [optional] |
| **verified_looker_employee** | **bool**| Search for user accounts associated with Looker employees | [optional] |
| **embed_user** | **bool**| Search for only embed users | [optional] |
| **email** | **string**| Search for the user with this email address | [optional] |
| **is_disabled** | **bool**| Search for disabled user accounts | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **content_metadata_id** | **string**| Search for users who have access to this content_metadata item | [optional] |
| **group_id** | **string**| Search for users who are direct members of this group | [optional] |

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

## `searchUsersNames()`

```php
searchUsersNames($pattern, $fields, $page, $per_page, $limit, $offset, $sorts, $id, $first_name, $last_name, $verified_looker_employee, $email, $is_disabled): \OpenAPI\Client\Model\User[]
```

Search User Names

### Search for user accounts by name  Returns all user accounts where `first_name` OR `last_name` OR `email` field values match a pattern. The pattern can contain `%` and `_` wildcards as in SQL LIKE expressions.  Any additional search params will be combined into a logical AND expression.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$pattern = 'pattern_example'; // string | Pattern to match
$fields = 'fields_example'; // string | Include only these fields in the response
$page = 56; // int | DEPRECATED. Use limit and offset instead. Return only page N of paginated results
$per_page = 56; // int | DEPRECATED. Use limit and offset instead. Return N rows of data per page
$limit = 56; // int | Number of results to return. (used with offset and takes priority over page and per_page)
$offset = 56; // int | Number of results to skip before returning any. (used with limit and takes priority over page and per_page)
$sorts = 'sorts_example'; // string | Fields to sort by
$id = 'id_example'; // string | Match User Id
$first_name = 'first_name_example'; // string | Match First name
$last_name = 'last_name_example'; // string | Match Last name
$verified_looker_employee = True; // bool | Match Verified Looker employee
$email = 'email_example'; // string | Match Email Address
$is_disabled = True; // bool | Include or exclude disabled accounts in the results

try {
    $result = $apiInstance->searchUsersNames($pattern, $fields, $page, $per_page, $limit, $offset, $sorts, $id, $first_name, $last_name, $verified_looker_employee, $email, $is_disabled);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->searchUsersNames: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **pattern** | **string**| Pattern to match | |
| **fields** | **string**| Include only these fields in the response | [optional] |
| **page** | **int**| DEPRECATED. Use limit and offset instead. Return only page N of paginated results | [optional] |
| **per_page** | **int**| DEPRECATED. Use limit and offset instead. Return N rows of data per page | [optional] |
| **limit** | **int**| Number of results to return. (used with offset and takes priority over page and per_page) | [optional] |
| **offset** | **int**| Number of results to skip before returning any. (used with limit and takes priority over page and per_page) | [optional] |
| **sorts** | **string**| Fields to sort by | [optional] |
| **id** | **string**| Match User Id | [optional] |
| **first_name** | **string**| Match First name | [optional] |
| **last_name** | **string**| Match Last name | [optional] |
| **verified_looker_employee** | **bool**| Match Verified Looker employee | [optional] |
| **email** | **string**| Match Email Address | [optional] |
| **is_disabled** | **bool**| Include or exclude disabled accounts in the results | [optional] |

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

## `sendUserCredentialsEmailPasswordReset()`

```php
sendUserCredentialsEmailPasswordReset($user_id, $fields): \OpenAPI\Client\Model\CredentialsEmail
```

Send Password Reset Token

### Send a password reset token. This will send a password reset email to the user. If a password reset token does not already exist for this user, it will create one and then send it. If the user has not yet set up their account, it will send a setup email to the user. The URL sent in the email is expressed as the 'password_reset_url' of the user's email/password credential object. Password reset URLs will expire in 60 minutes. This method can be called with an empty body.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->sendUserCredentialsEmailPasswordReset($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->sendUserCredentialsEmailPasswordReset: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setUserAttributeUserValue()`

```php
setUserAttributeUserValue($user_id, $user_attribute_id, $user_attribute_with_value): \OpenAPI\Client\Model\UserAttributeWithValue
```

Set User Attribute User Value

### Store a custom value for a user attribute in a user's account settings.  Per-user user attribute values take precedence over group or default values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$user_attribute_id = 'user_attribute_id_example'; // string | Id of user attribute
$user_attribute_with_value = new \OpenAPI\Client\Model\UserAttributeWithValue(); // \OpenAPI\Client\Model\UserAttributeWithValue | New attribute value for user.

try {
    $result = $apiInstance->setUserAttributeUserValue($user_id, $user_attribute_id, $user_attribute_with_value);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->setUserAttributeUserValue: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **user_attribute_id** | **string**| Id of user attribute | |
| **user_attribute_with_value** | [**\OpenAPI\Client\Model\UserAttributeWithValue**](../Model/UserAttributeWithValue.md)| New attribute value for user. | |

### Return type

[**\OpenAPI\Client\Model\UserAttributeWithValue**](../Model/UserAttributeWithValue.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setUserRoles()`

```php
setUserRoles($user_id, $request_body, $fields): \OpenAPI\Client\Model\Role[]
```

Set User Roles

### Set roles of the user with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$request_body = array('request_body_example'); // string[] | array of roles ids for user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->setUserRoles($user_id, $request_body, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->setUserRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **request_body** | [**string[]**](../Model/string.md)| array of roles ids for user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Role[]**](../Model/Role.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateUser()`

```php
updateUser($user_id, $user, $fields): \OpenAPI\Client\Model\User
```

Update User

### Update information about the user with a specific id.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$user = new \OpenAPI\Client\Model\User(); // \OpenAPI\Client\Model\User | User
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateUser($user_id, $user, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->updateUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **user** | [**\OpenAPI\Client\Model\User**](../Model/User.md)| User | |
| **fields** | **string**| Requested fields. | [optional] |

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

## `updateUserCredentialsEmail()`

```php
updateUserCredentialsEmail($user_id, $credentials_email, $fields): \OpenAPI\Client\Model\CredentialsEmail
```

Update Email/Password Credential

### Email/password login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$credentials_email = new \OpenAPI\Client\Model\CredentialsEmail(); // \OpenAPI\Client\Model\CredentialsEmail | Email/Password Credential
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateUserCredentialsEmail($user_id, $credentials_email, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->updateUserCredentialsEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **credentials_email** | [**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)| Email/Password Credential | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `user()`

```php
user($user_id, $fields): \OpenAPI\Client\Model\User
```

Get User by Id

### Get information about the user with a specific id.  If the caller is an admin or the caller is the user being specified, then full user information will be returned. Otherwise, a minimal 'public' variant of the user information will be returned. This contains The user name and avatar url, but no sensitive information.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->user($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->user: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\User**](../Model/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userAttributeUserValues()`

```php
userAttributeUserValues($user_id, $fields, $user_attribute_ids, $all_values, $include_unset): \OpenAPI\Client\Model\UserAttributeWithValue[]
```

Get User Attribute Values

### Get user attribute values for a given user.  Returns the values of specified user attributes (or all user attributes) for a certain user.  A value for each user attribute is searched for in the following locations, in this order:  1. in the user's account information 1. in groups that the user is a member of 1. the default value of the user attribute  If more than one group has a value defined for a user attribute, the group with the lowest rank wins.  The response will only include user attributes for which values were found. Use `include_unset=true` to include empty records for user attributes with no value.  The value of all hidden user attributes will be blank.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.
$user_attribute_ids = array('user_attribute_ids_example'); // string[] | Specific user attributes to request. Omit or leave blank to request all user attributes.
$all_values = True; // bool | If true, returns all values in the search path instead of just the first value found. Useful for debugging group precedence.
$include_unset = True; // bool | If true, returns an empty record for each requested attribute that has no user, group, or default value.

try {
    $result = $apiInstance->userAttributeUserValues($user_id, $fields, $user_attribute_ids, $all_values, $include_unset);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userAttributeUserValues: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |
| **user_attribute_ids** | [**string[]**](../Model/string.md)| Specific user attributes to request. Omit or leave blank to request all user attributes. | [optional] |
| **all_values** | **bool**| If true, returns all values in the search path instead of just the first value found. Useful for debugging group precedence. | [optional] |
| **include_unset** | **bool**| If true, returns an empty record for each requested attribute that has no user, group, or default value. | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserAttributeWithValue[]**](../Model/UserAttributeWithValue.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsApi3()`

```php
userCredentialsApi3($user_id, $credentials_api3_id, $fields): \OpenAPI\Client\Model\CredentialsApi3
```

Get API Credential

### API login information for the specified user. This is for the newer API keys that can be added for any user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$credentials_api3_id = 'credentials_api3_id_example'; // string | Id of API Credential
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsApi3($user_id, $credentials_api3_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsApi3: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **credentials_api3_id** | **string**| Id of API Credential | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsApi3**](../Model/CredentialsApi3.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsEmail()`

```php
userCredentialsEmail($user_id, $fields): \OpenAPI\Client\Model\CredentialsEmail
```

Get Email/Password Credential

### Email/password login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsEmail($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmail**](../Model/CredentialsEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsEmbed()`

```php
userCredentialsEmbed($user_id, $credentials_embed_id, $fields): \OpenAPI\Client\Model\CredentialsEmbed
```

Get Embedding Credential

### Embed login information for the specified user.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$credentials_embed_id = 'credentials_embed_id_example'; // string | Id of Embedding Credential
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsEmbed($user_id, $credentials_embed_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsEmbed: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **credentials_embed_id** | **string**| Id of Embedding Credential | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsEmbed**](../Model/CredentialsEmbed.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsGoogle()`

```php
userCredentialsGoogle($user_id, $fields): \OpenAPI\Client\Model\CredentialsGoogle
```

Get Google Auth Credential

### Google authentication login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsGoogle($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsGoogle: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsGoogle**](../Model/CredentialsGoogle.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsLdap()`

```php
userCredentialsLdap($user_id, $fields): \OpenAPI\Client\Model\CredentialsLDAP
```

Get LDAP Credential

### LDAP login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsLdap($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsLdap: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsLDAP**](../Model/CredentialsLDAP.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsLookerOpenid()`

```php
userCredentialsLookerOpenid($user_id, $fields): \OpenAPI\Client\Model\CredentialsLookerOpenid
```

Get Looker OpenId Credential

### Looker Openid login information for the specified user. Used by Looker Analysts.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsLookerOpenid($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsLookerOpenid: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsLookerOpenid**](../Model/CredentialsLookerOpenid.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsOidc()`

```php
userCredentialsOidc($user_id, $fields): \OpenAPI\Client\Model\CredentialsOIDC
```

Get OIDC Auth Credential

### OpenID Connect (OIDC) authentication login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsOidc($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsOidc: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsOIDC**](../Model/CredentialsOIDC.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsSaml()`

```php
userCredentialsSaml($user_id, $fields): \OpenAPI\Client\Model\CredentialsSaml
```

Get Saml Auth Credential

### Saml authentication login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsSaml($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsSaml: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsSaml**](../Model/CredentialsSaml.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userCredentialsTotp()`

```php
userCredentialsTotp($user_id, $fields): \OpenAPI\Client\Model\CredentialsTotp
```

Get Two-Factor Credential

### Two-factor login information for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userCredentialsTotp($user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userCredentialsTotp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\CredentialsTotp**](../Model/CredentialsTotp.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userForCredential()`

```php
userForCredential($credential_type, $credential_id, $fields): \OpenAPI\Client\Model\User
```

Get User by Credential Id

### Get information about the user with a credential of given type with specific id.  This is used to do things like find users by their embed external_user_id. Or, find the user with a given api3 client_id, etc. The 'credential_type' matches the 'type' name of the various credential types. It must be one of the values listed in the table below. The 'credential_id' is your unique Id for the user and is specific to each type of credential.  An example using the Ruby sdk might look like:  `sdk.user_for_credential('embed', 'customer-4959425')`  This table shows the supported 'Credential Type' strings. The right column is for reference; it shows which field in the given credential type is actually searched when finding a user with the supplied 'credential_id'.  | Credential Types | Id Field Matched | | ---------------- | ---------------- | | email            | email            | | google           | google_user_id   | | saml             | saml_user_id     | | oidc             | oidc_user_id     | | ldap             | ldap_id          | | api              | token            | | api3             | client_id        | | embed            | external_user_id | | looker_openid    | email            |  **NOTE**: The 'api' credential type was only used with the legacy Looker query API and is no longer supported. The credential type for API you are currently looking at is 'api3'.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$credential_type = 'credential_type_example'; // string | Type name of credential
$credential_id = 'credential_id_example'; // string | Id of credential
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userForCredential($credential_type, $credential_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userForCredential: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **credential_type** | **string**| Type name of credential | |
| **credential_id** | **string**| Id of credential | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\User**](../Model/User.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `userRoles()`

```php
userRoles($user_id, $fields, $direct_association_only): \OpenAPI\Client\Model\Role[]
```

Get User Roles

### Get information about roles of a given user

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$fields = 'fields_example'; // string | Requested fields.
$direct_association_only = True; // bool | Get only roles associated directly with the user: exclude those only associated through groups.

try {
    $result = $apiInstance->userRoles($user_id, $fields, $direct_association_only);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userRoles: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **fields** | **string**| Requested fields. | [optional] |
| **direct_association_only** | **bool**| Get only roles associated directly with the user: exclude those only associated through groups. | [optional] |

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

## `userSession()`

```php
userSession($user_id, $session_id, $fields): \OpenAPI\Client\Model\Session
```

Get Web Login Session

### Web login session for the specified user.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$session_id = 'session_id_example'; // string | Id of Web Login Session
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->userSession($user_id, $session_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->userSession: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **session_id** | **string**| Id of Web Login Session | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Session**](../Model/Session.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `wipeoutUserEmails()`

```php
wipeoutUserEmails($user_id, $user_email_only, $fields): \OpenAPI\Client\Model\User
```

Wipeout User Emails

### Change a disabled user's email addresses  Allows the admin to change the email addresses for all the user's associated credentials.  Will overwrite all associated email addresses with the value supplied in the 'email' body param. The user's 'is_disabled' status must be true. If the user has a credential email, they will receive a verification email and the user will be disabled until they verify the email  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\UserApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$user_id = 'user_id_example'; // string | Id of user
$user_email_only = new \OpenAPI\Client\Model\UserEmailOnly(); // \OpenAPI\Client\Model\UserEmailOnly
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->wipeoutUserEmails($user_id, $user_email_only, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UserApi->wipeoutUserEmails: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **user_id** | **string**| Id of user | |
| **user_email_only** | [**\OpenAPI\Client\Model\UserEmailOnly**](../Model/UserEmailOnly.md)|  | |
| **fields** | **string**| Requested fields. | [optional] |

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

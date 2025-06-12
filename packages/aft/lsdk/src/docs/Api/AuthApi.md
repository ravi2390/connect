# OpenAPI\Client\AuthApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**acquireEmbedCookielessSession()**](AuthApi.md#acquireEmbedCookielessSession) | **POST** /embed/cookieless_session/acquire | Create Acquire cookieless embed session |
| [**activateAppUser()**](AuthApi.md#activateAppUser) | **POST** /oauth_client_apps/{client_guid}/users/{user_id} | Activate OAuth App User |
| [**addSupportAccessAllowlistEntries()**](AuthApi.md#addSupportAccessAllowlistEntries) | **POST** /support_access/allowlist | Add Support Access Allowlist Users |
| [**allOauthClientApps()**](AuthApi.md#allOauthClientApps) | **GET** /oauth_client_apps | Get All OAuth Client Apps |
| [**allUserLoginLockouts()**](AuthApi.md#allUserLoginLockouts) | **GET** /user_login_lockouts | Get All User Login Lockouts |
| [**createEmbedSecret()**](AuthApi.md#createEmbedSecret) | **POST** /embed_config/secrets | Create Embed Secret |
| [**createEmbedUrlAsMe()**](AuthApi.md#createEmbedUrlAsMe) | **POST** /embed/token_url/me | Create Embed URL |
| [**createOidcTestConfig()**](AuthApi.md#createOidcTestConfig) | **POST** /oidc_test_configs | Create OIDC Test Configuration |
| [**createSamlTestConfig()**](AuthApi.md#createSamlTestConfig) | **POST** /saml_test_configs | Create SAML Test Configuration |
| [**createSsoEmbedUrl()**](AuthApi.md#createSsoEmbedUrl) | **POST** /embed/sso_url | Create Signed Embed Url |
| [**deactivateAppUser()**](AuthApi.md#deactivateAppUser) | **DELETE** /oauth_client_apps/{client_guid}/users/{user_id} | Deactivate OAuth App User |
| [**deleteEmbedCookielessSession()**](AuthApi.md#deleteEmbedCookielessSession) | **DELETE** /embed/cookieless_session/{session_reference_token} | Delete cookieless embed session |
| [**deleteEmbedSecret()**](AuthApi.md#deleteEmbedSecret) | **DELETE** /embed_config/secrets/{embed_secret_id} | Delete Embed Secret |
| [**deleteOauthClientApp()**](AuthApi.md#deleteOauthClientApp) | **DELETE** /oauth_client_apps/{client_guid} | Delete OAuth Client App |
| [**deleteOidcTestConfig()**](AuthApi.md#deleteOidcTestConfig) | **DELETE** /oidc_test_configs/{test_slug} | Delete OIDC Test Configuration |
| [**deleteSamlTestConfig()**](AuthApi.md#deleteSamlTestConfig) | **DELETE** /saml_test_configs/{test_slug} | Delete SAML Test Configuration |
| [**deleteSupportAccessAllowlistEntry()**](AuthApi.md#deleteSupportAccessAllowlistEntry) | **DELETE** /support_access/allowlist/{entry_id} | Delete Support Access Allowlist Entry |
| [**deleteUserLoginLockout()**](AuthApi.md#deleteUserLoginLockout) | **DELETE** /user_login_lockout/{key} | Delete User Login Lockout |
| [**deregisterMobileDevice()**](AuthApi.md#deregisterMobileDevice) | **DELETE** /mobile/device/{device_id} | Deregister Mobile Device |
| [**disableSupportAccess()**](AuthApi.md#disableSupportAccess) | **PUT** /support_access/disable | Disable Support Access |
| [**enableSupportAccess()**](AuthApi.md#enableSupportAccess) | **PUT** /support_access/enable | Enable Support Access |
| [**fetchAndParseSamlIdpMetadata()**](AuthApi.md#fetchAndParseSamlIdpMetadata) | **POST** /fetch_and_parse_saml_idp_metadata | Parse SAML IdP Url |
| [**forcePasswordResetAtNextLoginForAllUsers()**](AuthApi.md#forcePasswordResetAtNextLoginForAllUsers) | **PUT** /password_config/force_password_reset_at_next_login_for_all_users | Force password reset |
| [**generateTokensForCookielessSession()**](AuthApi.md#generateTokensForCookielessSession) | **PUT** /embed/cookieless_session/generate_tokens | Generate tokens for cookieless embed session |
| [**getSupportAccessAllowlistEntries()**](AuthApi.md#getSupportAccessAllowlistEntries) | **GET** /support_access/allowlist | Get Support Access Allowlist Users |
| [**invalidateTokens()**](AuthApi.md#invalidateTokens) | **DELETE** /oauth_client_apps/{client_guid}/tokens | Invalidate Tokens |
| [**ldapConfig()**](AuthApi.md#ldapConfig) | **GET** /ldap_config | Get LDAP Configuration |
| [**oauthClientApp()**](AuthApi.md#oauthClientApp) | **GET** /oauth_client_apps/{client_guid} | Get OAuth Client App |
| [**oidcConfig()**](AuthApi.md#oidcConfig) | **GET** /oidc_config | Get OIDC Configuration |
| [**oidcTestConfig()**](AuthApi.md#oidcTestConfig) | **GET** /oidc_test_configs/{test_slug} | Get OIDC Test Configuration |
| [**parseSamlIdpMetadata()**](AuthApi.md#parseSamlIdpMetadata) | **POST** /parse_saml_idp_metadata | Parse SAML IdP XML |
| [**passwordConfig()**](AuthApi.md#passwordConfig) | **GET** /password_config | Get Password Config |
| [**registerMobileDevice()**](AuthApi.md#registerMobileDevice) | **POST** /mobile/device | Register Mobile Device |
| [**registerOauthClientApp()**](AuthApi.md#registerOauthClientApp) | **POST** /oauth_client_apps/{client_guid} | Register OAuth App |
| [**samlConfig()**](AuthApi.md#samlConfig) | **GET** /saml_config | Get SAML Configuration |
| [**samlTestConfig()**](AuthApi.md#samlTestConfig) | **GET** /saml_test_configs/{test_slug} | Get SAML Test Configuration |
| [**searchUserLoginLockouts()**](AuthApi.md#searchUserLoginLockouts) | **GET** /user_login_lockouts/search | Search User Login Lockouts |
| [**sessionConfig()**](AuthApi.md#sessionConfig) | **GET** /session_config | Get Session Config |
| [**supportAccessStatus()**](AuthApi.md#supportAccessStatus) | **GET** /support_access/status | Support Access Status |
| [**testLdapConfigAuth()**](AuthApi.md#testLdapConfigAuth) | **PUT** /ldap_config/test_auth | Test LDAP Auth |
| [**testLdapConfigConnection()**](AuthApi.md#testLdapConfigConnection) | **PUT** /ldap_config/test_connection | Test LDAP Connection |
| [**testLdapConfigUserAuth()**](AuthApi.md#testLdapConfigUserAuth) | **PUT** /ldap_config/test_user_auth | Test LDAP User Auth |
| [**testLdapConfigUserInfo()**](AuthApi.md#testLdapConfigUserInfo) | **PUT** /ldap_config/test_user_info | Test LDAP User Info |
| [**updateLdapConfig()**](AuthApi.md#updateLdapConfig) | **PATCH** /ldap_config | Update LDAP Configuration |
| [**updateMobileDeviceRegistration()**](AuthApi.md#updateMobileDeviceRegistration) | **PATCH** /mobile/device/{device_id} | Update Mobile Device Registration |
| [**updateOauthClientApp()**](AuthApi.md#updateOauthClientApp) | **PATCH** /oauth_client_apps/{client_guid} | Update OAuth App |
| [**updateOidcConfig()**](AuthApi.md#updateOidcConfig) | **PATCH** /oidc_config | Update OIDC Configuration |
| [**updatePasswordConfig()**](AuthApi.md#updatePasswordConfig) | **PATCH** /password_config | Update Password Config |
| [**updateSamlConfig()**](AuthApi.md#updateSamlConfig) | **PATCH** /saml_config | Update SAML Configuration |
| [**updateSessionConfig()**](AuthApi.md#updateSessionConfig) | **PATCH** /session_config | Update Session Config |
| [**validateEmbedUrl()**](AuthApi.md#validateEmbedUrl) | **GET** /embed/sso/validate | Get Embed URL Validation |


## `acquireEmbedCookielessSession()`

```php
acquireEmbedCookielessSession($embed_cookieless_session_acquire): \OpenAPI\Client\Model\EmbedCookielessSessionAcquireResponse
```

Create Acquire cookieless embed session

### Acquire a cookieless embed session.  The acquire session endpoint negates the need for signing the embed url and passing it as a parameter to the embed login. This endpoint accepts an embed user definition and creates or updates it. This is similar behavior to the embed SSO login as they both can create and update embed user data.  The endpoint also accepts an optional `session_reference_token`. If present and the session has not expired and the credentials match the credentials for the embed session, a new authentication token will be generated. This allows the embed session to attach a new embedded IFRAME to the embed session. Note that the session is NOT extended in this scenario. In other words the session_length parameter is ignored.  **IMPORTANT:** If the `session_reference_token` is provided and the session has NOT expired, the embed user is NOT updated. This is done for performance reasons and to support the embed SSO usecase where the first IFRAME created on a page uses a signed url and subsequently created IFRAMEs do not.  If the `session_reference_token` is provided but the session has expired, the token will be ignored and a new embed session will be created. Note that the embed user definition will be updated in this scenario.  If the credentials do not match the credentials associated with an existing session_reference_token, a 404 will be returned.  The endpoint returns the following: - Authentication token - a token that is passed to `/embed/login` endpoint that creates or attaches to the   embed session. This token can be used once and has a lifetime of 30 seconds. - Session reference token - a token that lives for the length of the session. This token is used to   generate new api and navigation tokens OR create new embed IFRAMEs. - Api token - lives for 10 minutes. The Looker client will ask for this token once it is loaded into the   iframe. - Navigation token - lives for 10 minutes. The Looker client will ask for this token once it is loaded into   the iframe.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$embed_cookieless_session_acquire = new \OpenAPI\Client\Model\EmbedCookielessSessionAcquire(); // \OpenAPI\Client\Model\EmbedCookielessSessionAcquire | Embed user details

try {
    $result = $apiInstance->acquireEmbedCookielessSession($embed_cookieless_session_acquire);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->acquireEmbedCookielessSession: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **embed_cookieless_session_acquire** | [**\OpenAPI\Client\Model\EmbedCookielessSessionAcquire**](../Model/EmbedCookielessSessionAcquire.md)| Embed user details | |

### Return type

[**\OpenAPI\Client\Model\EmbedCookielessSessionAcquireResponse**](../Model/EmbedCookielessSessionAcquireResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `activateAppUser()`

```php
activateAppUser($client_guid, $user_id, $fields): string
```

Activate OAuth App User

### Activate an app for a user  Activates a user for a given oauth client app. This indicates the user has been informed that the app will have access to the user's looker data, and that the user has accepted and allowed the app to use their Looker account.  Activating a user for an app that the user is already activated with returns a success response.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of this application
$user_id = 'user_id_example'; // string | The id of the user to enable use of this app
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->activateAppUser($client_guid, $user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->activateAppUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of this application | |
| **user_id** | **string**| The id of the user to enable use of this app | |
| **fields** | **string**| Requested fields. | [optional] |

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

## `addSupportAccessAllowlistEntries()`

```php
addSupportAccessAllowlistEntries($support_access_add_entries): \OpenAPI\Client\Model\SupportAccessAllowlistEntry[]
```

Add Support Access Allowlist Users

### Add Support Access Allowlist Users  Adds a list of emails to the Allowlist, using the provided reason  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$support_access_add_entries = new \OpenAPI\Client\Model\SupportAccessAddEntries(); // \OpenAPI\Client\Model\SupportAccessAddEntries | Request params.

try {
    $result = $apiInstance->addSupportAccessAllowlistEntries($support_access_add_entries);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->addSupportAccessAllowlistEntries: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **support_access_add_entries** | [**\OpenAPI\Client\Model\SupportAccessAddEntries**](../Model/SupportAccessAddEntries.md)| Request params. | |

### Return type

[**\OpenAPI\Client\Model\SupportAccessAllowlistEntry[]**](../Model/SupportAccessAllowlistEntry.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allOauthClientApps()`

```php
allOauthClientApps($fields): \OpenAPI\Client\Model\OauthClientApp[]
```

Get All OAuth Client Apps

### List All OAuth Client Apps  Lists all applications registered to use OAuth2 login with this Looker instance, including enabled and disabled apps.  Results are filtered to include only the apps that the caller (current user) has permission to see.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allOauthClientApps($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->allOauthClientApps: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\OauthClientApp[]**](../Model/OauthClientApp.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allUserLoginLockouts()`

```php
allUserLoginLockouts($fields): \OpenAPI\Client\Model\UserLoginLockout[]
```

Get All User Login Lockouts

### Get currently locked-out users.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Include only these fields in the response

try {
    $result = $apiInstance->allUserLoginLockouts($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->allUserLoginLockouts: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Include only these fields in the response | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserLoginLockout[]**](../Model/UserLoginLockout.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createEmbedSecret()`

```php
createEmbedSecret($embed_secret): \OpenAPI\Client\Model\EmbedSecret
```

Create Embed Secret

### Create an embed secret using the specified information.  The value of the `secret` field will be set by Looker and returned.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$embed_secret = new \OpenAPI\Client\Model\EmbedSecret(); // \OpenAPI\Client\Model\EmbedSecret | embed secret

try {
    $result = $apiInstance->createEmbedSecret($embed_secret);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->createEmbedSecret: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **embed_secret** | [**\OpenAPI\Client\Model\EmbedSecret**](../Model/EmbedSecret.md)| embed secret | [optional] |

### Return type

[**\OpenAPI\Client\Model\EmbedSecret**](../Model/EmbedSecret.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createEmbedUrlAsMe()`

```php
createEmbedUrlAsMe($embed_params): \OpenAPI\Client\Model\EmbedUrlResponse
```

Create Embed URL

### Create an Embed URL  Creates an embed URL that runs as the Looker user making this API call. (\"Embed as me\") This embed URL can then be used to instantiate a Looker embed session in a \"Powered by Looker\" (PBL) web application.  This is similar to Private Embedding (https://cloud.google.com/looker/docs/r/admin/embed/private-embed). Instead of logging into the Web UI to authenticate, the user has already authenticated against the API to be able to make this call. However, unlike Private Embed where the user has access to any other part of the Looker UI, the embed web session created by requesting the EmbedUrlResponse.url in a browser only has access to content visible under the `/embed` context.  An embed URL can only be used once, and must be used within 5 minutes of being created. After it has been used to request a page from the Looker server, the URL is invalid. Future requests using the same URL will fail. This is to prevent 'replay attacks'.  The `target_url` property must be a complete URL of a Looker Embedded UI page - scheme, hostname, path starting with \"/embed\" and query params. To load a dashboard with id 56 and with a filter of `Date=1 years`, the looker Embed URL would look like `https://myname.looker.com/embed/dashboards/56?Date=1%20years`. The best way to obtain this target_url is to navigate to the desired Looker page in your web browser, copy the URL shown in the browser address bar, insert \"/embed\" after the host/port, and paste it into the `target_url` property as a quoted string value in this API request.  #### Security Note Protect this signed URL as you would an access token or password credentials - do not write it to disk, do not pass it to a third party, and only pass it through a secure HTTPS encrypted transport.   Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$embed_params = new \OpenAPI\Client\Model\EmbedParams(); // \OpenAPI\Client\Model\EmbedParams | Embed parameters

try {
    $result = $apiInstance->createEmbedUrlAsMe($embed_params);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->createEmbedUrlAsMe: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **embed_params** | [**\OpenAPI\Client\Model\EmbedParams**](../Model/EmbedParams.md)| Embed parameters | |

### Return type

[**\OpenAPI\Client\Model\EmbedUrlResponse**](../Model/EmbedUrlResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createOidcTestConfig()`

```php
createOidcTestConfig($oidc_config): \OpenAPI\Client\Model\OIDCConfig
```

Create OIDC Test Configuration

### Create a OIDC test configuration.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$oidc_config = new \OpenAPI\Client\Model\OIDCConfig(); // \OpenAPI\Client\Model\OIDCConfig | OIDC test config

try {
    $result = $apiInstance->createOidcTestConfig($oidc_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->createOidcTestConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **oidc_config** | [**\OpenAPI\Client\Model\OIDCConfig**](../Model/OIDCConfig.md)| OIDC test config | |

### Return type

[**\OpenAPI\Client\Model\OIDCConfig**](../Model/OIDCConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createSamlTestConfig()`

```php
createSamlTestConfig($saml_config): \OpenAPI\Client\Model\SamlConfig
```

Create SAML Test Configuration

### Create a SAML test configuration.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$saml_config = new \OpenAPI\Client\Model\SamlConfig(); // \OpenAPI\Client\Model\SamlConfig | SAML test config

try {
    $result = $apiInstance->createSamlTestConfig($saml_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->createSamlTestConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **saml_config** | [**\OpenAPI\Client\Model\SamlConfig**](../Model/SamlConfig.md)| SAML test config | |

### Return type

[**\OpenAPI\Client\Model\SamlConfig**](../Model/SamlConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createSsoEmbedUrl()`

```php
createSsoEmbedUrl($embed_sso_params): \OpenAPI\Client\Model\EmbedUrlResponse
```

Create Signed Embed Url

### Create Signed Embed URL  Creates a signed embed URL and cryptographically signs it with an embed secret. This signed URL can then be used to instantiate a Looker embed session in a PBL web application. Do not make any modifications to the returned URL - any change may invalidate the signature and cause the URL to fail to load a Looker embed session.  A signed embed URL can only be **used once**. After the URL has been used to request a page from the Looker server, it is invalid. Future requests using the same URL will fail. This is to prevent 'replay attacks'.  The `target_url` property must be a complete URL of a Looker UI page - scheme, hostname, path and query params. To load a dashboard with id 56 and with a filter of `Date=1 years`, the looker URL would look like `https:/myname.looker.com/dashboards/56?Date=1%20years`. The best way to obtain this `target_url` is to navigate to the desired Looker page in your web browser and use the \"Get embed URL\" menu option to copy it to your clipboard and paste it into the `target_url` property as a quoted string value in this API request.  Permissions for the embed user are defined by the groups in which the embed user is a member (`group_ids` property) and the lists of models and permissions assigned to the embed user. At a minimum, you must provide values for either the `group_ids` property, or **both** the models and permissions properties. These properties are additive; an embed user can be a member of certain groups AND be granted access to models and permissions.  The embed user's access is the union of permissions granted by the `group_ids`, `models`, and `permissions` properties.  This function does not strictly require all group_ids, user attribute names, or model names to exist at the moment the embed url is created. Unknown group_id, user attribute names or model names will be passed through to the output URL.  To diagnose potential problems with an SSO embed URL, you can copy the signed URL into the Embed URI Validator text box in `<your looker instance>/admin/embed`.  The `secret_id` parameter is optional. If specified, its value must be the id of an active secret defined in the Looker instance. if not specified, the URL will be signed using the most recent active signing secret. If there is no active secret for signing embed urls, a default secret will be created. This default secret is encrypted using HMAC/SHA-256.  The `embed_domain` parameter is optional. If specified and valid, the domain will be added to the embed domain allowlist if it is missing.  #### Security Note Protect this signed URL as you would an access token or password credentials - do not write it to disk, do not pass it to a third party, and only pass it through a secure HTTPS encrypted transport.   Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$embed_sso_params = new \OpenAPI\Client\Model\EmbedSsoParams(); // \OpenAPI\Client\Model\EmbedSsoParams | Signed Embed URL parameters

try {
    $result = $apiInstance->createSsoEmbedUrl($embed_sso_params);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->createSsoEmbedUrl: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **embed_sso_params** | [**\OpenAPI\Client\Model\EmbedSsoParams**](../Model/EmbedSsoParams.md)| Signed Embed URL parameters | |

### Return type

[**\OpenAPI\Client\Model\EmbedUrlResponse**](../Model/EmbedUrlResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deactivateAppUser()`

```php
deactivateAppUser($client_guid, $user_id, $fields): string
```

Deactivate OAuth App User

### Deactivate an app for a user  Deactivate a user for a given oauth client app. All tokens issued to the app for this user will be invalid immediately. Before the user can use the app with their Looker account, the user will have to read and accept an account use disclosure statement for the app.  Admin users can deactivate other users, but non-admin users can only deactivate themselves.  As with most REST DELETE operations, this endpoint does not return an error if the indicated resource (app or user) does not exist or has already been deactivated.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of this application
$user_id = 'user_id_example'; // string | The id of the user to enable use of this app
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->deactivateAppUser($client_guid, $user_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deactivateAppUser: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of this application | |
| **user_id** | **string**| The id of the user to enable use of this app | |
| **fields** | **string**| Requested fields. | [optional] |

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

## `deleteEmbedCookielessSession()`

```php
deleteEmbedCookielessSession($session_reference_token): string
```

Delete cookieless embed session

### Delete cookieless embed session  This will delete the session associated with the given session reference token. Calling this endpoint will result in the session and session reference data being cleared from the system. This endpoint can be used to log an embed user out of the Looker instance.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$session_reference_token = 'session_reference_token_example'; // string | Embed session reference token

try {
    $result = $apiInstance->deleteEmbedCookielessSession($session_reference_token);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteEmbedCookielessSession: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **session_reference_token** | **string**| Embed session reference token | |

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

## `deleteEmbedSecret()`

```php
deleteEmbedSecret($embed_secret_id): string
```

Delete Embed Secret

### Delete an embed secret.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$embed_secret_id = 'embed_secret_id_example'; // string | Id of Embed Secret

try {
    $result = $apiInstance->deleteEmbedSecret($embed_secret_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteEmbedSecret: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **embed_secret_id** | **string**| Id of Embed Secret | |

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

## `deleteOauthClientApp()`

```php
deleteOauthClientApp($client_guid): string
```

Delete OAuth Client App

### Delete OAuth Client App  Deletes the registration info of the app with the matching client_guid. All active sessions and tokens issued for this app will immediately become invalid.  As with most REST DELETE operations, this endpoint does not return an error if the indicated resource does not exist.  ### Note: this deletion cannot be undone.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of this application

try {
    $result = $apiInstance->deleteOauthClientApp($client_guid);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteOauthClientApp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of this application | |

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

## `deleteOidcTestConfig()`

```php
deleteOidcTestConfig($test_slug): string
```

Delete OIDC Test Configuration

### Delete a OIDC test configuration.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$test_slug = 'test_slug_example'; // string | Slug of test config

try {
    $result = $apiInstance->deleteOidcTestConfig($test_slug);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteOidcTestConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **test_slug** | **string**| Slug of test config | |

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

## `deleteSamlTestConfig()`

```php
deleteSamlTestConfig($test_slug): string
```

Delete SAML Test Configuration

### Delete a SAML test configuration.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$test_slug = 'test_slug_example'; // string | Slug of test config

try {
    $result = $apiInstance->deleteSamlTestConfig($test_slug);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteSamlTestConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **test_slug** | **string**| Slug of test config | |

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

## `deleteSupportAccessAllowlistEntry()`

```php
deleteSupportAccessAllowlistEntry($entry_id): string
```

Delete Support Access Allowlist Entry

### Delete Support Access Allowlist User  Deletes the specified Allowlist Entry Id  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$entry_id = 'entry_id_example'; // string | Id of Allowlist Entry

try {
    $result = $apiInstance->deleteSupportAccessAllowlistEntry($entry_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteSupportAccessAllowlistEntry: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **entry_id** | **string**| Id of Allowlist Entry | |

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

## `deleteUserLoginLockout()`

```php
deleteUserLoginLockout($key): string
```

Delete User Login Lockout

### Removes login lockout for the associated user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$key = 'key_example'; // string | The key associated with the locked user

try {
    $result = $apiInstance->deleteUserLoginLockout($key);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deleteUserLoginLockout: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **key** | **string**| The key associated with the locked user | |

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

## `deregisterMobileDevice()`

```php
deregisterMobileDevice($device_id)
```

Deregister Mobile Device

### Deregister a mobile device.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$device_id = 'device_id_example'; // string | Unique id of the device.

try {
    $apiInstance->deregisterMobileDevice($device_id);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->deregisterMobileDevice: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **device_id** | **string**| Unique id of the device. | |

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

## `disableSupportAccess()`

```php
disableSupportAccess(): \OpenAPI\Client\Model\SupportAccessStatus
```

Disable Support Access

### Disable Support Access  Disables Support Access immediately  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->disableSupportAccess();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->disableSupportAccess: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\SupportAccessStatus**](../Model/SupportAccessStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `enableSupportAccess()`

```php
enableSupportAccess($support_access_enable): \OpenAPI\Client\Model\SupportAccessStatus
```

Enable Support Access

### Enable Support Access  Enables Support Access for the provided duration  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$support_access_enable = new \OpenAPI\Client\Model\SupportAccessEnable(); // \OpenAPI\Client\Model\SupportAccessEnable | Enable Support Access request params.

try {
    $result = $apiInstance->enableSupportAccess($support_access_enable);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->enableSupportAccess: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **support_access_enable** | [**\OpenAPI\Client\Model\SupportAccessEnable**](../Model/SupportAccessEnable.md)| Enable Support Access request params. | |

### Return type

[**\OpenAPI\Client\Model\SupportAccessStatus**](../Model/SupportAccessStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `fetchAndParseSamlIdpMetadata()`

```php
fetchAndParseSamlIdpMetadata($body): \OpenAPI\Client\Model\SamlMetadataParseResult
```

Parse SAML IdP Url

### Fetch the given url and parse it as a SAML IdP metadata document and return the result. Note that this requires that the url be public or at least at a location where the Looker instance can fetch it without requiring any special authentication.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$body = 'body_example'; // string | SAML IdP metadata public url

try {
    $result = $apiInstance->fetchAndParseSamlIdpMetadata($body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->fetchAndParseSamlIdpMetadata: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **body** | **string**| SAML IdP metadata public url | |

### Return type

[**\OpenAPI\Client\Model\SamlMetadataParseResult**](../Model/SamlMetadataParseResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `text/plain`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `forcePasswordResetAtNextLoginForAllUsers()`

```php
forcePasswordResetAtNextLoginForAllUsers(): string
```

Force password reset

### Force all credentials_email users to reset their login passwords upon their next login.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->forcePasswordResetAtNextLoginForAllUsers();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->forcePasswordResetAtNextLoginForAllUsers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

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

## `generateTokensForCookielessSession()`

```php
generateTokensForCookielessSession($embed_cookieless_session_generate_tokens): \OpenAPI\Client\Model\EmbedCookielessSessionGenerateTokensResponse
```

Generate tokens for cookieless embed session

### Generate api and navigation tokens for a cookieless embed session  The generate tokens endpoint is used to create new tokens of type: - Api token. - Navigation token. The generate tokens endpoint should be called every time the Looker client asks for a token (except for the first time when the tokens returned by the acquire_session endpoint should be used).  #### Embed session expiration handling  This endpoint does NOT return an error when the embed session expires. This is to simplify processing in the caller as errors can happen for non session expiration reasons. Instead the endpoint returns the session time to live in the `session_reference_token_ttl` response property. If this property contains a zero, the embed session has expired.  Calls to this endpoint require [Embedding](https://cloud.google.com/looker/docs/r/looker-core-feature-embed) to be enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$embed_cookieless_session_generate_tokens = new \OpenAPI\Client\Model\EmbedCookielessSessionGenerateTokens(); // \OpenAPI\Client\Model\EmbedCookielessSessionGenerateTokens | Embed session reference token

try {
    $result = $apiInstance->generateTokensForCookielessSession($embed_cookieless_session_generate_tokens);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->generateTokensForCookielessSession: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **embed_cookieless_session_generate_tokens** | [**\OpenAPI\Client\Model\EmbedCookielessSessionGenerateTokens**](../Model/EmbedCookielessSessionGenerateTokens.md)| Embed session reference token | |

### Return type

[**\OpenAPI\Client\Model\EmbedCookielessSessionGenerateTokensResponse**](../Model/EmbedCookielessSessionGenerateTokensResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getSupportAccessAllowlistEntries()`

```php
getSupportAccessAllowlistEntries($fields): \OpenAPI\Client\Model\SupportAccessAllowlistEntry[]
```

Get Support Access Allowlist Users

### Get Support Access Allowlist Users  Returns the users that have been added to the Support Access Allowlist  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->getSupportAccessAllowlistEntries($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->getSupportAccessAllowlistEntries: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\SupportAccessAllowlistEntry[]**](../Model/SupportAccessAllowlistEntry.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `invalidateTokens()`

```php
invalidateTokens($client_guid): string
```

Invalidate Tokens

### Invalidate All Issued Tokens  Immediately invalidates all auth codes, sessions, access tokens and refresh tokens issued for this app for ALL USERS of this app.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of the application

try {
    $result = $apiInstance->invalidateTokens($client_guid);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->invalidateTokens: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of the application | |

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

## `ldapConfig()`

```php
ldapConfig(): \OpenAPI\Client\Model\LDAPConfig
```

Get LDAP Configuration

### Get the LDAP configuration.  Looker can be optionally configured to authenticate users against an Active Directory or other LDAP directory server. LDAP setup requires coordination with an administrator of that directory server.  Only Looker administrators can read and update the LDAP configuration.  Configuring LDAP impacts authentication for all users. This configuration should be done carefully.  Looker maintains a single LDAP configuration. It can be read and updated. Updates only succeed if the new state will be valid (in the sense that all required fields are populated); it is up to you to ensure that the configuration is appropriate and correct).  LDAP is enabled or disabled for Looker using the **enabled** field.  Looker will never return an **auth_password** field. That value can be set, but never retrieved.  See the [Looker LDAP docs](https://cloud.google.com/looker/docs/r/api/ldap_setup) for additional information.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->ldapConfig();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->ldapConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `oauthClientApp()`

```php
oauthClientApp($client_guid, $fields): \OpenAPI\Client\Model\OauthClientApp
```

Get OAuth Client App

### Get Oauth Client App  Returns the registered app client with matching client_guid.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of this application
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->oauthClientApp($client_guid, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->oauthClientApp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of this application | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\OauthClientApp**](../Model/OauthClientApp.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `oidcConfig()`

```php
oidcConfig(): \OpenAPI\Client\Model\OIDCConfig
```

Get OIDC Configuration

### Get the OIDC configuration.  Looker can be optionally configured to authenticate users against an OpenID Connect (OIDC) authentication server. OIDC setup requires coordination with an administrator of that server.  Only Looker administrators can read and update the OIDC configuration.  Configuring OIDC impacts authentication for all users. This configuration should be done carefully.  Looker maintains a single OIDC configuration. It can be read and updated. Updates only succeed if the new state will be valid (in the sense that all required fields are populated); it is up to you to ensure that the configuration is appropriate and correct).  OIDC is enabled or disabled for Looker using the **enabled** field.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->oidcConfig();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->oidcConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\OIDCConfig**](../Model/OIDCConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `oidcTestConfig()`

```php
oidcTestConfig($test_slug): \OpenAPI\Client\Model\OIDCConfig
```

Get OIDC Test Configuration

### Get a OIDC test configuration by test_slug.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$test_slug = 'test_slug_example'; // string | Slug of test config

try {
    $result = $apiInstance->oidcTestConfig($test_slug);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->oidcTestConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **test_slug** | **string**| Slug of test config | |

### Return type

[**\OpenAPI\Client\Model\OIDCConfig**](../Model/OIDCConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `parseSamlIdpMetadata()`

```php
parseSamlIdpMetadata($body): \OpenAPI\Client\Model\SamlMetadataParseResult
```

Parse SAML IdP XML

### Parse the given xml as a SAML IdP metadata document and return the result.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$body = 'body_example'; // string | SAML IdP metadata xml

try {
    $result = $apiInstance->parseSamlIdpMetadata($body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->parseSamlIdpMetadata: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **body** | **string**| SAML IdP metadata xml | |

### Return type

[**\OpenAPI\Client\Model\SamlMetadataParseResult**](../Model/SamlMetadataParseResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `text/plain`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `passwordConfig()`

```php
passwordConfig(): \OpenAPI\Client\Model\PasswordConfig
```

Get Password Config

### Get password config.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->passwordConfig();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->passwordConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\PasswordConfig**](../Model/PasswordConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `registerMobileDevice()`

```php
registerMobileDevice($mobile_token): \OpenAPI\Client\Model\MobileToken
```

Register Mobile Device

### Registers a mobile device. # Required fields: [:device_token, :device_type]

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$mobile_token = new \OpenAPI\Client\Model\MobileToken(); // \OpenAPI\Client\Model\MobileToken | Writable device parameters.

try {
    $result = $apiInstance->registerMobileDevice($mobile_token);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->registerMobileDevice: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **mobile_token** | [**\OpenAPI\Client\Model\MobileToken**](../Model/MobileToken.md)| Writable device parameters. | |

### Return type

[**\OpenAPI\Client\Model\MobileToken**](../Model/MobileToken.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `registerOauthClientApp()`

```php
registerOauthClientApp($client_guid, $oauth_client_app, $fields): \OpenAPI\Client\Model\OauthClientApp
```

Register OAuth App

### Register an OAuth2 Client App  Registers details identifying an external web app or native app as an OAuth2 login client of the Looker instance. The app registration must provide a unique client_guid and redirect_uri that the app will present in OAuth login requests. If the client_guid and redirect_uri parameters in the login request do not match the app details registered with the Looker instance, the request is assumed to be a forgery and is rejected.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of this application
$oauth_client_app = new \OpenAPI\Client\Model\OauthClientApp(); // \OpenAPI\Client\Model\OauthClientApp | OAuth Client App
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->registerOauthClientApp($client_guid, $oauth_client_app, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->registerOauthClientApp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of this application | |
| **oauth_client_app** | [**\OpenAPI\Client\Model\OauthClientApp**](../Model/OauthClientApp.md)| OAuth Client App | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\OauthClientApp**](../Model/OauthClientApp.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `samlConfig()`

```php
samlConfig(): \OpenAPI\Client\Model\SamlConfig
```

Get SAML Configuration

### Get the SAML configuration.  Looker can be optionally configured to authenticate users against a SAML authentication server. SAML setup requires coordination with an administrator of that server.  Only Looker administrators can read and update the SAML configuration.  Configuring SAML impacts authentication for all users. This configuration should be done carefully.  Looker maintains a single SAML configuration. It can be read and updated. Updates only succeed if the new state will be valid (in the sense that all required fields are populated); it is up to you to ensure that the configuration is appropriate and correct).  SAML is enabled or disabled for Looker using the **enabled** field.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->samlConfig();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->samlConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\SamlConfig**](../Model/SamlConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `samlTestConfig()`

```php
samlTestConfig($test_slug): \OpenAPI\Client\Model\SamlConfig
```

Get SAML Test Configuration

### Get a SAML test configuration by test_slug.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$test_slug = 'test_slug_example'; // string | Slug of test config

try {
    $result = $apiInstance->samlTestConfig($test_slug);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->samlTestConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **test_slug** | **string**| Slug of test config | |

### Return type

[**\OpenAPI\Client\Model\SamlConfig**](../Model/SamlConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `searchUserLoginLockouts()`

```php
searchUserLoginLockouts($fields, $page, $per_page, $limit, $offset, $sorts, $auth_type, $full_name, $email, $remote_id, $filter_or): \OpenAPI\Client\Model\UserLoginLockout[]
```

Search User Login Lockouts

### Search currently locked-out users.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
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
$auth_type = 'auth_type_example'; // string | Auth type user is locked out for (email, ldap, totp, api)
$full_name = 'full_name_example'; // string | Match name
$email = 'email_example'; // string | Match email
$remote_id = 'remote_id_example'; // string | Match remote LDAP ID
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression

try {
    $result = $apiInstance->searchUserLoginLockouts($fields, $page, $per_page, $limit, $offset, $sorts, $auth_type, $full_name, $email, $remote_id, $filter_or);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->searchUserLoginLockouts: ', $e->getMessage(), PHP_EOL;
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
| **auth_type** | **string**| Auth type user is locked out for (email, ldap, totp, api) | [optional] |
| **full_name** | **string**| Match name | [optional] |
| **email** | **string**| Match email | [optional] |
| **remote_id** | **string**| Match remote LDAP ID | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |

### Return type

[**\OpenAPI\Client\Model\UserLoginLockout[]**](../Model/UserLoginLockout.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `sessionConfig()`

```php
sessionConfig(): \OpenAPI\Client\Model\SessionConfig
```

Get Session Config

### Get session config.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->sessionConfig();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->sessionConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\SessionConfig**](../Model/SessionConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `supportAccessStatus()`

```php
supportAccessStatus(): \OpenAPI\Client\Model\SupportAccessStatus
```

Support Access Status

### Support Access Status  Returns the current Support Access Status  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->supportAccessStatus();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->supportAccessStatus: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\SupportAccessStatus**](../Model/SupportAccessStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testLdapConfigAuth()`

```php
testLdapConfigAuth($ldap_config): \OpenAPI\Client\Model\LDAPConfigTestResult
```

Test LDAP Auth

### Test the connection authentication settings for an LDAP configuration.  This tests that the connection is possible and that a 'server' account to be used by Looker can authenticate to the LDAP server given connection and authentication information.  **connection_host**, **connection_port**, and **auth_username**, are required. **connection_tls** and **auth_password** are optional.  Example: ```json {   \"connection_host\": \"ldap.example.com\",   \"connection_port\": \"636\",   \"connection_tls\": true,   \"auth_username\": \"cn=looker,dc=example,dc=com\",   \"auth_password\": \"secret\" } ```  Looker will never return an **auth_password**. If this request omits the **auth_password** field, then the **auth_password** value from the active config (if present) will be used for the test.  The active LDAP settings are not modified.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ldap_config = new \OpenAPI\Client\Model\LDAPConfig(); // \OpenAPI\Client\Model\LDAPConfig | LDAP Config

try {
    $result = $apiInstance->testLdapConfigAuth($ldap_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->testLdapConfigAuth: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ldap_config** | [**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)| LDAP Config | |

### Return type

[**\OpenAPI\Client\Model\LDAPConfigTestResult**](../Model/LDAPConfigTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testLdapConfigConnection()`

```php
testLdapConfigConnection($ldap_config): \OpenAPI\Client\Model\LDAPConfigTestResult
```

Test LDAP Connection

### Test the connection settings for an LDAP configuration.  This tests that the connection is possible given a connection_host and connection_port.  **connection_host** and **connection_port** are required. **connection_tls** is optional.  Example: ```json {   \"connection_host\": \"ldap.example.com\",   \"connection_port\": \"636\",   \"connection_tls\": true } ```  No authentication to the LDAP server is attempted.  The active LDAP settings are not modified.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ldap_config = new \OpenAPI\Client\Model\LDAPConfig(); // \OpenAPI\Client\Model\LDAPConfig | LDAP Config

try {
    $result = $apiInstance->testLdapConfigConnection($ldap_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->testLdapConfigConnection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ldap_config** | [**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)| LDAP Config | |

### Return type

[**\OpenAPI\Client\Model\LDAPConfigTestResult**](../Model/LDAPConfigTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testLdapConfigUserAuth()`

```php
testLdapConfigUserAuth($ldap_config): \OpenAPI\Client\Model\LDAPConfigTestResult
```

Test LDAP User Auth

### Test the user authentication settings for an LDAP configuration.  This test accepts a full LDAP configuration along with a username/password pair and attempts to authenticate the user with the LDAP server. The configuration is validated before attempting the authentication.  Looker will never return an **auth_password**. If this request omits the **auth_password** field, then the **auth_password** value from the active config (if present) will be used for the test.  **test_ldap_user** and **test_ldap_password** are required.  The active LDAP settings are not modified.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ldap_config = new \OpenAPI\Client\Model\LDAPConfig(); // \OpenAPI\Client\Model\LDAPConfig | LDAP Config

try {
    $result = $apiInstance->testLdapConfigUserAuth($ldap_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->testLdapConfigUserAuth: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ldap_config** | [**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)| LDAP Config | |

### Return type

[**\OpenAPI\Client\Model\LDAPConfigTestResult**](../Model/LDAPConfigTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testLdapConfigUserInfo()`

```php
testLdapConfigUserInfo($ldap_config): \OpenAPI\Client\Model\LDAPConfigTestResult
```

Test LDAP User Info

### Test the user authentication settings for an LDAP configuration without authenticating the user.  This test will let you easily test the mapping for user properties and roles for any user withoutneeding to authenticate as that user.  This test accepts a full LDAP configuration along with a username and attempts to find the full infofor the user from the LDAP server without actually authenticating the user. So, user password is notrequired.The configuration is validated before attempting to contact the server.  **test_ldap_user** is required.  The active LDAP settings are not modified.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ldap_config = new \OpenAPI\Client\Model\LDAPConfig(); // \OpenAPI\Client\Model\LDAPConfig | LDAP Config

try {
    $result = $apiInstance->testLdapConfigUserInfo($ldap_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->testLdapConfigUserInfo: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ldap_config** | [**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)| LDAP Config | |

### Return type

[**\OpenAPI\Client\Model\LDAPConfigTestResult**](../Model/LDAPConfigTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateLdapConfig()`

```php
updateLdapConfig($ldap_config): \OpenAPI\Client\Model\LDAPConfig
```

Update LDAP Configuration

### Update the LDAP configuration.  Configuring LDAP impacts authentication for all users. This configuration should be done carefully.  Only Looker administrators can read and update the LDAP configuration.  LDAP is enabled or disabled for Looker using the **enabled** field.  It is **highly** recommended that any LDAP setting changes be tested using the APIs below before being set globally.  See the [Looker LDAP docs](https://cloud.google.com/looker/docs/r/api/ldap_setup) for additional information.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ldap_config = new \OpenAPI\Client\Model\LDAPConfig(); // \OpenAPI\Client\Model\LDAPConfig | LDAP Config

try {
    $result = $apiInstance->updateLdapConfig($ldap_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updateLdapConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ldap_config** | [**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)| LDAP Config | |

### Return type

[**\OpenAPI\Client\Model\LDAPConfig**](../Model/LDAPConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateMobileDeviceRegistration()`

```php
updateMobileDeviceRegistration($device_id): \OpenAPI\Client\Model\MobileToken
```

Update Mobile Device Registration

### Updates the mobile device registration

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$device_id = 'device_id_example'; // string | Unique id of the device.

try {
    $result = $apiInstance->updateMobileDeviceRegistration($device_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updateMobileDeviceRegistration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **device_id** | **string**| Unique id of the device. | |

### Return type

[**\OpenAPI\Client\Model\MobileToken**](../Model/MobileToken.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateOauthClientApp()`

```php
updateOauthClientApp($client_guid, $oauth_client_app, $fields): \OpenAPI\Client\Model\OauthClientApp
```

Update OAuth App

### Update OAuth2 Client App Details  Modifies the details a previously registered OAuth2 login client app.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$client_guid = 'client_guid_example'; // string | The unique id of this application
$oauth_client_app = new \OpenAPI\Client\Model\OauthClientApp(); // \OpenAPI\Client\Model\OauthClientApp | OAuth Client App
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateOauthClientApp($client_guid, $oauth_client_app, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updateOauthClientApp: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **client_guid** | **string**| The unique id of this application | |
| **oauth_client_app** | [**\OpenAPI\Client\Model\OauthClientApp**](../Model/OauthClientApp.md)| OAuth Client App | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\OauthClientApp**](../Model/OauthClientApp.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateOidcConfig()`

```php
updateOidcConfig($oidc_config): \OpenAPI\Client\Model\OIDCConfig
```

Update OIDC Configuration

### Update the OIDC configuration.  Configuring OIDC impacts authentication for all users. This configuration should be done carefully.  Only Looker administrators can read and update the OIDC configuration.  OIDC is enabled or disabled for Looker using the **enabled** field.  It is **highly** recommended that any OIDC setting changes be tested using the APIs below before being set globally.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$oidc_config = new \OpenAPI\Client\Model\OIDCConfig(); // \OpenAPI\Client\Model\OIDCConfig | OIDC Config

try {
    $result = $apiInstance->updateOidcConfig($oidc_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updateOidcConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **oidc_config** | [**\OpenAPI\Client\Model\OIDCConfig**](../Model/OIDCConfig.md)| OIDC Config | |

### Return type

[**\OpenAPI\Client\Model\OIDCConfig**](../Model/OIDCConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updatePasswordConfig()`

```php
updatePasswordConfig($password_config): \OpenAPI\Client\Model\PasswordConfig
```

Update Password Config

### Update password config.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$password_config = new \OpenAPI\Client\Model\PasswordConfig(); // \OpenAPI\Client\Model\PasswordConfig | Password Config

try {
    $result = $apiInstance->updatePasswordConfig($password_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updatePasswordConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **password_config** | [**\OpenAPI\Client\Model\PasswordConfig**](../Model/PasswordConfig.md)| Password Config | |

### Return type

[**\OpenAPI\Client\Model\PasswordConfig**](../Model/PasswordConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateSamlConfig()`

```php
updateSamlConfig($saml_config): \OpenAPI\Client\Model\SamlConfig
```

Update SAML Configuration

### Update the SAML configuration.  Configuring SAML impacts authentication for all users. This configuration should be done carefully.  Only Looker administrators can read and update the SAML configuration.  SAML is enabled or disabled for Looker using the **enabled** field.  It is **highly** recommended that any SAML setting changes be tested using the APIs below before being set globally.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$saml_config = new \OpenAPI\Client\Model\SamlConfig(); // \OpenAPI\Client\Model\SamlConfig | SAML Config

try {
    $result = $apiInstance->updateSamlConfig($saml_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updateSamlConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **saml_config** | [**\OpenAPI\Client\Model\SamlConfig**](../Model/SamlConfig.md)| SAML Config | |

### Return type

[**\OpenAPI\Client\Model\SamlConfig**](../Model/SamlConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateSessionConfig()`

```php
updateSessionConfig($session_config): \OpenAPI\Client\Model\SessionConfig
```

Update Session Config

### Update session config.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$session_config = new \OpenAPI\Client\Model\SessionConfig(); // \OpenAPI\Client\Model\SessionConfig | Session Config

try {
    $result = $apiInstance->updateSessionConfig($session_config);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->updateSessionConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **session_config** | [**\OpenAPI\Client\Model\SessionConfig**](../Model/SessionConfig.md)| Session Config | |

### Return type

[**\OpenAPI\Client\Model\SessionConfig**](../Model/SessionConfig.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `validateEmbedUrl()`

```php
validateEmbedUrl($url): \OpenAPI\Client\Model\EmbedUrlResponse
```

Get Embed URL Validation

### Validate a Signed Embed URL

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\AuthApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$url = 'url_example'; // string | URL to validate

try {
    $result = $apiInstance->validateEmbedUrl($url);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthApi->validateEmbedUrl: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **url** | **string**| URL to validate | [optional] |

### Return type

[**\OpenAPI\Client\Model\EmbedUrlResponse**](../Model/EmbedUrlResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

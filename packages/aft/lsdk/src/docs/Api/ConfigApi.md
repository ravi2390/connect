# OpenAPI\Client\ConfigApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allLegacyFeatures()**](ConfigApi.md#allLegacyFeatures) | **GET** /legacy_features | Get All Legacy Features |
| [**allLocales()**](ConfigApi.md#allLocales) | **GET** /locales | Get All Locales |
| [**allTimezones()**](ConfigApi.md#allTimezones) | **GET** /timezones | Get All Timezones |
| [**apiSpec()**](ConfigApi.md#apiSpec) | **GET** /api_spec/{api_version}/{specification} | Get an API specification |
| [**cloudStorageConfiguration()**](ConfigApi.md#cloudStorageConfiguration) | **GET** /cloud_storage | Get Cloud Storage |
| [**createDigestEmailSend()**](ConfigApi.md#createDigestEmailSend) | **POST** /digest_email_send | Deliver digest email contents |
| [**customWelcomeEmail()**](ConfigApi.md#customWelcomeEmail) | **GET** /custom_welcome_email | Get Custom Welcome Email |
| [**digestEmailsEnabled()**](ConfigApi.md#digestEmailsEnabled) | **GET** /digest_emails_enabled | Get Digest_emails |
| [**getSetting()**](ConfigApi.md#getSetting) | **GET** /setting | Get Setting |
| [**internalHelpResources()**](ConfigApi.md#internalHelpResources) | **GET** /internal_help_resources_enabled | Get Internal Help Resources |
| [**internalHelpResourcesContent()**](ConfigApi.md#internalHelpResourcesContent) | **GET** /internal_help_resources_content | Get Internal Help Resources Content |
| [**legacyFeature()**](ConfigApi.md#legacyFeature) | **GET** /legacy_features/{legacy_feature_id} | Get Legacy Feature |
| [**mobileSettings()**](ConfigApi.md#mobileSettings) | **GET** /mobile/settings | Get Mobile_Settings |
| [**publicEgressIpAddresses()**](ConfigApi.md#publicEgressIpAddresses) | **GET** /public_egress_ip_addresses | Public Egress IP Addresses |
| [**setSetting()**](ConfigApi.md#setSetting) | **PATCH** /setting | Set Setting |
| [**setSmtpSettings()**](ConfigApi.md#setSmtpSettings) | **POST** /smtp_settings | Set SMTP Setting |
| [**smtpStatus()**](ConfigApi.md#smtpStatus) | **GET** /smtp_status | Get SMTP Status |
| [**updateCloudStorageConfiguration()**](ConfigApi.md#updateCloudStorageConfiguration) | **PATCH** /cloud_storage | Update Cloud Storage |
| [**updateCustomWelcomeEmail()**](ConfigApi.md#updateCustomWelcomeEmail) | **PATCH** /custom_welcome_email | Update Custom Welcome Email Content |
| [**updateCustomWelcomeEmailTest()**](ConfigApi.md#updateCustomWelcomeEmailTest) | **PUT** /custom_welcome_email_test | Send a test welcome email to the currently logged in user with the supplied content |
| [**updateDigestEmailsEnabled()**](ConfigApi.md#updateDigestEmailsEnabled) | **PATCH** /digest_emails_enabled | Update Digest_emails |
| [**updateInternalHelpResources()**](ConfigApi.md#updateInternalHelpResources) | **PATCH** /internal_help_resources | Update internal help resources configuration |
| [**updateInternalHelpResourcesContent()**](ConfigApi.md#updateInternalHelpResourcesContent) | **PATCH** /internal_help_resources_content | Update internal help resources content |
| [**updateLegacyFeature()**](ConfigApi.md#updateLegacyFeature) | **PATCH** /legacy_features/{legacy_feature_id} | Update Legacy Feature |
| [**updateWhitelabelConfiguration()**](ConfigApi.md#updateWhitelabelConfiguration) | **PUT** /whitelabel_configuration | Update Private label configuration |
| [**versions()**](ConfigApi.md#versions) | **GET** /versions | Get ApiVersion |
| [**whitelabelConfiguration()**](ConfigApi.md#whitelabelConfiguration) | **GET** /whitelabel_configuration | Get Private label configuration |


## `allLegacyFeatures()`

```php
allLegacyFeatures(): \OpenAPI\Client\Model\LegacyFeature[]
```

Get All Legacy Features

### Get all legacy features.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->allLegacyFeatures();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->allLegacyFeatures: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\LegacyFeature[]**](../Model/LegacyFeature.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allLocales()`

```php
allLocales(): \OpenAPI\Client\Model\Locale[]
```

Get All Locales

### Get a list of locales that Looker supports.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->allLocales();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->allLocales: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\Locale[]**](../Model/Locale.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allTimezones()`

```php
allTimezones(): \OpenAPI\Client\Model\Timezone[]
```

Get All Timezones

### Get a list of timezones that Looker supports (e.g. useful for scheduling tasks).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->allTimezones();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->allTimezones: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\Timezone[]**](../Model/Timezone.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `apiSpec()`

```php
apiSpec($api_version, $specification): Any
```

Get an API specification

### Get an API specification for this Looker instance.  The specification is returned as a JSON document in Swagger 2.x format

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$api_version = 'api_version_example'; // string | API version
$specification = 'specification_example'; // string | Specification name. Typically, this is \"swagger.json\"

try {
    $result = $apiInstance->apiSpec($api_version, $specification);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->apiSpec: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **api_version** | **string**| API version | |
| **specification** | **string**| Specification name. Typically, this is \&quot;swagger.json\&quot; | |

### Return type

[**Any**](../Model/Any.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `cloudStorageConfiguration()`

```php
cloudStorageConfiguration(): \OpenAPI\Client\Model\BackupConfiguration
```

Get Cloud Storage

Get the current Cloud Storage Configuration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->cloudStorageConfiguration();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->cloudStorageConfiguration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\BackupConfiguration**](../Model/BackupConfiguration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createDigestEmailSend()`

```php
createDigestEmailSend(): \OpenAPI\Client\Model\DigestEmailSend
```

Deliver digest email contents

### Trigger the generation of digest email records and send them to Looker's internal system. This does not send any actual emails, it generates records containing content which may be of interest for users who have become inactive. Emails will be sent at a later time from Looker's internal system if the Digest Emails feature is enabled in settings.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->createDigestEmailSend();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->createDigestEmailSend: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\DigestEmailSend**](../Model/DigestEmailSend.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `customWelcomeEmail()`

```php
customWelcomeEmail(): \OpenAPI\Client\Model\CustomWelcomeEmail
```

Get Custom Welcome Email

### Get the current status and content of custom welcome emails

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->customWelcomeEmail();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->customWelcomeEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\CustomWelcomeEmail**](../Model/CustomWelcomeEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `digestEmailsEnabled()`

```php
digestEmailsEnabled(): \OpenAPI\Client\Model\DigestEmails
```

Get Digest_emails

### Retrieve the value for whether or not digest emails is enabled

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->digestEmailsEnabled();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->digestEmailsEnabled: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\DigestEmails**](../Model/DigestEmails.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getSetting()`

```php
getSetting($fields): \OpenAPI\Client\Model\Setting
```

Get Setting

### Get Looker Settings  Available settings are:  - allow_user_timezones  - custom_welcome_email  - data_connector_default_enabled  - extension_framework_enabled  - extension_load_url_enabled  - marketplace_auto_install_enabled  - marketplace_automation  - marketplace_terms_accepted  - marketplace_enabled  - marketplace_site  - onboarding_enabled  - privatelabel_configuration  - timezone  - host_url  - email_domain_allowlist  - embed_cookieless_v2  - embed_enabled  - embed_config

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields

try {
    $result = $apiInstance->getSetting($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->getSetting: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields | [optional] |

### Return type

[**\OpenAPI\Client\Model\Setting**](../Model/Setting.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `internalHelpResources()`

```php
internalHelpResources(): \OpenAPI\Client\Model\InternalHelpResources
```

Get Internal Help Resources

### Get and set the options for internal help resources

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->internalHelpResources();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->internalHelpResources: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\InternalHelpResources**](../Model/InternalHelpResources.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `internalHelpResourcesContent()`

```php
internalHelpResourcesContent(): \OpenAPI\Client\Model\InternalHelpResourcesContent
```

Get Internal Help Resources Content

### Set the menu item name and content for internal help resources

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->internalHelpResourcesContent();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->internalHelpResourcesContent: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\InternalHelpResourcesContent**](../Model/InternalHelpResourcesContent.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `legacyFeature()`

```php
legacyFeature($legacy_feature_id): \OpenAPI\Client\Model\LegacyFeature
```

Get Legacy Feature

### Get information about the legacy feature with a specific id.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$legacy_feature_id = 'legacy_feature_id_example'; // string | id of legacy feature

try {
    $result = $apiInstance->legacyFeature($legacy_feature_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->legacyFeature: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **legacy_feature_id** | **string**| id of legacy feature | |

### Return type

[**\OpenAPI\Client\Model\LegacyFeature**](../Model/LegacyFeature.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `mobileSettings()`

```php
mobileSettings(): \OpenAPI\Client\Model\MobileSettings
```

Get Mobile_Settings

### Get all mobile settings.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->mobileSettings();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->mobileSettings: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\MobileSettings**](../Model/MobileSettings.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `publicEgressIpAddresses()`

```php
publicEgressIpAddresses(): \OpenAPI\Client\Model\EgressIpAddresses
```

Public Egress IP Addresses

### Get Egress IP Addresses  Returns the list of public egress IP Addresses for a hosted customer's instance  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->publicEgressIpAddresses();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->publicEgressIpAddresses: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\EgressIpAddresses**](../Model/EgressIpAddresses.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setSetting()`

```php
setSetting($setting, $fields): \OpenAPI\Client\Model\Setting
```

Set Setting

### Configure Looker Settings  Available settings are:  - allow_user_timezones  - custom_welcome_email  - data_connector_default_enabled  - extension_framework_enabled  - extension_load_url_enabled  - marketplace_auto_install_enabled  - marketplace_automation  - marketplace_terms_accepted  - marketplace_enabled  - marketplace_site  - onboarding_enabled  - privatelabel_configuration  - timezone  - host_url  - email_domain_allowlist  - embed_cookieless_v2  - embed_enabled  - embed_config  See the `Setting` type for more information on the specific values that can be configured.  If a setting update is rejected, the API error payload should provide information on the cause of the rejection.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$setting = new \OpenAPI\Client\Model\Setting(); // \OpenAPI\Client\Model\Setting | Looker Setting Configuration
$fields = 'fields_example'; // string | Requested fields

try {
    $result = $apiInstance->setSetting($setting, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->setSetting: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **setting** | [**\OpenAPI\Client\Model\Setting**](../Model/Setting.md)| Looker Setting Configuration | |
| **fields** | **string**| Requested fields | [optional] |

### Return type

[**\OpenAPI\Client\Model\Setting**](../Model/Setting.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `setSmtpSettings()`

```php
setSmtpSettings($smtp_settings)
```

Set SMTP Setting

### Configure SMTP Settings   This API allows users to configure the SMTP settings on the Looker instance.   Only admin users are authorised to call this API.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$smtp_settings = new \OpenAPI\Client\Model\SmtpSettings(); // \OpenAPI\Client\Model\SmtpSettings | SMTP Setting Configuration

try {
    $apiInstance->setSmtpSettings($smtp_settings);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->setSmtpSettings: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **smtp_settings** | [**\OpenAPI\Client\Model\SmtpSettings**](../Model/SmtpSettings.md)| SMTP Setting Configuration | |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `smtpStatus()`

```php
smtpStatus($fields): \OpenAPI\Client\Model\SmtpStatus
```

Get SMTP Status

### Get current SMTP status.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Include only these fields in the response

try {
    $result = $apiInstance->smtpStatus($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->smtpStatus: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Include only these fields in the response | [optional] |

### Return type

[**\OpenAPI\Client\Model\SmtpStatus**](../Model/SmtpStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateCloudStorageConfiguration()`

```php
updateCloudStorageConfiguration($backup_configuration): \OpenAPI\Client\Model\BackupConfiguration
```

Update Cloud Storage

Update the current Cloud Storage Configuration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$backup_configuration = new \OpenAPI\Client\Model\BackupConfiguration(); // \OpenAPI\Client\Model\BackupConfiguration | Options for Cloud Storage Configuration

try {
    $result = $apiInstance->updateCloudStorageConfiguration($backup_configuration);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateCloudStorageConfiguration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **backup_configuration** | [**\OpenAPI\Client\Model\BackupConfiguration**](../Model/BackupConfiguration.md)| Options for Cloud Storage Configuration | |

### Return type

[**\OpenAPI\Client\Model\BackupConfiguration**](../Model/BackupConfiguration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateCustomWelcomeEmail()`

```php
updateCustomWelcomeEmail($custom_welcome_email, $send_test_welcome_email): \OpenAPI\Client\Model\CustomWelcomeEmail
```

Update Custom Welcome Email Content

Update custom welcome email setting and values. Optionally send a test email with the new content to the currently logged in user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$custom_welcome_email = new \OpenAPI\Client\Model\CustomWelcomeEmail(); // \OpenAPI\Client\Model\CustomWelcomeEmail | Custom Welcome Email setting and value to save
$send_test_welcome_email = True; // bool | If true a test email with the content from the request will be sent to the current user after saving

try {
    $result = $apiInstance->updateCustomWelcomeEmail($custom_welcome_email, $send_test_welcome_email);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateCustomWelcomeEmail: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **custom_welcome_email** | [**\OpenAPI\Client\Model\CustomWelcomeEmail**](../Model/CustomWelcomeEmail.md)| Custom Welcome Email setting and value to save | |
| **send_test_welcome_email** | **bool**| If true a test email with the content from the request will be sent to the current user after saving | [optional] |

### Return type

[**\OpenAPI\Client\Model\CustomWelcomeEmail**](../Model/CustomWelcomeEmail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateCustomWelcomeEmailTest()`

```php
updateCustomWelcomeEmailTest($welcome_email_test): \OpenAPI\Client\Model\WelcomeEmailTest
```

Send a test welcome email to the currently logged in user with the supplied content

Requests to this endpoint will send a welcome email with the custom content provided in the body to the currently logged in user.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$welcome_email_test = new \OpenAPI\Client\Model\WelcomeEmailTest(); // \OpenAPI\Client\Model\WelcomeEmailTest | Subject, header, and Body of the email to be sent.

try {
    $result = $apiInstance->updateCustomWelcomeEmailTest($welcome_email_test);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateCustomWelcomeEmailTest: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **welcome_email_test** | [**\OpenAPI\Client\Model\WelcomeEmailTest**](../Model/WelcomeEmailTest.md)| Subject, header, and Body of the email to be sent. | |

### Return type

[**\OpenAPI\Client\Model\WelcomeEmailTest**](../Model/WelcomeEmailTest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateDigestEmailsEnabled()`

```php
updateDigestEmailsEnabled($digest_emails): \OpenAPI\Client\Model\DigestEmails
```

Update Digest_emails

### Update the setting for enabling/disabling digest emails

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$digest_emails = new \OpenAPI\Client\Model\DigestEmails(); // \OpenAPI\Client\Model\DigestEmails | Digest_emails

try {
    $result = $apiInstance->updateDigestEmailsEnabled($digest_emails);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateDigestEmailsEnabled: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **digest_emails** | [**\OpenAPI\Client\Model\DigestEmails**](../Model/DigestEmails.md)| Digest_emails | |

### Return type

[**\OpenAPI\Client\Model\DigestEmails**](../Model/DigestEmails.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateInternalHelpResources()`

```php
updateInternalHelpResources($internal_help_resources): \OpenAPI\Client\Model\InternalHelpResources
```

Update internal help resources configuration

Update internal help resources settings

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$internal_help_resources = new \OpenAPI\Client\Model\InternalHelpResources(); // \OpenAPI\Client\Model\InternalHelpResources | Custom Welcome Email

try {
    $result = $apiInstance->updateInternalHelpResources($internal_help_resources);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateInternalHelpResources: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **internal_help_resources** | [**\OpenAPI\Client\Model\InternalHelpResources**](../Model/InternalHelpResources.md)| Custom Welcome Email | |

### Return type

[**\OpenAPI\Client\Model\InternalHelpResources**](../Model/InternalHelpResources.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateInternalHelpResourcesContent()`

```php
updateInternalHelpResourcesContent($internal_help_resources_content): \OpenAPI\Client\Model\InternalHelpResourcesContent
```

Update internal help resources content

Update internal help resources content

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$internal_help_resources_content = new \OpenAPI\Client\Model\InternalHelpResourcesContent(); // \OpenAPI\Client\Model\InternalHelpResourcesContent | Internal Help Resources Content

try {
    $result = $apiInstance->updateInternalHelpResourcesContent($internal_help_resources_content);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateInternalHelpResourcesContent: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **internal_help_resources_content** | [**\OpenAPI\Client\Model\InternalHelpResourcesContent**](../Model/InternalHelpResourcesContent.md)| Internal Help Resources Content | |

### Return type

[**\OpenAPI\Client\Model\InternalHelpResourcesContent**](../Model/InternalHelpResourcesContent.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateLegacyFeature()`

```php
updateLegacyFeature($legacy_feature_id, $legacy_feature): \OpenAPI\Client\Model\LegacyFeature
```

Update Legacy Feature

### Update information about the legacy feature with a specific id.  Calls to this endpoint may be denied by [Looker (Google Cloud core)](https://cloud.google.com/looker/docs/r/looker-core/overview).

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$legacy_feature_id = 'legacy_feature_id_example'; // string | id of legacy feature
$legacy_feature = new \OpenAPI\Client\Model\LegacyFeature(); // \OpenAPI\Client\Model\LegacyFeature | Legacy Feature

try {
    $result = $apiInstance->updateLegacyFeature($legacy_feature_id, $legacy_feature);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateLegacyFeature: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **legacy_feature_id** | **string**| id of legacy feature | |
| **legacy_feature** | [**\OpenAPI\Client\Model\LegacyFeature**](../Model/LegacyFeature.md)| Legacy Feature | |

### Return type

[**\OpenAPI\Client\Model\LegacyFeature**](../Model/LegacyFeature.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateWhitelabelConfiguration()`

```php
updateWhitelabelConfiguration($whitelabel_configuration): \OpenAPI\Client\Model\WhitelabelConfiguration
```

Update Private label configuration

### Update the private label configuration  This endpoint is deprecated. [Set Setting](#!/Config/set_setting) should be used to update private label settings instead

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$whitelabel_configuration = new \OpenAPI\Client\Model\WhitelabelConfiguration(); // \OpenAPI\Client\Model\WhitelabelConfiguration | Private label configuration

try {
    $result = $apiInstance->updateWhitelabelConfiguration($whitelabel_configuration);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->updateWhitelabelConfiguration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **whitelabel_configuration** | [**\OpenAPI\Client\Model\WhitelabelConfiguration**](../Model/WhitelabelConfiguration.md)| Private label configuration | |

### Return type

[**\OpenAPI\Client\Model\WhitelabelConfiguration**](../Model/WhitelabelConfiguration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `versions()`

```php
versions($fields): \OpenAPI\Client\Model\ApiVersion
```

Get ApiVersion

### Get information about all API versions supported by this Looker instance.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->versions($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->versions: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\ApiVersion**](../Model/ApiVersion.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `whitelabelConfiguration()`

```php
whitelabelConfiguration($fields): \OpenAPI\Client\Model\WhitelabelConfiguration
```

Get Private label configuration

### This feature is enabled only by special license.  This endpoint provides the private label configuration, which includes hiding documentation links, custom favicon uploading, etc.  This endpoint is deprecated. [Get Setting](#!/Config/get_setting) should be used to retrieve private label settings instead

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConfigApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->whitelabelConfiguration($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConfigApi->whitelabelConfiguration: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\WhitelabelConfiguration**](../Model/WhitelabelConfiguration.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

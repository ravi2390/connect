# OpenAPI\Client\ConnectionApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allConnections()**](ConnectionApi.md#allConnections) | **GET** /connections | Get All Connections |
| [**allDialectInfos()**](ConnectionApi.md#allDialectInfos) | **GET** /dialect_info | Get All Dialect Infos |
| [**allExternalOauthApplications()**](ConnectionApi.md#allExternalOauthApplications) | **GET** /external_oauth_applications | Get All External OAuth Applications |
| [**allSshServers()**](ConnectionApi.md#allSshServers) | **GET** /ssh_servers | Get All SSH Servers |
| [**allSshTunnels()**](ConnectionApi.md#allSshTunnels) | **GET** /ssh_tunnels | Get All SSH Tunnels |
| [**connection()**](ConnectionApi.md#connection) | **GET** /connections/{connection_name} | Get Connection |
| [**createConnection()**](ConnectionApi.md#createConnection) | **POST** /connections | Create Connection |
| [**createExternalOauthApplication()**](ConnectionApi.md#createExternalOauthApplication) | **POST** /external_oauth_applications | Create External OAuth Application |
| [**createOauthApplicationUserState()**](ConnectionApi.md#createOauthApplicationUserState) | **POST** /external_oauth_applications/user_state | Create Create OAuth user state. |
| [**createSshServer()**](ConnectionApi.md#createSshServer) | **POST** /ssh_servers | Create SSH Server |
| [**createSshTunnel()**](ConnectionApi.md#createSshTunnel) | **POST** /ssh_tunnels | Create SSH Tunnel |
| [**deleteConnection()**](ConnectionApi.md#deleteConnection) | **DELETE** /connections/{connection_name} | Delete Connection |
| [**deleteConnectionOverride()**](ConnectionApi.md#deleteConnectionOverride) | **DELETE** /connections/{connection_name}/connection_override/{override_context} | Delete Connection Override |
| [**deleteSshServer()**](ConnectionApi.md#deleteSshServer) | **DELETE** /ssh_server/{ssh_server_id} | Delete SSH Server |
| [**deleteSshTunnel()**](ConnectionApi.md#deleteSshTunnel) | **DELETE** /ssh_tunnel/{ssh_tunnel_id} | Delete SSH Tunnel |
| [**sshPublicKey()**](ConnectionApi.md#sshPublicKey) | **GET** /ssh_public_key | Get SSH Public Key |
| [**sshServer()**](ConnectionApi.md#sshServer) | **GET** /ssh_server/{ssh_server_id} | Get SSH Server |
| [**sshTunnel()**](ConnectionApi.md#sshTunnel) | **GET** /ssh_tunnel/{ssh_tunnel_id} | Get SSH Tunnel |
| [**testConnection()**](ConnectionApi.md#testConnection) | **PUT** /connections/{connection_name}/test | Test Connection |
| [**testConnectionConfig()**](ConnectionApi.md#testConnectionConfig) | **PUT** /connections/test | Test Connection Configuration |
| [**testSshServer()**](ConnectionApi.md#testSshServer) | **GET** /ssh_server/{ssh_server_id}/test | Test SSH Server |
| [**testSshTunnel()**](ConnectionApi.md#testSshTunnel) | **GET** /ssh_tunnel/{ssh_tunnel_id}/test | Test SSH Tunnel |
| [**updateConnection()**](ConnectionApi.md#updateConnection) | **PATCH** /connections/{connection_name} | Update Connection |
| [**updateSshServer()**](ConnectionApi.md#updateSshServer) | **PATCH** /ssh_server/{ssh_server_id} | Update SSH Server |
| [**updateSshTunnel()**](ConnectionApi.md#updateSshTunnel) | **PATCH** /ssh_tunnel/{ssh_tunnel_id} | Update SSH Tunnel |


## `allConnections()`

```php
allConnections($fields): \OpenAPI\Client\Model\DBConnection[]
```

Get All Connections

### Get information about all connections.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allConnections($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->allConnections: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DBConnection[]**](../Model/DBConnection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allDialectInfos()`

```php
allDialectInfos($fields): \OpenAPI\Client\Model\DialectInfo[]
```

Get All Dialect Infos

### Get information about all dialects.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allDialectInfos($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->allDialectInfos: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DialectInfo[]**](../Model/DialectInfo.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allExternalOauthApplications()`

```php
allExternalOauthApplications($name, $client_id): \OpenAPI\Client\Model\ExternalOauthApplication[]
```

Get All External OAuth Applications

### Get all External OAuth Applications.  This is an OAuth Application which Looker uses to access external systems.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$name = 'name_example'; // string | Application name
$client_id = 'client_id_example'; // string | Application Client ID

try {
    $result = $apiInstance->allExternalOauthApplications($name, $client_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->allExternalOauthApplications: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **name** | **string**| Application name | [optional] |
| **client_id** | **string**| Application Client ID | [optional] |

### Return type

[**\OpenAPI\Client\Model\ExternalOauthApplication[]**](../Model/ExternalOauthApplication.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allSshServers()`

```php
allSshServers($fields): \OpenAPI\Client\Model\SshServer[]
```

Get All SSH Servers

### Get information about all SSH Servers.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allSshServers($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->allSshServers: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\SshServer[]**](../Model/SshServer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allSshTunnels()`

```php
allSshTunnels($fields): \OpenAPI\Client\Model\SshTunnel[]
```

Get All SSH Tunnels

### Get information about all SSH Tunnels.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allSshTunnels($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->allSshTunnels: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\SshTunnel[]**](../Model/SshTunnel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `connection()`

```php
connection($connection_name, $fields): \OpenAPI\Client\Model\DBConnection
```

Get Connection

### Get information about a connection.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$connection_name = 'connection_name_example'; // string | Name of connection
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->connection($connection_name, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->connection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **connection_name** | **string**| Name of connection | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\DBConnection**](../Model/DBConnection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createConnection()`

```php
createConnection($db_connection): \OpenAPI\Client\Model\DBConnection
```

Create Connection

### Create a connection using the specified configuration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$db_connection = new \OpenAPI\Client\Model\DBConnection(); // \OpenAPI\Client\Model\DBConnection | Connection

try {
    $result = $apiInstance->createConnection($db_connection);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->createConnection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **db_connection** | [**\OpenAPI\Client\Model\DBConnection**](../Model/DBConnection.md)| Connection | |

### Return type

[**\OpenAPI\Client\Model\DBConnection**](../Model/DBConnection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createExternalOauthApplication()`

```php
createExternalOauthApplication($external_oauth_application): \OpenAPI\Client\Model\ExternalOauthApplication
```

Create External OAuth Application

### Create an OAuth Application using the specified configuration.  This is an OAuth Application which Looker uses to access external systems.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$external_oauth_application = new \OpenAPI\Client\Model\ExternalOauthApplication(); // \OpenAPI\Client\Model\ExternalOauthApplication | External OAuth Application

try {
    $result = $apiInstance->createExternalOauthApplication($external_oauth_application);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->createExternalOauthApplication: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **external_oauth_application** | [**\OpenAPI\Client\Model\ExternalOauthApplication**](../Model/ExternalOauthApplication.md)| External OAuth Application | |

### Return type

[**\OpenAPI\Client\Model\ExternalOauthApplication**](../Model/ExternalOauthApplication.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createOauthApplicationUserState()`

```php
createOauthApplicationUserState($create_o_auth_application_user_state_request): \OpenAPI\Client\Model\CreateOAuthApplicationUserStateResponse
```

Create Create OAuth user state.

### Create OAuth User state.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$create_o_auth_application_user_state_request = new \OpenAPI\Client\Model\CreateOAuthApplicationUserStateRequest(); // \OpenAPI\Client\Model\CreateOAuthApplicationUserStateRequest | Create OAuth user state.

try {
    $result = $apiInstance->createOauthApplicationUserState($create_o_auth_application_user_state_request);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->createOauthApplicationUserState: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **create_o_auth_application_user_state_request** | [**\OpenAPI\Client\Model\CreateOAuthApplicationUserStateRequest**](../Model/CreateOAuthApplicationUserStateRequest.md)| Create OAuth user state. | |

### Return type

[**\OpenAPI\Client\Model\CreateOAuthApplicationUserStateResponse**](../Model/CreateOAuthApplicationUserStateResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createSshServer()`

```php
createSshServer($ssh_server): \OpenAPI\Client\Model\SshServer
```

Create SSH Server

### Create an SSH Server.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_server = new \OpenAPI\Client\Model\SshServer(); // \OpenAPI\Client\Model\SshServer | SSH Server

try {
    $result = $apiInstance->createSshServer($ssh_server);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->createSshServer: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_server** | [**\OpenAPI\Client\Model\SshServer**](../Model/SshServer.md)| SSH Server | |

### Return type

[**\OpenAPI\Client\Model\SshServer**](../Model/SshServer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createSshTunnel()`

```php
createSshTunnel($ssh_tunnel): \OpenAPI\Client\Model\SshTunnel
```

Create SSH Tunnel

### Create an SSH Tunnel

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_tunnel = new \OpenAPI\Client\Model\SshTunnel(); // \OpenAPI\Client\Model\SshTunnel | SSH Tunnel

try {
    $result = $apiInstance->createSshTunnel($ssh_tunnel);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->createSshTunnel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_tunnel** | [**\OpenAPI\Client\Model\SshTunnel**](../Model/SshTunnel.md)| SSH Tunnel | |

### Return type

[**\OpenAPI\Client\Model\SshTunnel**](../Model/SshTunnel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteConnection()`

```php
deleteConnection($connection_name): string
```

Delete Connection

### Delete a connection.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$connection_name = 'connection_name_example'; // string | Name of connection

try {
    $result = $apiInstance->deleteConnection($connection_name);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->deleteConnection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **connection_name** | **string**| Name of connection | |

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

## `deleteConnectionOverride()`

```php
deleteConnectionOverride($connection_name, $override_context): string
```

Delete Connection Override

### Delete a connection override.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$connection_name = 'connection_name_example'; // string | Name of connection
$override_context = 'override_context_example'; // string | Context of connection override

try {
    $result = $apiInstance->deleteConnectionOverride($connection_name, $override_context);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->deleteConnectionOverride: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **connection_name** | **string**| Name of connection | |
| **override_context** | **string**| Context of connection override | |

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

## `deleteSshServer()`

```php
deleteSshServer($ssh_server_id): string
```

Delete SSH Server

### Delete an SSH Server.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_server_id = 'ssh_server_id_example'; // string | Id of SSH Server

try {
    $result = $apiInstance->deleteSshServer($ssh_server_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->deleteSshServer: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_server_id** | **string**| Id of SSH Server | |

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

## `deleteSshTunnel()`

```php
deleteSshTunnel($ssh_tunnel_id): string
```

Delete SSH Tunnel

### Delete an SSH Tunnel

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_tunnel_id = 'ssh_tunnel_id_example'; // string | Id of SSH Tunnel

try {
    $result = $apiInstance->deleteSshTunnel($ssh_tunnel_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->deleteSshTunnel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_tunnel_id** | **string**| Id of SSH Tunnel | |

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

## `sshPublicKey()`

```php
sshPublicKey(): \OpenAPI\Client\Model\SshPublicKey
```

Get SSH Public Key

### Get the SSH public key  Get the public key created for this instance to identify itself to a remote SSH server.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);

try {
    $result = $apiInstance->sshPublicKey();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->sshPublicKey: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**\OpenAPI\Client\Model\SshPublicKey**](../Model/SshPublicKey.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `sshServer()`

```php
sshServer($ssh_server_id): \OpenAPI\Client\Model\SshServer
```

Get SSH Server

### Get information about an SSH Server.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_server_id = 'ssh_server_id_example'; // string | Id of SSH Server

try {
    $result = $apiInstance->sshServer($ssh_server_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->sshServer: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_server_id** | **string**| Id of SSH Server | |

### Return type

[**\OpenAPI\Client\Model\SshServer**](../Model/SshServer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `sshTunnel()`

```php
sshTunnel($ssh_tunnel_id): \OpenAPI\Client\Model\SshTunnel
```

Get SSH Tunnel

### Get information about an SSH Tunnel.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_tunnel_id = 'ssh_tunnel_id_example'; // string | Id of SSH Tunnel

try {
    $result = $apiInstance->sshTunnel($ssh_tunnel_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->sshTunnel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_tunnel_id** | **string**| Id of SSH Tunnel | |

### Return type

[**\OpenAPI\Client\Model\SshTunnel**](../Model/SshTunnel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testConnection()`

```php
testConnection($connection_name, $tests): \OpenAPI\Client\Model\DBConnectionTestResult[]
```

Test Connection

### Test an existing connection.  Note that a connection's 'dialect' property has a 'connection_tests' property that lists the specific types of tests that the connection supports.  This API is rate limited.  Unsupported tests in the request will be ignored.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$connection_name = 'connection_name_example'; // string | Name of connection
$tests = array('tests_example'); // string[] | Array of names of tests to run

try {
    $result = $apiInstance->testConnection($connection_name, $tests);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->testConnection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **connection_name** | **string**| Name of connection | |
| **tests** | [**string[]**](../Model/string.md)| Array of names of tests to run | [optional] |

### Return type

[**\OpenAPI\Client\Model\DBConnectionTestResult[]**](../Model/DBConnectionTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testConnectionConfig()`

```php
testConnectionConfig($db_connection, $tests): \OpenAPI\Client\Model\DBConnectionTestResult[]
```

Test Connection Configuration

### Test a connection configuration.  Note that a connection's 'dialect' property has a 'connection_tests' property that lists the specific types of tests that the connection supports.  This API is rate limited.  Unsupported tests in the request will be ignored.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$db_connection = new \OpenAPI\Client\Model\DBConnection(); // \OpenAPI\Client\Model\DBConnection | Connection
$tests = array('tests_example'); // string[] | Array of names of tests to run

try {
    $result = $apiInstance->testConnectionConfig($db_connection, $tests);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->testConnectionConfig: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **db_connection** | [**\OpenAPI\Client\Model\DBConnection**](../Model/DBConnection.md)| Connection | |
| **tests** | [**string[]**](../Model/string.md)| Array of names of tests to run | [optional] |

### Return type

[**\OpenAPI\Client\Model\DBConnectionTestResult[]**](../Model/DBConnectionTestResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testSshServer()`

```php
testSshServer($ssh_server_id): \OpenAPI\Client\Model\SshServer
```

Test SSH Server

### Test the SSH Server

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_server_id = 'ssh_server_id_example'; // string | Id of SSH Server

try {
    $result = $apiInstance->testSshServer($ssh_server_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->testSshServer: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_server_id** | **string**| Id of SSH Server | |

### Return type

[**\OpenAPI\Client\Model\SshServer**](../Model/SshServer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `testSshTunnel()`

```php
testSshTunnel($ssh_tunnel_id): \OpenAPI\Client\Model\SshTunnel
```

Test SSH Tunnel

### Test the SSH Tunnel

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_tunnel_id = 'ssh_tunnel_id_example'; // string | Id of SSH Tunnel

try {
    $result = $apiInstance->testSshTunnel($ssh_tunnel_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->testSshTunnel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_tunnel_id** | **string**| Id of SSH Tunnel | |

### Return type

[**\OpenAPI\Client\Model\SshTunnel**](../Model/SshTunnel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateConnection()`

```php
updateConnection($connection_name, $db_connection): \OpenAPI\Client\Model\DBConnection
```

Update Connection

### Update a connection using the specified configuration.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$connection_name = 'connection_name_example'; // string | Name of connection
$db_connection = new \OpenAPI\Client\Model\DBConnection(); // \OpenAPI\Client\Model\DBConnection | Connection

try {
    $result = $apiInstance->updateConnection($connection_name, $db_connection);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->updateConnection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **connection_name** | **string**| Name of connection | |
| **db_connection** | [**\OpenAPI\Client\Model\DBConnection**](../Model/DBConnection.md)| Connection | |

### Return type

[**\OpenAPI\Client\Model\DBConnection**](../Model/DBConnection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateSshServer()`

```php
updateSshServer($ssh_server_id, $ssh_server): \OpenAPI\Client\Model\SshServer
```

Update SSH Server

### Update an SSH Server.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_server_id = 'ssh_server_id_example'; // string | Id of SSH Server
$ssh_server = new \OpenAPI\Client\Model\SshServer(); // \OpenAPI\Client\Model\SshServer | SSH Server

try {
    $result = $apiInstance->updateSshServer($ssh_server_id, $ssh_server);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->updateSshServer: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_server_id** | **string**| Id of SSH Server | |
| **ssh_server** | [**\OpenAPI\Client\Model\SshServer**](../Model/SshServer.md)| SSH Server | |

### Return type

[**\OpenAPI\Client\Model\SshServer**](../Model/SshServer.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateSshTunnel()`

```php
updateSshTunnel($ssh_tunnel_id, $ssh_tunnel): \OpenAPI\Client\Model\SshTunnel
```

Update SSH Tunnel

### Update an SSH Tunnel

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\ConnectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$ssh_tunnel_id = 'ssh_tunnel_id_example'; // string | Id of SSH Tunnel
$ssh_tunnel = new \OpenAPI\Client\Model\SshTunnel(); // \OpenAPI\Client\Model\SshTunnel | SSH Tunnel

try {
    $result = $apiInstance->updateSshTunnel($ssh_tunnel_id, $ssh_tunnel);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ConnectionApi->updateSshTunnel: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **ssh_tunnel_id** | **string**| Id of SSH Tunnel | |
| **ssh_tunnel** | [**\OpenAPI\Client\Model\SshTunnel**](../Model/SshTunnel.md)| SSH Tunnel | |

### Return type

[**\OpenAPI\Client\Model\SshTunnel**](../Model/SshTunnel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

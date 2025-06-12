# OpenAPI\Client\BoardApi

All URIs are relative to https://localhost:20000/api/4.0, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**allBoardItems()**](BoardApi.md#allBoardItems) | **GET** /board_items | Get All Board Items |
| [**allBoardSections()**](BoardApi.md#allBoardSections) | **GET** /board_sections | Get All Board sections |
| [**allBoards()**](BoardApi.md#allBoards) | **GET** /boards | Get All Boards |
| [**board()**](BoardApi.md#board) | **GET** /boards/{board_id} | Get Board |
| [**boardItem()**](BoardApi.md#boardItem) | **GET** /board_items/{board_item_id} | Get Board Item |
| [**boardSection()**](BoardApi.md#boardSection) | **GET** /board_sections/{board_section_id} | Get Board section |
| [**createBoard()**](BoardApi.md#createBoard) | **POST** /boards | Create Board |
| [**createBoardItem()**](BoardApi.md#createBoardItem) | **POST** /board_items | Create Board Item |
| [**createBoardSection()**](BoardApi.md#createBoardSection) | **POST** /board_sections | Create Board section |
| [**deleteBoard()**](BoardApi.md#deleteBoard) | **DELETE** /boards/{board_id} | Delete Board |
| [**deleteBoardItem()**](BoardApi.md#deleteBoardItem) | **DELETE** /board_items/{board_item_id} | Delete Board Item |
| [**deleteBoardSection()**](BoardApi.md#deleteBoardSection) | **DELETE** /board_sections/{board_section_id} | Delete Board section |
| [**searchBoards()**](BoardApi.md#searchBoards) | **GET** /boards/search | Search Boards |
| [**updateBoard()**](BoardApi.md#updateBoard) | **PATCH** /boards/{board_id} | Update Board |
| [**updateBoardItem()**](BoardApi.md#updateBoardItem) | **PATCH** /board_items/{board_item_id} | Update Board Item |
| [**updateBoardSection()**](BoardApi.md#updateBoardSection) | **PATCH** /board_sections/{board_section_id} | Update Board section |


## `allBoardItems()`

```php
allBoardItems($fields, $sorts, $board_section_id): \OpenAPI\Client\Model\BoardItem[]
```

Get All Board Items

### Get information about all board items.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$sorts = 'sorts_example'; // string | Fields to sort by.
$board_section_id = 'board_section_id_example'; // string | Filter to a specific board section

try {
    $result = $apiInstance->allBoardItems($fields, $sorts, $board_section_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->allBoardItems: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |
| **board_section_id** | **string**| Filter to a specific board section | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardItem[]**](../Model/BoardItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allBoardSections()`

```php
allBoardSections($fields, $sorts): \OpenAPI\Client\Model\BoardSection[]
```

Get All Board sections

### Get information about all board sections.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.
$sorts = 'sorts_example'; // string | Fields to sort by.

try {
    $result = $apiInstance->allBoardSections($fields, $sorts);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->allBoardSections: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |
| **sorts** | **string**| Fields to sort by. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardSection[]**](../Model/BoardSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `allBoards()`

```php
allBoards($fields): \OpenAPI\Client\Model\Board[]
```

Get All Boards

### Get information about all boards.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->allBoards($fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->allBoards: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Board[]**](../Model/Board.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `board()`

```php
board($board_id, $fields): \OpenAPI\Client\Model\Board
```

Get Board

### Get information about a board.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_id = 'board_id_example'; // string | Id of board
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->board($board_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->board: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_id** | **string**| Id of board | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Board**](../Model/Board.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `boardItem()`

```php
boardItem($board_item_id, $fields): \OpenAPI\Client\Model\BoardItem
```

Get Board Item

### Get information about a board item.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_item_id = 'board_item_id_example'; // string | Id of board item
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->boardItem($board_item_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->boardItem: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_item_id** | **string**| Id of board item | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardItem**](../Model/BoardItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `boardSection()`

```php
boardSection($board_section_id, $fields): \OpenAPI\Client\Model\BoardSection
```

Get Board section

### Get information about a board section.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_section_id = 'board_section_id_example'; // string | Id of board section
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->boardSection($board_section_id, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->boardSection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_section_id** | **string**| Id of board section | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardSection**](../Model/BoardSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createBoard()`

```php
createBoard($board, $fields): \OpenAPI\Client\Model\Board
```

Create Board

### Create a new board.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board = new \OpenAPI\Client\Model\Board(); // \OpenAPI\Client\Model\Board | Board
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createBoard($board, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->createBoard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board** | [**\OpenAPI\Client\Model\Board**](../Model/Board.md)| Board | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Board**](../Model/Board.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createBoardItem()`

```php
createBoardItem($board_item, $fields): \OpenAPI\Client\Model\BoardItem
```

Create Board Item

### Create a new board item.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_item = new \OpenAPI\Client\Model\BoardItem(); // \OpenAPI\Client\Model\BoardItem | Board Item
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createBoardItem($board_item, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->createBoardItem: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_item** | [**\OpenAPI\Client\Model\BoardItem**](../Model/BoardItem.md)| Board Item | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardItem**](../Model/BoardItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `createBoardSection()`

```php
createBoardSection($board_section, $fields): \OpenAPI\Client\Model\BoardSection
```

Create Board section

### Create a new board section.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_section = new \OpenAPI\Client\Model\BoardSection(); // \OpenAPI\Client\Model\BoardSection | Board section
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->createBoardSection($board_section, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->createBoardSection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_section** | [**\OpenAPI\Client\Model\BoardSection**](../Model/BoardSection.md)| Board section | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardSection**](../Model/BoardSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteBoard()`

```php
deleteBoard($board_id): string
```

Delete Board

### Delete a board.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_id = 'board_id_example'; // string | Id of board

try {
    $result = $apiInstance->deleteBoard($board_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->deleteBoard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_id** | **string**| Id of board | |

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

## `deleteBoardItem()`

```php
deleteBoardItem($board_item_id): string
```

Delete Board Item

### Delete a board item.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_item_id = 'board_item_id_example'; // string | Id of board item

try {
    $result = $apiInstance->deleteBoardItem($board_item_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->deleteBoardItem: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_item_id** | **string**| Id of board item | |

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

## `deleteBoardSection()`

```php
deleteBoardSection($board_section_id): string
```

Delete Board section

### Delete a board section.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_section_id = 'board_section_id_example'; // string | Id of board section

try {
    $result = $apiInstance->deleteBoardSection($board_section_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->deleteBoardSection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_section_id** | **string**| Id of board section | |

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

## `searchBoards()`

```php
searchBoards($title, $created_at, $first_name, $last_name, $fields, $favorited, $creator_id, $sorts, $page, $per_page, $offset, $limit, $filter_or, $permission): \OpenAPI\Client\Model\Board[]
```

Search Boards

### Search Boards  If multiple search params are given and `filter_or` is FALSE or not specified, search params are combined in a logical AND operation. Only rows that match *all* search param criteria will be returned.  If `filter_or` is TRUE, multiple search params are combined in a logical OR operation. Results will include rows that match **any** of the search criteria.  String search params use case-insensitive matching. String search params can contain `%` and '_' as SQL LIKE pattern match wildcard expressions. example=\"dan%\" will match \"danger\" and \"Danzig\" but not \"David\" example=\"D_m%\" will match \"Damage\" and \"dump\"  Integer search params can accept a single value or a comma separated list of values. The multiple values will be combined under a logical OR operation - results will match at least one of the given values.  Most search params can accept \"IS NULL\" and \"NOT NULL\" as special expressions to match or exclude (respectively) rows where the column is null.  Boolean search params accept only \"true\" and \"false\" as values.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$title = 'title_example'; // string | Matches board title.
$created_at = 'created_at_example'; // string | Matches the timestamp for when the board was created.
$first_name = 'first_name_example'; // string | The first name of the user who created this board.
$last_name = 'last_name_example'; // string | The last name of the user who created this board.
$fields = 'fields_example'; // string | Requested fields.
$favorited = True; // bool | Return favorited boards when true.
$creator_id = 'creator_id_example'; // string | Filter on boards created by a particular user.
$sorts = 'sorts_example'; // string | The fields to sort the results by
$page = 56; // int | DEPRECATED. Use limit and offset instead. Return only page N of paginated results
$per_page = 56; // int | DEPRECATED. Use limit and offset instead. Return N rows of data per page
$offset = 56; // int | Number of results to return. (used with offset and takes priority over page and per_page)
$limit = 56; // int | Number of results to skip before returning any. (used with limit and takes priority over page and per_page)
$filter_or = True; // bool | Combine given search criteria in a boolean OR expression
$permission = 'permission_example'; // string | Filter results based on permission, either show (default) or update

try {
    $result = $apiInstance->searchBoards($title, $created_at, $first_name, $last_name, $fields, $favorited, $creator_id, $sorts, $page, $per_page, $offset, $limit, $filter_or, $permission);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->searchBoards: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **title** | **string**| Matches board title. | [optional] |
| **created_at** | **string**| Matches the timestamp for when the board was created. | [optional] |
| **first_name** | **string**| The first name of the user who created this board. | [optional] |
| **last_name** | **string**| The last name of the user who created this board. | [optional] |
| **fields** | **string**| Requested fields. | [optional] |
| **favorited** | **bool**| Return favorited boards when true. | [optional] |
| **creator_id** | **string**| Filter on boards created by a particular user. | [optional] |
| **sorts** | **string**| The fields to sort the results by | [optional] |
| **page** | **int**| DEPRECATED. Use limit and offset instead. Return only page N of paginated results | [optional] |
| **per_page** | **int**| DEPRECATED. Use limit and offset instead. Return N rows of data per page | [optional] |
| **offset** | **int**| Number of results to return. (used with offset and takes priority over page and per_page) | [optional] |
| **limit** | **int**| Number of results to skip before returning any. (used with limit and takes priority over page and per_page) | [optional] |
| **filter_or** | **bool**| Combine given search criteria in a boolean OR expression | [optional] |
| **permission** | **string**| Filter results based on permission, either show (default) or update | [optional] |

### Return type

[**\OpenAPI\Client\Model\Board[]**](../Model/Board.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateBoard()`

```php
updateBoard($board_id, $board, $fields): \OpenAPI\Client\Model\Board
```

Update Board

### Update a board definition.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_id = 'board_id_example'; // string | Id of board
$board = new \OpenAPI\Client\Model\Board(); // \OpenAPI\Client\Model\Board | Board
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateBoard($board_id, $board, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->updateBoard: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_id** | **string**| Id of board | |
| **board** | [**\OpenAPI\Client\Model\Board**](../Model/Board.md)| Board | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\Board**](../Model/Board.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateBoardItem()`

```php
updateBoardItem($board_item_id, $board_item, $fields): \OpenAPI\Client\Model\BoardItem
```

Update Board Item

### Update a board item definition.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_item_id = 'board_item_id_example'; // string | Id of board item
$board_item = new \OpenAPI\Client\Model\BoardItem(); // \OpenAPI\Client\Model\BoardItem | Board Item
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateBoardItem($board_item_id, $board_item, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->updateBoardItem: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_item_id** | **string**| Id of board item | |
| **board_item** | [**\OpenAPI\Client\Model\BoardItem**](../Model/BoardItem.md)| Board Item | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardItem**](../Model/BoardItem.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `updateBoardSection()`

```php
updateBoardSection($board_section_id, $board_section, $fields): \OpenAPI\Client\Model\BoardSection
```

Update Board section

### Update a board section definition.

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new OpenAPI\Client\Api\BoardApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$board_section_id = 'board_section_id_example'; // string | Id of board section
$board_section = new \OpenAPI\Client\Model\BoardSection(); // \OpenAPI\Client\Model\BoardSection | Board section
$fields = 'fields_example'; // string | Requested fields.

try {
    $result = $apiInstance->updateBoardSection($board_section_id, $board_section, $fields);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling BoardApi->updateBoardSection: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **board_section_id** | **string**| Id of board section | |
| **board_section** | [**\OpenAPI\Client\Model\BoardSection**](../Model/BoardSection.md)| Board section | |
| **fields** | **string**| Requested fields. | [optional] |

### Return type

[**\OpenAPI\Client\Model\BoardSection**](../Model/BoardSection.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

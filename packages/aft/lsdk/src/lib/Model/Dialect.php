<?php
/**
 * Dialect
 *
 * PHP version 7.4
 *
 * @category Class
 * @package  OpenAPI\Client
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 */

/**
 * Looker API 4.0 Reference
 *
 * API 4.0 is the current release of the Looker API. API 3.x has been removed.  ### Authorization  The classic method of API authorization uses Looker **API** credentials for authorization and access control. Looker admins can create API credentials on Looker's **Admin/Users** page.  API 4.0 adds additional ways to authenticate API requests, including OAuth and CORS requests.  For details, see [Looker API Authorization](https://cloud.google.com/looker/docs/r/api/authorization).   ### API Explorer  The API Explorer is a Looker-provided utility with many new and unique features for learning and using the Looker API and SDKs.  For details, see the [API Explorer documentation](https://cloud.google.com/looker/docs/r/api/explorer).   ### Looker Language SDKs  The Looker API is a RESTful system that should be usable by any programming language capable of making HTTPS requests. SDKs for a variety of programming languages are also provided to streamline using the API. Looker has an OpenSource [sdk-codegen project](https://github.com/looker-open-source/sdk-codegen) that provides several language SDKs. Language SDKs generated by `sdk-codegen` have an Authentication manager that can automatically authenticate API requests when needed.  For details on available Looker SDKs, see [Looker API Client SDKs](https://cloud.google.com/looker/docs/r/api/client_sdks).   ### API Versioning  Future releases of Looker expand the latest API version release-by-release to securely expose more and more of the core power of the Looker platform to API client applications. API endpoints marked as \"beta\" may receive breaking changes without warning (but we will try to avoid doing that). Stable (non-beta) API endpoints should not receive breaking changes in future releases.  For details, see [Looker API Versioning](https://cloud.google.com/looker/docs/r/api/versioning).   ### In This Release  API 4.0 is the only supported API version for Looker starting with release 23.18. API 3.0 and 3.1 have been removed.  API 4.0 has better support for strongly typed languages like TypeScript, Kotlin, Swift, Go, C#, and more.  See the [API 4.0 GA announcement](https://developers.looker.com/api/advanced-usage/version-4-ga) for more information about API 4.0.  The API Explorer can be used to [interactively compare](https://cloud.google.com/looker/docs/r/api/explorer#comparing_api_versions) the differences between API 3.1 and 4.0.   ### API and SDK Support Policies  Looker API versions and language SDKs have varying support levels. Please read the API and SDK [support policies](https://cloud.google.com/looker/docs/r/api/support-policy) for more information.
 *
 * The version of the OpenAPI document: 4.0.24.10
 * Generated by: https://openapi-generator.tech
 * Generator version: 7.6.0
 */

/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

namespace OpenAPI\Client\Model;

use \ArrayAccess;
use \OpenAPI\Client\ObjectSerializer;

/**
 * Dialect Class Doc Comment
 *
 * @category Class
 * @package  OpenAPI\Client
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 * @implements \ArrayAccess<string, mixed>
 */
class Dialect implements ModelInterface, ArrayAccess, \JsonSerializable, \Stringable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'Dialect';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'name' => 'string',
        'label' => 'string',
        'supports_cost_estimate' => 'bool',
        'cost_estimate_style' => 'string',
        'persistent_table_indexes' => 'string',
        'persistent_table_sortkeys' => 'string',
        'persistent_table_distkey' => 'string',
        'supports_streaming' => 'bool',
        'automatically_run_sql_runner_snippets' => 'bool',
        'connection_tests' => 'string[]',
        'supports_inducer' => 'bool',
        'supports_multiple_databases' => 'bool',
        'supports_persistent_derived_tables' => 'bool',
        'has_ssl_support' => 'bool'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'name' => null,
        'label' => null,
        'supports_cost_estimate' => null,
        'cost_estimate_style' => null,
        'persistent_table_indexes' => null,
        'persistent_table_sortkeys' => null,
        'persistent_table_distkey' => null,
        'supports_streaming' => null,
        'automatically_run_sql_runner_snippets' => null,
        'connection_tests' => null,
        'supports_inducer' => null,
        'supports_multiple_databases' => null,
        'supports_persistent_derived_tables' => null,
        'has_ssl_support' => null
    ];

    /**
      * Array of nullable properties. Used for (de)serialization
      *
      * @var boolean[]
      */
    protected static array $openAPINullables = [
        'name' => false,
        'label' => false,
        'supports_cost_estimate' => false,
        'cost_estimate_style' => true,
        'persistent_table_indexes' => false,
        'persistent_table_sortkeys' => false,
        'persistent_table_distkey' => false,
        'supports_streaming' => false,
        'automatically_run_sql_runner_snippets' => false,
        'connection_tests' => false,
        'supports_inducer' => false,
        'supports_multiple_databases' => false,
        'supports_persistent_derived_tables' => false,
        'has_ssl_support' => false
    ];

    /**
      * If a nullable field gets set to null, insert it here
      *
      * @var boolean[]
      */
    protected array $openAPINullablesSetToNull = [];

    /**
     * Array of property to type mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPITypes()
    {
        return self::$openAPITypes;
    }

    /**
     * Array of property to format mappings. Used for (de)serialization
     *
     * @return array
     */
    public static function openAPIFormats()
    {
        return self::$openAPIFormats;
    }

    /**
     * Array of nullable properties
     *
     * @return array
     */
    protected static function openAPINullables(): array
    {
        return self::$openAPINullables;
    }

    /**
     * Array of nullable field names deliberately set to null
     *
     * @return boolean[]
     */
    private function getOpenAPINullablesSetToNull(): array
    {
        return $this->openAPINullablesSetToNull;
    }

    /**
     * Setter - Array of nullable field names deliberately set to null
     *
     * @param boolean[] $openAPINullablesSetToNull
     */
    private function setOpenAPINullablesSetToNull(array $openAPINullablesSetToNull): void
    {
        $this->openAPINullablesSetToNull = $openAPINullablesSetToNull;
    }

    /**
     * Checks if a property is nullable
     *
     * @param string $property
     * @return bool
     */
    public static function isNullable(string $property): bool
    {
        return self::openAPINullables()[$property] ?? false;
    }

    /**
     * Checks if a nullable property is set to null.
     *
     * @param string $property
     * @return bool
     */
    public function isNullableSetToNull(string $property): bool
    {
        return in_array($property, $this->getOpenAPINullablesSetToNull(), true);
    }

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @var string[]
     */
    protected static $attributeMap = [
        'name' => 'name',
        'label' => 'label',
        'supports_cost_estimate' => 'supports_cost_estimate',
        'cost_estimate_style' => 'cost_estimate_style',
        'persistent_table_indexes' => 'persistent_table_indexes',
        'persistent_table_sortkeys' => 'persistent_table_sortkeys',
        'persistent_table_distkey' => 'persistent_table_distkey',
        'supports_streaming' => 'supports_streaming',
        'automatically_run_sql_runner_snippets' => 'automatically_run_sql_runner_snippets',
        'connection_tests' => 'connection_tests',
        'supports_inducer' => 'supports_inducer',
        'supports_multiple_databases' => 'supports_multiple_databases',
        'supports_persistent_derived_tables' => 'supports_persistent_derived_tables',
        'has_ssl_support' => 'has_ssl_support'
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'name' => 'setName',
        'label' => 'setLabel',
        'supports_cost_estimate' => 'setSupportsCostEstimate',
        'cost_estimate_style' => 'setCostEstimateStyle',
        'persistent_table_indexes' => 'setPersistentTableIndexes',
        'persistent_table_sortkeys' => 'setPersistentTableSortkeys',
        'persistent_table_distkey' => 'setPersistentTableDistkey',
        'supports_streaming' => 'setSupportsStreaming',
        'automatically_run_sql_runner_snippets' => 'setAutomaticallyRunSqlRunnerSnippets',
        'connection_tests' => 'setConnectionTests',
        'supports_inducer' => 'setSupportsInducer',
        'supports_multiple_databases' => 'setSupportsMultipleDatabases',
        'supports_persistent_derived_tables' => 'setSupportsPersistentDerivedTables',
        'has_ssl_support' => 'setHasSslSupport'
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'name' => 'getName',
        'label' => 'getLabel',
        'supports_cost_estimate' => 'getSupportsCostEstimate',
        'cost_estimate_style' => 'getCostEstimateStyle',
        'persistent_table_indexes' => 'getPersistentTableIndexes',
        'persistent_table_sortkeys' => 'getPersistentTableSortkeys',
        'persistent_table_distkey' => 'getPersistentTableDistkey',
        'supports_streaming' => 'getSupportsStreaming',
        'automatically_run_sql_runner_snippets' => 'getAutomaticallyRunSqlRunnerSnippets',
        'connection_tests' => 'getConnectionTests',
        'supports_inducer' => 'getSupportsInducer',
        'supports_multiple_databases' => 'getSupportsMultipleDatabases',
        'supports_persistent_derived_tables' => 'getSupportsPersistentDerivedTables',
        'has_ssl_support' => 'getHasSslSupport'
    ];

    /**
     * Array of attributes where the key is the local name,
     * and the value is the original name
     *
     * @return array
     */
    public static function attributeMap()
    {
        return self::$attributeMap;
    }

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @return array
     */
    public static function setters()
    {
        return self::$setters;
    }

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @return array
     */
    public static function getters()
    {
        return self::$getters;
    }

    /**
     * The original name of the model.
     *
     * @return string
     */
    public function getModelName()
    {
        return self::$openAPIModelName;
    }


    /**
     * Associative array for storing property values
     *
     * @var mixed[]
     */
    protected $container = [];

    /**
     * Constructor
     *
     * @param mixed[] $data Associated array of property values
     *                      initializing the model
     */
    public function __construct(array $data = null)
    {
        $this->setIfExists('name', $data ?? [], null);
        $this->setIfExists('label', $data ?? [], null);
        $this->setIfExists('supports_cost_estimate', $data ?? [], null);
        $this->setIfExists('cost_estimate_style', $data ?? [], null);
        $this->setIfExists('persistent_table_indexes', $data ?? [], null);
        $this->setIfExists('persistent_table_sortkeys', $data ?? [], null);
        $this->setIfExists('persistent_table_distkey', $data ?? [], null);
        $this->setIfExists('supports_streaming', $data ?? [], null);
        $this->setIfExists('automatically_run_sql_runner_snippets', $data ?? [], null);
        $this->setIfExists('connection_tests', $data ?? [], null);
        $this->setIfExists('supports_inducer', $data ?? [], null);
        $this->setIfExists('supports_multiple_databases', $data ?? [], null);
        $this->setIfExists('supports_persistent_derived_tables', $data ?? [], null);
        $this->setIfExists('has_ssl_support', $data ?? [], null);
    }

    /**
    * Sets $this->container[$variableName] to the given data or to the given default Value; if $variableName
    * is nullable and its value is set to null in the $fields array, then mark it as "set to null" in the
    * $this->openAPINullablesSetToNull array
    *
    * @param string $variableName
    * @param array  $fields
    * @param mixed  $defaultValue
    */
    private function setIfExists(string $variableName, array $fields, $defaultValue): void
    {
        if (self::isNullable($variableName) && array_key_exists($variableName, $fields) && is_null($fields[$variableName])) {
            $this->openAPINullablesSetToNull[] = $variableName;
        }

        $this->container[$variableName] = $fields[$variableName] ?? $defaultValue;
    }

    /**
     * Show all the invalid properties with reasons.
     *
     * @return array invalid properties with reasons
     */
    public function listInvalidProperties(): array
    {
        $invalidProperties = [];

        return $invalidProperties;
    }

    /**
     * Validate all the properties in the model
     * return true if all passed
     *
     * @return bool True if all properties are valid
     */
    public function valid(): bool
    {
        return count($this->listInvalidProperties()) === 0;
    }


    /**
     * Gets name
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->container['name'];
    }

    /**
     * Sets name
     *
     * @param string|null $name The name of the dialect
     *
     * @return self
     */
    public function setName($name): static
    {
        if (is_null($name)) {
            throw new \InvalidArgumentException('non-nullable name cannot be null');
        }
        $this->container['name'] = $name;

        return $this;
    }

    /**
     * Gets label
     *
     * @return string|null
     */
    public function getLabel()
    {
        return $this->container['label'];
    }

    /**
     * Sets label
     *
     * @param string|null $label The human-readable label of the connection
     *
     * @return self
     */
    public function setLabel($label): static
    {
        if (is_null($label)) {
            throw new \InvalidArgumentException('non-nullable label cannot be null');
        }
        $this->container['label'] = $label;

        return $this;
    }

    /**
     * Gets supports_cost_estimate
     *
     * @return bool|null
     */
    public function getSupportsCostEstimate()
    {
        return $this->container['supports_cost_estimate'];
    }

    /**
     * Sets supports_cost_estimate
     *
     * @param bool|null $supports_cost_estimate Whether the dialect supports query cost estimates
     *
     * @return self
     */
    public function setSupportsCostEstimate($supports_cost_estimate): static
    {
        if (is_null($supports_cost_estimate)) {
            throw new \InvalidArgumentException('non-nullable supports_cost_estimate cannot be null');
        }
        $this->container['supports_cost_estimate'] = $supports_cost_estimate;

        return $this;
    }

    /**
     * Gets cost_estimate_style
     *
     * @return string|null
     */
    public function getCostEstimateStyle()
    {
        return $this->container['cost_estimate_style'];
    }

    /**
     * Sets cost_estimate_style
     *
     * @param string|null $cost_estimate_style How the dialect handles cost estimation
     *
     * @return self
     */
    public function setCostEstimateStyle($cost_estimate_style): static
    {
        if (is_null($cost_estimate_style)) {
            array_push($this->openAPINullablesSetToNull, 'cost_estimate_style');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('cost_estimate_style', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['cost_estimate_style'] = $cost_estimate_style;

        return $this;
    }

    /**
     * Gets persistent_table_indexes
     *
     * @return string|null
     */
    public function getPersistentTableIndexes()
    {
        return $this->container['persistent_table_indexes'];
    }

    /**
     * Sets persistent_table_indexes
     *
     * @param string|null $persistent_table_indexes PDT index columns
     *
     * @return self
     */
    public function setPersistentTableIndexes($persistent_table_indexes): static
    {
        if (is_null($persistent_table_indexes)) {
            throw new \InvalidArgumentException('non-nullable persistent_table_indexes cannot be null');
        }
        $this->container['persistent_table_indexes'] = $persistent_table_indexes;

        return $this;
    }

    /**
     * Gets persistent_table_sortkeys
     *
     * @return string|null
     */
    public function getPersistentTableSortkeys()
    {
        return $this->container['persistent_table_sortkeys'];
    }

    /**
     * Sets persistent_table_sortkeys
     *
     * @param string|null $persistent_table_sortkeys PDT sortkey columns
     *
     * @return self
     */
    public function setPersistentTableSortkeys($persistent_table_sortkeys): static
    {
        if (is_null($persistent_table_sortkeys)) {
            throw new \InvalidArgumentException('non-nullable persistent_table_sortkeys cannot be null');
        }
        $this->container['persistent_table_sortkeys'] = $persistent_table_sortkeys;

        return $this;
    }

    /**
     * Gets persistent_table_distkey
     *
     * @return string|null
     */
    public function getPersistentTableDistkey()
    {
        return $this->container['persistent_table_distkey'];
    }

    /**
     * Sets persistent_table_distkey
     *
     * @param string|null $persistent_table_distkey PDT distkey column
     *
     * @return self
     */
    public function setPersistentTableDistkey($persistent_table_distkey): static
    {
        if (is_null($persistent_table_distkey)) {
            throw new \InvalidArgumentException('non-nullable persistent_table_distkey cannot be null');
        }
        $this->container['persistent_table_distkey'] = $persistent_table_distkey;

        return $this;
    }

    /**
     * Gets supports_streaming
     *
     * @return bool|null
     */
    public function getSupportsStreaming()
    {
        return $this->container['supports_streaming'];
    }

    /**
     * Sets supports_streaming
     *
     * @param bool|null $supports_streaming Supports streaming results
     *
     * @return self
     */
    public function setSupportsStreaming($supports_streaming): static
    {
        if (is_null($supports_streaming)) {
            throw new \InvalidArgumentException('non-nullable supports_streaming cannot be null');
        }
        $this->container['supports_streaming'] = $supports_streaming;

        return $this;
    }

    /**
     * Gets automatically_run_sql_runner_snippets
     *
     * @return bool|null
     */
    public function getAutomaticallyRunSqlRunnerSnippets()
    {
        return $this->container['automatically_run_sql_runner_snippets'];
    }

    /**
     * Sets automatically_run_sql_runner_snippets
     *
     * @param bool|null $automatically_run_sql_runner_snippets Should SQL Runner snippets automatically be run
     *
     * @return self
     */
    public function setAutomaticallyRunSqlRunnerSnippets($automatically_run_sql_runner_snippets): static
    {
        if (is_null($automatically_run_sql_runner_snippets)) {
            throw new \InvalidArgumentException('non-nullable automatically_run_sql_runner_snippets cannot be null');
        }
        $this->container['automatically_run_sql_runner_snippets'] = $automatically_run_sql_runner_snippets;

        return $this;
    }

    /**
     * Gets connection_tests
     *
     * @return string[]|null
     */
    public function getConnectionTests()
    {
        return $this->container['connection_tests'];
    }

    /**
     * Sets connection_tests
     *
     * @param string[]|null $connection_tests Array of names of the tests that can be run on a connection using this dialect
     *
     * @return self
     */
    public function setConnectionTests($connection_tests): static
    {
        if (is_null($connection_tests)) {
            throw new \InvalidArgumentException('non-nullable connection_tests cannot be null');
        }
        $this->container['connection_tests'] = $connection_tests;

        return $this;
    }

    /**
     * Gets supports_inducer
     *
     * @return bool|null
     */
    public function getSupportsInducer()
    {
        return $this->container['supports_inducer'];
    }

    /**
     * Sets supports_inducer
     *
     * @param bool|null $supports_inducer Is supported with the inducer (i.e. generate from sql)
     *
     * @return self
     */
    public function setSupportsInducer($supports_inducer): static
    {
        if (is_null($supports_inducer)) {
            throw new \InvalidArgumentException('non-nullable supports_inducer cannot be null');
        }
        $this->container['supports_inducer'] = $supports_inducer;

        return $this;
    }

    /**
     * Gets supports_multiple_databases
     *
     * @return bool|null
     */
    public function getSupportsMultipleDatabases()
    {
        return $this->container['supports_multiple_databases'];
    }

    /**
     * Sets supports_multiple_databases
     *
     * @param bool|null $supports_multiple_databases Can multiple databases be accessed from a connection using this dialect
     *
     * @return self
     */
    public function setSupportsMultipleDatabases($supports_multiple_databases): static
    {
        if (is_null($supports_multiple_databases)) {
            throw new \InvalidArgumentException('non-nullable supports_multiple_databases cannot be null');
        }
        $this->container['supports_multiple_databases'] = $supports_multiple_databases;

        return $this;
    }

    /**
     * Gets supports_persistent_derived_tables
     *
     * @return bool|null
     */
    public function getSupportsPersistentDerivedTables()
    {
        return $this->container['supports_persistent_derived_tables'];
    }

    /**
     * Sets supports_persistent_derived_tables
     *
     * @param bool|null $supports_persistent_derived_tables Whether the dialect supports allowing Looker to build persistent derived tables
     *
     * @return self
     */
    public function setSupportsPersistentDerivedTables($supports_persistent_derived_tables): static
    {
        if (is_null($supports_persistent_derived_tables)) {
            throw new \InvalidArgumentException('non-nullable supports_persistent_derived_tables cannot be null');
        }
        $this->container['supports_persistent_derived_tables'] = $supports_persistent_derived_tables;

        return $this;
    }

    /**
     * Gets has_ssl_support
     *
     * @return bool|null
     */
    public function getHasSslSupport()
    {
        return $this->container['has_ssl_support'];
    }

    /**
     * Sets has_ssl_support
     *
     * @param bool|null $has_ssl_support Does the database have client SSL support settable through the JDBC string explicitly?
     *
     * @return self
     */
    public function setHasSslSupport($has_ssl_support): static
    {
        if (is_null($has_ssl_support)) {
            throw new \InvalidArgumentException('non-nullable has_ssl_support cannot be null');
        }
        $this->container['has_ssl_support'] = $has_ssl_support;

        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     *
     * @param integer $offset Offset
     *
     * @return boolean
     */
    public function offsetExists($offset): bool
    {
        return isset($this->container[$offset]);
    }

    /**
     * Gets offset.
     *
     * @param integer $offset Offset
     *
     * @return mixed|null
     */
    #[\ReturnTypeWillChange]
    public function offsetGet($offset)
    {
        return $this->container[$offset] ?? null;
    }

    /**
     * Sets value based on offset.
     *
     * @param int|null $offset Offset
     * @param mixed    $value  Value to be set
     *
     * @return void
     */
    public function offsetSet($offset, $value): void
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    /**
     * Unsets offset.
     *
     * @param integer $offset Offset
     *
     * @return void
     */
    public function offsetUnset($offset): void
    {
        unset($this->container[$offset]);
    }

    /**
     * Serializes the object to a value that can be serialized natively by json_encode().
     * @link https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     *
     * @return mixed Returns data which can be serialized by json_encode(), which is a value
     * of any type other than a resource.
     */
    #[\ReturnTypeWillChange]
    public function jsonSerialize()
    {
        return ObjectSerializer::sanitizeForSerialization($this);
    }

    /**
     * Gets the string presentation of the object
     *
     * @return string
     */
    public function __toString(): string
    {
        return (string) json_encode(
            ObjectSerializer::sanitizeForSerialization($this),
            JSON_PRETTY_PRINT
        );
    }

    /**
     * Gets a header-safe presentation of the object
     *
     * @return string
     */
    public function toHeaderValue()
    {
        return json_encode(ObjectSerializer::sanitizeForSerialization($this));
    }
}

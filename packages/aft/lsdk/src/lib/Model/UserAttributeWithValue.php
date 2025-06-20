<?php
/**
 * UserAttributeWithValue
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
 * UserAttributeWithValue Class Doc Comment
 *
 * @category Class
 * @package  OpenAPI\Client
 * @author   OpenAPI Generator team
 * @link     https://openapi-generator.tech
 * @implements \ArrayAccess<string, mixed>
 */
class UserAttributeWithValue implements ModelInterface, ArrayAccess, \JsonSerializable, \Stringable
{
    public const DISCRIMINATOR = null;

    /**
      * The original name of the model.
      *
      * @var string
      */
    protected static $openAPIModelName = 'UserAttributeWithValue';

    /**
      * Array of property to type mappings. Used for (de)serialization
      *
      * @var string[]
      */
    protected static $openAPITypes = [
        'can' => 'array<string,bool>',
        'name' => 'string',
        'label' => 'string',
        'rank' => 'int',
        'value' => 'string',
        'user_id' => 'string',
        'user_can_edit' => 'bool',
        'value_is_hidden' => 'bool',
        'user_attribute_id' => 'string',
        'source' => 'string',
        'hidden_value_domain_whitelist' => 'string'
    ];

    /**
      * Array of property to format mappings. Used for (de)serialization
      *
      * @var string[]
      * @phpstan-var array<string, string|null>
      * @psalm-var array<string, string|null>
      */
    protected static $openAPIFormats = [
        'can' => null,
        'name' => null,
        'label' => null,
        'rank' => 'int64',
        'value' => null,
        'user_id' => null,
        'user_can_edit' => null,
        'value_is_hidden' => null,
        'user_attribute_id' => null,
        'source' => null,
        'hidden_value_domain_whitelist' => null
    ];

    /**
      * Array of nullable properties. Used for (de)serialization
      *
      * @var boolean[]
      */
    protected static array $openAPINullables = [
        'can' => false,
        'name' => true,
        'label' => true,
        'rank' => true,
        'value' => true,
        'user_id' => true,
        'user_can_edit' => false,
        'value_is_hidden' => false,
        'user_attribute_id' => true,
        'source' => true,
        'hidden_value_domain_whitelist' => true
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
        'can' => 'can',
        'name' => 'name',
        'label' => 'label',
        'rank' => 'rank',
        'value' => 'value',
        'user_id' => 'user_id',
        'user_can_edit' => 'user_can_edit',
        'value_is_hidden' => 'value_is_hidden',
        'user_attribute_id' => 'user_attribute_id',
        'source' => 'source',
        'hidden_value_domain_whitelist' => 'hidden_value_domain_whitelist'
    ];

    /**
     * Array of attributes to setter functions (for deserialization of responses)
     *
     * @var string[]
     */
    protected static $setters = [
        'can' => 'setCan',
        'name' => 'setName',
        'label' => 'setLabel',
        'rank' => 'setRank',
        'value' => 'setValue',
        'user_id' => 'setUserId',
        'user_can_edit' => 'setUserCanEdit',
        'value_is_hidden' => 'setValueIsHidden',
        'user_attribute_id' => 'setUserAttributeId',
        'source' => 'setSource',
        'hidden_value_domain_whitelist' => 'setHiddenValueDomainWhitelist'
    ];

    /**
     * Array of attributes to getter functions (for serialization of requests)
     *
     * @var string[]
     */
    protected static $getters = [
        'can' => 'getCan',
        'name' => 'getName',
        'label' => 'getLabel',
        'rank' => 'getRank',
        'value' => 'getValue',
        'user_id' => 'getUserId',
        'user_can_edit' => 'getUserCanEdit',
        'value_is_hidden' => 'getValueIsHidden',
        'user_attribute_id' => 'getUserAttributeId',
        'source' => 'getSource',
        'hidden_value_domain_whitelist' => 'getHiddenValueDomainWhitelist'
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
        $this->setIfExists('can', $data ?? [], null);
        $this->setIfExists('name', $data ?? [], null);
        $this->setIfExists('label', $data ?? [], null);
        $this->setIfExists('rank', $data ?? [], null);
        $this->setIfExists('value', $data ?? [], null);
        $this->setIfExists('user_id', $data ?? [], null);
        $this->setIfExists('user_can_edit', $data ?? [], null);
        $this->setIfExists('value_is_hidden', $data ?? [], null);
        $this->setIfExists('user_attribute_id', $data ?? [], null);
        $this->setIfExists('source', $data ?? [], null);
        $this->setIfExists('hidden_value_domain_whitelist', $data ?? [], null);
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
     * Gets can
     *
     * @return array<string,bool>|null
     */
    public function getCan()
    {
        return $this->container['can'];
    }

    /**
     * Sets can
     *
     * @param array<string,bool>|null $can Operations the current user is able to perform on this object
     *
     * @return self
     */
    public function setCan($can): static
    {
        if (is_null($can)) {
            throw new \InvalidArgumentException('non-nullable can cannot be null');
        }
        $this->container['can'] = $can;

        return $this;
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
     * @param string|null $name Name of user attribute
     *
     * @return self
     */
    public function setName($name): static
    {
        if (is_null($name)) {
            array_push($this->openAPINullablesSetToNull, 'name');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('name', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
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
     * @param string|null $label Human-friendly label for user attribute
     *
     * @return self
     */
    public function setLabel($label): static
    {
        if (is_null($label)) {
            array_push($this->openAPINullablesSetToNull, 'label');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('label', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['label'] = $label;

        return $this;
    }

    /**
     * Gets rank
     *
     * @return int|null
     */
    public function getRank()
    {
        return $this->container['rank'];
    }

    /**
     * Sets rank
     *
     * @param int|null $rank Precedence for setting value on user (lowest wins)
     *
     * @return self
     */
    public function setRank($rank): static
    {
        if (is_null($rank)) {
            array_push($this->openAPINullablesSetToNull, 'rank');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('rank', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['rank'] = $rank;

        return $this;
    }

    /**
     * Gets value
     *
     * @return string|null
     */
    public function getValue()
    {
        return $this->container['value'];
    }

    /**
     * Sets value
     *
     * @param string|null $value Value of attribute for user
     *
     * @return self
     */
    public function setValue($value): static
    {
        if (is_null($value)) {
            array_push($this->openAPINullablesSetToNull, 'value');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('value', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['value'] = $value;

        return $this;
    }

    /**
     * Gets user_id
     *
     * @return string|null
     */
    public function getUserId()
    {
        return $this->container['user_id'];
    }

    /**
     * Sets user_id
     *
     * @param string|null $user_id Id of User
     *
     * @return self
     */
    public function setUserId($user_id): static
    {
        if (is_null($user_id)) {
            array_push($this->openAPINullablesSetToNull, 'user_id');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('user_id', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['user_id'] = $user_id;

        return $this;
    }

    /**
     * Gets user_can_edit
     *
     * @return bool|null
     */
    public function getUserCanEdit()
    {
        return $this->container['user_can_edit'];
    }

    /**
     * Sets user_can_edit
     *
     * @param bool|null $user_can_edit Can the user set this value
     *
     * @return self
     */
    public function setUserCanEdit($user_can_edit): static
    {
        if (is_null($user_can_edit)) {
            throw new \InvalidArgumentException('non-nullable user_can_edit cannot be null');
        }
        $this->container['user_can_edit'] = $user_can_edit;

        return $this;
    }

    /**
     * Gets value_is_hidden
     *
     * @return bool|null
     */
    public function getValueIsHidden()
    {
        return $this->container['value_is_hidden'];
    }

    /**
     * Sets value_is_hidden
     *
     * @param bool|null $value_is_hidden If true, the \"value\" field will be null, because the attribute settings block access to this value
     *
     * @return self
     */
    public function setValueIsHidden($value_is_hidden): static
    {
        if (is_null($value_is_hidden)) {
            throw new \InvalidArgumentException('non-nullable value_is_hidden cannot be null');
        }
        $this->container['value_is_hidden'] = $value_is_hidden;

        return $this;
    }

    /**
     * Gets user_attribute_id
     *
     * @return string|null
     */
    public function getUserAttributeId()
    {
        return $this->container['user_attribute_id'];
    }

    /**
     * Sets user_attribute_id
     *
     * @param string|null $user_attribute_id Id of User Attribute
     *
     * @return self
     */
    public function setUserAttributeId($user_attribute_id): static
    {
        if (is_null($user_attribute_id)) {
            array_push($this->openAPINullablesSetToNull, 'user_attribute_id');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('user_attribute_id', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['user_attribute_id'] = $user_attribute_id;

        return $this;
    }

    /**
     * Gets source
     *
     * @return string|null
     */
    public function getSource()
    {
        return $this->container['source'];
    }

    /**
     * Sets source
     *
     * @param string|null $source How user got this value for this attribute
     *
     * @return self
     */
    public function setSource($source): static
    {
        if (is_null($source)) {
            array_push($this->openAPINullablesSetToNull, 'source');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('source', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['source'] = $source;

        return $this;
    }

    /**
     * Gets hidden_value_domain_whitelist
     *
     * @return string|null
     */
    public function getHiddenValueDomainWhitelist()
    {
        return $this->container['hidden_value_domain_whitelist'];
    }

    /**
     * Sets hidden_value_domain_whitelist
     *
     * @param string|null $hidden_value_domain_whitelist If this user attribute is hidden, allowed list of destinations to which it may be sent.
     *
     * @return self
     */
    public function setHiddenValueDomainWhitelist($hidden_value_domain_whitelist): static
    {
        if (is_null($hidden_value_domain_whitelist)) {
            array_push($this->openAPINullablesSetToNull, 'hidden_value_domain_whitelist');
        } else {
            $nullablesSetToNull = $this->getOpenAPINullablesSetToNull();
            $index = array_search('hidden_value_domain_whitelist', $nullablesSetToNull);
            if ($index !== false) {
                unset($nullablesSetToNull[$index]);
                $this->setOpenAPINullablesSetToNull($nullablesSetToNull);
            }
        }
        $this->container['hidden_value_domain_whitelist'] = $hidden_value_domain_whitelist;

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

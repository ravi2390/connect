# # LookmlModelExploreField

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**align** | **string** | The appropriate horizontal text alignment the values of this field should be displayed in. Valid values are: \&quot;left\&quot;, \&quot;right\&quot;. | [optional] [readonly]
**can_filter** | **bool** | Whether it&#39;s possible to filter on this field. | [optional] [readonly]
**category** | **string** | Field category Valid values are: \&quot;parameter\&quot;, \&quot;filter\&quot;, \&quot;measure\&quot;, \&quot;dimension\&quot;. | [optional] [readonly]
**default_filter_value** | **string** | The default value that this field uses when filtering. Null if there is no default value. | [optional] [readonly]
**description** | **string** | Description | [optional] [readonly]
**dimension_group** | **string** | Dimension group if this field is part of a dimension group. If not, this will be null. | [optional] [readonly]
**drill_fields** | **string[]** | Drill fields declared for this field in LookML or default drills for certain types. | [optional] [readonly]
**enumerations** | [**\OpenAPI\Client\Model\LookmlModelExploreFieldEnumeration[]**](LookmlModelExploreFieldEnumeration.md) | An array enumerating all the possible values that this field can contain. When null, there is no limit to the set of possible values this field can contain. | [optional] [readonly]
**error** | **string** | An error message indicating a problem with the definition of this field. If there are no errors, this will be null. | [optional] [readonly]
**field_group_label** | **string** | A label creating a grouping of fields. All fields with this label should be presented together when displayed in a UI. | [optional] [readonly]
**field_group_variant** | **string** | When presented in a field group via field_group_label, a shorter name of the field to be displayed in that context. | [optional] [readonly]
**fill_style** | **string** | The style of dimension fill that is possible for this field. Null if no dimension fill is possible. Valid values are: \&quot;enumeration\&quot;, \&quot;range\&quot;. | [optional] [readonly]
**fiscal_month_offset** | **int** | An offset (in months) from the calendar start month to the fiscal start month defined in the LookML model this field belongs to. | [optional] [readonly]
**has_allowed_values** | **bool** | Whether this field has a set of allowed_values specified in LookML. | [optional] [readonly]
**has_drills_metadata** | **bool** | Whether this field has links or drill fields defined. | [optional] [readonly]
**hidden** | **bool** | Whether this field should be hidden from the user interface. | [optional] [readonly]
**is_filter** | **bool** | Whether this field is a filter. | [optional] [readonly]
**is_fiscal** | **bool** | Whether this field represents a fiscal time value. | [optional] [readonly]
**is_numeric** | **bool** | Whether this field is of a type that represents a numeric value. | [optional] [readonly]
**is_timeframe** | **bool** | Whether this field is of a type that represents a time value. | [optional] [readonly]
**can_time_filter** | **bool** | Whether this field can be time filtered. | [optional] [readonly]
**time_interval** | [**\OpenAPI\Client\Model\LookmlModelExploreFieldTimeInterval**](LookmlModelExploreFieldTimeInterval.md) |  | [optional]
**label** | **string** | Fully-qualified human-readable label of the field. | [optional] [readonly]
**label_from_parameter** | **string** | The name of the parameter that will provide a parameterized label for this field, if available in the current context. | [optional] [readonly]
**label_short** | **string** | The human-readable label of the field, without the view label. | [optional] [readonly]
**lookml_link** | **string** | A URL linking to the definition of this field in the LookML IDE. | [optional] [readonly]
**links** | [**\OpenAPI\Client\Model\LookmlFieldLink[]**](LookmlFieldLink.md) | Links associated with this field. | [optional] [readonly]
**map_layer** | [**\OpenAPI\Client\Model\LookmlModelExploreFieldMapLayer**](LookmlModelExploreFieldMapLayer.md) |  | [optional]
**measure** | **bool** | Whether this field is a measure. | [optional] [readonly]
**name** | **string** | Fully-qualified name of the field. | [optional] [readonly]
**strict_value_format** | **bool** | If yes, the field will not be localized with the user attribute number_format. Defaults to no | [optional] [readonly]
**parameter** | **bool** | Whether this field is a parameter. | [optional] [readonly]
**permanent** | **bool** | Whether this field can be removed from a query. | [optional] [readonly]
**primary_key** | **bool** | Whether or not the field represents a primary key. | [optional] [readonly]
**project_name** | **string** | The name of the project this field is defined in. | [optional] [readonly]
**requires_refresh_on_sort** | **bool** | When true, it&#39;s not possible to re-sort this field&#39;s values without re-running the SQL query, due to database logic that affects the sort. | [optional] [readonly]
**scope** | **string** | The LookML scope this field belongs to. The scope is typically the field&#39;s view. | [optional] [readonly]
**sortable** | **bool** | Whether this field can be sorted. | [optional] [readonly]
**source_file** | **string** | The path portion of source_file_path. | [optional] [readonly]
**source_file_path** | **string** | The fully-qualified path of the project file this field is defined in. | [optional] [readonly]
**sql** | **string** | SQL expression as defined in the LookML model. The SQL syntax shown here is a representation intended for auditability, and is not neccessarily an exact match for what will ultimately be run in the database. It may contain special LookML syntax or annotations that are not valid SQL. This will be null if the current user does not have the see_lookml permission for the field&#39;s model. | [optional] [readonly]
**sql_case** | [**\OpenAPI\Client\Model\LookmlModelExploreFieldSqlCase[]**](LookmlModelExploreFieldSqlCase.md) | An array of conditions and values that make up a SQL Case expression, as defined in the LookML model. The SQL syntax shown here is a representation intended for auditability, and is not neccessarily an exact match for what will ultimately be run in the database. It may contain special LookML syntax or annotations that are not valid SQL. This will be null if the current user does not have the see_lookml permission for the field&#39;s model. | [optional] [readonly]
**filters** | [**\OpenAPI\Client\Model\LookmlModelExploreFieldMeasureFilters[]**](LookmlModelExploreFieldMeasureFilters.md) | Array of filter conditions defined for the measure in LookML. | [optional] [readonly]
**suggest_dimension** | **string** | The name of the dimension to base suggest queries from. | [optional] [readonly]
**suggest_explore** | **string** | The name of the explore to base suggest queries from. | [optional] [readonly]
**suggestable** | **bool** | Whether or not suggestions are possible for this field. | [optional] [readonly]
**suggestions** | **string[]** | If available, a list of suggestions for this field. For most fields, a suggest query is a more appropriate way to get an up-to-date list of suggestions. Or use enumerations to list all the possible values. | [optional] [readonly]
**tags** | **string[]** | An array of arbitrary string tags provided in the model for this field. | [optional] [readonly]
**type** | **string** | The LookML type of the field. | [optional] [readonly]
**user_attribute_filter_types** | **string[]** | An array of user attribute types that are allowed to be used in filters on this field. Valid values are: \&quot;advanced_filter_string\&quot;, \&quot;advanced_filter_number\&quot;, \&quot;advanced_filter_datetime\&quot;, \&quot;string\&quot;, \&quot;number\&quot;, \&quot;datetime\&quot;, \&quot;relative_url\&quot;, \&quot;yesno\&quot;, \&quot;zipcode\&quot;. | [optional] [readonly]
**value_format** | **string** | If specified, the LookML value format string for formatting values of this field. | [optional] [readonly]
**view** | **string** | The name of the view this field belongs to. | [optional] [readonly]
**view_label** | **string** | The human-readable label of the view the field belongs to. | [optional] [readonly]
**dynamic** | **bool** | Whether this field was specified in \&quot;dynamic_fields\&quot; and is not part of the model. | [optional] [readonly]
**week_start_day** | **string** | The name of the starting day of the week. Valid values are: \&quot;monday\&quot;, \&quot;tuesday\&quot;, \&quot;wednesday\&quot;, \&quot;thursday\&quot;, \&quot;friday\&quot;, \&quot;saturday\&quot;, \&quot;sunday\&quot;. | [optional] [readonly]
**times_used** | **int** | The number of times this field has been used in queries | [optional] [readonly]
**original_view** | **string** | The name of the view this field is defined in. This will be different than \&quot;view\&quot; when the view has been joined via a different name using the \&quot;from\&quot; parameter. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

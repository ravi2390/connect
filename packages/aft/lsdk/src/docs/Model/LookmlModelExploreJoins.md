# # LookmlModelExploreJoins

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Name of this join (and name of the view to join) | [optional] [readonly]
**dependent_fields** | **string[]** | Fields referenced by the join | [optional] [readonly]
**fields** | **string[]** | Fields of the joined view to pull into this explore | [optional] [readonly]
**foreign_key** | **string** | Name of the dimension in this explore whose value is in the primary key of the joined view | [optional] [readonly]
**from** | **string** | Name of view to join | [optional] [readonly]
**outer_only** | **bool** | Specifies whether all queries must use an outer join | [optional] [readonly]
**relationship** | **string** | many_to_one, one_to_one, one_to_many, many_to_many | [optional] [readonly]
**required_joins** | **string[]** | Names of joins that must always be included in SQL queries | [optional] [readonly]
**sql_foreign_key** | **string** | SQL expression that produces a foreign key | [optional] [readonly]
**sql_on** | **string** | SQL ON expression describing the join condition | [optional] [readonly]
**sql_table_name** | **string** | SQL table name to join | [optional] [readonly]
**type** | **string** | The join type: left_outer, full_outer, inner, or cross | [optional] [readonly]
**view_label** | **string** | Label to display in UI selectors | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

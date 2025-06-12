# # LegacyFeature

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**id** | **string** | Unique Id | [optional] [readonly]
**name** | **string** | Name | [optional] [readonly]
**description** | **string** | Description | [optional] [readonly]
**enabled_locally** | **bool** | Whether this feature has been enabled by a user | [optional]
**enabled** | **bool** | Whether this feature is currently enabled | [optional] [readonly]
**disallowed_as_of_version** | **string** | Looker version where this feature became a legacy feature | [optional] [readonly]
**disable_on_upgrade_to_version** | **string** | Looker version where this feature will be automatically disabled | [optional] [readonly]
**end_of_life_version** | **string** | Future Looker version where this feature will be removed | [optional] [readonly]
**documentation_url** | **string** | URL for documentation about this feature | [optional] [readonly]
**approximate_disable_date** | **\DateTime** | Approximate date that this feature will be automatically disabled. | [optional] [readonly]
**approximate_end_of_life_date** | **\DateTime** | Approximate date that this feature will be removed. | [optional] [readonly]
**has_disabled_on_upgrade** | **bool** | Whether this legacy feature may have been automatically disabled when upgrading to the current version. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

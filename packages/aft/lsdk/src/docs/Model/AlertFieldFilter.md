# # AlertFieldFilter

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**field_name** | **string** | Field Name. Has format &#x60;&lt;view&gt;.&lt;field&gt;&#x60; |
**field_value** | [**Any**](Any.md) | Field Value. Depends on the type of field - numeric or string. For [location](https://cloud.google.com/looker/docs/reference/field-reference/dimension-type-reference#location) type, it&#39;s a list of floats. Example &#x60;[1.0, 56.0]&#x60; |
**filter_value** | **string** | Filter Value. Usually null except for [location](https://cloud.google.com/looker/docs/reference/field-reference/dimension-type-reference#location) type. It&#39;ll be a string of lat,long ie &#x60;&#39;1.0,56.0&#39;&#x60; | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

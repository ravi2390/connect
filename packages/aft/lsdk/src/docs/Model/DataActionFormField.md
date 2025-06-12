# # DataActionFormField

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Name | [optional] [readonly]
**label** | **string** | Human-readable label | [optional] [readonly]
**description** | **string** | Description of field | [optional] [readonly]
**type** | **string** | Type of field. | [optional] [readonly]
**default** | **string** | Default value of the field. | [optional] [readonly]
**oauth_url** | **string** | The URL for an oauth link, if type is &#39;oauth_link&#39;. | [optional] [readonly]
**interactive** | **bool** | Whether or not a field supports interactive forms. | [optional] [readonly]
**required** | **bool** | Whether or not the field is required. This is a user-interface hint. A user interface displaying this form should not submit it without a value for this field. The action server must also perform this validation. | [optional] [readonly]
**options** | [**\OpenAPI\Client\Model\DataActionFormSelectOption[]**](DataActionFormSelectOption.md) | If the form type is &#39;select&#39;, a list of options to be selected from. | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

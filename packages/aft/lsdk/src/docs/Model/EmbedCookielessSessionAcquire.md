# # EmbedCookielessSessionAcquire

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**session_length** | **int** | Number of seconds the signed embed session will be valid after the embed session is started. Defaults to 300 seconds. Maximum session length accepted is 2592000 seconds (30 days). | [optional]
**force_logout_login** | **bool** | When true, the embed session will purge any residual Looker login state (such as in browser cookies) before creating a new login state with the given embed user info. Defaults to true. | [optional]
**external_user_id** | **string** | A value from an external system that uniquely identifies the embed user. Since the user_ids of Looker embed users may change with every embed session, external_user_id provides a way to assign a known, stable user identifier across multiple embed sessions. When the same external user id value is used for a new embed session, any existing session is terminated and existing access grants are replaced with the access grants associated with the new embed session. | [optional]
**first_name** | **string** | First name of the embed user. Defaults to &#39;Embed&#39; if not specified | [optional]
**last_name** | **string** | Last name of the embed user. Defaults to &#39;User&#39; if not specified | [optional]
**user_timezone** | **string** | Sets the user timezone for the embed user session, if the User Specific Timezones setting is enabled in the Looker admin settings. A value of &#x60;null&#x60; forces the embed user to use the Looker Application Default Timezone. You MUST omit this property from the request if the User Specific Timezones setting is disabled. Timezone values are validated against the IANA Timezone standard and can be seen in the Application Time Zone dropdown list on the Looker General Settings admin page. | [optional]
**permissions** | **string[]** | List of Looker permission names to grant to the embed user. Requested permissions will be filtered to permissions allowed for embed sessions. | [optional]
**models** | **string[]** | List of model names that the embed user may access | [optional]
**group_ids** | **string[]** | List of Looker group ids in which to enroll the embed user | [optional]
**external_group_id** | **string** | A unique value identifying an embed-exclusive group. Multiple embed users using the same &#x60;external_group_id&#x60; value will be able to share Looker content with each other. Content and embed users associated with the &#x60;external_group_id&#x60; will not be accessible to normal Looker users or embed users not associated with this &#x60;external_group_id&#x60;. | [optional]
**user_attributes** | [**array<string,Any>**](Any.md) | A dictionary of name-value pairs associating a Looker user attribute name with a value. | [optional]
**embed_domain** | **string** | The domain of the server embedding the Looker IFRAME. This is an alternative to specifying the domain in the embedded domain allow list in the Looker embed admin page. | [optional]
**session_reference_token** | **string** | Token referencing the embed session and is used to generate new authentication, navigation and api tokens. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

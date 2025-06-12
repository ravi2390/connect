# # CredentialsEmail

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**created_at** | **string** | Timestamp for the creation of this credential | [optional] [readonly]
**email** | **string** | EMail address used for user login | [optional]
**forced_password_reset_at_next_login** | **bool** | Force the user to change their password upon their next login | [optional]
**user_id** | **string** | Unique Id of the user | [optional] [readonly]
**is_disabled** | **bool** | Has this credential been disabled? | [optional] [readonly]
**logged_in_at** | **string** | Timestamp for most recent login using credential | [optional] [readonly]
**password_reset_url** | **string** | Url with one-time use secret token that the user can use to reset password | [optional] [readonly]
**account_setup_url** | **string** | Url with one-time use secret token that the user can use to setup account | [optional] [readonly]
**type** | **string** | Short name for the type of this kind of credential | [optional] [readonly]
**url** | **string** | Link to get this item | [optional] [readonly]
**user_url** | **string** | Link to get this user | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

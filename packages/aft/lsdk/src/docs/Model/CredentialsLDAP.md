# # CredentialsLDAP

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**created_at** | **string** | Timestamp for the creation of this credential | [optional] [readonly]
**email** | **string** | EMail address | [optional] [readonly]
**is_disabled** | **bool** | Has this credential been disabled? | [optional] [readonly]
**ldap_dn** | **string** | LDAP Distinguished name for this user (as-of the last login) | [optional] [readonly]
**ldap_id** | **string** | LDAP Unique ID for this user | [optional] [readonly]
**logged_in_at** | **string** | Timestamp for most recent login using credential | [optional] [readonly]
**type** | **string** | Short name for the type of this kind of credential | [optional] [readonly]
**url** | **string** | Link to get this item | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

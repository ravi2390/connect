# # SshServer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ssh_server_id** | **string** | A unique id used to identify this SSH Server | [optional] [readonly]
**ssh_server_name** | **string** | The name to identify this SSH Server | [optional]
**ssh_server_host** | **string** | The hostname or ip address of the SSH Server | [optional]
**ssh_server_port** | **int** | The port to connect to on the SSH Server | [optional]
**ssh_server_user** | **string** | The username used to connect to the SSH Server | [optional]
**finger_print** | **string** | The md5 fingerprint used to identify the SSH Server | [optional] [readonly]
**sha_finger_print** | **string** | The SHA fingerprint used to identify the SSH Server | [optional] [readonly]
**public_key** | **string** | The SSH public key created for this instance | [optional] [readonly]
**status** | **string** | The current connection status to this SSH Server | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # SshTunnel

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tunnel_id** | **string** | Unique ID for the tunnel | [optional] [readonly]
**ssh_server_id** | **string** | SSH Server ID | [optional]
**ssh_server_name** | **string** | SSH Server name | [optional] [readonly]
**ssh_server_host** | **string** | SSH Server Hostname or IP Address | [optional] [readonly]
**ssh_server_port** | **int** | SSH Server port | [optional] [readonly]
**ssh_server_user** | **string** | Username used to connect to the SSH Server | [optional] [readonly]
**last_attempt** | **string** | Time of last connect attempt | [optional] [readonly]
**local_host_port** | **int** | Localhost Port used by the Looker instance to connect to the remote DB | [optional]
**database_host** | **string** | Hostname or IP Address of the Database Server | [optional]
**database_port** | **int** | Port that the Database Server is listening on | [optional]
**status** | **string** | Current connection status for this Tunnel | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

# # RenderTask

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**can** | **array<string,bool>** | Operations the current user is able to perform on this object | [optional] [readonly]
**created_at** | **string** | Date/Time render task was created | [optional] [readonly]
**dashboard_filters** | **string** | Filter values to apply to the dashboard queries, in URL query format | [optional] [readonly]
**dashboard_id** | **string** | Id of dashboard to render | [optional] [readonly]
**dashboard_style** | **string** | Dashboard layout style: single_column or tiled | [optional] [readonly]
**finalized_at** | **string** | Date/Time render task was completed | [optional] [readonly]
**height** | **int** | Output height in pixels. Flowed layouts may ignore this value. | [optional] [readonly]
**id** | **string** | Id of this render task | [optional] [readonly]
**look_id** | **string** | Id of look to render | [optional] [readonly]
**lookml_dashboard_id** | **string** | Id of lookml dashboard to render | [optional] [readonly]
**query_id** | **string** | Id of query to render | [optional] [readonly]
**dashboard_element_id** | **string** | Id of dashboard element to render: UDD dashboard element would be numeric and LookML dashboard element would be model_name::dashboard_title::lookml_link_id | [optional] [readonly]
**query_runtime** | **float** | Number of seconds elapsed running queries | [optional] [readonly]
**render_runtime** | **float** | Number of seconds elapsed rendering data | [optional] [readonly]
**result_format** | **string** | Output format: pdf, png, or jpg | [optional] [readonly]
**runtime** | **float** | Total seconds elapsed for render task | [optional] [readonly]
**status** | **string** | Render task status: enqueued_for_query, querying, enqueued_for_render, rendering, success, failure | [optional] [readonly]
**status_detail** | **string** | Additional information about the current status | [optional] [readonly]
**user_id** | **string** | The user account permissions in which the render task will execute | [optional] [readonly]
**width** | **int** | Output width in pixels | [optional] [readonly]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)

<?php

namespace Aft\FileUploader;

use Illuminate\Contracts\Routing\Registrar;

class RouteRegistrar
{
    /**
     * Create a new route registrar instance.
     *
     * @param  \Illuminate\Contracts\Routing\Registrar  $router
     * @return void
     */
    public function __construct(protected \Illuminate\Contracts\Routing\Registrar $router)
    {
    }

    /**
     * Register routes.
     *
     * @return void
     */
    public function all(): void
    {
        $this->router->group([], function ($router): void {
            $router->get('getOneSchemaCreateParams', [
                'uses' => 'OneSchemaController@getOneSchemaCreateParams',
                'as' => 'file_uploader.getOneSchemaCreateParams']);

            $router->post('generateImporterPayload', [
                'uses' => 'OneSchemaController@generateImporterPayload',
                'as' => 'file_uploader.generateImporterPayload']);

            $router->post('fetchLookupLists', [
                'uses' => 'OneSchemaController@fetchLookupLists',
                'as' => 'file_uploader.fetchLookupLists']);

            $router->get('getImportedFileUrl/{embedId}', [
                'uses' => 'OneSchemaController@getImportedFileUrl',
                'as' => 'file_uploader.getImportedFileUrl']);
        });
    }
}

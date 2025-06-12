<?php

namespace Aft\BillHighway\Helpers;

use Illuminate\Support\Facades\DB;

class Telescope
{
    public static function RecordRequest($uri, $method, $payload, $duration, $response, $tags): void
    {
        try {
            if (! \Laravel\Telescope\Telescope::isRecording()) {
                return;
            }

            $guid = UUID::v4();
            DB::connection('sqlsrv')->table('telescope_entries')->insert(
                [
                    'uuid' => $guid,
                    'batch_id' => UUID::v4(),
                    'should_display_on_index' => 1,
                    'type' => 'request',
                    'content' => self::buildContent($uri, $method, $payload, $duration, $response),
                    'created_at' => now(),
                ]
            );

            foreach ($tags as $tag) {
                DB::connection('sqlsrv')->table('telescope_entries_tags')->insert(
                    ['entry_uuid' => $guid, 'tag' => $tag]
                );
            }
        } catch (\Exception) {
        }
    }

    private static function buildContent($uri, $method, $payload, $duration, $response)
    {
        $content = (object) [];
        $content->uri = $uri;
        $content->method = $method;
        $content->controller_action = '';
        $content->middleware = '';
        $content->headers = '';
        $content->payload = json_decode((string) $payload);
        $content->session = '';
        $content->response_status = $response->getStatusCode();
        $content->response = json_decode((string) $response->getBody());
        $content->duration = $duration;
        $content->memory = 0;
        $content->hostname = ''; // gethostname();

        return json_encode($content);
    }

    public static function RecordRequestException($uri, $method, $payload, $duration, $exception, $tags): void
    {
        try {
            if (! \Laravel\Telescope\Telescope::isRecording()) {
                return;
            }

            $guid = UUID::v4();
            DB::connection('sqlsrv')->table('telescope_entries')->insert(
                [
                    'uuid' => $guid,
                    'batch_id' => UUID::v4(),
                    'should_display_on_index' => 1,
                    'type' => 'request',
                    'content' => self::buildContentException($uri, $method, $payload, $duration, $exception),
                    'created_at' => now(),
                ]
            );

            foreach ($tags as $tag) {
                DB::connection('sqlsrv')->table('telescope_entries_tags')->insert(
                    ['entry_uuid' => $guid, 'tag' => $tag]
                );
            }
        } catch (\Exception) {
        }
    }

    private static function buildContentException($uri, $method, $payload, $duration, $exception)
    {
        $content = (object) [];
        $content->uri = $uri;
        $content->method = $method;
        $content->controller_action = '';
        $content->middleware = '';
        $content->headers = '';
        $content->payload = json_decode((string) $payload);
        $content->session = '';
        $content->response_status = -1;
        $content->response = json_decode('{'.
            '"file": "'.$exception->getFile().'",'.
            '"line": '.$exception->getLine().','.
            '"code": '.$exception->getCode().','.
            '"message": "'.$exception->getMessage().'"'.
            '}');
        $content->duration = $duration;
        $content->memory = 0;
        $content->hostname = ''; // gethostname();

        return json_encode($content);
    }
}

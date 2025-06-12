<?php

namespace Aft\BillHighway;

use Aft\BillHighway\Helpers\Telescope;
use Aft\BillHighway\Helpers\Logger;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class BaseBillHighway
{
    public function __construct()
    {
    }

    protected static function getResponseFromBillHighway(
        $apiType,
        $method,
        string $apiUrl,
        $data,
        $telescopeSearchTags = [],
        $loggingParams = null
    ): mixed {
        $headers = [];
        $url = '';
        if ($apiType === 'securePayments') {
            $configSecurePayments = config('billhighway.endpoints.securePayments');
            $headers = [
                'Authorization' => 'PublishableKey '.$configSecurePayments['publishable_key'],
                'Content-Type' => $configSecurePayments['content_type'],
            ];
            $url = $configSecurePayments['baseurl'].$apiUrl;
        } elseif ($apiType === 'cloud') {
            $configCloud = config('billhighway.endpoints.cloud');
            $headers = [
                'Authorization' => 'Basic '.base64_encode(
                    $configCloud['public_key'].':'.$configCloud['private_key']
                ),
                'Content-Type' => $configCloud['content_type'],
            ];
            $url = $configCloud['baseurl'].$apiUrl;
        } elseif ($apiType === 'connect') {
            $configConnect = config('billhighway.endpoints.connect');
            $headers = [
                'Authorization' => 'Basic '.$configConnect['private_key'],
                'Content-Type' => $configConnect['content_type'],
            ];
            $url = $configConnect['baseurl'].$apiUrl;
        }

        $startTime = microtime(true);
        $client = new Client();
        try {
            $response = $client->request(
                strtoupper((string) $method),
                $url,
                [
                    'headers' => $headers,
                    'body' => isset($data) ? json_encode($data) : null,
                ]
            );

            //-- Logging/Telescope --
            if ($apiType === 'securePayments') {
                $data = null;
            }
            $endTime = microtime(true);
            $requestDuration = round($endTime - $startTime, 3) * 1000;
            Telescope::RecordRequest($url, strtoupper((string) $method), json_encode($data), $requestDuration, $response, array_merge(['BillHighway'], $telescopeSearchTags));
        } catch (ClientException $ex) {
            $response = $ex->getResponse();

            //-- Logging/Telescope --
            if ($apiType === 'securePayments') {
                $data = null;
            }
            $endTime = microtime(true);
            $requestDuration = round($endTime - $startTime, 3) * 1000;
            Telescope::RecordRequest($url, strtoupper((string) $method), json_encode($data), $requestDuration, $response, array_merge(['BillHighway'], $telescopeSearchTags));
            Logger::LogRequestException($url, strtoupper((string) $method), json_encode($data), $response->getStatusCode(), $response->getBody(), $loggingParams);
        } catch (Exception $ex) {
            //-- Logging/Telescope --
            if ($apiType === 'securePayments') {
                $data = null;
            }
            $endTime = microtime(true);
            $requestDuration = round($endTime - $startTime, 3) * 1000;
            Telescope::RecordRequestException($url, strtoupper((string) $method), json_encode($data), $requestDuration, $ex, array_merge(['BillHighway'], $telescopeSearchTags));
            Logger::LogRequestException($url, strtoupper((string) $method), json_encode($data), $ex->getCode(), $ex->getMessage(), $loggingParams);

            throw $ex; //Notifies the caller about the exception
        }

        return json_decode($response->getBody());
    }
}

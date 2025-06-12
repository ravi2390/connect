<?php

namespace Aft\FileUploader\Http\Controllers;

use Aft\MuseApi\Http\Controllers\LookupListsController;

use GuzzleHttp\Client;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 * Class OneSchemaController
 *
 * @todo Create new route to request finalized file download link from OneSchema. xls available?
 */
class OneSchemaController extends Controller
{
    /**
     * @var array|array[] OneSchema client keys.
     *
     * @todo Get client id and secret from secure Connect environment.
     */
    private array $oneSchemaClients = [
//        'prod' => [
//            'id' => '',
//            'secret' => '',
//        ],
        'stage' => [
            'id' => '41bbc527-51c7-4593-84a3-b853d3fd12e8',
            'secret' => 'AWQMB+jDQfi5Xs0ragbxb8H0yRT+xqbQg3+YCzvZ/6s=',
        ],
        'dev' => [
            'id' => '295a940b-349a-4da7-92b4-cd69a9762102',
            'secret' => 'iCIEorlRPt63PzAFF9Er8/ZCH4dKrYojFTE7R1uResQ=',
        ],
    ];

    /**
     * @var array|array[] Lambda client url and secret.
     *
     * @todo Get base url and secret from secure Connect environment.
     */
    private array $lambdaConfig = [
//        'prod' => [
//            'base_url' => '',
//            'secret' => '',
//        ],
        'stage' => [
            'base_url' => 'https://8osxosxt4k.execute-api.us-east-1.amazonaws.com/staging',
            'secret' => 'Om15LXNlY3JldGl2ZS1rZXk=',
        ],
        'dev' => [
            'base_url' => 'https://t9evm935kh.execute-api.us-east-1.amazonaws.com/dev',
            'secret' => 'Om15LXNlY3JldGl2ZS1rZXk=',
        ],
    ];

    /**
     * Generate parameters for OneSchemaParams required by createOneSchemaImporter().
     *
     * @see https://docs.oneschema.co/docs/javascript#oneschemaparams
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getOneSchemaCreateParams(Request $request): JsonResponse
    {
        $app_env = App::environment();
        $user = $request->user();
        $clientId = config('oneschema.client.id');

        if ($clientId) {
            $response = json_decode('{
                "clientId": null,
                "devMode": true,
                "className": "oneschema-importer",
                "styles": {
                    "position": "fixed",
                    "top": "0",
                    "left": "0",
                    "width": "100vw",
                    "height": "100vh",
                    "zIndex": "1000"
                }
            }');
            $response->devMode = $app_env !== 'production';
            $response->clientId = $clientId;
            return response()->json($response);
        }

        $message = 'Client id not found.';
        Log::error('Failed to generate Importer createParams', [
            'error' => $message,
            'user_id' => $user->id,
        ]);
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to generate Importer createParams: ' . $message,
        ], 500);
    }

    /**
     * Generate payload for initializing OneSchema Importer.
     *
     * @param Request $request
     *   Options and data to include in the JWT payload.
     *
     * @return false|string
     *   The JSON-encoded payload string.
     */
    public function generateImporterPayload(Request $request)
    {
        $options = Validator::make($request->all(), [
            'importerEnv' => 'required|string',
            'payload' => 'required|array',
        ])->validate();
        $importerEnv = $options['importerEnv'];
        $importMethod = $options['payload']['importMethod'] ?? 'default';

        // @todo Remove the fallbacks after testing env variables in Connect Dev and Connect Stage.
        $clientId = config('oneschema.client.id');
        $clientSecret = config('oneschema.client.secret');
        if ($importerEnv !== 'default') {
            $clientId = $this->oneSchemaClients[$importerEnv]['id'] ?? $this->oneSchemaClients['stage']['id'] ?? $clientId;
            $clientSecret = $this->oneSchemaClients[$importerEnv]['secret'] ?? $this->oneSchemaClients['stage']['secret'] ?? $clientSecret;
        }
        $userEmailId = Auth::user()->email;

        $payload = json_decode('{
            "userJwt": null,
            "importConfig": { "type": "local" }
        }');
        if ($importMethod === 'webhook') {
            $payload->importConfig->type = 'webhook';
            $payload->importConfig->key = 'addImportJob';
        }

        // Set the lambda payload for use in code hooks.
        $lambdaEnv = $options['payload']['lambdaEnv'] ?? 'stage';
        $options['payload']['lambdaUrl'] = $this->lambdaConfig[$lambdaEnv]['base_url'] ?? $this->lambdaConfig['stage']['base_url'];
        $options['payload']['lambdaSecret'] = $this->lambdaConfig[$lambdaEnv]['secret'] ?? $this->lambdaConfig['stage']['secret'];

        $payload->userJwt = $this->getJWT($clientId, $clientSecret, $userEmailId, $options['payload']);
        // To test full JWT payload contents.
        // $parts = explode('.', $payload->userJwt);
        // $decodedJwtPayload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])));

        return json_encode($payload);
    }

    private function getJWT($clientId, $clientSecret, $userId, $extra = [])
    {
        // Create token header as a JSON string
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

        // Create token payload as a JSON string
        $payload = json_encode(['iss' => $clientId, 'user_id' => $userId] + $extra);

        // Encode Header to Base64Url String
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

        // Encode Payload to Base64Url String
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        // Create Signature Hash
        $signature = hash_hmac('sha256', $base64UrlHeader.'.'.$base64UrlPayload, (string) $clientSecret, true);

        // Encode Signature to Base64Url String
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        // Create JWT
        return $base64UrlHeader.'.'.$base64UrlPayload.'.'.$base64UrlSignature;
    }

    /**
     * Fetch lookup lists from AFTDB.
     */
    public function fetchLookupLists(Request $request): JsonResponse
    {
        $returnScope = $request->input('returnScope', []);
        $affiliateNumber = $request->input('affiliateNumber');
        $controller = new LookupListsController();
        return $controller->fetchLookupLists($returnScope, $affiliateNumber);
    }

    public function getImportedFileUrl(string $embedId): JsonResponse
    {
        $oneSchemaApiKey = config('oneschema.api.key');
        $responseStatus = 200;
        if (!$oneSchemaApiKey) {
            $response = ['message' => 'API key not configured'];
            $responseStatus = 404;
        } elseif ($embedId === '' || $embedId === '0') {
            $response = ['message' => 'embed_id must be provided'];
            $responseStatus = 404;
        } else {
            $importedFileUrlApiUrl = "https://api.oneschema.co/v1/embeds/$embedId/imported-file-url?row_filter=all";
            $client = new Client();
            $headers = [
                'X-API-KEY' => $oneSchemaApiKey,
                'accept' => 'application/json',
            ];
            $response = $client->request('GET', $importedFileUrlApiUrl, [
                'headers' => $headers,
            ]);
            $json = json_decode($response->getBody()->getContents());

            // @todo Do additional error checking on response value.
            if (empty($json->url)) {
                $response = ['message' => 'Imported file url not found'];
                $responseStatus = 404;
            } else {
                $response = $json;
            }
        }
        return response()->json($response, $responseStatus);
    }
}

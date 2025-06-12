<?php

namespace Aft\Lsdk\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LookerService
{
    protected \GuzzleHttp\Client $client;
    protected $accessToken;
    protected $tokenExpiration;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => Config::get('lsdk.base_url'),
            'verify' => Config::get('lsdk.verify_ssl', true),
        ]);
    }

    protected function ensureValidToken()
    {
        if (!$this->accessToken || $this->isTokenExpired()) {
            $this->login();
        }
    }

    protected function isTokenExpired(): bool
    {
        return !$this->tokenExpiration || $this->tokenExpiration <= time();
    }

    public function login()
    {
        $clientId = Config::get('lsdk.client_id');
        $clientSecret = Config::get('lsdk.client_secret');
        $baseUrl = Config::get('lsdk.base_url');
    
        try {
            $response = $this->client->post('/api/4.0/login', [
                'form_params' => [
                    'client_id' => $clientId,
                    'client_secret' => $clientSecret,
                ],
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ],
            ]);
    
            $responseData = json_decode((string) $response->getBody(), true);
            $this->accessToken = $responseData['access_token'];
            $this->tokenExpiration = time() + $responseData['expires_in'];
    
            return $responseData;
        } catch (RequestException $e) {
            $statusCode = $e->hasResponse() ? $e->getResponse()->getStatusCode() : 'No response';
            $errorMessage = $e->getMessage();
    
            Log::channel('customlog')->error('Looker authentication failed', [
                'message' => $errorMessage,
                'status_code' => $statusCode,
                'url' => $baseUrl . '/api/4.0/login',
            ]);
    
            if ($statusCode == 403) {
                throw new \Exception("Authentication failed. Please check: 
                    1. Your client_id and client_secret are correct. 
                    2. The API port is correct in the base URL (default is 443). 
                    3. You're using the correct API version in the URL (/api/4.0/).
                    4. Your IP is not restricted for API access.");
            } elseif ($statusCode == 404) {
                throw new \Exception("The API endpoint was not found. Please check your base URL and API version.");
            } else {
                throw new \Exception('Authentication failed: ' . $errorMessage);
            }
        }
    }

    public function createSsoEmbedUrl($ssoParams)
    {
        $this->ensureValidToken();

        try {
            $response = $this->client->request('POST', '/api/4.0/embed/sso_url', [
                'json' => $ssoParams,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}",
                    'Content-Type' => 'application/json',
                ]
            ]);

            $responseData = json_decode((string) $response->getBody(), true);

            if (isset($responseData['url'])) {
                return $responseData['url'];
            } else {
                throw new \Exception('Embed URL not found in response');
            }
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to create SSO Embed URL', [
                'error' => $e->getMessage(),
                'params' => $ssoParams,
            ]);
            throw new \Exception('Failed to create SSO Embed URL: ' . $e->getMessage());
        }
    }

    public function getAllRoles($fields = null, $ids = null)
    {
        $this->ensureValidToken();

        $endpoint = "/api/4.0/roles";

        // if parameters are not null, then set them
        $params = array_filter([
            'fields' => $fields,
            'ids' => $ids
        ], fn($value): bool => !empty($value));

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);

            $responseData = json_decode((string) $response->getBody(), true);

            Log::channel('customlog')->info('Successfully retrieved roles', [
                'roles' => $responseData,
            ]);

            return $responseData;
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get roles', [
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get roles: ' . $e->getMessage());
        }
    }

    public function getAllModels($fields = null, $limit = null, $offset = null): mixed
    {
        $this->ensureValidToken();

        $endpoint = "/api/4.0/lookml_models";

        // if parameters are not null, then set them
        $params = array_filter([
            'fields' => $fields,
            'limit' => $limit,
            'offset' => $offset
        ], fn($value): bool => $value !== null);

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);
            return json_decode((string) $response->getBody(), true);
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get LookML models', [
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get LookML models: ' . $e->getMessage());
        }
    }

    public function getUser($userId, $fields = null)
    {
        $this->ensureValidToken();

        $endpoint = "/api/4.0/users/{$userId}";
        $params = [];
        if ($fields) {
            $params['fields'] = $fields;
        }

        Log::channel('customlog')->info('Getting User from Looker API', [
            'user_id' => $userId,
            'fields' => $fields,
        ]);

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);

            $responseData = json_decode((string) $response->getBody(), true);

            Log::channel('customlog')->info('Successfully retrieved User', [
                'user_id' => $userId,
            ]);

            return $responseData;
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get User', [
                'user_id' => $userId,
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get User: ' . $e->getMessage());
        }
    }

    public function getLook($lookId, $fields = null)
    {
        $this->ensureValidToken();

        $endpoint = "/api/4.0/looks/{$lookId}";
        $params = [];
        if ($fields) {
            $params['fields'] = $fields;
        }

        Log::channel('customlog')->info('Getting Look from Looker API', [
            'look_id' => $lookId,
            'fields' => $fields,
        ]);

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);

            $responseData = json_decode((string) $response->getBody(), true);

            Log::channel('customlog')->info('Successfully retrieved Look', [
                'look_id' => $lookId,
            ]);

            return $responseData;
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get Look', [
                'look_id' => $lookId,
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get Look: ' . $e->getMessage());
        }
    }

    public function getDashboard($dashboardId, $fields = null, $userId = null)
    {
        $this->ensureValidToken();

        // if ($userId) {
        //     $user = $this->getUser($userId, 'id,role_ids');
        //     // Check if the user has the required role or permissions
        //     // This is a simplified example, you may need to adjust it based on your specific requirements
        //     if (!in_array('Admin', $user['role_ids'])) {
        //         throw new \Exception('User does not have permission to view this dashboard.');
        //     }
        // }

        $endpoint = "/api/4.0/dashboards/{$dashboardId}";
        $params = [];
        if ($fields) {
            $params['fields'] = $fields;
        }

        Log::channel('customlog')->info('Getting Dashboard from Looker API', [
            'dashboard_id' => $dashboardId,
            'fields' => $fields,
        ]);

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);

            $responseData = json_decode((string) $response->getBody(), true);

            Log::channel('customlog')->info('Successfully retrieved Dashboard', [
                'dashboard_id' => $dashboardId,
            ]);

            return $responseData;
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get Dashboard', [
                'dashboard_id' => $dashboardId,
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get Dashboard: ' . $e->getMessage());
        }
    }

    public function getContentThumbnailByDashboard($dashboardId): string
    {
        $this->ensureValidToken();

        $endpoint = "/api/4.0/content_thumbnail/dashboard/{$dashboardId}";
        $params = [];

        Log::channel('customlog')->info('Getting content thumbnail from Looker API', [
            'dashboard_id' => $dashboardId
        ]);

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);

            Log::channel('customlog')->info('Successfully retrieved content thumbnail', [
                'dashboard_id' => $dashboardId,
            ]);

            return $response->getBody()->getContents();
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get content thumbnail', [
                'dashboard_id' => $dashboardId,
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get content thumbnail: ' . $e->getMessage());
        }
    }

    public function searchDashboard($folderId, $fields = null, $userId = null)
    {
        $this->ensureValidToken();

        $endpoint = "/api/4.0/dashboards/search";
        $params = ['folder_id' => $folderId];

        Log::channel('customlog')->info('Searching Dashboards from Looker API', [
            'folder_id' => $folderId
        ]);

        try {
            $response = $this->client->request('GET', $endpoint, [
                'query' => $params,
                'headers' => [
                    'Authorization' => "Bearer {$this->accessToken}"
                ]
            ]);

            $responseData = json_decode((string) $response->getBody(), true);

            Log::channel('customlog')->info('Successfully retrieved Dashboard list', [
                'folder_id' => $folderId,
            ]);

            return $responseData;
        } catch (RequestException $e) {
            Log::channel('customlog')->error('Failed to get Dashboard list', [
                'folder_id' => $folderId,
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to get Dashboard list: ' . $e->getMessage());
        }
    }
}

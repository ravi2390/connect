<?php

namespace Aft\Sisense;

use App\Models\User;
use Firebase\JWT\JWT;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Sisense
{
    protected $sisenseUserId;

    public function getAuthToken(): mixed
    {
        $client = new Client([
            'base_uri' => config('sisense.connection.url'),
            'timeout' => 15.0,
        ]);

        $headers = [
            'Content-Type' => 'application/x-www-form-urlencoded',
            'accept' => 'application/json',
        ];

        $payload = http_build_query([
            'username' => config('sisense.connection.user'),
            'password' => config('sisense.connection.password'),
        ]);

        $response = $client->post('/api/v1/authentication/login', [
            'headers' => $headers,
            'body' => $payload,
            'verify' => config('sisense.connection.verify'),
        ]);

        return json_decode($response->getBody()->getContents());
    }

    public function createToken(): string
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $payload = [
            'iat' => time(),
            'sub' => $user->email,
            'jti' => Str::uuid(),
        ];

        return JWT::encode($payload, config('sisense.connection.secret'), 'HS256');
    }

    /**
     * Create / update the user in sisense before displaying the reports. Add data security restriction to all the sisense connect reports.
     */
    public function newUser(User $user, string $token): mixed
    {

        // Create User
        $data = ['email' => $user->email, 'userName' => $user->email, 'firstName' => $user->name, 'lastName' => '', 'roleId' => config('sisense.connection.role'), 'groups' => [config('sisense.connection.group')]];

        $client = new Client([
            'base_uri' => config('sisense.connection.url'),
            'timeout' => 15.0,
        ]);

        $headers = ['accept' => 'application/json', 'Content-Type' => 'application/json', 'authorization' => 'Bearer '.$token];

        $payload = json_encode($data);

        try {
            $response = $client->post('/api/v1/users', [
                'headers' => $headers,
                'body' => $payload,
                'verify' => config('sisense.connection.verify'),
            ]);

            // Here the code for successful request
            $responseObj = json_decode($response->getBody()->getContents());
            $responseArray['code'] = 201;
            $responseArray['_id'] = $responseObj->_id;
            $response = json_encode($responseArray);
        } catch (RequestException|ClientException $e) {
            if ($e->hasResponse()) {
                $code = $e->getResponse()->getStatusCode();
                $responseArray['code'] = $code;
                $response = json_encode($responseArray);
            }
        }

        return json_decode($response);
    }

    /**
     * Get user if already existed in sisense.
     */
    public function getUser(User $user, string $token): mixed
    {

        $client = new Client([
            'base_uri' => config('sisense.connection.url'),
            'timeout' => 15.0,
        ]);

        $headers = [
            'accept' => 'application/json',
            'authorization' => 'Bearer '.$token,
        ];

        $payload = [
            'email' => $user->email,
        ];

        $response = $client->get('/api/v1/users', [
            'headers' => $headers,
            'query' => $payload,
            'verify' => config('sisense.connection.verify'),
        ]);

        return json_decode($response->getBody()->getContents());
    }

    public function getReports(string $token): mixed
    {
        $client = new Client([
            'base_uri' => config('sisense.connection.url'),
            'timeout' => 15.0,
        ]);

        $headers = [
            'accept' => 'application/json',
            'authorization' => 'Bearer '.$token,
        ];

        $payload = [
            'q' => 'aft',
        ];

        $response = $client->get('/api/elasticubes/metadata', [
            'headers' => $headers,
            'query' => $payload,
            'verify' => config('sisense.connection.verify'),
        ]);

        return json_decode($response->getBody()->getContents());
    }

    public function getReportDetails(string $token, $report_title): mixed
    {
        $client = new Client([
            'base_uri' => config('sisense.connection.url'),
            'timeout' => 15.0,
        ]);

        $headers = [
            'accept' => 'application/json',
            'authorization' => 'Bearer '.$token,
        ];

        $payload = [
            'q' => 'AffiliateNumber',
        ];
        $report_title = rawurlencode((string) $report_title);

        $response = $client->get('/api/elasticubes/metadata/'.$report_title.'/fields', [
            'headers' => $headers,
            'query' => $payload,
            'verify' => config('sisense.connection.verify'),
        ]);

        return json_decode($response->getBody()->getContents());
    }

    public function allowAccess($gdata, $user_id, $report_title, $table_name, string $token): mixed
    {

        $client = new Client([
            'base_uri' => config('sisense.connection.url'),
            'timeout' => 15.0,
        ]);

        $headers = [
            'Content-Type' => 'application/json',
            'accept' => 'application/json',
            'authorization' => 'Bearer '.$token,
        ];
        $allMembers = true;
        if (count($gdata) > 0) {
            $allMembers = null;
        }

        $data = [['allMembers' => $allMembers,
            'column' => 'AffiliateNumber',
            'datatype' => 'text',
            'elasticube' => $report_title,
            'members' => $gdata,
            'server' => 'LocalHost',
            'shares' => [['party' => $user_id, 'type' => 'user']],
            'table' => $table_name]];

        $payload = json_encode($data);

        $response = $client->post('/api/elasticubes/datasecurity', [
            'headers' => $headers,
            'body' => $payload,
            'verify' => config('sisense.connection.verify'),
        ]);

        return json_decode($response->getBody()->getContents());
    }

    /**@TODO: Need to implement logout functionality for sisense*/

    // function userLogout($sisense_user_id)
    // {
    //     $token_data = $this->createToken();
    //     $token = $token_data->access_token;

    //     $headers = [
    //         'Content-Type' => 'application/json',
    //         'accept' => 'application/json',
    //         'authorization' => 'Bearer ' . $token
    //     ];
    //     $payload = [
    //         'users' => $sisense_user_id,
    //     ];

    //     $response = $client->get('api/v1/authentication/admin/logout', [
    //         'headers' => $headers,
    //         'query' => $payload,
    //         'verify' => config('SISENSE_VERIFY', true),
    //     ]);

    //     return json_decode($response->getBody()->getContents());
    // }
}

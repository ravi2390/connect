<?php

namespace App\Http\Controllers\Aggregates\Individual;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\Members;
use GuzzleHttp\Client;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberController extends Controller
{
    public function __invoke($id)
    {
        return JsonResource::collection(Members::query()
            ->where('members.individual_guid', $id)
            ->get(['members.name']));
    }

    public function sendEmail($id): JsonResponse
    {
        $baseUrl = config('services.membership.domain');
        $endpoint = config('services.membership.endpoint');
        $key = config('services.membership.api_key');

        $url = "$baseUrl/$endpoint";

        $body['memberId'] = $id;

        $body['programId'] = config('services.membership.program_id');

        $client = new Client([
            'headers' => [ 'Content-Type' => 'application/json', 'x-api-key' => $key ]
        ]);
        $response = $client->post($url, ['body' => json_encode($body)]);

        $code = $response->getStatusCode();

        if ($code==200) {
            $result = json_decode($response->getBody()->getContents());
            $success = $result->isSuccess;
            if ($success) {
                return response()->json([
                    'message' => 'Email sent successfully!',
                ]);
            } else {
                return response()->json([
                    'message' => 'Oops something went wrong',
                ]);
            }
        } else {
            return response()->json([
                'message' => 'Oops something went wrong',
            ]);
        }
    }
}

<?php

namespace Aft\MemberForms\Http\Controllers\Captcha;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ReCaptchaController extends Controller
{
    public function getInfo()
    {
        $data = (object) [];
        $data->enabled = config('services.google_recaptcha.enabled', false);
        $data->key = base64_encode((string) config('services.google_recaptcha.key'));

        return json_encode($data);
    }

    public function createAssessment(Request $request)
    {
        if (config('services.google_recaptcha.enabled', false)
            && ! empty(config('services.google_recaptcha.key'))
            && ! empty(config('services.google_recaptcha.apiKey'))) {
            $integrationEndPoint = 'https://recaptchaenterprise.googleapis.com/v1/projects/'
                .config('services.google_recaptcha.projectId').
                '/assessments?key='.config('services.google_recaptcha.apiKey');

            $payload = json_decode('{
                        "event": {
                            "token": null,
                            "expectedAction": null,
                            "siteKey": null
                        }
                    }');

            $payload->event->token = $request->get('token');
            $payload->event->expectedAction = $request->get('action');
            $payload->event->siteKey = config('services.google_recaptcha.key');

            $client = new Client();
            $response = $client->request(
                'POST',
                $integrationEndPoint,
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                    ],
                    'body' => json_encode($payload),
                ]
            );

            return $response->getBody();
        }
    }
}

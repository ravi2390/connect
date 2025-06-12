<?php

namespace Aft\Sisense\Controllers;

use Aft\Sisense\Sisense;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;

class SisenseController extends Controller
{
    public function __construct(protected \Illuminate\Http\Request $request)
    {
    }

    /**
     * Callback for sisense connect reports page.
     */
    public function reports()
    {

        // Create / update the user in sisense before displaying the reports. Add data security restriction to all the sisense connect reports.
        $this->createUser();

        // Creating JWT token using PHP Firebase JWT library.
        $sisense = new sisense();
        $jwt = $sisense->createToken();

        $request = $this->request;

        $report = $request->get('report');

        $reportURL = '';

        switch ($report) {
            case 'unit':
                $reportURL = 'https://connectreports.aft.org:8081/jwt?jwt='.$jwt.'&return_to=https://connectreports.aft.org:8081/app/main#/dashboards/5da87426772c1a124456fd91/?h=false';
                break;
            case 'addDrop':
                $reportURL = 'https://connectreports.aft.org:8081/jwt?jwt='.$jwt.'&return_to=https://connectreports.aft.org:8081/app/main#/dashboards/5e30b6e5ff4ef124c8cde12a/?h=false';
                break;
            case 'officer':
                $reportURL = 'https://connectreports.aft.org:8081/jwt?jwt='.$jwt.'&return_to=https://connectreports.aft.org:8081/app/main#/dashboards/5ddd71b4a66a1f120c9e1da4/?h=false';
                break;
            case 'assessment':
                $reportURL = 'https://connectreports.aft.org:8081/jwt?jwt='.$jwt.'&return_to=https://connectreports.aft.org:8081/app/main#/dashboards/5df7af4ea66a1f120c9f0839/?h=false';
                break;
            case 'cope':
                $reportURL = 'https://connectreports.aft.org:8081/jwt?jwt='.$jwt.'&return_to=https://connectreports.aft.org:8081/app/main#/dashboards/5f5fb061bf5d262144f60320/?h=false';
                break;
        }

        $response = [];
        $response['status'] = 'success';
        $response['reportURL'] = $reportURL;

        return json_encode($response);
    }

    public function createUser(): void
    {

        $sisense = new sisense();
        $token_data = $sisense->getAuthToken();
        $token = $token_data->access_token;
        $request = $this->request;
        $user = $request->user();
        $gdata = [];
        $groups = $user->getUserAuthorizationList(new Affiliate());
        $affiliateIDs = [];
        foreach ($groups as $group) {
            if ($group['entity_type'] == Affiliate::class) {
                if ($group['entity_id'] != '*') {
                    $affiliateIDs[] = $group['entity_id'];
                }
            }
        }

        if ($affiliateIDs) {
            $affiliateNumbers = Affiliate::whereIn('AffiliateId', $affiliateIDs)->get('AffiliateNumber');
            foreach ($affiliateNumbers as $affiliateNumber) {
                $gdata[] = $affiliateNumber->AffiliateNumber;
            }
        }

        $result = $sisense->newUser($user, $token);

        $user_id = null;
        try {
            if ($result->code == 201) {
                $user_id = $result->_id;
            } elseif ($result->code == 400) {
                $sisense_user = $sisense->getUser($user, $token);
                $user_id = $sisense_user[0]->_id;
            }
        } catch (\Exception) {
            //error
        }

        //variable_set('sisense_user_id', $user_id);

        if ($user_id) {
            //get reports
            $res_meta_data = $sisense->getReports($token);

            foreach ($res_meta_data as $rmd) {
                $report_title = $rmd->title;
                //get report details
                $rft = $sisense->getReportDetails($token, $report_title);
                if (! empty($rft)) {
                    $table_name = $rft[0]->table;
                    //allow report access
                    $response = $sisense->allowAccess($gdata, $user_id, $report_title, $table_name, $token);
                }
            }
        }
    }
}

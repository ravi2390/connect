<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use Aft\MemberForms\Models\Form;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;

class MfpFormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function index(Request $request)
    {
        $query = Form::with('Affiliate:AffiliateId,AffiliateNumber,AffiliateName', 'FormSubmissions', 'Template', 'CreatedBy', 'UpdatedBy');

        $forms = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($forms);
    }

    public function search(Request $request)
    {
        $requestData = $request->all();
        $query = Form::with(['Affiliate:AffiliateId,AffiliateNumber,AffiliateName', 'FormSubmissions', 'Template', 'CreatedBy', 'UpdatedBy']);
        $affiliateIds = [];
        if (($requestData['affiliateNumber'] && $requestData['affiliateNumber'] != '') || ($requestData['stateFed'] && $requestData['stateFed'] != '')) {
            $affiliateIdQuery = Affiliate::whereNull('DeletedAt');
            if ($requestData['affiliateNumber'] && $requestData['affiliateNumber'] != '') {
                $affiliateNumberSearch = '%'.preg_replace('/\s+/', '%', (string) $requestData['affiliateNumber']).'%';
                $affiliateIdQuery->where('AffiliateNumber', 'like', $affiliateNumberSearch);
            }
            if ($requestData['stateFed'] && $requestData['stateFed'] != '') {
                $affiliateIdQuery->where('ParentAffiliateId', $requestData['stateFed']);
            }
            $affiliateIdResult = $affiliateIdQuery->get(['AffiliateId']);
            foreach ($affiliateIdResult as $aff) {
                $affiliateIds[] = $aff->AffiliateId;
            }
            $query->whereIn('affiliate_id', $affiliateIds);
        } else {
            $query = Form::with(['Affiliate:AffiliateId,AffiliateNumber,AffiliateName', 'FormSubmissions', 'Template', 'CreatedBy', 'UpdatedBy']);
        }

        if ($requestData['formType'] && $requestData['formType'] != '') {
            $query->where('form_template_id', $requestData['formType']);
        }
        if ($requestData['status']) {
            if ($requestData['status'] == 2) {
                $query->where('archived', true);
            } elseif ($requestData['status'] == 1) {
                $query->where('archived', false);
            }
        }

        $forms = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($forms);
    }
}

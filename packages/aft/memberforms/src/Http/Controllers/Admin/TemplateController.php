<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\MemberForms\Models\Template;
use App\Http\Controllers\Controller;
use App\Models\MemberFormAssign;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    private array $templateFields = [
        'id',
        'system_name',
        'display_name',
        'description',
        'parameters',
        'sources',
        'destinations',
        'fields',
        'optional_fields',
        'thankyou_fields',
        'confirmation_email_fields',
    ];

    public function index(Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
        ]);
        $memberFormAssign = MemberFormAssign::where('affiliate_id', $data['affiliateId'])->first();
        $memberFormTypes = [];
        if ($memberFormAssign) {
            $collectionTypes = json_decode($memberFormAssign->type);
            foreach ($collectionTypes as $collectionType) {
                // if($collectionType === '1'){
                //     $memberFormTypes[] = 'paymentProcessingDues';
                // }
                if ($collectionType === '2') {
                    $memberFormTypes[] = 'paymentProcessingDuesAndCope';
                }
                // if($collectionType === '3'){
                //     $memberFormTypes[] = 'default';
                // }
                if ($collectionType === '4') {
                    $memberFormTypes[] = 'defaultCope';
                }
                if ($collectionType === '5') {
                    $memberFormTypes[] = 'cope';
                }
                if ($collectionType === '6') {
                    $memberFormTypes[] = 'paymentProcessingCope';
                }
                if ($collectionType === '8') {
                    $memberFormTypes[] = 'stateFedRecurringCope';
                }
                if ($collectionType === '9') {
                    $memberFormTypes[] = 'paymentProcessingRetireeOnlyDuesAndCope';
                }
                if ($collectionType === '101') {
                    // $memberFormTypes = array('paymentProcessingDues','paymentProcessingDuesAndCope','paymentProcessingCope');
                    $memberFormTypes = ['paymentProcessingDuesAndCope', 'paymentProcessingCope'];
                }
                if ($collectionType === '102') {
                    // $memberFormTypes = array('default','defaultCope','cope');
                    $memberFormTypes = ['defaultCope', 'cope'];
                }
                if ($collectionType === '100') {
                    // $memberFormTypes = array('default','defaultCope','cope','paymentProcessingDues','paymentProcessingDuesAndCope','paymentProcessingCope','stateFedRecurringCope');
                    $memberFormTypes = ['defaultCope', 'cope', 'paymentProcessingDuesAndCope', 'paymentProcessingCope', 'stateFedRecurringCope', 'paymentProcessingRetireeOnlyDuesAndCope'];
                }
            }
            $templates = Template::select($this->templateFields)
                ->whereIn('system_name', $memberFormTypes)
                ->get();
        } else {
            $templates = [];
        }

        return $templates;
    }

    public function memberFormAssign($id)
    {
        return MemberFormAssign::where('affiliate_id', $id)->first();
    }

    public function getHasEdues($id): JsonResponse
    {
        $hasEdues = false;
        $collectionTypes = [];
        $memberFormAssign = MemberFormAssign::where('affiliate_id', $id)->first();
        if ($memberFormAssign) {
            $collectionTypes = json_decode($memberFormAssign->type);
            $eduesTypes = ['100', '2', '6', '8'];
            if (! empty(array_intersect($collectionTypes, $eduesTypes))) {
                $hasEdues = true;
            }
        }

        return new JsonResponse([
            'status' => 'success',
            'message' => 'ok',
            'hasEdues' => $hasEdues,
            'types' => $collectionTypes,
        ], 200);
    }

    public function show($id)
    {
        return Template::select($this->templateFields)->find($id);
    }

    public function getTemplates()
    {
        $memberFormTypes = ['paymentProcessingDuesAndCope', 'paymentProcessingCope', 'dataForm', 'stateFedRecurringCope'];
        return Template::select(['id', 'system_name', 'display_name'])
                ->whereIn('system_name', $memberFormTypes)->orderBy('id', 'asc')
                ->get()->toArray();
    }
}

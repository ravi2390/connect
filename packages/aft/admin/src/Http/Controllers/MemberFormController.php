<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\MemberFormAssign;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MemberFormController extends Controller
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
        return MemberFormAssign::with('affiliates')->orderBy('updated_at', 'desc')
            ->paginate();
    }

    public function search(Request $request)
    {
        $requestData = $request->all();
        $query = MemberFormAssign::with('affiliates');
        $affiliateIds = [];
        if ($requestData['affiliateNumber'] && $requestData['affiliateNumber'] != '') {
            $affiliateNumberSearch = '%'.preg_replace('/\s+/', '%', (string) $requestData['affiliateNumber']).'%';
            $affiliateIdQuery = Affiliate::where('AffiliateNumber', 'like', $affiliateNumberSearch)->get(['AffiliateId']);
            foreach ($affiliateIdQuery as $aff) {
                $affiliateIds[] = $aff->AffiliateId;
            }
            $query->whereIn('affiliate_id', $affiliateIds);
        }

        if ($requestData['affiliateName'] && $requestData['affiliateName'] != '') {
            $affiliateNumberSearch = '%'.preg_replace('/\s+/', '%', (string) $requestData['affiliateName']).'%';
            $affiliateIdQuery = Affiliate::where('AffiliateName', 'like', $affiliateNumberSearch)->get(['AffiliateId']);
            foreach ($affiliateIdQuery as $aff) {
                $affiliateIds[] = $aff->AffiliateId;
            }
            $query->whereIn('affiliate_id', $affiliateIds);
        }

        if ($requestData['formType'] && $requestData['formType'] != '') {
            $query->where(function ($query) use ($requestData): void {
                foreach ($requestData['formType'] as $value) {
                    $query->orWhereJsonContains('type', $value);
                }
            });

            //$query->whereJsonContains('type', $requestData['formType']);
        }

        $forms = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($forms);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'affiliate_id' => ['required', Rule::unique('member_form_assign')->whereNull('deleted_at')],
            'type' => 'required',
        ]);

        $collectionTypes = $data['type'];
        $model = new MemberFormAssign();

        $model->affiliate_id = $data['affiliate_id'];
        if (in_array('9', $collectionTypes)) {
            $collectionTypes = ['9'];
        }
        $model->type = json_encode($collectionTypes);
        $model->save();

        return MemberFormAssign::find($model->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $model = MemberFormAssign::find($id);
        $data = $request->all();
        $model->affiliate_id = $data['affiliate_id'];
        $collectionTypes = $data['type'];
        if (in_array('9', $collectionTypes)) {
            $collectionTypes = ['9'];
        }
        $model->type = json_encode($collectionTypes);
        $model->save();

        return MemberFormAssign::find($id);
    }

    public function show($id)
    {
        return MemberFormAssign::with('affiliates')->where('id', $id)->first();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = MemberFormAssign::find($id);
        $model->delete();

        return response([
            'success' => true,
            'contentblock' => $id,
        ]);
    }
}

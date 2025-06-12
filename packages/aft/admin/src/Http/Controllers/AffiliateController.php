<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AffiliateController extends Controller
{
    public function search(Request $request)
    {
        $data = Validator::make($request->all(), [
            'search' => 'required|max:255',
        ])->validate();

        $search = '%'.preg_replace('/\s+/', '%', (string) $data['search']).'%';

        $affiliates = Affiliate::where('AffiliateName', 'like', $search)
            ->orWhere('AffiliateNumber', 'like', $search)
            ->paginate(10);

        return AbstractResource::collection($affiliates);
    }

    public function getAffiliateChildCount(Request $request)
    {
        $data = Validator::make($request->all(), [
            'parentId' => 'required|integer',
        ])->validate();

        return Affiliate::where('ParentAffiliateId', '=', $data['parentId'])->count();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function index()
    {
        $affiliates = Affiliate::paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($affiliates);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response(Affiliate::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return response(['no']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): void
    {
        //
    }

    public function options(): array
    {
        return [];
    }
}

<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\MemberForms\Models\UrlRedirect;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class UrlRedirectController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'affiliateName' => 'required|string',
        ]);

        return UrlRedirect::where('affiliate_name', $data['affiliateName'])->with(['Form'])->get();
    }

    public function getAllUrls()
    {
        return UrlRedirect::get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $validationArray = [
            'customUrl' => 'string|required',
            'affiliateName' => 'string|required',
            'affiliateNumber' => 'string|required',
            'formId' => 'integer|required|unique:memberforms_url_redirects,form_id',
        ];
        $validationMessages = [
            'unique' => 'Custom URL already exists',
        ];
        $data = $request->validate($validationArray, $validationMessages);
        $urlRedirects = UrlRedirect::where('affiliate_number', $data['affiliateNumber'])->where('custom_url', $data['customUrl'])->get();
        if (count($urlRedirects) > 0) {
            return response(['message' => 'The given data was invalid.', 'errors' => ['customUrl' => ['Custom URL already exists']]]);
        }
        $finalFields = [
            'custom_url' => $data['customUrl'],
            'affiliate_name' => $data['affiliateName'],
            'affiliate_number' => $data['affiliateNumber'],
            'form_id' => $data['formId'],
            'CreatedAt' => now(),
            'updatedAt' => now(),
        ];
        $url_redirect = new UrlRedirect();
        $url_redirect->fill($finalFields);
        $url_redirect->save();

        return ['success'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id): void
    {
        //
    }

    public function delete($id): array
    {
        $urlRedirectsCount = UrlRedirect::where('id', $id)->count();
        if ($urlRedirectsCount !== 0) {
            $model = UrlRedirect::find($id);
            $model->delete();
        }

        return ['success'];
    }

    public function generateQrCode(Request $request)
    {
        $url = $request->url;

        return QrCode::size(220)
                ->generate($url);
    }

    public function downloadQrCode(Request $request)
    {
        $url = $request->url;

        $image = QrCode::size(300)
            ->generate($url);

        return response($image)->header('Content-type', 'image/svg');
    }
}

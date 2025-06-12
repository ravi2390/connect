<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\AffiliateFileUploadLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MembershipFileUploadController extends Controller
{
    public function uploadFile(Request $request): void
    {
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $uniqueFileName = $request->input('affiliateId').'-'.Carbon::now()->timestamp.'-'.$request->file('file')->getClientOriginalName();
            $request->file('file')->move(config('membership.filepath'), $uniqueFileName);

            $model = new AffiliateFileUploadLog();
            $model->fill(
                [
                    'AffiliateId' => $request->input('affiliateId'),
                    'FileName' => $uniqueFileName,
                    'FileType' => $request->file('file')->getClientOriginalExtension(),
                    'FileSize' => $request->file('file')->getSize(),
                    'FileDescription' => $request->input('fileDescription'),
                    'FileUploadBy' => Auth::user()->getAuthIdentifier(),
                    'FileUploadDate' => Carbon::now()->toDateTimeString(),
                    'CreatedBy' => Auth::user()->getAuthIdentifier(),
                    'CreatedAt' => Carbon::now()->toDateTimeString(),
                    'UpdatedBy' => Auth::user()->getAuthIdentifier(),
                    'UpdatedAt' => Carbon::now()->toDateTimeString(),
                ]
            )->save();
        }
    }
}

<?php

namespace App\Http\Controllers\FileAttachment;

use App\Http\Controllers\Controller;
use App\Models\FileAttachments;
use App\Models\FileAttachmentTypes;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FileAttachmentController extends Controller
{
    public function __construct(private readonly Request $request)
    {
    }

    public function uploadFile(Request $request): void
    {
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $uniqueFileName = $this->request->query('affiliates').'-'.Carbon::now()->timestamp.'-'.$request->file('file')->getClientOriginalName();
            $request->file('file')->move(config('fileattachment.path'), $uniqueFileName);

            $fileAttachmentTypeId = FileAttachmentTypes::where('FileAttachmentType', $request->input('fileAttachmentType'))
                ->first()->id;
            $model = new FileAttachments();
            $model->fill(
                [
                    'AffiliateId' => $request->query('affiliates'),
                    'FileAttachmentTypeId' => $fileAttachmentTypeId,
                    'EntityId' => $request->input('entityId'),
                    'UniqueFileName' => $uniqueFileName,
                    'OriginalFileName' => $request->file('file')->getClientOriginalName(),
                    'Description' => $request->input('description'),
                    'FileSize' => $request->file('file')->getSize(),
                    'CreatedBy' => Auth::user()->getAuthIdentifier(),
                    'CreatedAt' => Carbon::now()->toDateTimeString(),
                    'UpdatedBy' => Auth::user()->getAuthIdentifier(),
                    'UpdatedAt' => Carbon::now()->toDateTimeString(),
                ]
            )->save();
        }
    }

    public function downloadFile($id): StreamedResponse
    {
        $fileRecord = FileAttachments::where('id', $id)
            ->where('AffiliateId', $this->request->query('affiliates'))
            ->first();
        $filePath = config('fileattachment.path').$fileRecord->UniqueFileName;
        $fileName = $fileRecord->OriginalFileName;

        return new StreamedResponse(
            function () use ($filePath): void {
                if ($file = fopen($filePath, 'rb')) {
                    while (! feof($file) && connection_status() == 0) {
                        echo fread($file, 1024 * 8);
                        flush();
                    }
                    fclose($file);
                }
            },
            200,
            [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="'.$fileName.'"',
            ]
        );
    }

    public function getFiles(Request $request)
    {
        return FileAttachments::query()
            ->join('file_attachment_types', 'file_attachment_types.id', '=', 'FileAttachmentTypeId')
            ->where('AffiliateId', $request->query('affiliates'))
            ->where('FileAttachmentType', $request->input('fileAttachmentType'))
            ->where('EntityId', $request->input('entityId'))
            ->get('file_attachments.*');
    }
}

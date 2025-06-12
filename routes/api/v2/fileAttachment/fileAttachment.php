<?php

use App\Http\Controllers\FileAttachment;
use Illuminate\Support\Facades\Route;

Route::post('fileAttachment/uploadFile', [FileAttachment\FileAttachmentController::class, 'uploadFile']);
Route::get('fileAttachment/downloadFile/{id}', [FileAttachment\FileAttachmentController::class, 'downloadFile']);
Route::post('fileAttachment/getFiles', [FileAttachment\FileAttachmentController::class, 'getFiles']);

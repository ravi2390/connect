<?php

namespace App\Http\Controllers\Aggregates\Committee;

use App\Http\Controllers\Controller;
use App\Models\CommitteeMemberType;
use Illuminate\Http\Resources\Json\JsonResource;

class CommitteeMemberTypeListController extends Controller
{
    public function __invoke()
    {
        return JsonResource::collection(CommitteeMemberType::query()
            ->get(['CommitteeMemberTypeId', 'CommitteeMemberTypeName']));
    }
}

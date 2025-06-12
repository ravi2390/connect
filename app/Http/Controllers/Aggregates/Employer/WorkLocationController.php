<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\WorkLocation;
use App\Models\WorkLocationType;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkLocationController extends Controller
{
    public function __invoke(Employer $employer)
    {
        $workLocations = WorkLocation::query()->where('WorkLocation.EmployerId', $employer->getKey())->orderBy('WorkLocation.WorkLocationName', 'ASC')->get();
        $workLocationTypes = WorkLocationType::query()->where('EmployerTypeId', $employer->EmployerTypeId)->orderBy('HierachicalOrder', 'ASC')->get();

        $workLocationMap = [];

        /** @var WorkLocationType $workLocationType */
        foreach ($workLocationTypes as $workLocationType) {
            $workLocationMap[$workLocationType->WorkLocationTypeName] = \App\Http\Resources\WorkLocation::collection($workLocations->filter(static fn(WorkLocation $workLocation): bool => $workLocation->WorkLocationType->getKey() === $workLocationType->getKey()));
        }

        return JsonResource::collection(
            $workLocationMap
        );
    }
}

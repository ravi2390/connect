<?php

namespace App\Http\Controllers\Aggregates\Employer;

use App\Http\Controllers\Controller;
use App\Models\Employer;
use App\Models\WorkStructure;
use App\Models\WorkStructureType;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkStructureController extends Controller
{
    public function __invoke(Employer $employer)
    {
        $workStructures = WorkStructure::query()->where('WorkStructure.EmployerId', $employer->getKey())->orderBy('WorkStructure.WorkStructureName', 'ASC')->get();
        $workStructureTypes = WorkStructureType::query()->where('EmployerTypeId', $employer->EmployerTypeId)->orderBy('HierachicalOrder', 'ASC')->get();

        $workStructureMap = [];

        /** @var WorkStructureType $workStructureType */
        foreach ($workStructureTypes as $workStructureType) {
            $workStructureMap[$workStructureType->WorkStructureTypeName] = \App\Http\Resources\WorkStructure::collection($workStructures->filter(static fn(WorkStructure $workStructure): bool => $workStructure->WorkStructureType->getKey() === $workStructureType->getKey()));
        }

        return JsonResource::collection(
            $workStructureMap
        );
    }
}

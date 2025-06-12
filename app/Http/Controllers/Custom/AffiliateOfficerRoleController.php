<?php

namespace App\Http\Controllers\Custom;

use App\Http\Controllers\AbstractCrudController;
use App\Http\Controllers\Filter\ParsesQuery;
use App\Http\Resources\AffiliateOfficerRole as AffiliateOfficerRoleResource;
use App\Models\AffiliateOfficerRole;
use App\Models\IndividualAffiliate;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\QueryBuilder\QueryBuilder;

class AffiliateOfficerRoleController extends AbstractCrudController
{
    use ParsesQuery;

    #[\Override]
    public function one($id): JsonResource
    {
        $queryBuilder = QueryBuilder::for(IndividualAffiliate::class)->select(['AffiliateOfficerRole.AffiliateOfficerRoleName', 'Individual.FirstName', 'Individual.LastName', 'Individual.IndividualId AS Id', 'AffiliateOfficer.IsElected', 'AffiliateOfficer.TermStartDate', 'AffiliateOfficer.TermEndDate', 'AffiliateOfficer.AffiliateOfficerId', 'AffiliateOfficerRole.*'])
            ->join('Individual', 'Individual.IndividualId', '=', 'IndividualAffiliate.IndividualId')
            ->join('AffiliateOfficer', function ($joinAffiliateOfficer): void {
                $joinAffiliateOfficer->on('AffiliateOfficer.IndividualId', '=', 'IndividualAffiliate.IndividualId');
                $joinAffiliateOfficer->on('AffiliateOfficer.AffiliateId', '=', 'IndividualAffiliate.AffiliateId');
            })
            ->whereNull('AffiliateOfficer.DeletedAt')
            ->join('AffiliateOfficerRole', 'AffiliateOfficerRole.AffiliateOfficerRoleId', '=', 'AffiliateOfficer.AffiliateOfficerRoleId')
            ->whereNull('AffiliateOfficerRole.DeletedAt')
            ->join('OfficerRoleTitle', 'OfficerRoleTitle.OfficerRoleTitleId', '=', 'AffiliateOfficerRole.OfficerRoleTitleId')
            ->whereNull('OfficerRoleTitle.DeletedAt')
            ->whereNull('IndividualAffiliate.EndDate')
            ->where('IndividualAffiliate.AffiliateId', $id)
            ->orderBy('AffiliateOfficer.TermEndDate', 'desc')
            ->orderBy('Individual.LastName', 'asc');

        $data = $queryBuilder->get();
        $sortedData = [];
        $blankEndDate = [];
        $nonBlankEndDate = [];
        $finalData = [];

        foreach ($data as $dataSet) {
            if ($dataSet['TermEndDate']) {
                $nonBlankEndDate[] = $dataSet;
            } else {
                $blankEndDate[] = $dataSet;
            }
        }

        $sortOrder = 1;
        foreach ($blankEndDate as $dataSet) {
            $dataSet['sortOrder'] = $sortOrder;
            $finalData[] = $dataSet;
            $sortOrder++;
        }

        foreach ($nonBlankEndDate as $dataSet) {
            $dataSet['sortOrder'] = $sortOrder;
            $finalData[] = $dataSet;
            $sortOrder++;
        }

        foreach ($finalData as $dataSet) {
            if ($dataSet['TermStartDate']) {
                $dataSet['TermStartDate'] = $this->asDateTime($dataSet['TermStartDate']);
            }
            if ($dataSet['TermEndDate']) {
                $dataSet['TermEndDate'] = $this->asDateTime($dataSet['TermEndDate']);
            }

            if (! isset($sortedData[$dataSet['AffiliateOfficerRoleName']])) {
                $sortedData[$dataSet['AffiliateOfficerRoleName']] = [];
            }

            $sortedData[$dataSet['AffiliateOfficerRoleName']][] = $dataSet;
        }

        $other = QueryBuilder::for(AffiliateOfficerRole::class)
            ->select(['AffiliateOfficerRole.AffiliateOfficerRoleId', 'AffiliateOfficerRole.AffiliateOfficerRoleName', 'AffiliateOfficerRole.AffiliateId', 'OfficerRoleTitle.OfficerRoleTitleName', 'OfficerRoleTitle.DisplayOrder', 'AffiliateOfficerRole.OfficerRoleTitleId'])
            ->join('OfficerRoleTitle', 'OfficerRoleTitle.OfficerRoleTitleId', '=', 'AffiliateOfficerRole.OfficerRoleTitleId')
            ->where('AffiliateOfficerRole.AffiliateId', $id)
            ->orderBy('OfficerRoleTitle.DisplayOrder');

        $response = new JsonResource($sortedData);
        $additionalData = ['roles' => $other->get()->all()];

        return $response->additional($additionalData);
    }

    #[\Override]
    protected function getModel(): string
    {
        return AffiliateOfficerRole::class;
    }

    #[\Override]
    protected function createResource($resource): JsonResource
    {
        return new AffiliateOfficerRoleResource($resource);
    }

    #[\Override]
    protected function createResourceCollection($resource): AnonymousResourceCollection
    {
        return AffiliateOfficerRoleResource::collection($resource);
    }

    private function inDataset(array $data, $dataset): bool
    {
        foreach ($data as $existingDataset) {
            if ($existingDataset->Id === $dataset->Id) {
                return true;
            }
        }

        return false;
    }

    protected function asDateTime($value): string
    {
        $value = preg_replace('/\.\d+$/', '', (string) $value);

        return Carbon::parse($value)->format('Y-m-d');
    }
}

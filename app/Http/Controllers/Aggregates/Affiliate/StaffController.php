<?php

namespace App\Http\Controllers\Aggregates\Affiliate;

use App\Http\Controllers\BaseAggregateController;
use App\Models\AffiliateStaff;
use Spatie\QueryBuilder\QueryBuilder;

class StaffController extends BaseAggregateController
{
    /**
     * @var array
     */
    protected $withRelations = ['Individual', 'StaffDepartment', 'Individual.individualPhonesOrdered', 'Individual.individualEmailsOrdered'];

    protected $class = \App\Http\Resources\AffiliateStaff::class;

    protected $returnCollection = true;

    /**
     * @return array
     */
    public function getData($id): array
    {
        $query = QueryBuilder::for(AffiliateStaff::query(), $this->request);

        $data = $query->where('AffiliateId', $id)
            ->join('Individual', 'Individual.IndividualId', '=', 'AffiliateStaff.IndividualId')
            ->orderBy('AffiliateStaff.TermEndDate', 'desc')
            ->orderBy('Individual.LastName')
            ->get();

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

        return $finalData;
    }
}

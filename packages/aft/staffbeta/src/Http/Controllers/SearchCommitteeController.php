<?php

namespace Aft\StaffBeta\Http\Controllers;

use Aft\StaffBeta\Models\Affiliate;
use Aft\StaffBeta\Models\AffiliateCommittee;
use Aft\StaffBeta\Models\Individual;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchCommitteeController extends Controller
{
    private array $individualHeaders = [
        'name' => ['label' => 'Name', 'source' => 'FullName'],
        'relationships' => ['label' => 'Membership', 'type' => 'Array', 'source' => 'IndividualAffiliates'],
        'officership' => ['label' => 'Officership', 'type' => 'Array', 'source' => 'AffiliateOfficership'],
        'phones' => ['label' => 'Phone Numbers', 'type' => 'Array', 'source' => 'IndividualPhones'],
        'emails' => ['label' => 'Email Addresses', 'type' => 'Array', 'source' => 'IndividualEmails'],
        'addresses' => ['label' => 'Mailing Addresses', 'type' => 'Array', 'source' => 'IndividualAddresses'],
    ];

    public function committees(Request $request)
    {
        $affiliateId = 1;

        return AffiliateCommittee::where('AffiliateId', '=', $affiliateId)
            ->orderBy('AffiliateCommitteeName')
            ->get();
    }

    public function options(Request $request): array
    {
        /*$stateFeds = Affiliate::where('AffiliateTypeId', '=', 2)
            ->where('IsAffiliateActive', '=', 1)
            ->where('IsAffiliateActive', '=', 1)
            ->where('AffiliateDesignationId', '!=', 4)
            ->select('AffiliateId', 'AffiliateName', 'AffiliateNumber')
            ->get();
        $stateFeds->prepend([
            'AffiliateId' => null,
            'AffiliateName' => 'State Fed (none selected)',
        ]);*/

        return [
            'options' => [
                'current_page' => 1,
                'per_page' => 15,
            ],
            'headers' => $this->individualHeaders,
        ];
    }

    private function validateSearch(Request $request)
    {
        $strVal = 'string|nullable|max:64';
        $data = $request->validate([
            'search.committeeid' => $strVal,
            'search.affiliate' => $strVal,
            'options.current_page' => 'required|integer',
            'options.per_page' => 'required|integer',
        ]);

        foreach ($data['search'] as &$find) {
            if ($find && is_string($find)) {
                $find = '%'.preg_replace('/\s+/', '%', $find).'%';
            }
        }

        return $data;
    }

    private function buildQuery(array $search)
    {
        $individuals = Individual::query();

        if ($search['affiliate']) {
            $individuals->whereHas('IndividualAffiliates.Affiliate', function ($query) use ($search): void {
                $query->where('AffiliateNumber', 'like', $search['affiliate'])
                    ->orWhere('AffiliateName', 'like', $search['affiliate'])
                    ->orWhere('AffiliateAcronym', 'like', $search['affiliate']);
            });
        }

        return $individuals;
    }

    public function search(Request $request)
    {
        $data = $this->validateSearch($request);
        $search = $data['search'];
        $options = $data['options'];
        $individuals = $this->buildQuery($search);

        return $individuals->paginate($options['per_page'], ['*'], 'page', $options['current_page']);
    }

    public function download(Request $request): array
    {
        $data = $this->validateSearch($request);
        $search = $data['search'];
        $this->buildQuery($search);

        return [];
    }
}

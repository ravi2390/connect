<?php

namespace Aft\StaffBeta\Http\Controllers;

use Aft\StaffBeta\Models\Affiliate;
use Aft\StaffBeta\Models\AffiliateOfficer;
use Aft\StaffBeta\Models\AffiliateStaff;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchAffiliateController extends Controller
{
    private array $affiliateHeaders = [
        ['title' => 'Affiliate Name', 'value' => 'affiliate', 'source' => 'AffiliateFullName'],
        ['title' => 'Phone Numbers', 'value' => 'phones', 'type' => 'First', 'source' => 'AffiliatePhonesOrdered'],
        ['title' => 'Email Addresses', 'value' => 'emails', 'type' => 'First', 'source' => 'AffiliateEmailsOrdered'],
        ['title' => 'Mailing Addresses', 'value' => 'addresses', 'type' => 'First', 'source' => 'AffiliateAddressesOrdered'],
    ];

    private array $officerHeaders = [
        ['title' => 'Role', 'value' => 'role', 'source' => 'AffiliateOfficerRole.AffiliateOfficerRoleName'],
        ['title' => 'Name', 'value' => 'name', 'source' => 'FullName'],
        ['title' => 'Phone Numbers', 'value' => 'phones', 'type' => 'Array', 'source' => 'Individual.IndividualPhones'],
        ['title' => 'Email Addresses', 'value' => 'emails', 'type' => 'Array', 'source' => 'Individual.IndividualEmails'],
        ['title' => 'Mailing Addresses', 'value' => 'addresses', 'type' => 'Array', 'source' => 'Individual.IndividualAddresses'],
    ];

    private array $staffHeaders = [
        ['title' => 'Title', 'value' => 'role', 'source' => 'StaffDepartment'],
        ['title' => 'Name', 'value' => 'name', 'source' => 'FullName'],
        ['title' => 'Phone Numbers', 'value' => 'phones', 'type' => 'Array', 'source' => 'Individual.IndividualPhones'],
        ['title' => 'Email Addresses', 'value' => 'emails', 'type' => 'Array', 'source' => 'Individual.IndividualEmails'],
        ['title' => 'Mailing Addresses', 'value' => 'addresses', 'type' => 'Array', 'source' => 'Individual.IndividualAddresses'],
    ];

    public function options(Request $request): array
    {
        $stateFeds = Affiliate::where('AffiliateTypeId', '=', 2)
            ->where('IsAffiliateActive', '=', 1)
            ->where('IsAffiliateActive', '=', 1)
            ->where('AffiliateDesignationId', '!=', 4)
            ->select('AffiliateId', 'AffiliateName', 'AffiliateNumber')
            ->orderBy('AffiliateName')
            ->get();
        $stateFeds->prepend([
            'AffiliateId' => null,
            'AffiliateName' => 'State Fed (none selected)',
        ]);

        return [
            'options' => [
                'current_page' => 1,
                'per_page' => 15,
            ],
            'headers' => $this->affiliateHeaders,
            'statefeds' => $stateFeds,
        ];
    }

    public function search(Request $request)
    {
        $strVal = 'string|nullable|max:64';
        $intVal = 'integer|nullable';
        $data = $request->validate([
            'search.affiliate' => $strVal,
            'search.parent' => $intVal,
            'search.city' => $strVal,
            'search.state' => $strVal,
            'search.zip' => $strVal,
            'options.current_page' => 'required|integer',
            'options.per_page' => 'required|integer',
        ]);

        $search = $data['search'];
        $options = $data['options'];
        foreach ($search as &$find) {
            if ($find && is_string($find)) {
                $find = '%'.preg_replace('/\s+/', '%', $find).'%';
            }
        }

        $affiliates = Affiliate::query();
        $affiliates->with('AffiliatePhonesOrdered');
        $affiliates->with('AffiliateEmailsOrdered');
        $affiliates->with('AffiliateAddressesOrdered');

        if ($search['affiliate']) {
            $affiliates->where(function ($query) use ($search): void {
                $query->where('AffiliateNumber', 'like', $search['affiliate'])
                    ->orWhere('AffiliateName', 'like', $search['affiliate'])
                    ->orWhere('AffiliateAcronym', 'like', $search['affiliate']);
            });
        }

        if ($search['parent']) {
            $affiliates->where('ParentAffiliateId', '=', $search['parent']);
        }

        if ($search['city']) {
            $affiliates->whereHas('AffiliateAddresses', function ($query) use ($search): void {
                $query->where('City', 'like', $search['city']);
            });
        }

        if ($search['state']) {
            $affiliates->whereHas('AffiliateAddresses.StateTerritory', function ($query) use ($search): void {
                $query->where('StateTerritoryName', 'like', $search['state'])
                    ->orWhere('StateTerritoryCode', 'like', $search['state']);
            });
        }

        if ($search['zip']) {
            $affiliates->whereHas('AffiliateAddresses', function ($query) use ($search): void {
                $query->where('PostalCode', 'like', $search['zip']);
            });
        }

        return $affiliates->paginate($options['per_page'], ['*'], 'page', $options['current_page']);
    }

    public function show($id)
    {
        $affiliate = Affiliate::query();

        $affiliate->with('AffiliatePerCapita');

        return $affiliate->find($id);
    }

    public function officerOptions(): array
    {
        return [
            'officerHeaders' => $this->officerHeaders,
        ];
    }

    public function officers($id)
    {
        $affiliateId = Affiliate::find($id)->AffiliateId;
        $officers = AffiliateOfficer::query();
        $officers->with('Individual');
        $officers->with(['Individual' => function ($query): void {
            $query->without('AffiliateOfficership');
        }]);
        $officers->without('Affiliate');
        $officers->where('AffiliateOfficer.AffiliateId', '=', $affiliateId);
        $officers->join('Individual', 'Individual.IndividualId', '=', 'AffiliateOfficer.IndividualId');
        $officers->join('AffiliateOfficerRole', 'AffiliateOfficerRole.AffiliateOfficerRoleId', '=', 'AffiliateOfficer.AffiliateOfficerRoleId');
        $officers->join('OfficerRoleTitle', 'OfficerRoleTitle.OfficerRoleTitleId', '=', 'AffiliateOfficerRole.OfficerRoleTitleId');
        $officers->whereNull('Individual.DeletedAt');
        $officers->whereNull('AffiliateOfficerRole.DeletedAt');
        $officers->whereNull('OfficerRoleTitle.DeletedAt');
        $officers->orderBy('DisplayOrder', 'asc')
            ->orderBy('LastName', 'asc');

        return $officers->paginate(9999);
    }

    public function staffOptions(): array
    {
        return [
            'staffHeaders' => $this->staffHeaders,
        ];
    }

    public function staff($id)
    {
        $affiliateId = Affiliate::find($id)->AffiliateId;
        $staff = AffiliateStaff::query();
        $staff->with('Individual');
        $staff->with(['Individual' => function ($query): void {
            $query->without('AffiliateOfficership');
        }]);
        $staff->without('Affiliate');
        $staff->where('AffiliateStaff.AffiliateId', '=', $affiliateId);
        $staff->join('Individual', 'Individual.IndividualId', '=', 'AffiliateStaff.IndividualId');
        $staff->whereNull('Individual.DeletedAt');
        $staff->whereNull('AffiliateStaff.DeletedAt');
        $staff->orderBy('LastName', 'asc');

        return $staff->paginate(9999);
    }
}

<?php

namespace Aft\StaffBeta\Http\Controllers;

use Aft\StaffBeta\Models\Affiliate;
use Aft\StaffBeta\Models\Individual;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchIndividualController extends Controller
{
    private array $individualHeaders = [
        ['title' => 'Name', 'value' => 'name', 'source' => 'FullName'],
        ['title' => 'Membership', 'value' => 'relationships', 'type' => 'Array', 'source' => 'IndividualAffiliatesAll'],
        ['title' => 'Officership', 'value' => 'officership', 'type' => 'Array', 'source' => 'AffiliateOfficership'],
        ['title' => 'Phone Numbers', 'value' => 'phones', 'type' => 'Array', 'source' => 'IndividualPhones'],
        ['title' => 'Email Addresses', 'value' => 'emails', 'type' => 'Array', 'source' => 'IndividualEmails'],
        ['title' => 'Mailing Addresses', 'value' => 'addresses', 'type' => 'Array', 'source' => 'IndividualAddresses'],
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
            'headers' => $this->individualHeaders,
            'statefeds' => $stateFeds,
        ];
    }

    private function validateSearch(Request $request)
    {
        $strVal = 'string|nullable|max:64';
        $emlVal = 'email|nullable|max:64';
        $intVal = 'integer|nullable';
        $data = $request->validate([
            'search.memberid' => $strVal,
            'search.affiliate' => $strVal,
            'search.parent' => $intVal,
            'search.phone' => $strVal,
            'search.city' => $strVal,
            'search.state' => $strVal,
            'search.nameFirst' => $strVal,
            'search.nameMiddle' => $strVal,
            'search.nameLast' => $strVal,
            'search.namePreferred' => $strVal,
            'search.email' => $emlVal,
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
        $individuals = Individual::query()->with('IndividualAffiliatesAll');

        if ($search['memberid']) {
            $individuals->whereHas('IndividualAffiliates.MemberIdMapping', function ($query) use ($search): void {
                $query->where('MemberId', 'like', $search['memberid']);
            });
        }

        if ($search['affiliate']) {
            $individuals->whereHas('IndividualAffiliates.Affiliate', function ($query) use ($search): void {
                $query->where('AffiliateNumber', 'like', $search['affiliate'])
                    ->orWhere('AffiliateName', 'like', $search['affiliate'])
                    ->orWhere('AffiliateAcronym', 'like', $search['affiliate']);
            });
        }

        if ($search['parent']) {
            $individuals->whereHas('IndividualAffiliates.Affiliate', function ($query) use ($search): void {
                $query->where('ParentAffiliateId', '=', $search['parent']);
            });
        }

        if ($search['phone']) {
            $search['phone'] = '%'.preg_replace('/[^0-9]/', '', (string) $search['phone']).'%';
            $individuals->whereHas('IndividualPhones', function ($query) use ($search): void {
                $query->where('PhoneNumber', 'like', $search['phone']);
            });
        }

        if ($search['city']) {
            $individuals->whereHas('IndividualAddresses', function ($query) use ($search): void {
                $query->where('City', 'like', $search['city']);
            });
        }

        if ($search['state']) {
            $individuals->whereHas('IndividualAddresses.StateTerritory', function ($query) use ($search): void {
                $query->where('StateTerritoryName', 'like', $search['state'])
                    ->orWhere('StateTerritoryCode', 'like', $search['state']);
            });
        }

        if ($search['email']) {
            $individuals->whereHas('IndividualEmails', function ($query) use ($search): void {
                $query->where('Email', 'like', $search['email']);
            });
        }

        if ($search['nameFirst']) {
            $individuals->where('FirstName', 'like', $search['nameFirst']);
        }
        if ($search['nameMiddle']) {
            $individuals->where('MiddleName', 'like', $search['nameMiddle']);
        }
        if ($search['nameLast']) {
            $individuals->where('LastName', 'like', $search['nameLast']);
        }
        if ($search['namePreferred']) {
            $individuals->where('PreferredName', 'like', $search['namePreferred']);
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

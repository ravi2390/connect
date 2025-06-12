<?php

namespace Aft\MemberForms\Http\Controllers\Admin;

use Aft\BillHighway\BillingTypes;
use Aft\MemberForms\Models\DuesMapping;
use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\LocalDuesCategory;
use App\Models\NationalPerCapita;
use App\Models\PaymentFrequency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class DuesMappingController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'affiliateId' => 'required|integer',
        ]);

        return DuesMapping::where('affiliate_id', $data['affiliateId'])
            ->whereNull('DeletedAt')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): array
    {
        $validationArray = [
            'selectedData' => 'required',
            'affiliateId' => 'integer|required',
        ];

        $data = $request->validate($validationArray);
        if ($data['selectedData'] && count($data['selectedData']) > 0) {
            $user = Auth::user();
            //Fetch Active Billing types from BillHighway for the affiliate
            $billHighwayGroupId = Affiliate::where('Affiliate.AffiliateId', $data['affiliateId'])
                ->get('BillHighwayGroupId')
                ->first()->BillHighwayGroupId;

            $bhActiveBillingTypes = array_filter(BillingTypes::GetRecurringBillingTypes($billHighwayGroupId)->Results, fn($billingType) => $billingType->IsActive);

            //Fetch existing Dues Category mapped with Billing Types
            $existingDuesMapping = DuesMapping::where('affiliate_id', $data['affiliateId'])
                ->whereNull('DeletedAt')
                ->get(['id', 'dues_category_id', 'bill_highway_type_id']);

            $currentDateTime = now();
            foreach ($data['selectedData'] as $localDuesId => $billingTypeId) {
                $duesMappingRecord = $existingDuesMapping->firstWhere('dues_category_id', $localDuesId);
                //If Dues Category Mapping doesn't exist for the given Dues Category Id of an affiliate
                if (! isset($duesMappingRecord)) {
                    $this->createDuesMapping($data['affiliateId'], $localDuesId, $billingTypeId, $bhActiveBillingTypes, $currentDateTime, $user);
                } else {
                    //If Dues Category Mapping exist for the given Dues Category Id of an affiliate and Billing Type Id is changed
                    if ($duesMappingRecord->bill_highway_type_id != $billingTypeId) {
                        $model = DuesMapping::find($duesMappingRecord->id);
                        $model->updated_at = $currentDateTime;
                        $model->updated_by = $user->id;
                        $model->DeletedAt = $currentDateTime;
                        $model->save();

                        $this->createDuesMapping($data['affiliateId'], $localDuesId, $billingTypeId, $bhActiveBillingTypes, $currentDateTime, $user);
                    }
                }
                /*
                DuesMapping::updateOrCreate(
                    ['dues_category_id'=>$localDuesId,'affiliate_id'=>$data['affiliateId']],
                    ['bill_highway_type_id'=>$billingTypeId,'created_at'=>now(),'updated_at'=>now()]
                );
                */
            }
        }

        return ['success'];
    }

    private function createDuesMapping(
        $affiliateId,
        $localDuesCategoryId,
        $billingTypeId,
        array $bhActiveBillingTypes,
        $currentDateTime,
        $user
    ): void {
        $model = new DuesMapping();
        $model->affiliate_id = $affiliateId;
        $model->dues_category_id = $localDuesCategoryId;
        $model->bill_highway_type_id = $billingTypeId;
        $model->created_at = $currentDateTime;
        $model->created_by = $user->id;

        if ($billingTypeId != 1) {
            $bhBillingType = array_filter($bhActiveBillingTypes, fn($item): bool => $item->BillingTypeID == $billingTypeId);
            if (isset($bhBillingType) && count($bhBillingType) > 0) {
                $billingType = current($bhBillingType);
                $model->billing_type_name = $billingType->BillingTypeName;
                $model->amount = $billingType->Amount;
                $model->frequency = $billingType->FrequencyDescription;
                $model->effective_date = empty($billingType->EffectiveDate) ? null : date('Y-m-d h:i:s', strtotime($billingType->EffectiveDate));
                $localDuesModel = LocalDuesCategory::find($localDuesCategoryId);
                $localDuesModel->LocalDuesAmount = $billingType->Amount;
                $localDuesModel->UpdatedAt = now();
                $localDuesModel->save();
            }
        }
        $model->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function createDuesCategory(Request $request): array
    {
        $validationArray = [
            'affiliateId' => 'required',
            'billingTypeId' => 'required',
            'LocalDuesCategoryName' => 'nullable',
            'NationalPerCapitaId' => 'nullable',
            'StatePerCapitaId' => 'nullable',
            'LocalDuesAmount' => 'nullable',
            'LocalDuesPercentage' => 'nullable',
            'PaymentFrequency' => 'nullable',
            'StartDate' => 'nullable',
            'EndDate' => 'nullable',
        ];

        $customMessages = [
            'billingTypeId.required' => 'The local dues category name field is required',
        ];

        $data = $request->validate($validationArray, $customMessages);
        $uniqueDuesMapping = DuesMapping::where('bill_highway_type_id', $data['billingTypeId'])
            ->whereNull('DeletedAt')
            ->first();

        if ($data['billingTypeId'] != 1 && $uniqueDuesMapping) {
            throw ValidationException::withMessages(['billingTypeId' => 'The local dues category name has already been taken.']);
        }

        if ($data['LocalDuesCategoryName']) {
            $PaymentFrequencyId = null;
            if ($data['PaymentFrequency']) {
                $PaymentFrequencyName = str_replace('-', '', $data['PaymentFrequency']);
                $PaymentFrequency = PaymentFrequency::where('PaymentFrequencyName', $PaymentFrequencyName)
                    ->get('PaymentFrequencyId')
                    ->first();
                $PaymentFrequencyId = $PaymentFrequency ? $PaymentFrequency->PaymentFrequencyId : null;
            }
            $data['StartDate'] = date('Y-m-d', strtotime((string) $data['StartDate']));

            $localDuesCategory = LocalDuesCategory::updateOrCreate(
                [
                    'AffiliateId' => $data['affiliateId'],
                    'LocalDuesCategoryName' => $data['LocalDuesCategoryName'],
                    'NationalPerCapitaId' => $data['NationalPerCapitaId'],
                    'StatePerCapitaId' => $data['StatePerCapitaId'],
                    'LocalDuesAmount' => $data['LocalDuesAmount'],
                    'LocalDuesPercentage' => $data['LocalDuesPercentage'],
                    'PaymentFrequencyId' => $PaymentFrequencyId,
                    'StartDate' => $data['StartDate'],
                    'EndDate' => $data['EndDate'],
                    'CreatedAt' => now(),
                    'UpdatedAt' => now(),
                ],
            );
            $currentDateTime = now();
            $user = Auth::user();

            $model = new DuesMapping();
            $model->affiliate_id = $data['affiliateId'];
            $model->dues_category_id = $localDuesCategory->LocalDuesCategoryId;
            $model->bill_highway_type_id = $data['billingTypeId'];
            $model->billing_type_name = $data['LocalDuesCategoryName'];
            $model->amount = $data['LocalDuesAmount'];
            $model->frequency = $data['PaymentFrequency'];
            $model->effective_date = empty($data['StartDate']) ? null : date('Y-m-d h:i:s', strtotime($data['StartDate']));
            $model->created_at = $currentDateTime;
            $model->created_by = $user->id;
            $model->save();
        }

        return ['success'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): void
    {
        //
    }

    public function getBillHighwayBillingTypes($affiliateId)
    {
        $billHighwayGroupId = Affiliate::withoutGlobalScopes()
            ->where('Affiliate.AffiliateId', $affiliateId)
            ->get('BillHighwayGroupId')
            ->first()
            ->BillHighwayGroupId;

        $activeBillingTypes = array_filter(BillingTypes::GetRecurringBillingTypes($billHighwayGroupId)->Results, fn($billingType) => $billingType->IsActive);

        return json_encode($activeBillingTypes);
    }

    public function getNationalPerCapita()
    {
        return NationalPerCapita::whereNotNull('DeletedAt')
            ->orderBy('DisplayOrder')
            ->get(['NationalPerCapitaId', 'NationalPerCapitaName', 'IsAgencyFee', 'DisplayOrder']);
    }
}

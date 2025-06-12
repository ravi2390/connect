<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\LocalJobClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LocalJobClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function index(Request $request)
    {
        $data = Validator::make($request->all(), [
            'filterLocalJobClassName' => 'nullable|string|max:255',
            'filterUnitName' => 'nullable|string|max:255',
            'filterAffiliateName' => 'nullable|string|max:255',
        ])->validate();

        $query = LocalJobClass::with('NationalJobClass', 'Unit', 'IndividualEmployer');

        $query->join('Unit', function ($query): void {
            $query->on('Unit.UnitId', '=', 'LocalJobClass.UnitId');
        })->join('LocalAgreement', function ($query): void {
            $query->on('LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId');
        })->join('Employer', function ($query): void {
            $query->on('Employer.EmployerId', '=', 'LocalAgreement.EmployerId');
        })->join('Chapter', function ($query): void {
            $query->on('Chapter.ChapterId', '=', 'Employer.ChapterId');
        })->join('Affiliate', function ($query): void {
            $query->on('Affiliate.AffiliateId', '=', 'Chapter.AffiliateId');
        });

        if (! empty($data['filterLocalJobClassName'])) {
            $searchJobClass = '%'.preg_replace('/\s+/', '%', (string) $data['filterLocalJobClassName']).'%';
            $query->where('localjobclassname', 'like', $searchJobClass);
        }
        if (! empty($data['filterUnitName'])) {
            $searchUnitName = '%'.preg_replace('/\s+/', '%', (string) $data['filterUnitName']).'%';
            $query->where('Unit.unitname', 'like', $searchUnitName);
        }
        if (! empty($data['filterAffiliateName'])) {
            $searchAffiliateName = '%'.preg_replace('/\s+/', '%', (string) $data['filterAffiliateName']).'%';
            $query->where(function ($query) use ($searchAffiliateName): void {
                $query->where('Affiliate.affiliatename', 'like', $searchAffiliateName)
                    ->orwhere('Affiliate.affiliatenumber', 'like', $searchAffiliateName);
            });
        }

        $localjobclasslist = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($localjobclasslist);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Exception
     */
    public function store(Request $request)
    {
        $data = Validator::make($request->all(), [
            'localJobClassName' => 'required|string|max:255',
            'localJobClassCode' => '',
            'nationalJobClass' => 'required|max:255',
            'unit' => 'required',

        ])->validate();

        $localjobclass = new LocalJobClass([
            'LocalJobClassName' => $data['localJobClassName'],
            'LocalJobClassCode' => $data['localJobClassCode'],
            'NationalJobClassId' => $data['nationalJobClass'],
            'UnitId' => $data['unit'],
            'IsStructural' => 0,
            'IsUnknown' => 0,
        ]);
        $localjobclass->save();

        return response([
            'success' => true,
            'localjobclassid' => $localjobclass->LocalJobClassId,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $localjobclass = LocalJobClass::with('NationalJobClass', 'Unit')->find($id);

        $query = LocalJobClass::with('NationalJobClass', 'Unit');
        $query->join('Unit', function ($query): void {
            $query->on('Unit.UnitId', '=', 'LocalJobClass.UnitId');
        })->join('LocalAgreement', function ($query): void {
            $query->on('LocalAgreement.LocalAgreementId', '=', 'Unit.LocalAgreementId');
        })->join('Employer', function ($query): void {
            $query->on('Employer.EmployerId', '=', 'LocalAgreement.EmployerId');
        })->join('Chapter', function ($query): void {
            $query->on('Chapter.ChapterId', '=', 'Employer.ChapterId');
        })->join('Affiliate', function ($query): void {
            $query->on('Affiliate.AffiliateId', '=', 'Chapter.AffiliateId');
        });

        $query->select('Affiliate.AffiliateName', 'Employer.EmployerName', 'Unit.UnitName');
        $data = $query->find($id);
        // echo var_dump($data['AffiliateName']);
        //exit();

        $localjobclass->AffiliateName = $data['AffiliateName'];
        $localjobclass->EmployerName = $data['EmployerName'];
        $localjobclass->UnitName = $data['UnitName'];

        return response($localjobclass);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Validator::make($request->all(), [
            'localJobClassId' => 'required',
            'localJobClassName' => 'required',
            'localJobClassCode' => '',
            'nationalJobClass' => 'required',
        ])->validate();

        if ($data['localJobClassId'] !== (int) $id) {
            throw new \Exception('localJobClass ID missmatch');
        }

        $localjobclass = LocalJobClass::find($id);

        $localjobclass->LocalJobClassName = $data['localJobClassName'];
        $localjobclass->LocalJobClassCode = $data['localJobClassCode'];
        $localjobclass->NationalJobClassId = $data['nationalJobClass'];

        $localjobclass->save();

        return response([
            'success' => true,
            'user' => $id,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = LocalJobClass::find($id);
        $model->delete();

        return response([
            'success' => true,
            'user' => $id,
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function getIndividualsByJobclass(Request $request, $id)
    {

        $query = Individual::query();

        $query->join('IndividualEmployer', function ($query) use ($id): void {
            $query->on('IndividualEmployer.IndividualId', '=', 'Individual.IndividualId')->where('localjobclassid', '=', $id);
        });

        $individuallist = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($individuallist);
    }
}

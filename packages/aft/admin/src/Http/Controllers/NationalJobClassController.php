<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use App\Http\Controllers\Controller;
use App\Models\NationalJobClass;
use Illuminate\Http\Request;

class NationalJobClassController extends Controller
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
        $query = NationalJobClass::query();

        $nationaljobclasslist = $query->paginate(AbstractResource::resolvePerPage());

        return AbstractResource::collection($nationaljobclasslist);
    }
}

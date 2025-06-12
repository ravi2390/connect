<?php

namespace Aft\Admin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ReleaseNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReleaseNoteController extends Controller
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
        return ReleaseNote::orderBy('order', 'desc')
            ->paginate();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function activeReleaseNotes(Request $request)
    {
        return ReleaseNote::where('is_active', 1)
            ->orderBy('order', 'desc')
            ->paginate();
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
            'title' => 'required',
            'description' => 'required',
            'is_active' => '',
            'order' => '',
        ])->validate();
        $releaseNoteModel = new ReleaseNote();
        $releaseNoteModel->title = $data['title'];
        $releaseNoteModel->description = $data['description'];
        $releaseNoteModel->is_active = $data['is_active'] ?? false;
        $releaseNoteModel->order = $data['order'] ?? 0;
        $releaseNoteModel->save();

        return ReleaseNote::find($releaseNoteModel->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ReleaseNote::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $releaseNoteModel = ReleaseNote::find($id);
        $data = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'is_active' => '',
            'order' => '',
        ])->validate();
        $releaseNoteModel->title = $data['title'];
        $releaseNoteModel->description = $data['description'];
        $releaseNoteModel->is_active = $data['is_active'];
        $releaseNoteModel->order = $data['order'] ?? 0;
        $releaseNoteModel->save();

        return ReleaseNote::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = ReleaseNote::find($id);
        $model->delete();

        return response([
            'success' => true,
            'releasenote' => $id,
        ]);
    }
}

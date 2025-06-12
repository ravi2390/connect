<?php

namespace Aft\Admin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentBlockController extends Controller
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
        return ContentBlock::orderBy('sticky', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     *
     * @throws \ReflectionException
     */
    public function activeContentBlocks(Request $request)
    {
        $application = $request->application;
        $position = $request->position;

        if ($application) {
            $query = ContentBlock::orderBy('sticky', 'desc')
                ->where('is_active', 1)
                ->where('application', $application);

            if ($position) {
                $query->where('position', $position);
            }

            $contentBlocks = $query->orderBy('updated_at', 'desc')->paginate();
        } else {
            $contentBlocks = ContentBlock::orderBy('sticky', 'desc')
                ->where('is_active', 1)
                ->orderBy('updated_at', 'desc')
                ->paginate();
        }

        return response()->json($contentBlocks);
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
        $model = new ContentBlock();
        $data = $request->all();
        $contentblock = $data['contentblock'];
        $model->title = $contentblock['title'];
        $model->content = $contentblock['content'];
        $model->is_active = $contentblock['is_active'];
        $model->application = $contentblock['application'];
        $model->priority = $contentblock['priority'];
        $model->position = $contentblock['position'];
        $model->type = 'announcement';
        $model->save();

        return ContentBlock::find($model->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ContentBlock::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $model = ContentBlock::find($id);
        $data = $request->all();
        $contentblock = $data['contentblock'];
        $model->title = $contentblock['title'];
        $model->content = $contentblock['content'];
        $model->is_active = $contentblock['is_active'];
        $model->application = $contentblock['application'];
        $model->priority = $contentblock['priority'];
        $model->save();

        return ContentBlock::find($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = ContentBlock::find($id);
        $model->delete();

        return response([
            'success' => true,
            'contentblock' => $id,
        ]);
    }

    public function uploadFile(Request $request)
    {
        if ($request->hasFile('upload') && $request->file('upload')->isValid()) {
            $file = $request->file('upload');
            $path = $file->store('content-block', 'public');
            return ['fileName' => $file->getClientOriginalName(), 'url' => Storage::url($path)];
        }
    }
}

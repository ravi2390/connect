<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use App\Models\ContentBlock;

class PublicController extends Controller
{
    public function index(): View
    {
        return view('public-home');
    }

    /**
     * Show the application dashboard.
     */
    public function show($id): View
    {
        $contentBlock = ContentBlock::findOrFail($id);
        if ((! $contentBlock->is_active) || ($contentBlock->application != 'public')) {
            abort(404);
        }

        return view('public')->with(['contentBlock' => $contentBlock]);
    }
}

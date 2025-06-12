<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     */
    public function index(): View
    {
        return view('home');
    }

    // /**
    //  * Function to get xml from source and render it.
    //  */
    // public function aftNewsBlockPreRender()
    // {
    //     $data = [];
    //     $build = [];
    //     $url = "https://test-aftorg.pantheonsite.io/rss/news.xml";
    //     $xmlData = file_get_contents($url);
    //     $decodedData = simplexml_load_string($xmlData);
    //     $i = 0;
    //     foreach ($decodedData->channel->item as $item) {
    //         $itemArray = array();
    //         $itemArray = $this->xml2array($item, $itemArray);
    //         $data['items'][] = [
    //             'date' => strftime("%m/%d/%Y", strtotime($itemArray['pubDate'])),
    //             'title' => $itemArray['title'],
    //             'url' => $itemArray['link'],
    //             'description' => $itemArray['description'],
    //         ];
    //         $i++;
    //      if($i==5) break;
    //     }
    //     $data['error_message'] = "There was an error while loading the feed.";
    //     $build['data'] = $data;
    //     return json_encode($build);
    // }

    public function xml2array($xmlObject, array $out = []): array
    {
        foreach ((array) $xmlObject as $index => $node) {
            $out[$index] = (is_object($node)) ? $this->xml2array($node) : $node;
        }

        return $out;
    }
}

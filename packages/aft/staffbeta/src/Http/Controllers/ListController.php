<?php

namespace Aft\StaffBeta\Http\Controllers;

use Aft\StaffBeta\Models\AffiliateCommittee;
use Aft\StaffBeta\Models\Download;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ListController extends Controller
{
    public function index()
    {
        return Download::select(['id', 'name', 'label', 'description', 'ability', 'action', 'options'])->get();
    }

    private function getFromSearch(&$columns, array &$results, $sourceSearchName): void
    {
        switch ($sourceSearchName) {
            case 'ppclist':
                $results = AffiliateCommittee::where('AffiliateId', '=', 1)
                    ->whereIn('AffiliateCommitteeId', [
                        41465,
                        41466,
                        41467,
                        41468,
                        41469,
                        41474,
                        41475,
                    ])
                    ->get();
                if (count($results) >= 1) {
                    $columns = array_keys($results[0]->toArray());
                } else {
                    $columns = ['No data'];
                }
                break;
            case 'committeelist':
                $results = AffiliateCommittee::where('AffiliateId', '=', 1)
                    ->whereNotIn('AffiliateCommitteeId', [
                        41465,
                        41466,
                        41467,
                        41468,
                        41469,
                        41474,
                        41475,
                    ])
                    ->get();
                if (count($results) >= 1) {
                    $columns = array_keys($results[0]->toArray());
                } else {
                    $columns = ['No data'];
                }
                break;
        }
    }

    private function getFromSource(&$columns, array &$results, array $source, $parameters = null): bool
    {
        $results = [];
        switch ($source['type']) {
            case 'MsSqlStoredProcedure':
                foreach ($source['parameters'] as $parameterName => $parameter) {
                    if ($parameters[$parameterName] ?? false) {
                        $source['parameters'][$parameterName] = implode(',', $parameters[$parameterName]);
                    }
                }
                $results = DB::connection('aftdb')
                    ->select(
                        'exec '.$source['name'],
                        array_values($source['parameters'])
                    ) ?? [];

                if (!empty($results)) {
                    $columns = array_keys((array) $results[0]);
                } else {
                    $columns = ['No data'];
                }
                break;
            case 'search':
                $this->getFromSearch($columns, $results, $source['name']);
                break;
            default:
                throw new \Exception('No list source type defined');
        }

        return true;
    }

    /**
     * @return mixed[]
     */
    public function options($id): array
    {
        $list = Download::find($id);
        $user = Auth::user();
        if (! $user->hasAbility($list->ability)) {
            throw new \Exception('You do not have permission to this list');
        }
        $options = [];
        foreach ($list->options as $option) {
            $res = $option;
            if ($res['source']) {
                $columns = [];
                $items = [];
                $this->getFromSource($columns, $items, $res['source']);
                $res['item-text'] = $columns;
                $res['items'] = $items;
            }
            $options[] = $res;
        }

        return $options;
    }

    public function download($id, Request $request)
    {
        $data = $request->all();
        $list = Download::find($id);
        $list->label = preg_replace('/\s+/', '_', $list->label);
        $user = Auth::user();

        if (! $user->hasAbility($list->ability)) {
            throw new \Exception('You do not have permission to download this list');
        }

        $columns = [];
        $results = [];

        $this->getFromSource($columns, $results, $list->source, $data);

        return response()->streamDownload(function () use ($columns, $results): void {
            $file = fopen('php://output', 'w+');
            fputcsv($file, $columns);
            foreach ($results as $result) {
                fputcsv($file, (array) $result);
            }
            fclose($file);
        }, $list->label.'-'.date('Y-m-d').'.csv');
    }

}

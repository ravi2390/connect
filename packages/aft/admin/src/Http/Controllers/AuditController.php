<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Http\Resources\AbstractResource;
use Aft\Audit\Audit;
use App\Http\Controllers\Controller;
use App\Models\Individual;
use App\Models\IndividualAddress;
use App\Models\IndividualAffiliate;
use App\Models\IndividualAssessment;
use App\Models\IndividualCope;
use App\Models\IndividualEmail;
use App\Models\IndividualEmployer;
use App\Models\IndividualPhone;
use App\Models\IndividualQuickComment;
use App\Models\IndividualSocialMedia;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function search(Request $request)
    {
        $data = $request->all();
        $individual = $data['individual'];

        $audits = Audit::whereHasMorph(
            'auditable',
            [
                IndividualEmployer::class,
                Individual::class,
                IndividualAffiliate::class,
                IndividualAssessment::class,
                IndividualQuickComment::class,
                IndividualAddress::class,
                IndividualEmail::class,
                IndividualPhone::class,
                IndividualSocialMedia::class,
                IndividualCope::class
            ],
            function ($query, $type) use ($individual): void {
                $tableNames = explode('\\', $type);
                $tableCount = count($tableNames);
                if ($tableCount > 0) {
                    $tableName = $tableNames[$tableCount - 1];
                    $query->where($tableName.'.'.'IndividualId', $individual);
                } else {
                    $query->where('IndividualId', $individual);
                }
            }
        )->orderBy('created_at', 'desc')->paginate(10);

        $collection = $audits->getCollection();
        $collection->transform(function ($audit) {
            $old = $audit->old_values;
            $new = $audit->new_values;

            if (!$audit->auditable) {
                // Handle missing auditable case gracefully
                $audit->previous = null;
                return $audit;
            }

            $audit->previous = $audit->auditable->newInstance($old);
            $keyName = $audit->auditable->getKeyName();
            unset($old[$keyName], $new[$keyName]);

            $this->loadRelationsFrom($audit->previous, $old);
            $this->loadRelationsFrom($audit->auditable, $new);

            return $audit;
        });

        return AbstractResource::collection($audits);
    }

    private function loadRelationsFrom($subject, $relations): void
    {
        if (!$subject) {
            return;
        }

        foreach ($relations as $key => $value) {
            if ($key !== 'EmployeeId' && preg_match('/^.+Id$/', (string) $key)) {
                $related = preg_replace('/Id$/', '', (string) $key);
                try {
                    $subject->loadMissing($related);
                } catch (\Exception) {
                    // Silently handle cases where the relation does not exist
                }
            }
        }
    }

    public function indexWithRelations(Request $request)
    {
        $audits = Audit::orderBy('created_at', 'desc')->paginate();
        $collection = $audits->getCollection();

        $collection->transform(function ($audit) {
            $old = $audit->old_values;
            $new = $audit->new_values;

            if (!$audit->auditable) {
                // Handle missing auditable case gracefully
                $audit->previous = null;
                return $audit;
            }

            $audit->previous = $audit->auditable->newInstance($old);
            $keyName = $audit->auditable->getKeyName();
            unset($old[$keyName], $new[$keyName]);

            $this->loadRelationsFrom($audit->previous, $old);
            $this->loadRelationsFrom($audit->auditable, $new);

            return $audit;
        });

        return AbstractResource::collection($audits);
    }

    public function options(): array
    {
        return [];
    }
}

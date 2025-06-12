<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Individual;
use App\Models\WorkLocation;
use App\Models\WorkStructure;
use Aft\Permissions\Scopes\AuthorizationScope;

class CheckIndividualIntegrity extends Command
{
    protected $signature = 'check:individual-integrity {--affiliateId=}';
    protected $description = 'Checks individuals for missing or corrupt relationships including recursive parent integrity';

    public function handle(): int
    {
        $affiliateId = $this->option('affiliateId');

        if (!$affiliateId) {
            $this->error('AffiliateId is required.');
            return 1;
        }

        $this->info("Checking individual records for AffiliateId: $affiliateId");

        $issues = [];

        $total = Individual::withoutGlobalScope(AuthorizationScope::class)
            ->whereHas('activeIndividualAffiliates', fn ($q) => $q->where('AffiliateId', $affiliateId))
            ->count();

        $this->info("Total individuals to process: $total");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        Individual::withoutGlobalScope(AuthorizationScope::class)
            ->whereHas('activeIndividualAffiliates', fn ($q) => $q->where('AffiliateId', $affiliateId))
            ->chunk(100, function ($individuals) use (&$issues, $bar) {
                foreach ($individuals as $individual) {
                    $individual->loadMissing([
                        'activeIndividualEmployers' => fn ($q) => $q->withoutGlobalScope(AuthorizationScope::class),
                        'activeIndividualEmployers.Employer' => fn ($q) => $q->withoutGlobalScope(AuthorizationScope::class),
                        'activeIndividualEmployers.WorkLocation' => fn ($q) => $q->withoutGlobalScope(AuthorizationScope::class),
                        'activeIndividualEmployers.WorkStructure' => fn ($q) => $q->withoutGlobalScope(AuthorizationScope::class),
                        'activeIndividualAffiliates' => fn ($q) => $q->withoutGlobalScope(AuthorizationScope::class),
                        'activeIndividualAffiliates.Affiliate' => fn ($q) => $q->withoutGlobalScope(AuthorizationScope::class),
                    ]);

                    $individualId = $individual->IndividualId;

                    foreach ($individual->activeIndividualEmployers as $employer) {
                        if (!$employer->Employer) {
                            $issues[] = "Missing Employer for Individual #{$individualId}";
                        }

                        // Recursively check WorkLocation
                        if ($employer->WorkLocation) {
                            $result = $this->checkWorkLocationAncestry($employer->WorkLocation->WorkLocationId);
                            foreach ($result as $msg) {
                                $issues[] = "Individual #{$individualId}: $msg";
                            }
                        }

                        // Recursively check WorkStructure
                        if ($employer->WorkStructure) {
                            $result = $this->checkWorkStructureAncestry($employer->WorkStructure->WorkStructureId);
                            foreach ($result as $msg) {
                                $issues[] = "Individual #{$individualId}: $msg";
                            }
                        }
                    }

                    foreach ($individual->activeIndividualAffiliates as $aff) {
                        if (!$aff->Affiliate) {
                            $issues[] = "Missing Affiliate for Individual #{$individualId}";
                        }
                    }

                    $bar->advance();
                }
            });

        $bar->finish();
        $this->newLine(2);

        if (empty($issues)) {
            $this->info('No issues found ✅');
        } else {
            $this->warn("Found " . count($issues) . " issues:");
            foreach ($issues as $issue) {
                $this->line(" - $issue");
            }
        }

        return 0;
    }

    protected function checkWorkLocationAncestry($locationId, $visited = [], $depth = 0): array
    {
        $messages = [];

        if (in_array($locationId, $visited)) {
            $messages[] = "Circular WorkLocation hierarchy detected at ID #{$locationId}";
            return $messages;
        }

        if ($depth > 10) {
            $messages[] = "Exceeded WorkLocation depth limit at ID #{$locationId}";
            return $messages;
        }

        $visited[] = $locationId;
        $location = WorkLocation::withoutGlobalScope(AuthorizationScope::class)->find($locationId);

        if (!$location) {
            $messages[] = "Missing WorkLocation ID #{$locationId}";
            return $messages;
        }

        if ($location->ParentWorkLocationId) {
            $messages = array_merge($messages, $this->checkWorkLocationAncestry($location->ParentWorkLocationId, $visited, $depth + 1));
        }

        return $messages;
    }

    protected function checkWorkStructureAncestry($structureId, $visited = [], $depth = 0): array
    {
        $messages = [];

        if (in_array($structureId, $visited)) {
            $messages[] = "Circular WorkStructure hierarchy detected at ID #{$structureId}";
            return $messages;
        }

        if ($depth > 10) {
            $messages[] = "Exceeded WorkStructure depth limit at ID #{$structureId}";
            return $messages;
        }

        $visited[] = $structureId;
        $structure = WorkStructure::withoutGlobalScope(AuthorizationScope::class)->find($structureId);

        if (!$structure) {
            $messages[] = "Missing WorkStructure ID #{$structureId}";
            return $messages;
        }

        if ($structure->ParentWorkStructureId) {
            $messages = array_merge($messages, $this->checkWorkStructureAncestry($structure->ParentWorkStructureId, $visited, $depth + 1));
        }

        return $messages;
    }
}

<?php

namespace Aft\Admin\Http\Controllers;

use Aft\Admin\Models\PerformanceLog;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PerformanceLogController extends Controller
{
    private static function perf_getcpuloadavg()
    {
        $cores = preg_replace('/[^[0-9]/', '', shell_exec('nproc'));
        $load = sys_getloadavg()[0];

        return $load / $cores;
    }

    private static function perf_getmeminfo(): float
    {
        $meminfo = array_filter(explode(PHP_EOL, shell_exec('cat /proc/meminfo')));
        $info = [];
        array_filter($meminfo, function ($item) use (&$info): void {
            $type = explode(':', (string) preg_replace('/ *|kB/', '', $item));
            $info[$type[0]] = $type[1];
        });

        return 1.0 - ($info['MemAvailable'] / $info['MemTotal']);
    }

    private static function perf_getdbstatus(): bool
    {
        $host = config('database.connections.aftdb.host');
        $port = config('database.connections.aftdb.port');

        return ping($host, $port);
    }

    private static function perf_getdbloadavg(): float
    {
        $sql = <<<'EOD'
select top 1
    SQLProcessUtilization as [load]
    from (
        select
            record.value('(./Record/SchedulerMonitorEvent/SystemHealth/ProcessUtilization)[1]', 'int') as [SQLProcessUtilization]
        from (
            select
                convert(xml, record) as [record]
            from sys.dm_os_ring_buffers with (nolock)
            where ring_buffer_type = 'RING_BUFFER_SCHEDULER_MONITOR'
            and record like '%<SystemHealth>%'
        ) as y
     ) as x
EOD;

        return DB::connection('aftdb')->select(DB::raw($sql))[0]->load / 100.0;
    }

    private static function perf_getdbmemainfo(): float
    {
        $sql = <<<'EOD'
select
      100 - (100 * cast(available_physical_memory_kb as decimal(18, 3)) / cast(total_physical_memory_kb as decimal(18, 3))) as [used]
from  sys.dm_os_sys_memory;
EOD;

        return DB::connection('aftdb')->select(DB::raw($sql))[0]->used / 100.0;
    }

    public static function create(): void
    {
        $dbDownFile = storage_path('framework/dbdown');
        $dbIsReachable = static::perf_getdbstatus();
        if (! $dbIsReachable) {
            if (! file_exists($dbDownFile)) {
                touch($dbDownFile);
                $alert = config('admin.alerts.database.unavailable');
                $level = $alert['level'];
                Log::channel($alert['channel'])->$level($alert['message']);
            }
        } else {
            if (file_exists($dbDownFile)) {
                unlink($dbDownFile);
                $alert = config('admin.alerts.database.available');
                $level = $alert['level'];
                Log::channel($alert['channel'])->$level($alert['message']);
            }
        }
        PerformanceLog::withoutEvents(function (): void {
            $webServerName = gethostname();
            $databaseServerName = DB::connection('aftdb')->select('select SERVERPROPERTY(\'MachineName\') as hostname')[0]->hostname;
            $webCpuLoad = static::perf_getcpuloadavg();
            $webMemUsage = static::perf_getmeminfo();
            $databaseCpuLoad = static::perf_getdbloadavg();
            $databaseMemUsage = static::perf_getdbmemainfo();
            PerformanceLog::create([
                'servergroup' => $webServerName,
                'servername' => $webServerName,
                'context' => 'web',
                'type' => 'cpu',
                'value' => round($webCpuLoad, 2),
            ]);
            PerformanceLog::create([
                'servergroup' => $webServerName,
                'servername' => $webServerName,
                'context' => 'web',
                'type' => 'mem',
                'value' => round($webMemUsage, 2),
            ]);
            PerformanceLog::create([
                'servergroup' => $webServerName,
                'servername' => $databaseServerName,
                'context' => 'database',
                'type' => 'cpu',
                'value' => round($databaseCpuLoad, 2),
            ]);
            PerformanceLog::create([
                'servergroup' => $webServerName,
                'servername' => $databaseServerName,
                'context' => 'database',
                'type' => 'mem',
                'value' => round($databaseMemUsage, 2),
            ]);
        });
    }

    public function show($context = null, $type = null, $subtype = null): array
    {
        $now = Carbon::now();
        $ago = $now->subMinutes(15)->roundMinute();
        $events = PerformanceLog::where('created_at', '>=', $ago)
            ->when($context, function ($query) use ($context): void {
                $query->where('context', $context);
            })
            ->when($type, function ($query) use ($type): void {
                $query->where('type', $type);
            })
            ->when($subtype, function ($query) use ($subtype): void {
                $query->where('subtype', $subtype);
            })
            ->orderBy('created_at', 'asc')
            ->get();
        $result = unflatten('servergroup.servername.context.type', $events);

        return ['data' => $result];
    }
}

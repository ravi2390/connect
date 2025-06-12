<?php

namespace Aft\Audit;

use App\Models\Affiliate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;

trait Auditable
{
    protected $ownerRoot = Affiliate::class;

    //TODO: maybe change this to either use some context detection, or just in case the user is actually logged in:
    protected $auditEnabled = true;

    private $defaultAuditEventsEnabled = [
        // 'retrieved',
        'creating',
        'created',
        'updating',
        'saving',
        'saved',
        'deleting',
        'deleted',
        'restoring',
        'restored',
    ];

    public static function getGlobalAuditing()
    {
        return Cache::get('auditing.status', true);
    }

    public static function setGlobalAuditing(bool $status): void
    {
        Cache::forever('auditing.status', $status);
    }

    public static function clearGlobalAuditing(): void
    {
        Cache::forget('auditing.status');
    }

    /**
     * @param  null  $event
     * @return mixed
     */
    public function isAuditing($event = null): bool
    {
        if (! static::getGlobalAuditing()) {
            return false;
        }
        if (! $this->auditEnabled) {
            return false;
        }
        if (! is_null($event)) {
            $enabled = $this->auditEventsEnabled ?? $this->defaultAuditEventsEnabled;

            return in_array($event, $enabled);
        }

        return $this->auditEnabled;
    }

    /**
     * @param  mixed  $auditEnabled
     * @return Auditable
     */
    public function setAuditing(bool $auditEnabled): self
    {
        $this->auditEnabled = $auditEnabled;

        return $this;
    }

    public static function bootAuditable(): void
    {
        static::retrieved(function ($model): void {
            $event = 'retrieved';
            if ($model->isAuditing($event)) {
                $model->auditRetrieved($event);
            }
        });
        static::creating(function ($model): void {
            $event = 'creating';
            if ($model->isAuditing($event)) {
                $model->auditCreating($event);
            }
        });
        static::created(function ($model): void {
            $event = 'created';
            if ($model->isAuditing($event)) {
                $model->auditCreated($event);
            }
        });
        static::updating(function ($model): void {
            $event = 'updating';
            if ($model->isAuditing($event)) {
                $model->auditUpdating($event);
            }
        });
        static::updated(function ($model): void {
            $event = 'updated';
            if ($model->isAuditing($event)) {
                $model->auditUpdated($event);
            }
        });
        static::saving(function ($model): void {
            $event = 'saving';
            if ($model->isAuditing($event)) {
                $model->auditSaving($event);
            }
        });
        static::saved(function ($model): void {
            $event = 'saved';
            if ($model->isAuditing($event)) {
                $model->auditSaved($event);
            }
        });
        static::deleting(function ($model): void {
            $event = 'deleting';
            if ($model->isAuditing($event)) {
                $model->auditDeleting($event);
            }
        });
        static::deleted(function ($model): void {
            $event = 'deleted';
            if ($model->isAuditing($event)) {
                $model->auditDeleted($event);
            }
        });
        static::restoring(function ($model): void {
            $event = 'restoring';
            if ($model->isAuditing($event)) {
                $model->auditRestoring($event);
            }
        });
        static::restored(function ($model): void {
            $event = 'restored';
            if ($model->isAuditing($event)) {
                $model->auditRestored($event);
            }
        });
    }

    public function auditRetrieved($event): void
    {
        $this->auditEvent($event);
    }

    public function auditCreating($event): void
    {
        $this->CreatedBy = Auth::user()->getKey();
        $this->UpdatedBy = Auth::user()->getKey();
    }

    public function auditCreated($event): void
    {
        $this->auditEvent($event);
    }

    public function auditUpdating($event): void
    {
        $this->auditEvent($event);
        if (!Auth::check()) {
            return;
        }
        $user = Auth::user();
        if (empty($user)) {
            if (Route::is('password.update') && class_basename($this) === 'User') {
                $updatedBy = $this->getKey();
            }
            // TODO: let it fail?
        } else {
            $updatedBy = Auth::user()->getKey();
        }
        $this->UpdatedBy = $updatedBy;
    }

    public function auditUpdated($event): void
    {
        //
    }

    public function auditSaving($event): void
    {
        //
    }

    public function auditSaved($event): void
    {
        //
    }

    public function auditDeleting($event): void
    {
        $this->auditEvent($event);
        $this->UpdatedBy = Auth::user()->getKey();
    }

    public function auditDeleted($event): void
    {
        //
    }

    public function auditRestoring($event): void
    {
        $this->auditEvent($event);
        $this->UpdatedBy = Auth::user()->getKey();
    }

    public function auditRestored($event): void
    {
        //
    }

    public function auditEvent($event, $tags = []): void
    {
        static::withoutEvents(function () use ($event, $tags): void {

            if (!Auth::check()) {
                return;
            }
            $user = Auth::user();
            if (empty($user)) {
                if (Route::is('password.update') && class_basename($this) === 'User') {
                    $user = $this;
                }
            }

            if (method_exists($this, 'parent') || property_exists($this, 'parent')) {
                try {
                    $owner = $this->parent($this->ownerRoot);
                } catch (\ErrorException) {
                    // TODO: double check expected error
                }
                if (! empty($owner) && method_exists($owner, 'getKey')) {
                    $ownerType = $owner::class;
                    $ownerId = $owner->getKey();
                } else {
                    $ownerType = '{unknown}';
                    $ownerId = 0;
                }
            } else {
                $ownerType = '{unknown}';
                $ownerId = 0;
            }

            $old = $this->original;
            $new = $this->attributes;
            foreach ($old as $key => $value) {
                if ($old[$key] == $new[$key]) {
                    unset($old[$key]);
                    unset($new[$key]);
                }
            }

            $audit = new Audit();
            $audit->user_type = $user::class;
            $audit->user_id = $user->getKey();
            $audit->owner_type = $ownerType;
            $audit->owner_id = $ownerId;
            $audit->event = $event;
            $audit->auditable_type = $this::class;
            $audit->auditable_id = $this->getKey();
            $audit->old_values = $old;
            $audit->new_values = $new;
            $audit->url = Request::fullUrl();
            $audit->ip_address = Request::ip();
            $audit->user_agent = Request::header('User-Agent');
            $audit->tags = implode(', ', $tags);
            $audit->save();
        });
    }
}

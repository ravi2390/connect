<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Aft\Audit\Auditable;
use Aft\Permissions\Models\Traits\UserAuthorizes;
use App\Models\Affiliate;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\HasApiTokens;
use DateTimeInterface;
use Exception;

class User extends Authenticatable implements MustVerifyEmail
{
    use Auditable, HasApiTokens, Notifiable, SoftDeletes, UserAuthorizes;

    const CREATED_AT = 'CreatedAt';

    const UPDATED_AT = 'UpdatedAt';

    const DELETED_AT = 'DeletedAt';

    public $timestamps = true;

    protected $with = [
        'profile',
        'AuthUserAbilities',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'individual_id', 'password', 'password_expires_at',
        'type',
        'last_login_at', 'last_login_ip', 'last_login_agent',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    /**
     * Prepare a date for array / JSON serialization.
     * Added upon laravel 7 update to allow backwards compatiblity with our date times.
     */
    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('Y-m-d H:i:s');
    }

    protected function asDateTime($value)
    {
        $value = preg_replace('/\.[0-9]+$/', '', (string) $value);

        return parent::asDateTime(Carbon::parse($value));
    }

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        static::creating(function ($model): void {
            //
        });
        static::deleted(function ($model): void {
            //
        });
        static::restoring(function ($model): void {
            //
        });
    }

    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class, 'id', 'profile_id');
    }

    public function getDefaultAccess(): void
    {
        try {
            try {
                $firstFound = Affiliate::first();
            } catch (\Error $e) {
                Log::error("Error loading Affiliate class: " . $e->getMessage());
                throw new Exception("Failed to load Affiliate class.");
            }

            if (!$firstFound) {
                throw new Exception('No affiliate found in the database.');
            }

            $this->profile->selected_entity = [
                'entity_type' => Affiliate::class,
                'entity_id' => $firstFound->AffiliateId ?? null,
            ];

            User::withoutEvents(function (): void {
                try {
                    $this->profile->save();
                } catch (Exception $e) {
                    Log::error("Failed to save profile: " . $e->getMessage());
                    throw new Exception("Failed to save profile due to an internal error.", 0, $e);
                }
            });
        } catch (\Throwable $e) {
            Log::error("Error in getDefaultAccess method: " . $e->getMessage());
        }
    }

    public function getSelectedAffiliateIdAttribute()
    {
        $entity = $this->profile->selected_entity;
        if (! isset($entity['entity_type']) || $entity['entity_type'] !== Affiliate::class) {
            return null;
        }
        if (! $this->getUserAuthorization('viewAny', $entity['entity_type'], $entity['entity_id'])) {
            $this->getDefaultAccess();
        }

        return $this->profile->selected_entity['entity_id'];
    }

    public function getSelectedAffiliateAttribute()
    {
        $entity = $this->profile->selected_entity;
        if (! isset($entity['entity_type']) || $entity['entity_type'] !== Affiliate::class || is_null($entity['entity_id'])) {
            return null;
        }
        if (! $this->getUserAuthorization('viewAny', $entity['entity_type'], $entity['entity_id'])) {
            $this->getDefaultAccess();
        }

        return Affiliate::with(['AffiliateType', 'AffiliatePerCapita'])->find((int) $this->profile->selected_entity['entity_id'])->setAppends(['hasCope', 'hasChapters']);
    }

    /**
     * Get the password for the user.
     */
    public function getAuthPassword(): string
    {
        if (empty($this->password)) {
            $password = request()->password;
            $account = (object) ['pass' => $this->previous_password];
            if (drupal_user_check_password($password, $account)) {
                $this->previous_password = null;
                $this->password = Hash::make($password);
                $this->save();
            }
        }

        return $this->password;
    }

    public function getRateLimitAttribute()
    {
        if ($this->type === 'admin') {
            return config('app.throttle.admin');
        }

        return config('app.throttle.user');
    }

    public function AuthUserAbilities(): HasMany
    {
        return $this->hasMany(\Aft\Permissions\Models\AuthUserAbility::class, 'user_id', 'id');
    }

    public function hasAbility($abilityType)
    {
        $ability = $this->AuthUserAbilities()
            ->whereHas('AuthAbility', function ($query) use ($abilityType): void {
                $query->where('type', '=', $abilityType);
            })
            ->orderBy('order', 'desc')
            ->first();
        if (! $ability || ! $ability->AuthAbility) {
            return false;
        }

        return $ability->AuthAbility->type == $abilityType;
    }
}

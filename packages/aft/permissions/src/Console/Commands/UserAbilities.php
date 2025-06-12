<?php

namespace Aft\Permissions\Console\Commands;

use Aft\Permissions\Models\AuthAbility;
use Aft\Permissions\Models\AuthUserAbility;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class UserAbilities extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:ability {--remove} {args*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manage User Abilities';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function getUser(array &$args)
    {
        if (gettype($args) != 'array') {
            $this->error('getUser: argument bust be an array');

            return null;
        }
        foreach ($args as $key => $value) {
            if (is_numeric($value)) {
                $user = User::find($value);
                if ($user) {
                    unset($args[$key]);

                    return $user;
                }
            } elseif (gettype($value) == 'string') {
                if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $user = User::where('email', '=', $args)->first();
                    if ($user) {
                        unset($args[$key]);

                        return $user;
                    }
                }
            }
        }

        return null;
    }

    /**
     * @return mixed[]
     */
    private function getAbilities(array &$args): array
    {
        if (gettype($args) != 'array') {
            $this->error('getAbilities: argument bust be an array');

            return [];
        }
        $abilities = [];
        foreach ($args as $key => $value) {
            if (gettype($value) == 'string') {
                $ability = AuthAbility::where('type', '=', $value)->first();
                if ($ability) {
                    unset($args[$key]);
                    $abilities[] = $ability;
                }
            }
        }

        return $abilities;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        // login default user
        $user = User::find(1);
        Auth::login($user, false);

        // fixup args and options
        $args = $this->arguments();
        $opts = $this->options();
        $isRemove = $opts['remove'];
        $user = $this->getUser($args['args']);
        $updateAbilities = $this->getAbilities($args['args']);
        if (! $user) {
            $this->error('user not found');
            Auth::logout();

            return;
        }
        if (! empty($args['args'])) {
            $this->error('invalid or unknown argument(s): '.implode(', ', $args['args']));
            Auth::logout();

            return;
        }
        if (empty($updateAbilities)) {
            $this->error('no abilities to act on');
            Auth::logout();

            return;
        }

        // validate changes
        echo 'User: '.$user->email.PHP_EOL;
        if ($isRemove) {
            echo '  REMOVE:'.PHP_EOL;
        } else {
            echo '  ADD:'.PHP_EOL;
        }
        foreach ($updateAbilities as $ability) {
            echo '    ';
            echo $ability->type.PHP_EOL;
            $hasAbility = $user->hasAbility($ability->type);
            if ($isRemove) {
                if (! $hasAbility) {
                    $this->error('user does not have ability '.$ability->type);
                    Auth::logout();

                    return;
                }
            } else {
                if ($hasAbility) {
                    $this->error('user already has ability '.$ability->type);
                    Auth::logout();

                    return;
                }
            }
        }

        // do changes
        if ($isRemove) {
            foreach ($updateAbilities as $ability) {
                $deleteAbility = $user->AuthUserAbilities()->where('ability_id', '=', $ability->id);
                $deleteAbility->delete();
            }
        } else {
            foreach ($updateAbilities as $ability) {
                $newAbility = new AuthUserAbility([
                    'user_id' => $user->id,
                    'ability_id' => $ability->id,
                    'order' => 1,
                    'CreatedBy' => 1,
                    'CreatedAt' => now(),
                    'UpdatedBy' => 1,
                    'UpdatedAt' => now(),
                ]);
                $user->AuthUserAbilities()->save($newAbility);
            }
        }

        Auth::logout();
    }
}

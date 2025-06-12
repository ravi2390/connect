<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Password;

class GenerateResetLink extends Command
{
    protected $signature = 'user:generate-reset-link {email}';
    protected $description = 'Generate a password reset link for a user and output it to the console.';

    public function handle(): int
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error('No user found with that email address.');
            return 1;
        }

        $token = Password::broker()->createToken($user);
        $url = route('password.reset', ['token' => $token, 'email' => $user->email]);

        $this->info("Generated password reset link: $url");
        return 0;
    }
}

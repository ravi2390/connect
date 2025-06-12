<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{

    public function getUser(): User
    {
        return User::query()->firstOrFail();
    }
}

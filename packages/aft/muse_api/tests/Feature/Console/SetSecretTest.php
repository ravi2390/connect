<?php

namespace Feature\Console;

use Illuminate\Support\Str;
use Laravel\Passport\Client;
use Laravel\Passport\ClientRepository;
use Orchestra\Testbench\TestCase;
use Aft\MuseApi\Console\SetSecret;

class SetSecretTest extends TestCase
{
    /*
     * @var \Laravel\Passport\ClientRepository
     */
    protected ClientRepository $clients;

    public function getPackageProviders($app): array
    {
        return [
            \Aft\MuseApi\MuseApiServiceProvider::class,
            \Laravel\Passport\PassportServiceProvider::class,
        ];
    }

    #[\Override]
    public function setUp(): void
    {
        parent::setUp();

        $this->artisan('migrate:fresh');
        $this->artisan('passport:install');

        $clientCount = Client::count();
        $this->artisan('passport:client', ['--client' => true, '--name' => 'Test Client Name']);
        $this->assertEquals($clientCount + 1, Client::count());
    }

    public function testSetFromArguments(): void
    {
        $client = Client::latest('id')->first();
        $this->assertEquals('Test Client Name', $client->name);

        // Fake an old `updated_at`, otherwise rows are changed too fast
        // and we get a false negative.
        $client->setUpdatedAt('2000-01-01');
        $client->save();
        $oldDate = $client->updated_at->timestamp;

        $newSecret = Str::random(40);

        $this->artisan('muse:set-secret', ['client_id' => $client->id, 'new_secret' => $newSecret])
            ->expectsOutput(sprintf('Updated secret for client with ID %d.', $client->id))
            ->assertExitCode(0);

        $client->refresh();
        $this->assertEquals($newSecret, $client->secret);
        $this->assertNotEquals($oldDate, $client->updated_at->timestamp);
    }

    public function testSetFromEnv(): void
    {
        $client = Client::latest('id')->first();
        $this->assertEquals('Test Client Name', $client->name);

        // Fake an old `updated_at`, otherwise rows are changed too fast
        // and we get a false negative.
        $client->setUpdatedAt('2000-01-01');
        $client->save();
        $oldDate = $client->updated_at->timestamp;

        $newSecret = Str::random(40);
        $id = $client->id;

        putenv(sprintf('%s=%s', SetSecret::ID_ENV, $id));
        putenv(sprintf('%s=%s', SetSecret::SECRET_ENV, $newSecret));

        $this->artisan('muse:set-secret', ['--from-env' => true])
            ->expectsOutput(sprintf('Updated secret for client with ID %d using environment variables.', $id))
            ->assertExitCode(0);

        $client->refresh();
        $this->assertEquals($newSecret, $client->secret);
        $this->assertNotEquals($oldDate, $client->updated_at->timestamp);
    }

    public function testMissingArguments(): void
    {
        $this->artisan('muse:set-secret', [])
            ->expectsOutput('Missing value for ID or secret.')
            ->assertExitCode(0);
        $this->artisan('muse:set-secret', ['client_id' => 999])
            ->expectsOutput('Missing value for ID or secret.')
            ->assertExitCode(0);
        $this->artisan('muse:set-secret', ['new_secret' => 'secret'])
            ->expectsOutput('Missing value for ID or secret.')
            ->assertExitCode(0);
    }

    public function testWrongArguments(): void
    {
        $wrongId = 999;
        $this->artisan('muse:set-secret', ['client_id' => $wrongId, 'new_secret' => 'secret'])
            ->expectsOutput(sprintf('Provided client ID %d does not exist.', $wrongId))
            ->assertExitCode(0);
    }
}

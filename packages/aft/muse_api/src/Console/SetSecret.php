<?php

namespace Aft\MuseApi\Console;

use Illuminate\Console\Command;
use Laravel\Passport\Client;
use Laravel\Passport\ClientRepository;

class SetSecret extends Command
{
    /**
     * Environment variable to use for ID value.
     *
     * @var string
     */
    const ID_ENV = 'CONNECT_API_CLIENT_ID';

    /**
     * Environment variable to use for secret value.
     *
     * @var string
     */
    const SECRET_ENV = 'CONNECT_API_CLIENT_SECRET';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'muse:set-secret
        {--from-env : Take arguments from the environment (CONNECT_API_CLIENT_ID and CONNECT_API_CLIENT_SECRET)}
        {client_id? : The ID of the client to modify}
        {new_secret? : New value for ID\'s secret}
        ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the `laravel/passport` secret for a given client ID';

    /**
     * Execute the console command.
     *
     * @param \Laravel\Passport\ClientRepository $clients
     * @return mixed
     */
    public function handle(ClientRepository $clients)
    {
        $id = $this->argument('client_id');
        $secret = $this->argument('new_secret');
        $fromEnv = $this->option('from-env');

        if ($fromEnv) {
            if ($id != null || $secret != null) {
                $this->error('Option --from-env can not be used with positional arguments.');
                return $this::SUCCESS;
            } else {
                $id = env($this::ID_ENV);
                $secret = env($this::SECRET_ENV);
            }
        }

        if ($id == null || $secret == null) {
            $this->error('Missing value for ID or secret.');
            return $this::SUCCESS;
        }

        $client = $clients->findActive($id);

        if (! $client instanceof Client) {
            $this->error(sprintf('Provided client ID %d does not exist.', $id));
            return $this::SUCCESS;
        }

        $client->setSecretAttribute($secret);
        $saved = $client->save();

        if ($saved) {
            if ($fromEnv) {
                $this->info(sprintf('Updated secret for client with ID %d using environment variables.', $id));
            } else {
                $this->info(sprintf('Updated secret for client with ID %d.', $id));
            }
        } else {
            $this->error(sprintf('Failed to update secret for client with ID %d.', $id));
        }

        return $this::SUCCESS;
    }
}

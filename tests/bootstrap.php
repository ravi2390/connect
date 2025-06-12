<?php

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// newrelic extension can cause artisan test to fail.
if (extension_loaded('newrelic')) {
    newrelic_end_transaction();
}

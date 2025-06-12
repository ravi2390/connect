## About AFT Admin Panel

This is a basic skeleton framework to hold any administration components we may need for Connect 2.0

This module may be renamed in the future as features and functionality relevant to our local leaders and state-feds are added.

## Installation

Execute:
 
`composer install` _# in the Connect 2.0 root folder_

`cd packages/aft/admin` _# change directories to the package root_

`npm install`

`npm run dev`

**Double check that `public/vendor/admin` is symlinked to `packages/aft/admin/public`**

**_If `public/vendor/admin` is not symlinked:_**

`cd public/vendor` _# from the Connect 2.0 root (usually `/var/www/connect`)_

`ln -s ../../packages/aft/admin/public ./admin`

## Usage

The admin URL should be accessible from your browser at `/admin` 

## TODO:

+ Find out what the name of this will eventually be
+ Once the foundation is complete, the `artisan publish` command should be finalized
+ Figure out how other packages can hook into this one so features can be added without changing files here
 

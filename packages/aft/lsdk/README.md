## About Looker dashboard

This is a reports embedded package integration from looker studio to display dashboards needed for connect based on affiliate number.


## Installation

Execute:

`composer install` _# in the Connect 2.0 root folder_

`cd packages/aft/lsdk` _# change directories to the package root_

`npm install`

`npm run dev`

**Double check that `public/vendor/lsdk` is symlinked to `packages/aft/lsdk/public`**

**_If `public/vendor/lsdk` is not symlinked:_**

`cd public/vendor` _# from the Connect 2.0 root (usually `/var/www/connect`)_

`ln -s ../../packages/aft/lsdk/public ./lsdk`



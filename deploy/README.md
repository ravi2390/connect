# Ansible Deploy Scripting

## Setup

To get setup to run this deploy scripting, you need to setup your python
environment. The process for this may be different on windows, so the following
will likely need to be modified to work on a windows workstation.

### Virtual Environment Setup

Start by creating a new python3 virtual environment.

```bash
python3 -m venv connect
source ./connect/bin/activate # Make new python and pip accessible
pip install -r requirements.txt # Installs ansible and its dependencies
```

Anytime you want to use the deployment scripting, you need to run line 2 from
above so `ansible-playbook` becomes available. You can also install the
`requirements.txt` file as root, but that can end up creating issues later on if
you need to run something in python and there are conflicting dependencies.

## Running the scripts

There are two ansible scripts, one for building the site, and one for deploying
the build.

### Build

First, you must tag the version of the code that you want to deploy, then push
that tag to bitbucket. If you want to deploy the master branch, for example, you
would do as follows:

```bash
git checkout master
git pull origin master
git tag test-1
git push origin test-1
```

Then, you must run the build script. This can be integrated with a build server
like jenkins so that it listens for tags being pushed. Enter the vault password
when prompted.

```bash
# Run build script on test-1 tag. Script will build and push a new test-1-deploy tag
ansible-playbook build.yaml -i inventory/staging -u <my_ssh_username> -e version=test-1 --ask-vault-pass
```

### Deploy

Now that there is a deployable branch that our build script pushed to bitbucket,
we can deploy it to dev/staging/prod without worrying about any build runtime
failures or system dependency issues with composer, etc.

```bash
# Run build script with test-1. It will search for the test-1-deploy branch to deploy
ansible-playbook deploy.yaml -i inventory/staging -u kindlehl -e version=test-1 --ask-vault-pass
```

The script will pull the build branch to the releases directory on the
webservers, drop in the .env settings file, set proper permissions, etc. It will
then start up a test server with artisan, and check that it will serve the
landing page without failure. Then, it will update the
/var/www/connect/current symlink to point to the new site and restart all
the services so the new codebase gets picked up.

If you want to deploy to prod, just use the `inventory/prod` file to target
production webservers rather than staging webservers.

### Updating .env files

The .env file is re-generated during each deployment using a template. This template is located in `./templates/env.j2`.

The template pulls variables from `./group_vars/all`, `./group_vars/dev_servers`, `./group_vars/staging_servers`, `./group_vars/prod_servers`. Variables in `./group_vars/all` get overridden by the variables in the other directories if present.

## Example: Adding a new variable

Let's say you want to add a variable to configure what directory you want Laravel to write logs to. To do this, you need
to add a line to the .env template file that sets the new variable, then you need to add a definition of the variable
for ansible to find.

Here is an example of the change to our template to add the new variable.

```yaml
...
MAIL_USERNAME={{ mail.username }}
MAIL_PASSWORD={{ mail.password }}
MAIL_ENCRYPTION=tls

# New Variable definition

APP_LOG_DIRECTORY={{ laravel.app_log_directory }}
```

```yaml
---
laravel:
  app_log_directory: /var/log/laravel
```

Notice how the template code we wrote is calling for a variable called `laravel.app_log_directory`. The `laravel` part
is the name of a YAML dictionary, with a key named `app_log_directory` in it. 

You could also choose to just use a flat variable like so:

```yaml
...
MAIL_USERNAME={{ mail.username }}
MAIL_PASSWORD={{ mail.password }}
MAIL_ENCRYPTION=tls

# New Variable definition

APP_LOG_DIRECTORY={{ app_log_directory }}
```

```yaml
---
app_log_directory: /var/log/laravel
```

I find it easier to group different settings logically with dictionaries to make maintenance a bit easier.

> [!IMPORTANT]
> If you define the `laravel` dictionary in `group_vars/all` AND in `group_vars/dev_servers`, then all of the values
> under the `laravel` dictionary will be those from `group_vars/dev_servers`. Dictionaries are NOT merged by ansible,
> they are overwritten.

## Example: Updating an existing variable

Imagine you're changing database hosts and you need to update the app's config to point at the new database host,
`mydatabase.sql.bak`. You'll need to find the name of the variable that the template uses by opening it and searching
for database-related terms.

```yaml
DB_CONNECTION={{ database.db.connection }}
DB_HOST={{ database.db.host }}
DB_PORT={{ database.db.port }}
DB_DATABASE={{ database.db.name }}
DB_USERNAME={{ database.db.user }}
DB_PASSWORD="{{ database.db.password }}"

AFTDB_CONNECTION={{ database.aftdb.connection }}
AFTDB_HOST={{ database.aftdb.host }}
AFTDB_PORT={{ database.aftdb.port }}
AFTDB_DATABASE={{ database.aftdb.name }}
AFTDB_USERNAME={{ database.aftdb.user }}
AFTDB_PASSWORD="{{ database.aftdb.password }}"

MEMBER_CONNECTION={{ database.member.connection }}
MEMBER_HOST={{ database.member.host }}
MEMBER_PORT={{ database.member.port }}
MEMBER_DATABASE={{ database.member.name }}
MEMBER_USERNAME={{ database.member.user }}
MEMBER_PASSWORD={{ database.member.password }}

STAGE_CONNECTION={{ database.stage.connection }}
STAGE_HOST={{ database.stage.host }}
STAGE_PORT={{ database.stage.port }}
STAGE_DATABASE={{ database.stage.name }}
STAGE_USERNAME={{ database.stage.user }}
STAGE_PASSWORD="{{ database.stage.password }}"
```

As you can see, there is a nested dictionary called `database` that defines the different database settings for connect.
To update these values, search this deploy directory for instances of `database`. I like to use `git grep`. 

```bash
> git grep 'database:'

group_vars/dev_servers/all:database:
group_vars/prod_servers/all:database:
group_vars/staging_servers/all:database:
```

Looks like there are definitions for this variable in each environment. You'll have to edit all three of them if you
want to switch to the new database immediately, or you'll have to update them one-by-one as you get dev, staging, and
finally production ready for the switch.

Here is what staging looks like:

```yaml
database:
  db:
.....
    connection: sqlsrv
    host: 172.19.1.123
    port: 1433
    name: AFTDB_dev_20200430
    user: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          37366338343566313838373738336532353638303931626434373339376230363539613963623035
          3434666436323764613131613665353965633435393366370a343834326435333964373965643635
          35326535343338643139343066376132376138653533383565633231613538663735636531626535
          6232623962343537320a316135386461323739363264353266343130623138353938313831323139
          3936
    password: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          66306636643335386436633430303732363832633464306562643466343963306434393262616132
          3061663237663866336239356131613437633532333132610a663232663663643136353236663834
          64643132633937666133663636646134343862343161376362343139646564393639323261326165
          3736383566336465320a333633653066656362626536616366323766633864633462353630356664
          6530
```

To update the database hostname, you just need to update the `host` value under the `database.db` dictionary!

```yaml
database:
  db:
.....
    connection: sqlsrv
    host: mydatabase.sql.bak
    port: 1433
    name: AFTDB_dev_20200430
    user: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          37366338343566313838373738336532353638303931626434373339376230363539613963623035
          3434666436323764613131613665353965633435393366370a343834326435333964373965643635
          35326535343338643139343066376132376138653533383565633231613538663735636531626535
          6232623962343537320a316135386461323739363264353266343130623138353938313831323139
          3936
    password: !vault |
          $ANSIBLE_VAULT;1.1;AES256
          66306636643335386436633430303732363832633464306562643466343963306434393262616132
          3061663237663866336239356131613437633532333132610a663232663663643136353236663834
          64643132633937666133663636646134343862343161376362343139646564393639323261326165
          3736383566336465320a333633653066656362626536616366323766633864633462353630356664
          6530
```

Next time you deploy, the .env file will have you new value in it!

### Encrypting Secrets

To make sure our database credentials and other sensitive information doesn't get leaked to the public in the event that
there is a data breach on bitbucket, we need to encrypt some of our variables. These are things like API keys,
usernames/passwords, certificate bundles, etc.

Using `ansible-vault`, we have two primary ways to update values. We can encrypt strings one at a time, or we can
encrypt entire files. Any variable that starts with `!vault` is an encrypted value, and any file named `vaulted` under
`group_vars` should be encrypted.

To update a single encrypted value, run this on the command line and enter the password for this repo when prompted:

```bash
> set +o history
> echo -n 'SECRET_VALUE' | ansible-vault encrypt_string
!vault |
          $ANSIBLE_VAULT;1.1;AES256
          66306636643335386436633430303732363832633464306562643466343963306434393262616132
          3061663237663866336239356131613437633532333132610a663232663663643136353236663834
          64643132633937666133663636646134343862343161376362343139646564393639323261326165
          3736383566336465320a333633653066656362626536616366323766633864633462353630356664
          6530
```

Copy + paste the output into your vars file. 

To update an encrypted file, you must first decrypt the file. For the encrypted secrets in
`./group_vars/dev_servers/vaulted`:

```bash
> ansible-vault decrypt group_vars/dev_servers/vaulted
```

This should turn the file from ciphertext into YAML code that looks like the other files. Update the variable you want,
then re-encrypt the file before committing it.

```bash
> ansible-vault encrypt group_vars/dev_servers/vaulted
> git add group_vars/dev_servers/vaulted
> git commit
```

### Testing your update

To test your update, you can try to template the .env file locally. Here is an example on how to get the .env template
for staging:

```bash
> ansible all -i "localhost," -c local -m template -a "src=templates/env.j2 dest=./test.env" --extra-vars=@group_vars/staging_servers/all --extra-vars=@group_vars/staging_servers/vaulted --ask-vault-pass
```

Then you should have a copy of the .env file locally.

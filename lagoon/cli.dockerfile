FROM uselagoon/lagoon-cli:latest AS lagooncli

# Node 22
FROM node:22-alpine AS node-deps
WORKDIR /app
COPY --link package.json package-lock.json vite.config.js .dockerignore .babelrc /app/
RUN npm ci --no-audit --progress=false

FROM node-deps AS node22
COPY --link resources resources
COPY --link public public
COPY --link packages/aft/admin packages/aft/admin
COPY --link packages/aft/staffbeta packages/aft/staffbeta
COPY --link packages/aft/memberforms packages/aft/memberforms
COPY --link packages packages
ARG LAGOON_ENVIRONMENT_TYPE=development
RUN if [ "$LAGOON_ENVIRONMENT_TYPE" = "production" ]; then \
    echo "Building for production" && \
    npm run prod; \
  else \
    echo "Building for non-production" && \
    npm run dev; \
  fi \
  && rm -rf node_modules packages/aft/*/node_modules


FROM uselagoon/php-8.3-cli:latest AS pecl
RUN apk --no-cache add freetds php83-pdo_dblib php83-pdo_odbc php83-dev build-base unixodbc unixodbc-dev autoconf libtool g++ make curl-dev
RUN pecl install sqlsrv \
    && pecl install pdo_sqlsrv \
    && docker-php-ext-install opcache

FROM uselagoon/php-8.3-cli:latest AS lagoon-cli
WORKDIR /app

ENV PHP_MEMORY_LIMIT=2G \
    PHP_DISPLAY_ERRORS=1 \
    PHP_MAX_EXECUTION_TIME=1800 \
    CACHE_STORE=file \
    SESSION_DRIVER=file \
    WEBROOT=public \
    NEW_RELIC_API_KEY=NRAK-CIFBUEAVD7VQ6BUY083J53P5E70 \
    NEW_RELIC_ACCOUNT_ID=6431946 \
    NEW_RELIC_REGION=US \
    NR_INSTALL_SILENT=TRUE \
    NR_INSTALL_USE_CP_NOT_LN=TRUE \
    NEWRELIC_ENABLED=FALSE

RUN apk add --no-cache sudo python3 curl bash htop screen vim freetds tree php83-pdo_dblib php83-pdo_odbc unixodbc

#RUN curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash \
COPY --link lagoon/cli/newrelic-install.sh lagoon/cli/newrelic-install.sh
RUN ./lagoon/cli/newrelic-install.sh \
  && /usr/local/bin/newrelic profile add --profile default --region ${NEW_RELIC_REGION} --licenseKey ${NEWRELIC_LICENSE} --apiKey ${NEW_RELIC_API_KEY} --accountId ${NEW_RELIC_ACCOUNT_ID} -y

RUN DOWNLOAD_PATH=$(curl -sL "https://api.github.com/repos/uselagoon/lagoon-sync/releases/latest" | grep "browser_download_url" | cut -d \" -f 4 | grep linux_386) && wget -O /usr/local/bin/lagoon-sync $DOWNLOAD_PATH && chmod +x /usr/local/bin/lagoon-sync

COPY --from=pecl --link /usr/lib/php83/modules/*.so /usr/local/lib/php/extensions/no-debug-non-zts-20230831/
COPY --from=pecl --link /usr/local/lib/php/extensions/no-debug-non-zts-20230831/*.so /usr/local/lib/php/extensions/no-debug-non-zts-20230831/
RUN docker-php-ext-enable pdo_sqlsrv sqlsrv pdo_dblib pdo_odbc opcache \
  && sed -i '/opcache.enable_cli/ s/^;//; s/^opcache.enable_cli=.*/opcache.enable_cli=1/' /usr/local/etc/php/php.ini

COPY --link lagoon/cli/*.apk lagoon/cli/
RUN apk add --allow-untrusted lagoon/cli/msodbcsql18_18.4.1.1-1_amd64.apk lagoon/cli/mssql-tools18_18.4.1.1-1_amd64.apk

COPY --link . /app
COPY --link --from=node22 /app /app

RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-interaction --no-dev

RUN CACHE_STORE=file SESSION_DRIVER=file php artisan storage:link || true \
  && CACHE_STORE=file SESSION_DRIVER=file php artisan aftdb:create

# Copy CSV files from repo to storage
COPY --link storage/aftdb /tmp/aftdb
COPY --link --from=lagooncli /lagoon /usr/local/bin/lagoon

# Ensure .env exists
RUN touch /app/.env

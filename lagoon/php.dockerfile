ARG CLI_IMAGE
FROM ${CLI_IMAGE} AS cli
FROM uselagoon/php-8.3-fpm:latest

ENV PHP_MEMORY_LIMIT=786M \
    WEBROOT=public \
    BROADCAST_CONNECTION=redis \
    CACHE_STORE=redis \
    QUEUE_CONNECTION=redis \
    SESSION_DRIVER=redis \
    SESSION_LIFETIME=120 \
    NEW_RELIC_API_KEY=NRAK-CIFBUEAVD7VQ6BUY083J53P5E70 \
    NEW_RELIC_ACCOUNT_ID=6431946 \
    NEW_RELIC_REGION=US \
    NR_INSTALL_SILENT=TRUE \
    NR_INSTALL_USE_CP_NOT_LN=TRUE \
    NEWRELIC_ENABLED=TRUE \
    NEW_RELIC_TRANSACTION_TRACER_THRESHOLD=10.0 \
    NEW_RELIC_TRANSACTION_TRACER_SAMPLING_RATE=0.2

# Set New Relic distributed transaction tracing to only trace transactions >10s
# Set New Relic distributed tracing to sample 20% of transactions

# Install htop and screen on cli for easier troubleshooting
# freetds is required for php7-pdo_dblib
RUN apk add --no-cache htop screen vim freetds tree font-dejavu-sans-mono-nerd sudo bash

#RUN curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash \
COPY --link lagoon lagoon
RUN ./lagoon/cli/newrelic-install.sh \
  && /usr/local/bin/newrelic profile add --profile default --region ${NEW_RELIC_REGION} --licenseKey ${NEWRELIC_LICENSE} --apiKey ${NEW_RELIC_API_KEY} --accountId ${NEW_RELIC_ACCOUNT_ID} -y \
  && cd lagoon/php/newrelic-php5-11.6.0.19-linux-musl \
  && ./newrelic-install install \
  && cd .. \
  && rm -rf newrelic-php5-11.6.0.19-linux-musl

# Pull tracing configs from env vars into newrelic.ini
RUN grep -q '^[  ]*newrelic.transaction_tracer.threshold' "/usr/local/etc/php/conf.d/newrelic.ini" || \
  echo "newrelic.transaction_tracer.threshold = ${NEW_RELIC_TRANSACTION_TRACER_THRESHOLD}" >> /usr/local/etc/php/conf.d/newrelic.ini
RUN grep -q '^[  ]*newrelic.transaction_tracer.sampling_rate' "/usr/local/etc/php/conf.d/newrelic.ini" || \
  echo "newrelic.transaction_tracer.sampling_rate = ${NEW_RELIC_TRANSACTION_TRACER_SAMPLING_RATE}" >> /usr/local/etc/php/conf.d/newrelic.ini
RUN grep -q '^[  ]*newrelic.distributed_tracing_enabled' "/usr/local/etc/php/conf.d/newrelic.ini" || \
  echo "newrelic.distributed_tracing_enabled = ${NEW_RELIC_DISTRIBUTED_TRACING_ENABLED}" >> /usr/local/etc/php/conf.d/newrelic.ini

# Workaround for hard-coded font path in
# packages/aft/memberforms/src/Http/Controllers/Captcha/MathCaptchaController.php:46
RUN mkdir -p /usr/share/fonts/truetype/dejavu && \
    ln -s '/usr/share/fonts/dejavu-sans-mono-nerd/DejaVu Sans Mono Nerd Font Complete.ttf' /usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf

# Install PHP DB drivers
COPY --from=cli --link /usr/local/lib/php/extensions/no-debug-non-zts-20230831/*.so /usr/local/lib/php/extensions/no-debug-non-zts-20230831/
RUN docker-php-ext-enable pdo_sqlsrv sqlsrv pdo_dblib pdo_odbc

# MS SQL driver
COPY --from=cli /app/lagoon/cli/*.apk lagoon/cli/
RUN apk add --allow-untrusted lagoon/cli/msodbcsql18_18.4.1.1-1_amd64.apk lagoon/cli/mssql-tools18_18.4.1.1-1_amd64.apk

COPY --from=cli /usr/local/bin/lagoon /usr/local/bin/lagoon

COPY --from=cli --link /app /app

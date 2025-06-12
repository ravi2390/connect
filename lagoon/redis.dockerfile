FROM uselagoon/redis-7

ENV MAXMEMORY=1gb
ENV DATABASES=32
ENV NEW_RELIC_API_KEY=NRAK-CIFBUEAVD7VQ6BUY083J53P5E70
ENV NEW_RELIC_ACCOUNT_ID=6431946
ENV NEW_RELIC_REGION=US

RUN apk add --no-cache sudo curl bash
RUN curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash \
  && /usr/local/bin/newrelic profile add --profile default --region ${NEW_RELIC_REGION} --licenseKey ${NEWRELIC_LICENSE} --apiKey ${NEW_RELIC_API_KEY} --accountId ${NEW_RELIC_ACCOUNT_ID} -y \
  && echo /usr/local/bin/newrelic install -n redis-open-source-integration -y

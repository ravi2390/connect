ARG CLI_IMAGE
FROM ${CLI_IMAGE} AS cli

FROM uselagoon/nginx-drupal:latest
# Define where the Laravel Root is located
ENV WEBROOT=public
#ENV BASIC_AUTH=on
#ENV BASIC_AUTH_USER=aft
#ENV BASIC_AUTH_PASSWORD=aftconnect

RUN apk --no-cache add curl

COPY --from=cli --link /app /app
COPY lagoon/nginx/app.conf /etc/nginx/conf.d/app.conf

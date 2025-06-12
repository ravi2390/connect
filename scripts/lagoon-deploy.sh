#!/bin/bash
#set -x

PROJECT=connect-laravel
ENV=$1
echo "--- Deploying to ${ENV} ---"

cp .lagoon-config.yml /root/.lagoon.yml
lagoon config default --lagoon aft-production
lagoon login --force -i $BITBUCKET_SSH_KEY_FILE

# Get list of environments to make sure target environment exists
ENVS=$(lagoon -i $BITBUCKET_SSH_KEY_FILE --project ${PROJECT} list environments --output-json | jq -r '.data[].name')

echo "Deploying to ${ENV} environment"
BUILD=$(lagoon -i $BITBUCKET_SSH_KEY_FILE deploy branch --project ${PROJECT} --branch ${BITBUCKET_BRANCH} --force --returndata --output-json | jq -r '.result' || exit 255);

echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${PROJECT}-${ENV}/deployments/${BUILD}";

# Sleep for 30 sec to allow the build to start
sleep 30

T=$(date +%s)
INTERVAL=10
TIMEOUT=2400
while
  echo
  [[ $(($(date +%s) - $T)) -gt ${TIMEOUT} ]] && echo "Deployment timeout on ${BUILD}" && exit 1
  echo "Checking status"
  JSON=$(lagoon -i $BITBUCKET_SSH_KEY_FILE get deployment --project ${PROJECT} -e "${ENV}" --output-json --name ${BUILD})
  STATUS=$(jq -r '.data[0].status' <<< "${JSON}")
  #echo "${STATUS}"
  case $STATUS in
    failed)
      echo "Build ${BUILD} failed!"
      LOGJSON=$(lagoon -i $BITBUCKET_SSH_KEY_FILE get deployment --project ${PROJECT} -e "${ENV}" --output-json --name ${BUILD} --logs)
      LOGS=$(jq -r '.data[0].logs' <<< "${LOGJSON}" | tail -n 50)
      echo "Logs: ${LOGS}"
      exit 255
      ;;
    complete)
      echo "Build ${BUILD} completed"
      echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${ENV}/deployments/${BUILD}";
      exit 0
      ;;
    running)
      echo "Build ${BUILD} running ... sleeping ${INTERVAL} seconds"
      ;;
    cancelled)
      echo "Build ${BUILD} cancelled"
      echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${ENV}/deployments/${BUILD}";
      exit 1
      ;;
    *)
      echo "Build ${BUILD} status ${STATUS} ... sleeping ${INTERVAL} seconds"
      echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${ENV}/deployments/${BUILD}";
      ;;
  esac
do sleep ${INTERVAL}; done

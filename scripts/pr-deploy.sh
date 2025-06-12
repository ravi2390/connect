#!/bin/bash
#set -x

PROJECT=connect-laravel
echo "--- Deploying to pr-${BITBUCKET_PR_ID} ---"

cp .lagoon-config.yml /root/.lagoon.yml
lagoon config default --lagoon aft-production
lagoon login --force -i $BITBUCKET_SSH_KEY_FILE

echo "Deploying to pr-${BITBUCKET_PR_ID}"

# Update PR environment each run
BUILD=$(lagoon -i $BITBUCKET_SSH_KEY_FILE deploy pullrequest --number "${BITBUCKET_PR_ID}" --project ${PROJECT} --title "pr-${BITBUCKET_PR_ID}" --base-branch-name "${BITBUCKET_PR_DESTINATION_BRANCH}" --base-branch-ref "origin/${BITBUCKET_PR_DESTINATION_BRANCH}" --head-branch-name "${BITBUCKET_BRANCH}" --head-branch-ref "${BITBUCKET_COMMIT}" --force --returndata --output-json | jq -r '.result' || exit 255);

echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${PROJECT}-pr-${BITBUCKET_PR_ID}/deployments/${BUILD}";

# Sleep for 30 sec to allow the build to start
sleep 30

T=$(date +%s)
INTERVAL=10
TIMEOUT=2400
while
  echo
  [[ $(($(date +%s) - $T)) -gt ${TIMEOUT} ]] && echo "Deployment timeout on ${BUILD}" && exit 1
  echo "Checking status"
  JSON=$(lagoon -i $BITBUCKET_SSH_KEY_FILE get deployment --project ${PROJECT} -e "pr-${BITBUCKET_PR_ID}" --output-json --name ${BUILD})
  STATUS=$(jq -r '.data[0].status' <<< "${JSON}")
  #echo "${STATUS}"
  case $STATUS in
    failed)
      echo "Build ${BUILD} failed!"
      LOGJSON=$(lagoon -i $BITBUCKET_SSH_KEY_FILE get deployment --project ${PROJECT} -e "pr-${BITBUCKET_PR_ID}" --output-json --name ${BUILD} --logs)
      LOGS=$(jq -r '.data[0].logs' <<< "${LOGJSON}" | tail -n 50)
      echo "Logs: ${LOGS}"
      exit 255
      ;;
    complete)
      echo "Build ${BUILD} completed"
      echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${PROJECT}-pr-${BITBUCKET_PR_ID}/deployments/${BUILD}";
      break
      ;;
    running)
      echo "Build ${BUILD} running ... sleeping ${INTERVAL} seconds"
      ;;
    cancelled)
      echo "Build ${BUILD} cancelled"
      echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${PROJECT}-pr-${BITBUCKET_PR_ID}/deployments/${BUILD}";
      exit 1
      ;;
    *)
      echo "Build ${BUILD} status ${STATUS} ... sleeping ${INTERVAL} seconds"
      echo "${BUILD} - https://ui.lagoon.sharemylesson.com/projects/${PROJECT}/${PROJECT}-pr-${BITBUCKET_PR_ID}/deployments/${BUILD}";
      ;;
  esac
do sleep ${INTERVAL}; done

# Wait until PR environment ingress and LetsEncrypt cert are provisioned
T=$(date +%s)
INTERVAL=10
TIMEOUT=2400
PR_URL="https://${LAGOON_HTTP_AUTH}@${PROJECT}-pr-${BITBUCKET_PR_ID}-nginx.mda-lagoon.aft.org"

# Don't exit on errors
set +e
while
  echo
  [[ $(($(date +%s) - $T)) -gt ${TIMEOUT} ]] && echo "Ingress/cert provisioning timeout on ${BUILD}" && exit 1
  echo "Checking ingress on ${PR_URL}"
  curl -s ${PR_URL} > /dev/null
  STATUS=$?
  case $STATUS in
    0)
      echo "${PR_URL} provisioning complete."
      break
      ;;
    60)
      echo "${PR_URL} provisioning in progress ... sleeping ${INTERVAL} seconds"
      ;;
    *)
      echo "${PR_URL} provisioning in progress ... sleeping ${INTERVAL} seconds"
      ;;
  esac
do sleep ${INTERVAL}; done

echo "Build complete: ${PR_URL}"

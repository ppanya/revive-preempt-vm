#! /bin/bash
METADATA_URL="http://metadata.google.internal/computeMetadata/v1/instance"
TOPIC="revive-preempt"

get_meta() {
  curl -s "$METADATA_URL/$1" -H "Metadata-Flavor: Google"
}

IS_PREEMPTED="$( get_meta scheduling/preemptible )"

if [ "$IS_PREEMPTED" == "TRUE" ]; then
  NAME="$( get_meta name )"
  ZONE="$( get_meta zone | cut -d '/' -f 4 )"
  gcloud pubsub topics publish "$TOPIC" --message '{"instanceName": "'${NAME}'", "instanceZone": "'${ZONE}'"}'
fi
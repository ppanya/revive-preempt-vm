# revive-preempt-vm
Just a POC, Use google cloud Pub/Sub + Firebase Cloud function 

# Follow the step

### <b>Noted</b> you can change topic_name inside `revive.sh` and `functions/index.js`

## Create Topic
  - Create Topic on `GCP pub/sub` via google cloud console
or gcloud sdk 
    - ```gcloud pubsub topics create <topic_name>```

## Create Preempt VM
 - Create preemptible vm on `GCP` via google cloud console or gcloud sdk <br/>
    - ```gcloud compute instances create <instance_name> --preemptible --metadata-from-file shutdown-script=revive.sh```

## Deploy firebase cloud function
  - ```firebase deploy``` <br/> or <br/>```cd functions && npm run deploy```

## Try it out
  - Stop Preempt VM and see the log on firebase cloud functions, then look on GCP Compute engine dashboard
  - Preempt VM is running again
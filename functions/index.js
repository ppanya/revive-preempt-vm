const functions = require('firebase-functions');
const Compute = require('@google-cloud/compute');

exports.revivePreempt = functions.pubsub.topic('revive-preempt').onPublish(async (message) => {
  const {
    instanceName,
    instanceZone
  } = message.json
  console.log(`Receive json message from topic {name: ${instanceName}, zone: ${instanceZone}}`)

  const compute = new Compute();
  const zone = compute.zone(instanceZone)
  const vm = zone.vm(instanceName)

  await vm.waitFor('TERMINATED').catch(console.error)
  const [operation] = await vm.start().catch(console.error)

  operation.on('complete', () => {
    console.log(`instance name ${instanceName} in zone ${instanceZone} has been running`)
  });
  return null;
});
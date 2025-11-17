import mqtt from 'mqtt';

const mqttServer = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
const mqttClient = mqtt.connect(mqttServer);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('devices/+/+', { qos: 1 }, (err) => {
    if (err) console.error('Subscribe error', err);
    else console.log('Subscribed to all devices');
  });
});

export default mqttClient;

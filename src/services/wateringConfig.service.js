import {
  findFirstWateringConfig,
  updateWateringConfig,
} from '../repositories/wateringConfig.repository.js';
import mqttClient from '../libs/mqttClient.js';

export const getWateringConfig = async () => {
  return await findFirstWateringConfig();
};

export const updateExistingWateringConfig = async (configData) => {
  const existingConfig = await findFirstWateringConfig();
  if (!existingConfig) {
    const error = new Error('Watering configuration not found');
    error.status = 404;
    throw error;
  }

  // publish updated config to MQTT broker
  mqttClient.publish('server/watering_config', JSON.stringify(configData));

  return await updateWateringConfig(existingConfig.id, configData);
};

// mengirim data untuk menyiram sekarang melalui mqtt
export const sendWaterNow = async () => {
  mqttClient.publish('server/water_now', JSON.stringify({ command: 'water_now' }));
};

import {
  findFirstWaterCapacityConfig,
  updateWaterCapacityConfig,
} from '../repositories/waterCapacityConfig.repository.js';
// import mqttClient from '../libs/mqttClient.js';

export const getWaterCapacityConfig = async () => {
  return await findFirstWaterCapacityConfig();
};

export const updateExistingWaterCapacityConfig = async (configData) => {
  const existingConfig = await findFirstWaterCapacityConfig();
  if (!existingConfig) {
    const error = new Error('Water capacity configuration not found');
    error.status = 404;
    throw error;
  }

  // publish updated config to MQTT broker
  // mqttClient.publish('server/water_capacity_config', JSON.stringify(configData));

  return await updateWaterCapacityConfig(existingConfig.id, configData);
};

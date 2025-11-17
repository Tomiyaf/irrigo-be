import {
  findAllLightIntensityLogsByDeviceId,
  createLightIntensityLog,
} from '../repositories/lightIntensityLog.repository.js';
import { findDeviceById } from '../repositories/device.repository.js';
import { broadcast } from './websocket.service.js';

export const getAllLightIntensityLogsByDeviceId = async (deviceId) => {
  const device = await findDeviceById(deviceId);
  if (!device) {
    const error = new Error('Device not found');
    error.status = 404;
    throw error;
  }
  return await findAllLightIntensityLogsByDeviceId(deviceId);
};

export const createNewLightIntensityLog = async (value) => {
  const device = await findDeviceById(value.device_id);
  if (!device) {
    const error = new Error('Device not found');
    error.status = 404;
    throw error;
  }
  let status = 'normal';
  if (value.light_value < 200 && value.light_value >= 0) {
    status = 'low';
  } else if (value.light_value >= 200 && value.light_value <= 800) {
    status = 'normal';
  } else if (value.light_value > 800) {
    status = 'high';
  } else {
    const error = new Error('Invalid light value');
    error.status = 400;
    throw error;
  }

  broadcast({
    type: 'light_intensity_log',
    device_id: value.device_id,
    lux: value.light_value,
    status: status,
    timestamp: new Date(),
  });

  return await createLightIntensityLog(value);
};

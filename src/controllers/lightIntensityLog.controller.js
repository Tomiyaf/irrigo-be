import { getAllLightIntensityLogsByDeviceId } from '../services/lightIntensityLog.service.js';

export const fetchLightIntensityLogsByDeviceId = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const logs = await getAllLightIntensityLogsByDeviceId(Number(deviceId));
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

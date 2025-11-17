import {
  getWaterCapacityConfig,
  updateExistingWaterCapacityConfig,
} from '../services/waterCapacityConfig.service.js';
import { waterCapacityConfigSchema } from '../validators/waterCapacityConfig.js';

export const fetchWaterCapacityConfig = async (req, res) => {
  try {
    const config = await getWaterCapacityConfig();
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const modifyWaterCapacityConfig = async (req, res) => {
  const configData = req.body;
  try {
    const { error, value } = waterCapacityConfigSchema.validate(configData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const updatedConfig = await updateExistingWaterCapacityConfig(value);
    res.status(200).json({ success: true, data: updatedConfig });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

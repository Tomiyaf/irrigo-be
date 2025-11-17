import {
  getWateringConfig,
  updateExistingWateringConfig,
  sendWaterNow,
} from '../services/wateringConfig.service.js';
import { wateringConfigSchema } from '../validators/wateringConfig.js';

export const fetchWateringConfig = async (req, res) => {
  try {
    const config = await getWateringConfig();
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const modifyWateringConfig = async (req, res) => {
  const configData = req.body;
  try {
    const { error, value } = wateringConfigSchema.validate(configData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const updatedConfig = await updateExistingWateringConfig(value);
    res.status(200).json({ success: true, data: updatedConfig });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const triggerWaterNow = async (req, res) => {
  try {
    await sendWaterNow();
    res.status(200).json({ success: true, message: 'Watering triggered' });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

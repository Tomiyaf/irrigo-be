import express from 'express';
import {
  fetchWateringConfig,
  modifyWateringConfig,
  triggerWaterNow,
} from '../controllers/wateringConfig.controller.js';

const router = express.Router();

router.get('/', fetchWateringConfig);
router.patch('/', modifyWateringConfig);
router.post('/water-now', triggerWaterNow);

export default router;

import express from 'express';
import {
  fetchWaterCapacityConfig,
  modifyWaterCapacityConfig,
} from '../controllers/waterCapacityConfig.controller.js';

const router = express.Router();

router.get('/', fetchWaterCapacityConfig);
router.patch('/', modifyWaterCapacityConfig);

export default router;

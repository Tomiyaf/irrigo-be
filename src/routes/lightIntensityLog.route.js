import express from 'express';
import { fetchLightIntensityLogsByDeviceId } from '../controllers/lightIntensityLog.controller.js';

const router = express.Router();

router.get('/:deviceId', fetchLightIntensityLogsByDeviceId);

export default router;

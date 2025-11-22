import {
  fetchAllDevices,
  addDevice,
  modifyDevice,
  removeDevice,
} from '../controllers/device.controller.js';
import express from 'express';

const router = express.Router();

router.get('/', fetchAllDevices);
router.post('/', addDevice);
router.patch('/:id', modifyDevice);
router.delete('/:id', removeDevice);

export default router;

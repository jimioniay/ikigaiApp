import express from 'express';
import {
  checkSignature,
  generateAuth,
  verifyToken,
  logPayment,
  verifySecret,
} from '../middleware';
import { makePayment, verifyPayment, raveWebhook } from '../controller';

const router = express.Router();

router.get('/initiate', checkSignature, generateAuth);
router.post('/pay', verifyToken, logPayment, makePayment);
router.post('/verify', verifyPayment);
router.post('/webhooks/flutterwave', verifySecret, raveWebhook);

module.exports = router;

import express from 'express';
import {
  checkSignature,
  redirectToClient,
  verifyToken,
  logPayment,
  verifySecret,
} from '../middleware';
import { makePayment, verifyPayment, raveWebhook } from '../controller';
const router = express.Router();

router.get('/initiate', checkSignature, redirectToClient);
router.post('/pay', verifyToken, logPayment, makePayment);
router.post('/verify', verifyPayment);
router.post('/rave/webhooks', verifySecret, raveWebhook);

module.exports = router;

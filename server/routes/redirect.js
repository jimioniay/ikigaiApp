import express from 'express';
import { flutterwaveRedirect, officeRnDRedirect } from '../middleware';

const router = express.Router();

router.post('/flutterwave', flutterwaveRedirect);
router.post('/officeRnD', officeRnDRedirect);

module.exports = router;

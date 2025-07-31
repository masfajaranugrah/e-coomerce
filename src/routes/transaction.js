import express from 'express';
const router = express.Router();
import { createPaymentController } from '../controllers/transactionController.js';

router.post('/', createPaymentController);

export default router;

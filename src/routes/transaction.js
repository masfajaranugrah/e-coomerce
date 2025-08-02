import express from 'express';
const router = express.Router();

import {
  createPaymentController,
  midtransNotificationController
} from '../controllers/transactionController.js';
 
/**
 * @openapi
 * /api/v1/transactions:
 *   post:
 *     summary: Membuat transaksi dan generate Snap Token Midtrans
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: f188160e-59c3-456e-bf8e-69e8cac1fb26
 *     responses:
 *       200:
 *         description: Snap token berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 snapToken:
 *                   type: string
 *                   example: 123abc-snap-token-midtrans
 */
router.post('/', createPaymentController);

/**
 * @openapi
 * /api/v1/transactions/payment/notification:
 *   post:
 *     summary: Webhook Midtrans untuk update status pembayaran
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *               transaction_status:
 *                 type: string
 *               fraud_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notifikasi diproses dan status transaksi diperbarui
 */
router.post('/payment/notification', midtransNotificationController);

export default router;

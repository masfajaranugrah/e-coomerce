import crypto from 'crypto';
import midtransClient from 'midtrans-client';

export default async function HandleMidtransNotification(payload, { transactionRepository }) {
  const { order_id, status_code, gross_amount, signature_key } = payload;

  if (!order_id || !status_code || !gross_amount || !signature_key) {
    throw new Error('Missing required fields');
  }

  if (order_id.startsWith('payment_notif_test_')) {
    return { status: 'ignored' };
  }

  // Validasi signature Midtrans
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const expectedSignature = crypto
    .createHash('sha512')
    .update(order_id + status_code + parseFloat(gross_amount).toFixed(2) + serverKey)
    .digest('hex');

  if (expectedSignature !== signature_key) {
    throw new Error('Invalid signature');
  }

  const transaksi = await transactionRepository.findByOrderId(order_id);
  if (!transaksi) {
    throw new Error('Order ID not found');
  }

  const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey,
  });

  const { transaction_status, fraud_status, payment_type } = await coreApi.transaction.status(order_id);

  let status = 'pending';
  if (transaction_status === 'settlement' && fraud_status === 'accept') {
    status = 'success';
  } else if (transaction_status === 'expire') {
    status = 'expired';
  } else if (transaction_status === 'cancel') {
    status = 'canceled';
  }

  await transactionRepository.updateStatus(order_id, { status, metode: payment_type });

  return { status };
}

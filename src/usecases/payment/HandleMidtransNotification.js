import crypto from 'crypto';
import midtransClient from 'midtrans-client';
 export default async function HandleMidtransNotification(payload, { transactionRepository }) {
  const { order_id, status_code, gross_amount, signature_key } = payload;

  if (!order_id || !status_code || !gross_amount || !signature_key) {
    throw new Error('Payload Midtrans tidak lengkap.');
  }

  // Abaikan test notification
  if (order_id.startsWith('payment_notif_test_')) {
    return { status: 'ignored', reason: 'test notification' };
  }

  // Validasi signature Midtrans
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const rawSignature = `${order_id}${status_code}${gross_amount}${serverKey}`;
  const expectedSignature = crypto.createHash('sha512').update(rawSignature).digest('hex');

  if (expectedSignature !== signature_key) {
    throw new Error('Signature Midtrans tidak valid.');
  }

  // Cek transaksi di database
  const transaction = await transactionRepository.findByOrderId(order_id);
  if (!transaction) {
    throw new Error(`Transaksi dengan order_id ${order_id} tidak ditemukan.`);
  }

  // Ambil status terbaru dari Midtrans
  const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  const midtransStatus = await coreApi.transaction.status(order_id);
  const {
    transaction_status,
    fraud_status,
    payment_type,
  } = midtransStatus;

  // Mapping status Midtrans ke sistem internal
let status;

if (transaction_status === 'settlement' && fraud_status === 'accept') {
  status = 'paid';
} else if (transaction_status === 'capture') {
  status = fraud_status === 'challenge' ? 'pending' : 'paid';
} else if (
  transaction_status === 'cancel' ||
  transaction_status === 'expire' ||
  transaction_status === 'deny'
) {
  status = 'failed';
} else {
  status = 'pending'; // default/fallback
}


  // Update database
  await transactionRepository.updateStatus(order_id, {
    status,
    metode: payment_type,
  });

  return {
    success: true,
    message: `Status transaksi diperbarui menjadi '${status}'`,
    order_id,
    status,
    metode: payment_type,
  };
}

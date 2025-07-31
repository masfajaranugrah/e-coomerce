import { v4 as uuidv4 } from 'uuid';
import productRepository from '../../repositories/productRepository.js';
import transactionRepository from '../../repositories/transactionRepository.js';
import snap from '../../config/midtrans.js';

export default async function createPaymentUse(productId) {
  const product = await productRepository.getProductById(productId);
  if (!product) throw new Error('Produk tidak ditemukan');

  const transactionId = uuidv4(); 

  const parameter = {
    transaction_details: {
      order_id: transactionId,
      gross_amount: product.price,
    },
    item_details: [
      {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
      },
    ],
  };

  let snapResponse;
  try {
    snapResponse = await snap.createTransaction(parameter);
  } catch (err) {
    console.error(err);
    throw new Error('Gagal membuat transaksi dengan Midtrans.');
  }

  await transactionRepository.createPayments({  
    id: transactionId,
    productId: product.id,
    amount: product.price,
    status: 'PENDING',
    snapToken: snapResponse.token,
  });

  return {
    orderId: transactionId,
    snapToken: snapResponse.token,
    redirect_url: snapResponse.redirect_url,
  };
}

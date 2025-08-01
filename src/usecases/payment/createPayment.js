import { v4 as uuidv4 } from 'uuid';
import productRepository from '../../repositories/productRepository.js';
import userRepository from '../../repositories/userRepository.js';
import transactionRepository from '../../repositories/transactionRepository.js';
import snap from '../../config/midtrans.js';

export default async function createPaymentUse(items, userId) {
  // Validasi user
  const user = await userRepository.getUserById(userId);
  if (!user) throw new Error('User tidak ditemukan');

  // Ambil semua productId dari items
  const productIds = items.map(item => item.productId);
  const foundProducts = await productRepository.getProductsByIds(productIds);
  if (foundProducts.length !== productIds.length) {
    throw new Error('Satu atau lebih produk tidak ditemukan');
  }

  // Hitung totalAmount dan siapkan itemDetails untuk Midtrans
  let totalAmount = 0;
  const itemDetails = items.map(item => {
    const product = foundProducts.find(p => p.id === item.productId);
    if (!product) throw new Error('Produk tidak ditemukan');

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    // Simpan harga ke item untuk dipakai saat insert ke DB
    item.price = product.price;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };
  });

  // Buat transaksi ID unik
  const transactionId = uuidv4();

  // Parameter Midtrans
  const parameter = {
    transaction_details: {
      order_id: transactionId,
      gross_amount: totalAmount,
    },
    customer_details: {
      first_name: user.name,
      email: user.email,
      phone: user.phone,
    },
    item_details: itemDetails,
  };

  // Buat transaksi di Midtrans
  let snapResponse;
  try {
    snapResponse = await snap.createTransaction(parameter);
  } catch (err) {
    console.error('Midtrans Error:', err.message);
    throw new Error('Gagal membuat transaksi dengan Midtrans.');
  }

  // Simpan transaksi utama
  await transactionRepository.createPayments({
    id: transactionId,
    order_id: transactionId,
    userId,
    amount: totalAmount,
    status: 'pending',
    snapToken: snapResponse.token,
  });

  // Simpan detail transaksi per item
  for (const item of items) {
    await transactionRepository.createTransactionItem({
      transactionId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    });
  }

  return {
    orderId: transactionId,
    snapToken: snapResponse.token,
    redirect_url: snapResponse.redirect_url,
  };
}

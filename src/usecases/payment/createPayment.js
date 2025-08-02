 import { v4 as uuidv4 } from 'uuid';
import productRepository from '../../repositories/productRepository.js';
import userRepository from '../../repositories/userRepository.js';
import transactionRepository from '../../repositories/transactionRepository.js';
import snap from '../../config/midtrans.js';

export default async function createPaymentUse(items, userId) {
  const user = await userRepository.getUserById(userId);
  if (!user) throw new Error('User tidak ditemukan');

  const productIds = items.map(item => item.productId);
  const foundProducts = await productRepository.getProductsByIds(productIds);
  if (foundProducts.length !== productIds.length) {
    throw new Error('Satu atau lebih produk tidak ditemukan');
  }
  
  for (const item of items) {
    const product = foundProducts.find(p => p.id === item.productId);
    if (!product) throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`);
    
    if (product.stock <= 0) {
      throw new Error(`Stok produk "${product.name}" habis`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Stok produk "${product.name}" hanya tersedia ${product.stock}, tidak cukup untuk ${item.quantity}`);
    }
  }
  let totalAmount = 0;
  const itemDetails = items.map(item => {
    const product = foundProducts.find(p => p.id === item.productId);
    if (!product) throw new Error('Produk tidak ditemukan');

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    item.price = product.price;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };
  });

   
  const feePercentage = 0.03; // 3%
  const feeAmount = Math.ceil(totalAmount * feePercentage); // bulatkan ke atas

  itemDetails.push({
    id: 'admin-fee',
    name: 'Biaya Transaksi',
    price: feeAmount,
    quantity: 1
  });

  const grossAmount = totalAmount + feeAmount;
  const transactionId = uuidv4();

  const parameter = {
    transaction_details: {
      order_id: transactionId,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: user.name,
      email: user.email,
      phone: user.phone,
    },
    item_details: itemDetails,
  };

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
    amount: grossAmount,
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

  
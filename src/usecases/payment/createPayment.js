import { v4 as uuidv4 } from 'uuid';
import productRepository from '../../repositories/productRepository.js';
import userRepository from '../../repositories/userRepository.js';
import transactionRepository from '../../repositories/transactionRepository.js';
import snap from '../../config/midtrans.js';
import axios from 'axios';

// export default async function createPaymentUse(items, userId, shipping, coupon) {
//   const user = await userRepository.getUserById(userId);
//   if (!user) throw new Error('User tidak ditemukan');

//   // Cek produk
//   const productIds = items.map(item => item.productId);
//   const foundProducts = await productRepository.getProductsByIds(productIds);
//   if (foundProducts.length !== productIds.length) {
//     throw new Error('Satu atau lebih produk tidak ditemukan');
//   }

//   for (const item of items) {
//     const product = foundProducts.find(p => p.id === item.productId);
//     if (!product) throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`);
//     if (product.stock <= 0) {
//       throw new Error(`Stok produk "${product.name}" habis`);
//     }
//     if (product.stock < item.quantity) {
//       throw new Error(`Stok produk "${product.name}" hanya tersedia ${product.stock}`);
//     }
//   }

//   // Hitung total produk
//   let totalAmount = 0;
//   const itemDetails = items.map(item => {
//     const product = foundProducts.find(p => p.id === item.productId);
//     const itemTotal = product.price * item.quantity;
//     totalAmount += itemTotal;
//     item.price = product.price;
//     return {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: item.quantity
//     };
//   });

//   // === Ongkir (ambil dari API Komerce) ===
//   const { origin, destination, weight, courier } = shipping;
//   let shippingCost = 0;
//   let selectedCourierLabel = '';

//   try {
//     const { data: response } = await axios.get(
//       process.env.RAJAONGKIR_BASE_URL_TEST,
//       {
//         params: {
//           origin,
//           destination,
//           weight,
//           courier
//         }
//       }
//     );

//     if (response.success && Array.isArray(response.data)) {
//       const allOptions = response.data;

//        const selected = allOptions.find(opt => opt.courier.toLowerCase() === courier.toLowerCase());

//       if (!selected) {
//         throw new Error(`Layanan kurir "${courier}" tidak tersedia`);
//       }

//       shippingCost = selected.cost;
//       selectedCourierLabel = `${selected.courier} - ${selected.service}`;

//       itemDetails.push({
//         id: 'shipping-cost',
//         name: `Ongkir - ${selectedCourierLabel}`,
//         price: shippingCost,
//         quantity: 1
//       });
//     } else {
//       throw new Error('Data ongkir kosong atau gagal');
//     }
//   } catch (err) {
//     console.error('❌ Shipping API Error:', err.message);
//     throw new Error('Gagal mengambil ongkos kirim dari Komerce API');
//   }

//   // === Admin Fee ===
//   const feePercentage = 0.03;
//   const feeAmount = Math.ceil(totalAmount * feePercentage);
//   itemDetails.push({
//     id: 'admin-fee',
//     name: 'Biaya Transaksi',
//     price: feeAmount,
//     quantity: 1
//   });

//   const grossAmount = totalAmount + shippingCost + feeAmount;
//   const transactionId = uuidv4();

//   const parameter = {
//     transaction_details: {
//       order_id: transactionId,
//       gross_amount: grossAmount,
//     },
//     customer_details: {
//       first_name: user.name,
//       email: user.email,
//       phone: user.phone,
//     },
//     item_details: itemDetails,
//   };

//   let snapResponse;
//   try {
//     snapResponse = await snap.createTransaction(parameter);
//   } catch (err) {
//     console.error('Midtrans Error:', err.message);
//     throw new Error('Gagal membuat transaksi dengan Midtrans.');
//   }

//   // Simpan transaksi utama
//   await transactionRepository.createPayments({
//     id: transactionId,
//     order_id: transactionId,
//     userId,
//     amount: grossAmount,
//     status: 'pending',
//     snapToken: snapResponse.token,
//   });

//   // Simpan transaksi per item
//   for (const item of items) {
//     await transactionRepository.createTransactionItem({
//       transactionId,
//       productId: item.productId,
//       quantity: item.quantity,
//       price: item.price,
//     });
//   }

//   return {
//     orderId: transactionId,
//     snapToken: snapResponse.token,
//     redirect_url: snapResponse.redirect_url,
//     courier_used: selectedCourierLabel,
//     shipping_cost: shippingCost,
//     total: grossAmount
//   };
// }

import couponRepository from '../../repositories/couponRepository.js';

export default async function createPaymentUse(items, userId, shipping, coupon) {
  const user = await userRepository.getUserById(userId);
  if (!user) throw new Error('User tidak ditemukan');
  console.log('User ditemukan:', coupon);
  // Cek produk
  const productIds = items.map(item => item.productId);
  const foundProducts = await productRepository.getProductsByIds(productIds);
  if (foundProducts.length !== productIds.length) {
    throw new Error('Satu atau lebih produk tidak ditemukan');
  }

  // Validasi stok
  for (const item of items) {
    const product = foundProducts.find(p => p.id === item.productId);
    if (!product) throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan`);
    if (product.stock <= 0) throw new Error(`Stok produk "${product.name}" habis`);
    if (product.stock < item.quantity) {
      throw new Error(`Stok produk "${product.name}" hanya tersedia ${product.stock}`);
    }
  }

  // Hitung subtotal produk
  let totalAmount = 0
   
  const itemDetails = items.map(item => {
    const product = foundProducts.find(p => p.id === item.productId);
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

  // Ongkir
  const { origin, destination, weight, courier } = shipping;
  let shippingCost = 0;
  let selectedCourierLabel = '';

  try {
    const { data: response } = await axios.get(
      process.env.RAJAONGKIR_BASE_URL_TEST,
      { params: { origin, destination, weight, courier } }
    );

    if (response.success && Array.isArray(response.data)) {
      const selected = response.data.find(opt => opt.courier.toLowerCase() === courier.toLowerCase());
      if (!selected) throw new Error(`Kurir "${courier}" tidak tersedia`);
      shippingCost = selected.cost;
      selectedCourierLabel = `${selected.courier} - ${selected.service}`;

      itemDetails.push({
        id: 'shipping-cost',
        name: `Ongkir - ${selectedCourierLabel}`,
        price: shippingCost,
        quantity: 1
      });
    } else {
      throw new Error('Data ongkir kosong');
    }
  } catch (err) {
    console.error('❌ Shipping API Error:', err.message);
    throw new Error('Gagal mengambil ongkir');
  }

  // === Biaya Admin ===
  const feePercentage = 0.03;
  const feeAmount = Math.ceil(totalAmount * feePercentage);
  itemDetails.push({
    id: 'admin-fee',
    name: 'Biaya Transaksi',
    price: feeAmount,
    quantity: 1
  });

// === Diskon Kupon ===
let discountAmount = 0;
let foundCoupon = null; // <- dideklarasi di sini agar global dalam fungsi

console.log('Kupon:', coupon);

if (coupon && coupon.code) {
  foundCoupon = await couponRepository.getByCode(coupon.code);

  if (!foundCoupon) {
    throw new Error("Kupon tidak ditemukan");
  }

  if (
    foundCoupon.used_count >= foundCoupon.usage_limit ||
    foundCoupon.is_expired ||
    new Date() > new Date(foundCoupon.expires_at)
  ) {
    throw new Error("Kupon tidak bisa digunakan");
  }

  // Hitung diskon
  if (foundCoupon.type === "percent") {
    discountAmount = Math.floor(totalAmount * (foundCoupon.amount / 100));
  } else if (foundCoupon.type === "fixed") {
    discountAmount = foundCoupon.amount;
  }

  if (discountAmount > totalAmount) {
    discountAmount = totalAmount;
  }

  itemDetails.push({
    id: 'discount',
    name: `Diskon Kupon (${coupon.code})`,
    price: -discountAmount,
    quantity: 1
  });
}


  // === Hitung total akhir ===
  const grossAmount = totalAmount + shippingCost + feeAmount - discountAmount;

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
    throw new Error('Gagal membuat transaksi Midtrans');
  }

  // save main trnascation 
await transactionRepository.createPayments({
  id: transactionId,
  order_id: transactionId,
  userId,
  amount: grossAmount,
  status: 'pending',
  snapToken: snapResponse.token,
  couponId: foundCoupon?.id || null 
});


// save transaction for each item
for (const item of items) {
  await transactionRepository.createTransactionItem({
    transactionId,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  });
}

console.log(`Transaksi berhasil dibuat: ${foundCoupon}`)
  // Update kupon usage
if (coupon) {
await couponRepository.incrementUsedCount(foundCoupon.id);
}

  return {
    orderId: transactionId,
    snapToken: snapResponse.token,
    redirect_url: snapResponse.redirect_url,
    courier_used: selectedCourierLabel,
    shipping_cost: shippingCost,
    discount: discountAmount,
    total: grossAmount,
    total_discount: discountAmount
  };
}

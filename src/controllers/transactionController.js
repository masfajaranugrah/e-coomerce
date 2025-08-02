// controllers/paymentController.js
import createPaymentUse from "../usecases/payment/createPayment.js";
import { Users, Transaction, Product, TransactionItem } from '../models/index.js';
import HandleMidtransNotification from "../usecases/payment/HandleMidtransNotification.js";
import transactionRepository from "../repositories/transactionRepository.js";
import productRepository from "../repositories/productRepository.js";
// [POST] Buat transaksi pembayaran
const createPaymentController = async (req, res) => {
  try {
    const { userId, products, shipping } = req.body;
     if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'userId dan minimal satu product wajib disertakan',
      });
    }

    const result = await createPaymentUse(products, userId, shipping);  

    return res.status(201).json({ success: true, data: result });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
};




// [GET] Ambil detail user + riwayat transaksi (dengan produk)
const getUserWithTransactions = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Users.findByPk(userId, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Transaction,
          as: 'transactions',
          attributes: ['id', 'amount', 'status'],
          include: [
            {
              model: TransactionItem,
              as: 'items',
              attributes: ['quantity'],
              include: [
                {
                  model: Product,
                  as: 'product',
                  attributes: ['name', 'description']
                }
              ]
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const result = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      transactions: user.transactions.map((trx) => ({
        id: trx.id,
        amount: trx.amount,
        status: trx.status,
        items: trx.items.map((item) => ({
          quantity: item.quantity,
          price: item.price,
          product: {
            name: item.product?.name || null,
            description: item.product?.description || null,
          }
        }))
      }))
    };

    return res.json({ success: true, data: result });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const midtransNotificationController = async (req, res) => {
   try {
    const result = await HandleMidtransNotification(req.body, { 
       transactionRepository,
  productRepository,
     });
    return res.status(200).json({ success: true, status: result.status });
  } catch (err) {
    console.error('Midtrans Notification Error:', err.message);
    return res.status(400).json({ success: false, message: err.message });
  }
};

export {
  createPaymentController,
  getUserWithTransactions,
  midtransNotificationController
};

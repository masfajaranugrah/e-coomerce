import userRepository from "../../repositories/userRepository.js";
import User from '../../domain/entities/user.entity.js';

export const getByIdUser = async (userId) => {
  try {
    const rawUser = await userRepository.getUserById(userId);
    if (!rawUser) {
      throw new Error('User not found');
    }

    const user = User.fromDatabase(rawUser);

    // Proses transaksi
    const transactions = (rawUser.transactions || []).map(tx => ({
      id: tx.id,
      status: tx.status,
      amount: tx.amount,
      snapToken: tx.snapToken,
      createdAt: tx.createdAt,
      updatedAt: tx.updatedAt,
      products: (tx.products || []).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.TransactionProduct?.quantity ?? 1
      }))
    }));

    const result = {
      ...user.toJSON(),
      payment_history: transactions
    };

    return result;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

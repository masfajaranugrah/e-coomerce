import Users from './userModel.js';
import Product from './productModel.js';
import Transaction from './transactionModel.js';
import TransactionItem from './transactionItemModel.js';

// Users - Transaction
Users.hasMany(Transaction, { as: 'transactions', foreignKey: 'userId' });
Transaction.belongsTo(Users, { as: 'user', foreignKey: 'userId' });

// Transaction - TransactionItem
Transaction.hasMany(TransactionItem, { as: 'items', foreignKey: 'transactionId' });
TransactionItem.belongsTo(Transaction, { as: 'transaction', foreignKey: 'transactionId' });

// TransactionItem - Product
TransactionItem.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
Product.hasMany(TransactionItem, { as: 'items', foreignKey: 'productId' });


export {
  Users,
  Product,
  Transaction,
  TransactionItem
};

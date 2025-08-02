import transactionModel from "../models/transactionModel.js";
import TransactionItem from "../models/transactionItemModel.js";
import Product from "../models/productModel.js";


class TransactionRepository {
  async createPayments(dataTransaction) {
    return await transactionModel.create(dataTransaction);
  }

    async createTransactionItem(data) {
    return await TransactionItem.create(data);
  }


  async updatePayment(id, status) {
    return await transactionModel.update(
      { status },
      { where: { id } }
    );
  }

  async findById(id) {
    return await transactionModel.findByPk(id);
  }
 
  async findByOrderId(order_id) {
    return await transactionModel.findOne({ where: { order_id } });
  }

  
  async updateStatus(order_id, data) {
    return await transactionModel.update(data, {
      where: { order_id },
    });
  }
 
  async  getTransactionItemsByTransactionId(transactionId) {
  return await TransactionItem.findAll({
    where: { transactionId },
    include: [
      {
        model: Product,
        as: 'product',
      }
    ]
  });
}
}

export default new TransactionRepository();

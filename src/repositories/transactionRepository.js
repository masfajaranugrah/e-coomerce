import transactionModel from "../models/transactionModel.js";

class TransactionRepository {
  async createPayments(dataTransaction) {
    return await transactionModel.create(dataTransaction);
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
}

export default new TransactionRepository();

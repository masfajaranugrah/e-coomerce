class Transaction {
  constructor({
    id,
    userId,
    productId,
    quantity,
    totalAmount,
    status,  
    snapToken,
    orderId,
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.totalAmount = totalAmount;
    this.status = status;
    this.snapToken = snapToken;
    this.orderId = orderId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Transaction;

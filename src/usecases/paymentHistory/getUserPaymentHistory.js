export default function getUserPaymentHistory(paymentHistoryRepo) {
  return async function (userId) {
    return await paymentHistoryRepo.getAllByUserId(userId);
  };
}

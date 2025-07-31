export default async function GetTransactionByUser(userId, { transactionRepository }) {
  return await transactionRepository.findByUserId(userId);
}

import { Router } from 'express';
import { getAllUserController, updateUserController, deleteUserController, getByIdUserController} from '../controllers/userController.js';
 import { getUserWithTransactions } from '../controllers/transactionController.js';
const router = Router();

 /**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan semua users
 */
router.get('/', getAllUserController);
router.get('/:id', getByIdUserController); 
router.get('/:id/payment-history', getUserWithTransactions);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);
 

export default router;
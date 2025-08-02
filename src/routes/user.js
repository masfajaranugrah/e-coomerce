import { Router } from 'express';
import { getAllUserController, updateUserController, deleteUserController, getByIdUserController} from '../controllers/userController.js';
import { getUserWithTransactions } from '../controllers/transactionController.js';
const router = Router();

import { authenticate } from '../middlewares/authenticate.js';  
router.use(authenticate);


 
router.get('/', getAllUserController);
router.get('/:id', getByIdUserController); 
router.get('/:id/payment-history', getUserWithTransactions);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);
 

export default router;
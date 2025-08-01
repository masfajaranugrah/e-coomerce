import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getByIdProductController,
  updateProductController
} from '../controllers/productController.js';

import { authenticate } from '../middlewares/authenticate.js';  

const router = Router();

 
router.use(authenticate);

router.get('/', getAllProductController);
router.get('/:id', getByIdProductController);
router.post('/', createProductController);
router.patch('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export default router;

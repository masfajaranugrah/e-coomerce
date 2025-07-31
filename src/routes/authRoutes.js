import express from 'express';
import {
  loginController,
  registerController,
  refreshTokenController,
  logoutController
} from '../controllers/auth/authController.js';
import { authMiddleware } from '../middlewares/authenticate.js';

const router = express.Router();

 router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshTokenController);

 router.post('/logout', authMiddleware, logoutController);

export default router;

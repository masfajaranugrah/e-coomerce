import express from 'express';
import {
  loginController,
  registerController,
  refreshTokenController,
  logoutController,
  verifyCodeController,
  resendCodeController
} from '../controllers/auth/authController.js';
 
const router = express.Router();

 router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshTokenController);

 router.post('/logout', logoutController);
router.post('/verify', verifyCodeController); // untuk verifikasi kode manual
router.post('/resend-code', resendCodeController); // untuk kirim ulang
export default router;

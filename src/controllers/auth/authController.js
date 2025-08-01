import { loginUser } from "../../usecases/auth/loginUser.js";
import { registerUser } from "../../usecases/auth/registerUser.js";
import { refreshAccessToken } from "../../usecases/auth/refreshAccessToken.js";
import { logoutUser } from "../../usecases/auth/logoutUser.js";
import {verifyCodeUseCase} from '../../usecases/auth/verifyCodeUseCase.js';
import {resendCodeUseCase} from '../../usecases/auth/resendCodeUseCase.js';

const registerController = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const result = await loginUser(req.body, res);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const result = await refreshAccessToken(req.body.token);
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const logoutController = async (req, res) => {
  try {
    await logoutUser(req, res);
    res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    res.status(400).json({ message: 'Logout gagal' });
  }
};



  const verifyCodeController = async (req, res) => {
  const { email, code } = req.body;
  try {
    const result = await verifyCodeUseCase(email, code);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

  const resendCodeController = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await resendCodeUseCase(email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
  verifyCodeController,
  resendCodeController

};

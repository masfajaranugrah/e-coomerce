import { loginUser } from "../../usecases/auth/loginUser.js";
import { registerUser } from "../../usecases/auth/registerUser.js";
import { refreshAccessToken } from "../../usecases/auth/refreshAccessToken.js";
import { logoutUser } from "../../usecases/auth/logoutUser.js";

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
    await logoutUser(req.body.token, res);
    res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    res.status(400).json({ message: 'Logout gagal' });
  }
};

export {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};

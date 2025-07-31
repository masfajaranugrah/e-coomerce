import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userRepository from '../../repositories/userRepository.js';

export const refreshTokens = new Set();

export const loginUser = async ({ email, password }, res) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw { status: 404, message: 'User not found' };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: 'Password salah' };

  const payload = { id: user.id, role: user.role };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  refreshTokens.add(refreshToken);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 10 * 60 * 1000,
    sameSite: 'Strict'
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'Strict'
  });

  return {
    message: 'Login berhasil',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone_number: user.phone_number,
      avatar_url: user.avatar_url,
    },
    accessToken,
    refreshToken
  };
};

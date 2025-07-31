import jwt from 'jsonwebtoken';
import { refreshTokens } from './loginUser.js';

export const refreshAccessToken = async (token) => {
  if (!token || !refreshTokens.has(token)) {
    throw new Error('Refresh token tidak valid');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return reject(new Error('Token tidak valid'));

      const newAccessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
      });

      resolve({ accessToken: newAccessToken });
    });
  });
};

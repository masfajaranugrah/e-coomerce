import { refreshTokens } from './loginUser.js';

export const logoutUser = async (token, res) => {
  if (!token || !refreshTokens.has(token)) {
    throw new Error('Refresh token tidak valid');
  }

  refreshTokens.delete(token);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};

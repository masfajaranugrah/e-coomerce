import { refreshTokens } from './loginUser.js';

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken || !refreshTokens.has(refreshToken)) {
      return res.status(400).json({ message: 'Refresh token tidak valid atau sudah logout' });
    }

    // Hapus dari store
    refreshTokens.delete(refreshToken);

    // Hapus cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Logout berhasil' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Logout gagal' });
  }
};

import { refreshTokens } from './loginUser.js';

export const logoutUser = async (req, res) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ message: 'sudah logout' });
    }

    // Cek apakah token masih ada di memory store
    if (!refreshTokens.has(refreshToken)) {
      // Tetap hapus semua cookies meskipun token sudah tidak valid
      for (const name in cookies) {
        if (name.toLowerCase().includes('token')) {
          res.clearCookie(name, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          });
        }
      }

      return res.status(400).json({ message: 'sudah logout sebelumnya' });
    }

    // Hapus token dari store
    refreshTokens.delete(refreshToken);

    // Hapus semua cookies yang mengandung token
    for (const name in cookies) {
      if (name.toLowerCase().includes('token')) {
        res.clearCookie(name, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });
      }
    }

    return res.status(200).json({ message: 'Logout berhasil.' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Logout gagal karena kesalahan server' });
  }
};

import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Anda belum login. Silakan login untuk melanjutkan' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Sesi Anda telah berakhir. Silakan login kembali.' });
    }
};


export const authenticate = (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Anda belum login. Silakan login untuk melanjutkan.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: 'Sesi Anda telah berakhir. Silakan login kembali.' });
    }

    req.user = decodedUser;  
    next();
  });
};

export const refreshTokenMiddleware = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'Sesi tidak ditemukan. Silakan login ulang.' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Sesi Anda sudah tidak berlaku. Silakan login kembali.' });

    // Buat accessToken baru
    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000 // 15 menit
    });

    res.json({ success: true });
  });
};

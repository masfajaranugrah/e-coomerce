 import dayjs from 'dayjs';
import authRepository from '../../repositories/authRepository.js';

export const resendCodeUseCase = async (email) => {
  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error('User tidak ditemukan');

  if (user.is_verified) throw new Error('Akun sudah terverifikasi');
 
  const newToken =  Math.floor(100000 + Math.random() * 900000).toString();
  const newExpiry = dayjs().add(1, 'hour').toDate();

  await authRepository.markVerified(email, {
    verification_token: newToken,
    verification_token_expiry: newExpiry,
  });

  // Kalau pakai email, bisa tambahkan:
  // await sendEmail(email, `Kode verifikasi baru Anda adalah: ${newToken}`);

  return { message: 'Kode verifikasi baru berhasil dikirim.', token: newToken };
};

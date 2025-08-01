import authRepository from '../../repositories/authRepository.js';

export const verifyCodeUseCase = async (email, code) => {
  if (!email || !code) {
    throw new Error('Email dan kode verifikasi wajib diisi');
  }

  const user = await authRepository.findByEmail(email);
  if (!user) throw new Error('User tidak ditemukan');

  if (user.is_verified) throw new Error('Akun sudah terverifikasi');

  
  if (user.verification_token !== code) {
    throw new Error('Kode verifikasi tidak sesuai');
  }

   
  const now = new Date();
  if (!user.verification_token_expiry || user.verification_token_expiry < now) {
    throw new Error('Kode verifikasi sudah kedaluwarsa');
  }
 
  await authRepository.markVerified(email, {
    is_verified: true,
    verification_token: null,
    verification_token_expiry: null,
  });

  return { message: 'Verifikasi berhasil' };
};

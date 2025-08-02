import bcrypt from 'bcrypt';
 import dayjs from 'dayjs';  
import authRepository from '../../repositories/authRepository.js';
import User from '../../domain/entities/user.entity.js';  

export const registerUser = async ({ name, email, password, password_verify, phone_number }) => {
  if (!name || !email || !password || !phone_number) {
    throw new Error('Semua field harus diisi');
  }

  if (password !== password_verify) {
    throw new Error('Password dan verifikasi tidak cocok');
  }

  const existingUser = await authRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate token verifikasi dan expiry-nya (misal: 1 jam ke depan)
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
const verificationExpiry = dayjs().add(1, 'hour').toDate();

  // Buat user baru di database
  const newUser = await authRepository.create({
    name,
    email,
    password: hashedPassword,
    phone_number,
    verification_token: verificationToken,
    verification_token_expiry: verificationExpiry,
    is_verified: false,
  });

  // Mapping ke entity
  const userEntity = User.fromDatabase(newUser);

  return userEntity;
};

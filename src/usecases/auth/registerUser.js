import bcrypt from 'bcrypt';
import userRepository from '../../repositories/userRepository.js';

export const registerUser = async ({ name, email, password, password_verify, phone_number }) => {
  if (!name || !email || !password || !phone_number) {
    throw new Error('Semua field harus diisi');
  }

  if (password !== password_verify) {
    throw new Error('Password dan verifikasi tidak cocok');
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
    phone_number,
  });

  return newUser;
};

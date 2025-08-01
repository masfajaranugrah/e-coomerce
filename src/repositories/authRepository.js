import userModel from '../models/userModel.js';

class authRepository {
    async findByEmail(email) {
        return await userModel.findOne({ where: { email } });
    }

    async create(userData) {
        return await userModel.create(userData);
    }
    async updateVerificationStatus(email, code) {
        return await userModel.update(
            { verification_code: code, is_verified: true },
            { where: { email } }
        );
    }

    async verifyCode(email, code) {
        return await userModel.findOne({
            where: { email, verificationCode: code },
        });
    }
async markVerified  (email, data)  {
  const user = await userModel.findOne({ where: { email } });
  if (!user) throw new Error('User tidak ditemukan');
  await user.update(data);
};
};

export default new authRepository();

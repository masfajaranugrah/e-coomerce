import userModel from '../models/userModel.js';

class userRepository {
    async findByEmail(email) {
        return await userModel.findOne({ where: { email } });
    }

    async  create (userData) {
        return await userModel.create(userData);
    }  
};

export default new  userRepository();

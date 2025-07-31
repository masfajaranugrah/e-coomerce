import userModel from "../models/userModel.js";

class UserRepository {
    
    async getAllUsers() {
        try {
            const users = await userModel.findAll();
            return users.map(user => user.toJSON());
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }
    async findByEmail(email) {
        try {
            return await userModel.findOne({ where: { email } });
        } catch (error) {
            throw new Error('Error finding user by email: ' + error.message);
        }
    }
    async getUserById(id) {
        try {
            const user = await userModel.findByPk(id);
            if (!user) return null;
            return user.toJSON();
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    async createUser(dataUser) {
        try {
            const user = await userModel.create(dataUser);
            return user.toJSON();
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async updateUser(id, dataUser) {
        try {
            const [affectedCount, updatedRows] = await userModel.update(dataUser, {
                where: { id },
                returning: true,
            });
            if (affectedCount === 0) {
                throw new Error('User not found');
            }
            return updatedRows[0].toJSON();
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUserById(id) {
        try {
            const deletedCount = await userModel.destroy({ where: { id } });
            return deletedCount > 0;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

export default new UserRepository();
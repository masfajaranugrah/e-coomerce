import userRepository from "../../repositories/userRepository.js";

export const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await userRepository.updateUser(userId, userData);
        if (!updatedUser) {
            throw new Error('User not found or update failed');
        }
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}   
import userRepository from "../../repositories/userRepository.js";

export const getAllUser = async () => {
    try {
        const users = await userRepository.getAllUsers();
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
}
import userRepository from "../../repositories/userRepository.js";

export const createUser = async (userData) => {
    try {
        const newUser = await userRepository.createUser(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}
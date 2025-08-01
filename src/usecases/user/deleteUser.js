import userRepository from '../../repositories/userRepository.js';

export const deleteUser = async (userId) => {
    try {
        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await userRepository.deleteUser(userId);
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}
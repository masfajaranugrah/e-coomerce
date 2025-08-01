import {getAllUser}  from '../usecases/user/getAllUser.js';
import {getByIdUser}  from '../usecases/user/getByIdUser.js';
import {deleteUser}  from '../usecases/user/deleteUser.js';
import { updateUser } from '../usecases/user/updateUser.js';

const getAllUserController = async (req, res) => {
  try {
     
    const users = await getAllUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByIdUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getByIdUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
  getAllUserController,
  getByIdUserController,
  deleteUserController,
  updateUserController
}

// import bcrypt from 'bcrypt';
// import {createUser}  from '../usecases/user/createUser.js';

// const createUserController = async (req, res) => {
//   try {
//     const { name, email, passsword, passsword_verify, phone_number } = req.body;

//      if (passsword !== passsword_verify) {
//       return res.status(400).json({ message: 'Password dan verifikasi tidak cocok' });
//     }

//     const saltRounds = 10;
//     const hash = bcrypt.hashSync(passsword, saltRounds);

//     const userData = {
//       name,
//       email,
//       password: hash,
//       phone_number
//     };
//     const newUser = await createUser(userData);

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export {
//   createUserController
// }

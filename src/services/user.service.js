import User from '../models/user.model';
const bcrypt = require('bcrypt');
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};
// Add User To Document
export const registerUser = async (userData) => {
  userData.password = bcrypt.hashSync(userData.password, 10);
  const data = await User.create(userData)
  return data
}



import User from '../models/user.model';
const bcrypt = require('bcrypt');
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};
// Add User To Document
export const registerUser = async (userData) => {
  try {
    userData.password = bcrypt.hashSync(userData.password, 10);
    const data = await User.create(userData)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
// Retrieve Data Of User
export const signIn = async (userData) => {
  try {
    const data = await User.find({
      "email": userData.email
    })
    if (data) {
      const [password, err] = bcrypt.compare(userData.password, data.password)
      if (err) {
        throw new Error('Invalid Password')
      } else {
        return 'Login Successful'
      }
    } else {
      throw new Error('Invalid Email');
    }
  }
  catch (err) {
    throw new Error(err)
  }
}



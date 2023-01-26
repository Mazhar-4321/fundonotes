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
    console.log(data)
    if (data) {
    console.log("data successful",data[0].password,userData.password)
      const verified = bcrypt.compareSync( userData.password,data[0].password)
      console.log("verified",verified)
      if (!verified) {
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



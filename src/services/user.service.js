import User from '../models/user.model';
import Jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
export const registerUser = async (userData) => {
  try {
    userData.password = bcrypt.hashSync(userData.password, 10);
    const data = await User.create(userData)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
export const signIn = async (userData) => {
  try {
    const data = await User.find({
      "email": userData.email
    })
    if (data.length >= 1) {
      const verified = bcrypt.compareSync(userData.password, data[0].password)
      if (!verified) {
        throw new Error('Invalid Password')
      } else {
        var token = Jwt.sign({ email: userData.email }, process.env.SECRET_KEY);
        return token
      }
    } else {
      throw new Error('Invalid Email');
    }
  }
  catch (err) {
    throw new Error(err)
  }
}



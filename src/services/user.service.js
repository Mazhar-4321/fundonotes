import User from '../models/user.model';
import Token from '../models/token.model;'
import Jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/user.util';
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
const getRandomString = () => {
  let result = ' ';
  const characters = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  const charactersLength = characters.length;
  let counter = 0
  while (counter < charactersLength) {
    result += characters[Math.floor(Math.random() * charactersLength)]
    counter++
  }
  return result
}
export const forgotPassword = async (email) => {
  try {
    const data = User.findOne({ email: email })
    if (data) {
      const randomString = getRandomString()
      const link=`${process.env.APP_HOST}:${process.env.APP_PORT}/api/${process.env.APP_VERSION}/users/reset/${randomString}`;
      sendEmail(email,link)
    } else {
      throw new Error('Email Doesn\'t Exist')
    }
  }
  catch (err) {
    throw new Error(err)
  }
}



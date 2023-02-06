import User from '../models/user.model';
import Token from '../models/token.model';
import Jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/user.util';
import logger from '../config/myLogger';


const bcrypt = require('bcrypt');
export const registerUser = async (userData) => {
  try {
    userData.password = bcrypt.hashSync(userData.password, 10);
    const data = await User.create(userData)
    logger.info(`User Registered Successfully with ${data.email}`)
    return data
  } catch (err) {
    logger.error("User Registration Failed")
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
        logger.error(`Attempt To Login With Invalid Password ${userData.email}`)
        throw new Error('Invalid Password')
      } else {
        var token = await Jwt.sign({ email: userData.email }, process.env.SECRET_KEY);
        return token
      }
    } else {
      logger.error(`Attempt To Login With Invalid Email as ${userData.email}`)
      throw new Error('Invalid Email');
    }
  }
  catch (err) {
    logger.error(`Login Error by ${userData.email}`)
    throw new Error(err)
  }
}

export const forgotPassword = async (email, res) => {
  try {
    let data = await User.findOne({ email: email.email })
    if (data) {
      var token = await Jwt.sign({ email: email.email }, process.env.FORGET_PASSWORD_SECRET_KEY);
      data = await Token.create({
        token: token,
        expiry: 1200000,
        createdTime: new Date().getTime()
      })
      process.env.RESET_LINK = data.token
      const link = `${process.env.APP_HOST}:${process.env.APP_PORT}/api/${process.env.API_VERSION}/users/reset/${data.token}`;
      var response = await sendEmail(email.email, link, res)
      return response

    } else {
      throw new Error('Email Doesn\'t Exist')
    }
  }
  catch (err) {
    logger.error(`Could not Send Email To ${recipient}`)
    throw new Error(err)
  }
}

export const resetPassword = async (req) => {
  try {
    let data = await Token.findOne({ token: req.params.id })
    if (data) {
      var currentTime = new Date().getTime();
      var tokenTime = data.createdTime;
      if (currentTime - tokenTime > data.expiry) {
        throw new Error('Token Expired')
      }
      let userDetails = await User.findOne({ email: req.body.userId })
      if (userDetails) {
        const newPassword = bcrypt.hashSync(req.body.password, 10);
        const filter = { email: req.body.userId };
        const update = { password: newPassword };
        const data = await User.findOneAndUpdate(filter, update);
        logger.info(`Password Updated Successfully For req.params.id`)
      } else {
        logger.error(`Password Updation Failed For ${req.params.id}`)
        throw new Error('User Doesn\'t Exist')
      }
      return data
    } else {
      logger.error(`Password Updation Failed  For ${req.params.id}`)
      throw new Error('Token Doesn\'t Exist')
    }
  }
  catch (err) {
    logger.error(`Password Updation Failed  For ${req.params.id}`)
    throw new Error(err)
  }
}


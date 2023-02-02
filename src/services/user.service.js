import User from '../models/user.model';
import Token from '../models/token.model';
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

export const forgotPassword = async (email) => {
  try {
    let data = User.findOne({ email: email.email })
    if (data) {
      var token = Jwt.sign({ email: email.email }, process.env.FORGET_PASSWORD_SECRET_KEY);
      data = await Token.create({
        token: token,
        expiry: 1200000,
        createdTime: new Date().getTime()
      })
      const link = `${process.env.APP_HOST}:${process.env.APP_PORT}/api/${process.env.API_VERSION}/users/reset/${data.token}`;
      sendEmail(email.email, link)
    } else {
      throw new Error('Email Doesn\'t Exist')
    }
  }
  catch (err) {
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
      } else {
        throw new Error('User Doesn\'t Exist')
      }

    } else {
      throw new Error('Token Doesn\'t Exist')
    }
  }
  catch (err) {
    throw new Error(err)
  }
}


import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res, next) => {
  try {
    const data = await UserService.registerUser(req.body);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'User Registered Successfully'
      });
    } else {
      throw new Error('Database Operation Failed')
    }
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const data = await UserService.signIn(req.body);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: req.body.email,
        token: data
      });
    } else {
      throw new Error('Database Operation Failed')
    }
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      error: error.message.split(":")[1],
    });
  }
}

export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body,res);
   
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      error: error.message.split(":")[1],
    });
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req);
    
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        msg: "Password Reset Successful"
      });
    } else {
      throw new Error('Database Operation Failed')
    }
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      error: error.message.split(":")[1],
    });
  }
}

import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
export const registerUser = async (req, res, next) => {
  try {
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User Registered Successfully'
    });
  } catch (error) {
    next(error);
  }
};
export const signInUser=async(req,res,next)=>{
  try {
    const data = await UserService.signIn(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: req.body.email,
      token:data
    });
  } catch (error) {
    next(error);
  }
}

export const forgetPassword=async(req,res,next)=>{
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: req.body.email,
      token:data
    });
  } catch (error) {
    next(error);
  }
}

export const resetPassword=async(req,res,next)=>{
  try {
    console.log("controller")
    const data = await UserService.resetPassword(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: req.body.email,
      token:data
    });
  } catch (error) {
    next(error);
  }
}

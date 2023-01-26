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


